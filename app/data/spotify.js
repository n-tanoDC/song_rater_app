import { TOKENS, EXTERNAL_API } from '../config.local';
import { catchErrors, handleErrors } from './errors';
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
      .then(handleErrors)
      .then(res => res.json())
      .catch(catchErrors)
  )
}

export const search = (query, token) => 
  fetch(EXTERNAL_API.spotify + getQuery(query), getAuthOptions(token))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)

export const loadNextResults = (url, token) => 
  fetch(url, getAuthOptions(token))
    .then(handleErrors)
    .then(res => res.json())
    .catch(catchErrors)