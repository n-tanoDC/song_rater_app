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

// return a string corresponding to the right url to use to display an element cover
export const getCover = element => {
  if (element.image) {
    return element.image;
  } 
  return element.type === 'track' ? element.album.images[0].url : element.images[0].url;
}

