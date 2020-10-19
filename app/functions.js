import { ToastAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

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

export const isVisiting = (user, author) => {
  if (user) {
    return user.username !== author.username;
  }
  return true;
}

export const pickImage = (callback) => {
  ImagePicker.showImagePicker({
    noData: true,
    title: 'Sélectionner une image',
    storageOption: {
      skipBackup: true
    }
  }, res => {
    if (res.didCancel) {
      console.log('did cancel');
      showToast('Modification annulée')
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
      showToast('Une erreur s\'est produite, veuillez réessayer ultériement')
    } else {
      callback(res);
    }
  })
}


export const isFollowing = (connectedUser, userToTest) => {
  return connectedUser.following.some(userFollowed => userFollowed === userToTest._id)
}


