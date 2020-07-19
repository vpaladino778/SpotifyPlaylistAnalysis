import React from "react";
import { Input } from "semantic-ui-react";
import * as $ from "jquery";
import GenreListItem from "./genreListItem.js";

/**
 * This component will become our genre list. It takes in the
 * playlist tracks from Spotify and will analyze that playlist
 * and display a list of genres.
 */
export default class GenreList extends React.Component {
  constructor(props) {
    super(props);
  }
    //alert(this.getTrackTags("glass animals", "gooey"));
  

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   GenreList.updateTagList(nextProps);
  // }
  // static updateTagList(songList) {
  //   var track;
  //   for(track in songList) {
  //     this.getTrackTags(track.artist, track.name);
  //   }
  // }

  // /**
  //  * Makes a call to the backend to retrieve the list of songs tags
  //  * 
  //  * @param {String} artist Artist name to search for
  //  * @param {String} track Track to search for 
  //  */
  // static getTrackTags(artist, track) {
  //   let formattedArtist = artist.replace(/\s+/g, "+");
  //   let formattedTrack = track.replace(/\s+/g, "+");
  //   let builtUrl = "http://localhost:9000/lastfmAPI?artist=" + formattedArtist + "&track=" + formattedTrack;
    
  //   fetch(builtUrl)
  //     .then((res) => res.json())
  //     .then(
  //       (data) => {
  //         let tagName = data.toptags[0].name;
  //         let tagList = [...this.state.tagsList];
  //         let newItem = [...tagList[data.toptags[0].name]];
  //         let count = 0;
  //         if(this.state.tagsList[tagName].tagCount) {
  //           count = this.state.tagsList[tagName].tagCount + 1;
  //         }
  //         newItem.tagCount = count;
  //         tagList[tagName] = newItem;

  //         this.setState({tagList});
  //       },
  //       (error) => {
  //         this.setState({
  //           error,
  //         });
  //       }
  //     );
  // }


  render() {
    return (
      <React.Fragment>
        <h2>Genre List!</h2>
          {Object.keys(this.props.tagList).map((track, index) => (
            <GenreListItem genre={track} numSongs={track.tagCount}/>
          ))}
      </React.Fragment>
    );
  }
}
