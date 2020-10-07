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

export const getFavorites = (favorites, token) => {
  const ids = favorites.join();
  const options = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  return (
    fetch(EXTERNAL_API.spotify + 'artists?ids=' + ids, options)
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}

const getQuery = (query, platform = 'spotify') => {
  switch(platform) {
    case 'spotify':
      return 'search?q=' + query + '&type=track,album,artist&market=FR'
      break;
  }
}

