import { API_URL } from '../config.local';
import { catchErrors, handleErrors } from './errors';
import { getMediaData, getOptions } from './helpers';

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


export const editAccount = (fields, token, newAvatar) => {
  const body = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    body.append(key, value);
  }

  if (newAvatar) {
    body.append('avatar', { 
      uri: newAvatar.uri, 
      name: newAvatar.fileName, 
      type: newAvatar.type 
    })
  }

  return (
    fetch(API_URL + 'users/account', getOptions(body, token, 'PUT'))
      .then(handleErrors)
      .then(res => res.json())
      .catch(catchErrors)
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

export const updateFavStatus = (media, method, token) => 
  fetch(API_URL + 'users/account/favorites/' + media.id, getOptions(getMediaData(media), token, method))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors);