import { CLIENT_ID } from '../config';

export const generateToken = setter => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + CLIENT_ID,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: (encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials')),
  };

  fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then(res => res.json())
    .then(data => setter(data.access_token))
    .catch(error => console.log('error', error));
}

