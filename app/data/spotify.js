import { TOKENS } from '../config';

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

