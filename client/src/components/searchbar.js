import React from "react";
import { Input } from "semantic-ui-react";
import * as $ from "jquery";
import GenreList from "./genreList";

/**
 * SearchBar Component that processes spotify playlist ID
 * and retrieves a list of the Spotify playlist tracks
 */
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      tracks: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  /**
   * Performs call to the spotify API to retrieve the list of tracks
   * @param {*} token Spotify auth token. This should be passed in as a prop value
   * @param {*} playlistID ID of the spotify playlist (Not the URL)
   */
  getPlaylistTracks(token, playlistID) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?fields=items(track(name%2Cartists))",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          tracks: data.items
        });
        // Call the callback function in App.js, and pass the songList
        this.props.songListCallbackFunction(data.items);
      }
    });
  }

  updateSearch(event) {
    this.setState({searchValue: event.target.value});
  }

  /**
   * Takes in the search bar string after a search is performed and 
   * extracts out the appropriate playlist ID to be used in the API call
   * @param {string} searchParameter Parameter that was inputted into the searchbar
   */
  parseSearchLink(searchParameter) {
    //https://open.spotify.com/playlist/4Gpu2BiBp8QjHyX0IbvVLx?si=4T8ONlmDS_eMLJGGKISLXg
    var id = searchParameter;
    var spotifyPlaylistString = "https://open.spotify.com/playlist/";
    var idPos = searchParameter.indexOf(spotifyPlaylistString, 0);
    var endPos = searchParameter.indexOf("?si=");
    if(idPos !== -1 && endPos !== -1) {
      id = searchParameter.substring(idPos + spotifyPlaylistString.length, endPos);
      return id;
    }
    return "";
  }

  handleSearch(event) {
    // TODO: Error checking playlist link
    // TODO: Parse an actual playlist link instead of just the playlist ID
    let playListID = this.parseSearchLink(this.state.searchValue)

    if (playListID === "") {
      //TODO: Error indication (Red box outline?)
    } else {
      this.getPlaylistTracks(this.props.token, playListID);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <Input
          style={{ width: "30vw" }}
          placeholder="Enter a playlist link or ID..."
          onChange={this.updateSearch}
          action={{
            content: "Search",
            onClick: this.handleSearch,
            icon: "search"
          }}
        />
      </React.Fragment>
    );
  }
}
