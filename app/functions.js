import { ToastAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment/min/moment-with-locales';


// return formatted Array of artists, used to send post request to the API
export const getFormattedArtists = artists => {
  return artists.map(artist => ({ id: artist.id, name: artist.name }))
}


// display a toast at the bottom of the screen
export const showToast = (message = null) => {
  const newMessage = message ? 
    message 
      : 
    'Une erreur s\'est produite, veuillez réessayer ultérieurement';

  ToastAndroid.show(newMessage, ToastAndroid.SHORT)
}


// return formatted string of artists from an Array (provided in the Spotify API response object)
export const getArtists = media => {
  const { artists } = media;
  let artistsNames = '';
  for (const [index, artist] of artists.entries()) {
    const suffix = index < artists.length - 1 ? ', ' : '';
    artistsNames += (artist.name + suffix)
  }
  return artistsNames;
}


// return a string corresponding to the right url to use to display a media cover
export const getCover = media => {
  if (media.image) {
    return media.image;
  } 
  return media.type === 'track' ? media.album.images[0].url : media.images[0].url;
}


export const getDate = timestamp => moment.utc(timestamp).locale('fr').fromNow();


export const getLink = media => {
  if (media.link) {
    return media.link;
  }
  return media.external_urls.spotify;
}


export const getAverageRating = reviews => {
  if (!reviews || reviews.length === 0) {
    return '-';
  }
  const ratings = reviews.map(review => review.rating);
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / reviews.length) * 100) / 100;
}


export const isFollowing = (connectedUser, userToTest) => {
  return connectedUser.following.some(userFollowed => userFollowed === userToTest._id)
}


export const isVisiting = (connectedUser, author) => {
  if (connectedUser) {
    return connectedUser.username !== author.username;
  }
  return true;
}


export const accountDeleted = (author) => !(author instanceof Object) 


export const pickImage = (callback) => {
  ImagePicker.showImagePicker({
    noData: true,
    title: 'Sélectionner une image',
    storageOption: {
      skipBackup: true
    }
  }, res => {
    if (res.didCancel) {
      showToast('Modification annulée')
    } else if (res.error) {
      showToast()
    } else {
      callback(res);
    }
  })
}


export const getUpdatedInputs = (inputs, user) => {
  let newInputs = {};
  for (const [key, value] of Object.entries(inputs)) {
    if (inputs[key] !== user[key]) {
      newInputs[key] = value;
    }
  }
  return newInputs;
}