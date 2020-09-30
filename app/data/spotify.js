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

const getQuery = (query, platform = 'spotify', type = 'artist', limit = '20') => {
  switch(platform) {
    case 'spotify':
      return 'search?q=' + query + '&type=' + type + '&market=FR&limit=' + limit + '&offset=0'
      break;
  }
}

export const search = (query, token) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  return (
    fetch(EXTERNAL_API.spotify + getQuery(query), options)
    .then(res => res.json())
    .catch(err => console.log(err))
  )
}

