import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SwipeableRating from 'react-native-swipeable-rating';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import MessageView from '../common/MessageView';

import { getFormattedArtists, showToast } from '../../functions';
import { postReview } from '../../data/reviews';
import { AppContext } from '../../AppContext';

export default ({ element, user, setReview }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const { setUpdates } = useContext(AppContext);

  const { id, type, name } = element;
  const image = type === 'track' ? element.album.images[0].url : element.images[0].url;
  const artists = getFormattedArtists(element.artists);
    
  const handleSubmit = () => {
    const body = { 
      title, 
      content, 
      rating, 
      element: { id, element_type: type, name, artists, image }
    }
    postReview(body, user.token)
      .then(res => {
        if (res instanceof Error) {
          throw res
        }
        setReview(res)
        showToast('Publication réussie.')
      })
      .then(() => setUpdates(true))
      .catch(err => showToast(err.message))
  }

  console.log(user);

  return !user ? (<MessageView message='Connectez-vous pour publier une critique.' />) : (
    <View style={styles.form}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingDisplay}>
          <Text style={styles.ratingText}>{rating}/10</Text>
        </View>
        <SwipeableRating
          color='#FFB906'
          emptyColor='#FFB906'
          style={styles.rating}
          rating={rating}
          minRating={1}
          maxRating={10}
          size={24}
          onPress={input => setRating(input)}
        />
      </View>
      <CustomInput 
        placeholder='Titre'
        state={{ value: title, callback: setTitle }} />
      <CustomInput 
        placeholder='Rédiger une critique...'
        state={{ value: content, callback: setContent }}
        multiline
        />
      <CustomButton text='Publier' disabled={!user} color='#9E00FF' onPress={() => handleSubmit()} />
    </View>
  )
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flex: 1
  },
  ratingContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rating: {
    justifyContent: 'center',
    flex: 0
  },
  ratingDisplay: {
    backgroundColor: '#FFB906',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  ratingText: {
    color: '#FDFDFD',
    fontWeight: 'bold',
  }
})
