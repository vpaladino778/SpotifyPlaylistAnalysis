import React from "react";
import { Input } from "semantic-ui-react";
import * as $ from "jquery";

/**
 * This component will become our genre list. It takes in the 
 * playlist tracks from Spotify and will analyze that playlist
 * and display a list of genres.
 */
export default class GenreList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Genre List!</h2>
        <ul>
          {
            this.props.list.map((song) =>(
              <li>{song.track.name}</li>
            ))
          }
        </ul>        
      </React.Fragment>
    );
  }
}
