import React, { Component } from "react";
import hash from "./spotifyApi/hash.js"
import {authEndpoint, clientId, redirectUri, scopes, authUrl} from "./spotifyApi/spotifyConfig.js";
import SearchBar from "./components/searchbar";
import Player from "./components/Player";
import { Button, Header } from 'semantic-ui-react'
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
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
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
            <SearchBar token={this.state.token}/>
          )}
        </header>
      </div>
    );
  }
}

export default App;
