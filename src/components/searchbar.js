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
        alert(data.items[0].track.name);
      }
    });
  }

  updateSearch(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSearch(event) {
    // TODO: Error checking playlist link
    // TODO: Parse an actual playlist link instead of just the playlist ID

    this.getPlaylistTracks(this.props.token, this.state.searchValue);
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
        {this.state.tracks &&
          <GenreList list={this.state.tracks}/>
        }
      </React.Fragment>
    );
  }
}
