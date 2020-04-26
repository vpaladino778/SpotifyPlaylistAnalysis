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
    const listItems = this.props.list((song)=>
      <li>{song}</li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}
