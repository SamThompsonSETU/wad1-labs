"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const playlists = playlistStore.getAllPlaylists();

    let numPlaylists = playlists.length;
    
    let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);
	
	  let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;
    
    // Only consider playlists with a valid numeric rating
    const ratedPlaylists = playlists.filter(p => typeof p.rating === 'number' && !isNaN(p.rating));
    let totalRating = ratedPlaylists.reduce((total, playlist) => total + playlist.rating, 0);
    let avgRating = ratedPlaylists.length > 0 ? totalRating / ratedPlaylists.length : 0;

    let maxRating = ratedPlaylists.length > 0 ? Math.max(...ratedPlaylists.map(playlist => playlist.rating)) : 0;
    let maxRated = ratedPlaylists.filter(playlist => playlist.rating === maxRating);
    let favTitles = maxRated.map(item => item.title);

    // Largest playlist(s) by number of songs
    let maxSongs = playlists.length > 0 ? Math.max(...playlists.map(playlist => playlist.songs.length)) : 0;
    let largestPlaylists = playlists.filter(playlist => playlist.songs.length === maxSongs).map(item => item.title);

    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
      highest: maxRating,
      displayFav: favTitles,
      maxSongs: maxSongs,
      largestPlaylists: largestPlaylists
    };

    const viewData = {
      title: "Playlist App Statistics",
      stats: statistics
    };
    response.render("stats", viewData);
  },
};

export default stats;
