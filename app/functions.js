// get formatted string of artists from an Array (provided in the Spotify API response object)
export const getArtists = artists => {
  let artistsNames = '';
  for (const [index, artist] of artists.entries()) {
    const suffix = index < artists.length - 1 ? ', ' : '';
    artistsNames += (artist.name + suffix)
  }
  return artistsNames;
}

export const getFormattedArtists = artists => {
  return artists.map(artist => ({ id: artist.id, name: artist.name }))
}

