import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getArtists, getAverageRating, getCover, getLink } from '../../functions';
import ButtonIcon from '../common/ButtonIcon';
import ReviewsList from '../reviews/ReviewsList';

export default ({ route, navigation }) => {
  const { mediaToShow } = route.params;

  const [media, setMedia] = useState(mediaToShow);
  
  useEffect(() => setMedia(mediaToShow), [mediaToShow])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground blurRadius={20} source={{ uri: getCover(media) }} style={styles.imageBg}>
          <View style={styles.backButton}>
            <ButtonIcon 
              size={36}
              name='chevron-left' 
              color='#FDFDFD' 
              onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.mediaWrapper}>
            <Image resizeMode='contain' source={{ uri: getCover(media) }} style={styles.image} />
            <View style={styles.textWrapper}>
              <Text numberOfLines={1} style={styles.title}>{mediaToShow.name}</Text>
              <Text numberOfLine={1} style={styles.artists}>{getArtists(media)}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <View style={styles.linkButton}>
              <ButtonIcon 
                size={36}
                name='spotify'
                color='#FDFDFD'
                background='#1DB954'
                onPress={() => Linking.openURL(getLink(media))} />
            </View>
            <View style={styles.editButton}>
              <ButtonIcon 
                size={36}
                name='square-edit-outline'
                color='#FDFDFD'
                background='#9E00FF'
                onPress={() => navigation.navigate('Review', { media })} />
            </View>  
          </View>
        </ImageBackground>
      </View>
      <View>
        <Text style={styles.pageTitle}>Critiques</Text>
        <ReviewsList media={media}/>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  banner: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%'
  },
  imageBg: {
    width: '100%',
    aspectRatio: 1
  },
  mediaWrapper: {
    height: '70%',
    justifyContent: 'space-between'
  },
  image: {
    height: '75%',
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FDFDFD',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: '#3A3A3A',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  artists: {
    color: '#FDFDFD',
    fontStyle: 'italic',
    textShadowColor: '#3A3A3A',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  actionButtons: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  linkButton: {
    height: '100%',
    borderTopRightRadius: 10,
    aspectRatio: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1DB954',
  },
  editButton: {
    height: '100%',
    borderTopLeftRadius: 10,
    aspectRatio: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E00FF',
  },
  pageTitle: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
  }
})
