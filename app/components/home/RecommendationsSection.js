import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../common/buttons/CustomButton';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import AlbumsList from '../media/albums/AlbumsList';

import { getRecommendations } from '../../functions/spotify';
import { catchErrors } from '../../functions/errors';

import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';
import MessageView from '../common/MessageView';

export default () => {
  const [medias, setMedias] = useState(null)
  const { token } = useContext(AppContext)
  const { connectedUser } = useContext(UserContext)
  const navigation = useNavigation()
  
  const getRecommendationsData = () => {
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
    } else {
      setMedias([])
    }
  }
  
  useEffect(() => { getRecommendationsData() }, [])
  
  let listComponent;
  
  if (!medias) return <Loader />
  
  if (!connectedUser) {
    listComponent = (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListLabel}>Veuillez-vous connecter ou créer un compte pour voir les recommandations.</Text>
        <CustomButton 
          text={'Se connecter'}
          onPress={() => navigation.navigate('Account')} />
      </View> 
    )
  } else {
    listComponent = (
      <View style={styles.listContainer}>
        {medias.length ? 
          <AlbumsList showArtists albums={medias}/> :
          <MessageView message='Veuillez ajouter du contenu à vos favoris pour recevoir des recommandations.' />}
        
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <SectionTitle icon='reload' onPress={() => getRecommendationsData()} text='Recommandations' />
      {listComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 100,
  },
  emptyListContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  emptyListLabel: {
    textAlign: 'center',
    marginBottom: 10
  }
})
