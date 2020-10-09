import { Alert } from 'react-native';
import { API_URL } from '../config';

// Authentication functions

export const login = (setUser, data) => {
  fetch(API_URL + 'auth/login', getReqOptions(data))
    .then(res => {
      switch (res.status) {
        case 200: 
          return res.json()
        case 401:
          throw new Error('Unauthorized')
        default:
          throw new Error()
      }
    })
    .then(data => {
      const { user, token, reviews } = data;
      setUser({ ...user, token, reviews })
    })
    .catch(err => {
      switch (err.message) {
        case 'Unauthorized':
          Alert.alert('Mot de passe ou nom d\'utilisateur incorrect')
          break;
        default :
          Alert.alert('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
      }
    })
}

export const register = (setUser, data) => {
  fetch(API_URL + 'auth/signup', getReqOptions(data))
    .then(async res => {
      switch (res.status) {
        case 201: 
          return res.json()
        case 400:
          const error = await res.json()
          throw error
        default:
          throw new Error()
      }
    })
    .then(data => {
      const { user, token } = data;
      setUser({ ...user, token })
    })
    .catch(err => {
      if (err.error) {
        const { error } = err;
        let keys = {
          email: 'Email',
          password: 'Mot de passe',
          username: 'Nom d\'utilisateur'
        }
  
        switch (error.type) {
          case 'syntax':
            Alert.alert(keys[error.key] + ' incorrect.');
            break;
          case 'duplicate':
            Alert.alert(keys[error.key] + ' déjà existant.');
            break;
          default:
            Alert.alert('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
        }
      } else {
        Alert.alert('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
      }

      
    })

}

export const logout = (callback) => {
  callback(null);
}


// User related functions

export const getUser = username => 
  fetch(API_URL + 'user/' + username)
    .then(res => res.json())
    .catch(err => console.log(err))

export const addToFavorites = (element_id, userContext) => {
  const { user, setUser } = userContext;
  const id = user._id

  fetch(API_URL + 'user/favorites?secret_token=' + user.token, getReqOptions({ element_id, id }))
    .then(() => {
      let add = user.favorites.find(fav => fav === element_id);
      if (!add) {
        const newFavs = [...user.favorites, element_id];
        setUser({...user, favorites: newFavs});
      } 
    })
    .catch(err => console.log(err))
}

const getReqOptions = body => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}