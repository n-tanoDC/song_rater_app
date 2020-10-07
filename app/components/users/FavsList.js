import { List, Spinner, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../../App.js';
import { getFavorites } from '../../data/spotify.js';
import FavCard from './FavCard.js';

export default ({ navigation, user }) => {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(false);
  const spotify = useContext(SpotifyContext);

  useEffect(() => {
    if (user.favorites.length > 0) {
      setLoading(true);
      getFavorites(user.favorites, spotify.token)
        .then(res => {
          setFavorites(res.artists)
        })
        .then(() => setLoading(false))
        .catch(err => console.log(err))
    }
  }, [])

  if (loading) {
    return <Spinner />
  }

  const content = favorites ?
    favorites.map((fav, key) => <FavCard key={key} navigation={navigation} fav={fav}/>) :
    <Text>Aucun favori.</Text>

  return (
    <List>
      {content}
    </List>
  )
};