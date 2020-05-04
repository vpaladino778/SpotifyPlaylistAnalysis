var express = require("express");
var router = express.Router();
// Adds the 'fetch' function to node
const fetch = require("node-fetch");
// Rate Limiter to comply with LastFM rate restrictions
const rateLimiter = require("express-rate-limit");
// Allows us to store information in .env file
require('dotenv').config()

const limiter = rateLimiter({
  windowMs: 200, // 5 requests per second
  max: 1, // limit each IP to 1 request per windowMs
});

/**
 * This is going to be out backend API function that will be
 * called on the frontend. The purpose of this function is to
 * take in an artist and a track name to pass into the LastFM API
 * and retreive the top 'tags' for that particular song
 * 
 * The LastFM documentation for this API call can be found [here](https://www.last.fm/api/show/track.getTopTags).
 */
router.get("/", async function(req, res, next) {
  try {

    const artistString = `artist=${req.query.artist}`;
    const songString = `track=${req.query.track}`;

    // It uses node-fetch to call the last fm api, and reads the key from .env
    console.log(artistString);
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&${artistString}&${songString}&api_key=${process.env.LAST_FM_API_KEY}&format=json`,
      );  
    // Get json response
    const json = await response.text();

    // Parse the json results into a object
    const results = JSON.parse(json);
    return res.json({
      success: true,
      results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;