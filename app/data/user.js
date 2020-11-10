import RNFetchBlob from 'rn-fetch-blob';

import { API_URL } from '../config';
import { showToast } from '../functions';
import { catchErrors, handleErrors } from './errors';
import { getOptions } from './helpers';

export const login = data => 
  fetch(API_URL + 'auth/login', getOptions(data))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)


export const register = data =>
  fetch(API_URL + 'auth/signup', getOptions(data))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)


export const logout = (callback) => {
  callback(null);
}

export const deleteAccount = (token) => 
  fetch(API_URL + 'users/account', getOptions(null, token, 'DELETE'))
    .then(handleErrors)
    .then(res => res)
    .catch(catchErrors)

export const postChanges = (inputs, token, newAvatar) => {
  let body = [];
  for (const [key, value] of Object.entries(inputs)) {
    body.push({ name: key, data: value });
  }

  if (newAvatar) {
    body.push({ 
      name: 'avatar',
      filename: newAvatar.fileName,
      type: newAvatar.type,
      data: RNFetchBlob.wrap(newAvatar.uri) })
  }

  return (
    RNFetchBlob.fetch('PUT', API_URL + 'users/account', { Authorization: 'Bearer ' + token }, body)
      .then(async res => {
        switch (res.respInfo.status) {
          case 200: 
            return res.json()
          case 400:
            const error = await res.json()
            let keys = {
              email: 'Email',
              password: 'Mot de passe',
              username: 'Nom d\'utilisateur'
            }
            let message;
            switch (error.type) {
              case 'syntax':
                message = keys[error.key] + ' incorrect.';
                break;
              case 'duplicate':
                message = keys[error.key] + ' déjà existant';
                break
              default:
                message = 'Une erreur s\'est produit, veuillez réessayer ultérieurement.';
            }
          return new Error(message);
          default:
            return new Error('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
        }
      })
      .catch(err => console.log(err))
  )
}


export const updateFollow = (action, username, token) => 
  fetch(API_URL + 'users/' + username + '/' + action, getOptions(null, token, 'GET'))
    .then(res => { 
      if (res.status === 200) {
        return res.json();
      } else {
        return new Error('Une erreur s\'est produite.')
      }
    })  
    .catch(err => console.log(err))