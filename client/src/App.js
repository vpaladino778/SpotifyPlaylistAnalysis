import React, { Component } from "react";
import hash from "./spotifyApi/hash.js"
import {authEndpoint, clientId, redirectUri, scopes, authUrl} from "./spotifyApi/spotifyConfig.js";
import SearchBar from "./components/searchbar";
import { Button, Header } from 'semantic-ui-react'
import GenreList from "./components/genreList";
import * as $ from "jquery";


const styles = {
  root: {
      textAlign: 'center'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      showGenreList: false,
    };

    this.songListCallbackFunction = this.songListCallbackFunction.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
    // if (localStorage.getItem('token')) {
    //   this.setState({
    //     token: localStorage.getItem('token')
    //   });
    // } else {

    //   // Set token
    //   this.setState({
    //     token: _token
    //   });

    //   // Save Token into session ID
    //   localStorage.setItem('token', _token);
    // }
  }

  /**
   * Makes a call to the backend to retrieve the list of songs tags
   * 
   * @param {String} artist Artist name to search for
   * @param {String} track Track to search for 
   */
  static getTrackTags(artist, track) {
    let formattedArtist = artist.replace(/\s+/g, "+");
    let formattedTrack = track.replace(/\s+/g, "+");
    let builtUrl = "http://localhost:9000/lastfmAPI?artist=" + formattedArtist + "&track=" + formattedTrack;
    
    fetch(builtUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          let tagName = typeof data.results.toptags[0].name !== 'undefined ' ? data.results.toptags[0].name : "Unknown";
          let tagList = [...this.state.tagList];
          let newItem = [...tagList[data.toptags[0].name]];
          let count = 0;
          if(this.state.tagList[tagName].tagCount) {
            count = this.state.tagList[tagName].tagCount + 1;
          }
          newItem.tagCount = count;
          tagList[tagName] = newItem;

          this.setState({tagList});
          this.setState({showGenreList: true,});
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  static updateTagList(songList) {
    for(var track of songList) {
      var artist = track.track.artists[0].name;
      var trackName = track.track.name;
      // Check if null
      if(artist != (null || "") && trackName != (null || "")){
        // Grabbing the first arist should be sufficient for searching LastFM
        this.getTrackTags(artist, trackName);
      }
    }
  }

  songListCallbackFunction(songList) {
    App.updateTagList(songList);
  }

  render() {
    return (
      <div className="App" style={styles.root}>
        <Header as="h1">Spotify Playlist Analyzer</Header>
        <header className="App-header">
          {!this.state.token && (
            <Button
              className="ui button"
              href={`${authUrl}`}
            >
              Login to Spotify
            </Button>
          )}
          {this.state.token && (
            <SearchBar token={this.state.token} songListCallbackFunction={this.songListCallbackFunction}/>
          )}
        </header>
        {this.state.showGenreList &&
          <GenreList tagList={this.state.tagList}/>
        }
      </div>
    );
  }
}

export default App;
