import { ToastAndroid } from "react-native";

// return formatted string of artists from an Array (provided in the Spotify API response object)
export const getArtists = artists => {
  let artistsNames = '';
  for (const [index, artist] of artists.entries()) {
    const suffix = index < artists.length - 1 ? ', ' : '';
    artistsNames += (artist.name + suffix)
  }
  return artistsNames;
}

// return formatted Array of artists, used to send post request to the API
export const getFormattedArtists = artists => {
  return artists.map(artist => ({ id: artist.id, name: artist.name }))
}

// display a toast at the bottom of the screen
export const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT)
}

