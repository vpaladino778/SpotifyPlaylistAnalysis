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
    };
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')
      });
    } else {

      // Set token
      this.setState({
        token: _token
      });

      // Save Token into session ID
      localStorage.setItem('token', _token);
    }
  }

  render() {
    return (
      <div className="App" style={styles.root}>
        <Header as="h1">Spotify Playlist Analyzer</Header>
        <header className="App-header">
          {!localStorage.getItem('token') && (
            <Button
              className="ui button"
              href={`${authUrl}`}
            >
              Login to Spotify
            </Button>
          )}
          {localStorage.getItem('token') && (
            <SearchBar token={localStorage.getItem('token')}/>
          )}
        </header>
      </div>
    );
  }
}

export default App;
