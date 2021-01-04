import React from 'react';
import { ToastAndroid, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment/min/moment-with-locales';
import ArtistName from '../components/media/artists/ArtistName';

// return a formatted string to display a number of followers
export const getFollowers = (followers) => {
  if (!followers) {
    return 'Aucun abonné'
  }

  const suffix = followers > 1 ? 's' : '';
  return followers + ' abonné' + suffix;
}

// check if a user has a media in his favorites and return true or false
export const isFavorite = (user, media) => user.favorites.find(fav => fav.id === media.id)

// set a state according to favorite status of a media
export const checkFavorite = (user, media, setLike) => {
  if (user) {
    const favStatus = isFavorite(user, media)
    setLike(favStatus)
  }
}

// return formatted Media object to submit to db
export const getMediaData = (media) => {
  const mediaData = {
    id: media.id,
    link: getLink(media),
    media_type: media.type,
    name: media.name,
    image: getCover(media),
  }

  if (media.type !== 'artist') {
    mediaData.artists = getFormattedArtists(media.artists)
  }

  return mediaData
};

// return a string for the type of the media given as a parameter
export const getMediaType = (media, formatted) => {
  const type = media.type ? media.type : media.media_type;
  if (formatted) {
    switch(type) {
      case 'track':
        return 'Morceau';
      case 'album': 
        return 'Album';
      case 'artist':
        return 'Artiste';
      default: 
        return 'Type inconnu';
    }
  }
  return type;
}

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
export const getArtistsWithLink = (artists) => {
  let artistsNames = [];
  for (const [index, artist] of artists.entries()) {
    artistsNames.push(<ArtistName last={index === artists.length - 1} key={index} artist={artist} />)
  }
  
  return (
    <View style={{ flexDirection: 'row' }}>
      {artistsNames}
    </View> )
}

export const getArtists = (artists, getID = false) => {
  let artistsData = '';
  for (const [index, artist] of artists.entries()) {
    const suffix = index < artists.length - 1 ? ', ' : '';
    artistsData += (artist[getID ? 'id' : 'name'] + suffix)
  }
  return artistsData;
}

// return a string corresponding to the right url to use to display a media cover
export const getCover = media => {
  if (media.image) {
    return media.image;
  } 
  switch (media.type) {
    case 'track':
      return media.album.images[0].url;
    case 'album':
    case 'artist':
      if (media.images.length) {
        return media.images[0].url;
      }
      return 'https://www.indigenousmusicawards.com/img/placeholder-music.png';
    default:
      return 'https://www.indigenousmusicawards.com/img/placeholder-music.png';
  }
}

export const getGenres = media => {
  let formattedGenres = media.genres.map(genre => {
    return genre
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  })
  
  return formattedGenres.join(', ')
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
    takePhotoButtonTitle: 'Prendre une photo',
    chooseFromLibraryButtonTitle: 'Choisir une image dans la gallerie',
    cancelButtonTitle: 'Annuler',
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

export const getUpdatedFields = (fields, user) => {
  let newInputs = {};
  
  for (const [key, value] of Object.entries(fields)) {
    if (fields[key] !== user[key]) {
      newInputs[key] = value;
    }
  }
  return newInputs;
}

export const formValidator = (data) => {
  for (let item of Object.values(data)) {
    if (item === '') {
      return { error: 'Veuillez remplir tous les champs.'}
    }
  }
   
  if (data.passwordConf && data.passwordConf !== data.password) {
    return { error: 'Les mots de passes ne sont pas identiques.'}
  }

  return { error: null };
}

export const getOptions = (body, token, method = 'POST') => {
  const headers = new Headers();
  let newBody = body;
  
  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }
  
  if (body && !(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
    newBody = JSON.stringify(body);
  }
  
  return { body: newBody, method, headers };
}

export const getQuery = (query) => {
  return (
    'search?q=' + query + '&type=track,album,artist&market=FR&limit=35&offset=0'
  )
}

export const getAuthOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}

const pickSeeds = (seeds) => {
  let newSeeds = ''
  for (let i = 0 ; i < 5 ; i++) {
    newSeeds += seeds[Math.floor(Math.random() * seeds.length)]
    if (i !== 4) newSeeds += ','
  }
  return newSeeds
}

export const getSeeds = (ids) => {
  // remove empty strings
  const newArray = ids.filter(item => { if (item !== '') return item })
  const formattedArray = []

  // remove spaces
  newArray.map((item, index) => {
    const trimmedItem = item.replace(/ /g, '')
    const newItem = trimmedItem.includes(',') ? trimmedItem.split(',') : trimmedItem
    if (newItem instanceof Array) {
      formattedArray.push(...newItem)
    } else { 
      formattedArray.push(newItem)
    }
  })

  // remove duplicates
  const finalArray = formattedArray.filter((value, index, self) => self.indexOf(value) === index)

  return pickSeeds(finalArray)
}

export const getRecommendationsSeeds = (user) => {
  const artists = user.favorites.map(fav => getArtists(fav.artists, true))
  return getSeeds(artists)
}