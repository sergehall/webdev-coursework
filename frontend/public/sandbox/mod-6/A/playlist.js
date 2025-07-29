// Playlist constructor function
// This function initializes a new Playlist object with a given name,
// an empty array to store songs, and a null value for the current song.
function Playlist(name) {
  this.name = name; // Stores the name of the playlist (e.g., "Workout Mix")
  this.songs = []; // Initializes an empty array to hold song titles
  this.currentSong = null; // No song is playing initially
}

// Adds a new song to the playlist
// Accepts a string representing the song title and pushes it into the songs array
Playlist.prototype.addSong = function (songTitle) {
  this.songs.push(songTitle); // Adds the song to the end of the playlist
};

// Starts playing the first song in the playlist
// Sets the first song in the array as the current song and logs it to the console
Playlist.prototype.playFirst = function () {
  if (this.songs.length > 0) {
    this.currentSong = this.songs[0]; // Selects the first song as the one to play
    console.log("Now playing:", this.currentSong); // Logs the current song
  } else {
    console.log("The playlist is empty."); // Handles case when there are no songs
  }
};

// Skips the current song and plays the next one
// Removes the first song from the list and plays the new first song, if available
Playlist.prototype.skipSong = function () {
  if (this.songs.length > 1) {
    this.songs.shift(); // Removes the current (first) song from the playlist
    this.currentSong = this.songs[0]; // Updates the current song to the next one
    console.log("Skipped! Now playing:", this.currentSong); // Logs the new current song
  } else if (this.songs.length === 1) {
    this.songs.shift(); // Removes the last remaining song
    this.currentSong = null; // No song left to play
    console.log("No more songs to play."); // Notifies user that playlist is now empty
  } else {
    console.log("No more songs to skip."); // If playlist was already empty
  }
};

// Lists all songs currently in the playlist
// Displays the playlist name and all songs joined into a readable string
Playlist.prototype.listSongs = function () {
  console.log("Playlist:", this.name); // Prints the playlist name
  if (this.songs.length > 0) {
    console.log("Songs:", this.songs.join(", ")); // Prints all songs in the playlist
  } else {
    console.log("No songs in the playlist."); // Message for an empty playlist
  }
};

// Displays the total number of songs in the playlist
// Useful for getting a quick count of items
Playlist.prototype.totalSongs = function () {
  console.log(`Total songs in "${this.name}":`, this.songs.length);
};

// === Sample usage ===
let myMix = new Playlist("My Chill Mix"); // Creates a new playlist

// Add songs to the playlist
myMix.addSong("Lofi Study");
myMix.addSong("Chillhop Beats");
myMix.addSong("Evening Jazz");

myMix.playFirst(); // Plays the first song: "Lofi Study"
myMix.skipSong(); // Skips to the next song: "Chillhop Beats"
myMix.listSongs(); // Lists all songs currently in the playlist
myMix.totalSongs(); // Displays how many songs are in the playlist
