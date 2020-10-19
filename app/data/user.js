import RNFetchBlob from 'rn-fetch-blob';

import { API_URL } from '../config';
import { getOptions } from './helpers';


// Authentication functions

export const login = data => 
  fetch(API_URL + 'auth/login', getOptions(data))
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
  fetch(API_URL + 'auth/signup', getOptions(data))
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
            console.log(error);
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