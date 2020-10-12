import { TOKENS, EXTERNAL_API } from '../config';

export const generateToken = setter => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + TOKENS.spotify.id,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: (encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials')),
  };

  fetch(TOKENS.spotify.url, options)
    .then(res => res.json())
    .then(data => setter(data.access_token))
    .catch(error => console.log('error', error));
}

export const search = (query, token) => {
  return (
    fetch(EXTERNAL_API.spotify + getQuery(query), getOptions(token))
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

export const getFavorites = (favorites, token) => {
  const ids = favorites.join();
  return (
    fetch(EXTERNAL_API.spotify + 'artists?ids=' + ids, getOptions(token))
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}

export const getOneElement = (id, type, token) => 
  fetch(EXTERNAL_API.spotify + type + 's/' + id, getOptions(token))
    .then(res => res.json())
    .catch(err => console.log(err))

// helpers

const getQuery = query => 'search?q=' + query + '&type=track,album,artist&market=FR'


const getOptions = token => { 
  return { headers: { Authorization: 'Bearer ' + token } }
}