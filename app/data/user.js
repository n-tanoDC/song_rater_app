import RNFetchBlob from 'rn-fetch-blob';

import { API_URL } from '../config';
import { getOptions } from './helpers';


export const login = data => 
  // Make a POST request to the login route of the API
  fetch(API_URL + 'auth/login', getOptions(data))
    .then(res => {
      // Actions will change depending on the response status so we make a switch on it
      // The switch will allow us to easily handle more status code and potential errors in the future.
      switch (res.status) {
        case 200: 
          // return a properly formatted object if the request went well.
          return res.json()
        case 401:
          // return a new Error with a message if the request returned 401 : Unauthorized.
          return new Error('Identifiants incorrects.')
        default:
          // return a new Error with a generic message for any unhandled status code.
          return new Error('Une erreur s\'est produite, veuillez réessayer ultérieurement.')
      }
    })
    .catch(err => console.log(err))


export const register = data =>
  // make a POST request to the signup route of the API
  fetch(API_URL + 'auth/signup', getOptions(data))
    .then(async res => {
      switch (res.status) {
        case 201: 
          // If the request went well and returned 201 : Created
          // => return a properly formatted object
          return res.json()
        case 400:
          // If the request return 400 : Bad Request
          // get the error property of the response.
          const { error } = await res.json()
          // We define the keys that are likely to be the source of the problem.
          // Those key/values will be used to display the right message.
          let keys = {
            email: 'Email',
            password: 'Mot de passe',
            username: 'Nom d\'utilisateur'
          }
          let message;
          // We check the error type (for now 'syntax' and 'duplicate' are supported).
          // Then we set the message according to the error type and key properties.
          switch (error.type) {
            case 'syntax':
              message = keys[error.key] + ' incorrect.';
              break;
            case 'duplicate':
              message = keys[error.key] + ' déjà existant';
              break
            default:
              // We set a generic message for any unhandled error type.
              message = 'Une erreur s\'est produite, veuillez réessayer ultérieurement.';
          }
        // We return a new instance of Error with the previously set message.
        // (To be displayed in the catch of the handleSubmit function in AuthForm component)
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
        console.log(res, body);
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