import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loader from '../common/Loader';

import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import { getRecommendations } from '../../functions/spotify';
import { catchErrors } from '../../functions/errors';
import AlbumsList from '../media/albums/AlbumsList';
import SectionTitle from '../common/SectionTitle';

export default () => {
  const [medias, setMedias] = useState(null)
  const { token } = useContext(AppContext)
  const { connectedUser } = useContext(UserContext)

  useEffect(() => { 
    if (connectedUser) {
      if (connectedUser.favorites.length) {
        getRecommendations(token, connectedUser)
          .then(res => {
            if (res) {
              setMedias(res.tracks)
            }
          })
          .catch(catchErrors)
      } else {
        setMedias([])
      }
    }
  }, [])

  if (!medias) return <Loader />

  return (
    <View style={styles.container}>
      <SectionTitle text='Titres recommandés' />
      <View style={styles.listContainer}>
        <AlbumsList showArtists albums={medias}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  listContainer: {
    minHeight: 100,
  }
})
