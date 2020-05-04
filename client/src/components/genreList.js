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
    this.getTrackTags("glass animals", "gooey")
  }

  getTrackTags(artist, track) {
    // // http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=glass+animals&track=dreamland&api_key=YOUR_API_KEY&format=json
    // let formattedArtist = artist.replace(/\s+/g, "+");
    // let formattedTrack = track.replace(/\s+/g, "+");
    // let builtUrl = "http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=" + formattedArtist + "&track=" + formattedTrack + "&api_key=" + "95dae2f461126e63bb08621640a91d06" + "&format=json";
    
    // fetch(builtUrl)
    //   .then((res) => res.json())
    //   .then(
    //     (data) => {
    //       this.setState({
    //         tags: data.toptags.tag[0].name
    //       });
    //       alert(data.toptags.tag[0].name);
    //     },
    //     (error) => {
    //       this.setState({
    //         error,
    //       });
    //     }
    //   );
    // http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=glass+animals&track=dreamland&api_key=YOUR_API_KEY&format=json
    let formattedArtist = artist.replace(/\s+/g, "+");
    let formattedTrack = track.replace(/\s+/g, "+");
    let builtUrl = "http://localhost:9000/routes/lastfmAPI?artist=" + formattedArtist + "?track=" + formattedTrack;

    fetch(builtUrl)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            tags: data.toptags.tag[0].name
          });
          alert(data.toptags.tag[0].name);
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
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
