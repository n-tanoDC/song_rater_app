import { API_URL } from '../config';
import { getPostOptions } from './helpers';

// Authentication functions

export const login = data => 
  fetch(API_URL + 'auth/login', getPostOptions(data))
    .then(res => {
      switch (res.status) {
        case 200: 
          return res.json()
        case 401:
          return new Error('Identifiants incorrects.')
        default:
          return new Error('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
      }
    })
    .catch(err => console.log(err))


export const register = data => 
  fetch(API_URL + 'auth/signup', getPostOptions(data))
    .then(async res => {
      switch (res.status) {
        case 201: 
          return res.json()
        case 400:
          const { error } = await res.json()
          let keys = {
            email: 'Email',
            password: 'Mot de passe',
            username: 'Nom d\'utilisateur'
          }
          let message;
          console.log(error, data.email);
          switch (error.type) {
            case 'syntax':
              message = keys[error.key] + ' incorrect.';
              break;
            case 'duplicate':
              message = keys[error.key] + ' déjà existant';
              break
            default:
              message = 'Une erreur s\'est produite, veuillez réessayer ultérieurement.';
          }
        return new Error(message);
      }
    })
    .catch(err => console.log(err))


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