import { TOKENS, EXTERNAL_API } from '../config.local';
import { getAuthOptions, getQuery } from './helpers';

export const generateToken = () => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + TOKENS.spotify.id,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: (encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials')),
  };

  return (
    fetch(TOKENS.spotify.url, options)
      .then(res => res.json())
      .catch(error => console.log('error', error))
  )
}

export const search = (query, token) => 
  fetch(EXTERNAL_API.spotify + getQuery(query), getAuthOptions(token))
  .then(res => res.json())
  .catch(err => console.log(err))

export const loadMore = (url, token) => 
  fetch(url, getAuthOptions(token))
    .then(res => res.json())
    .catch(err => console.log(err))