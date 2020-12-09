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

export const getArtistData = (id, token) => {
  const baseUrl = EXTERNAL_API.spotify + 'artists/' + id;
  const auth = getAuthOptions(token);
  return (
    Promise.all([
      fetch(baseUrl, auth),
      fetch(baseUrl + '/albums', auth),
      fetch(baseUrl + '/top-tracks?country=FR', auth),
      fetch(baseUrl + '/related-artists', auth)
    ])
      .then(async ([data, albums, topTracks, relatedArtists]) => {
        const artist = {};
        artist.info = await data.json();
        artist.albums = await albums.json();
        artist.topTracks = await topTracks.json().then(res => res.tracks);
        artist.relatedArtists = await relatedArtists.json().then(res => res.artists);
        return artist
      })
      .catch(catchErrors)
  )
}