import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getAllReviewsForOneMedia } from '../../data/reviews';
import { getArtists, getCover, getLink } from '../../functions';
import ButtonIcon from '../common/ButtonIcon';
import RatingIcon from '../common/RatingIcon';
import ReviewsList from '../reviews/ReviewsList';

export default ({ route, navigation }) => {
  const { mediaToShow } = route.params;

  const [media, setMedia] = useState(mediaToShow);
  const [rating, setRating] = useState(null)
  
  useEffect(() => setMedia(mediaToShow), [mediaToShow])

  const banner = ( 
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
        <View style={styles.bottomSection}>
          <View style={styles.rating}>
            <RatingIcon rating={rating} />
          </View>
          <View style={styles.actionButtonsWrapper}>
            <View style={{ ...styles.actionButton, backgroundColor: '#3A3A3A' }}>
              <ButtonIcon 
                size={28}
                name='spotify'
                color='#1DB954'
                background='#3A3A3A'
                onPress={() => Linking.openURL(getLink(media))} />
            </View>
            <View style={{ ...styles.actionButton, backgroundColor: '#FDFDFD' }}>
              <ButtonIcon 
                size={28}
                name='music-note-plus'
                color='#9E00FF'
                background='#FDFDFD'
                onPress={() => navigation.navigate('Review', { media, create: true })} />
            </View>  
          </View>
        </View>
      </ImageBackground>
    </View>
  )

  return (
    <SafeAreaView>
      <ReviewsList 
        getReviews={getAllReviewsForOneMedia} 
        hideMedia
        listHeader={banner} 
        object={media} 
        padder
        setRating={setRating} />
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
    marginBottom: 20
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
    height: '73%',
    justifyContent: 'space-between'
  },
  image: {
    height: '70%',
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
  bottomSection: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  rating: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FDFDFD',
    height: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  actionButton: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    aspectRatio: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    aspectRatio: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E00FF',
  },
  reviewsWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})