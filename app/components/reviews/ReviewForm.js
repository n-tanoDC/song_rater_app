import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeableRating from 'react-native-swipeable-rating';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import MessageView from '../common/MessageView';

import { getCover, getFormattedArtists, getLink, showToast } from '../../functions';
import { postReview } from '../../data/reviews';

import { AppContext } from '../../contexts/AppContext';

export default ({ media, user, setReview }) => {
  const { id, type, name } = media;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const navigation = useNavigation();
  
  const { setUpdates } = useContext(AppContext);

  // get image source depending on the type of media
  const image = getCover(media)
  const link = getLink(media);
  const artists = getFormattedArtists(media.artists);
    
  const handleSubmit = () => {
    const body = { 
      title,
      content, 
      rating, 
      media: { 
        id, 
        name, 
        artists, 
        media_type: type, 
        image,
        link 
      }
    }

    if (!title && content) {
      return showToast('Veuillez saisir un titre.')
    } else if (title && !content) {
      return showToast('Veuillez saisir une critique.')
    }

    let ratingOnly = (!title || !content)

    postReview(body, user.token)
      .then(res => {
        if (res instanceof Error) {
          throw res
        }
        setReview(res)
        showToast('Critique publiée')
      })
      .then(() => {
        if (ratingOnly) {
          showToast('Note publiée')
          navigation.goBack();
        } else {
          setUpdates(true)
        }
      })
      .catch(err => showToast(err.message))
  }

  if (!user) {
    return (<MessageView message='Connectez-vous pour publier une critique.' />)
  }

  return (
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
        value={title}
        onChangeText={setTitle}
        maxLength={50} />
      <View style={styles.contentInputWrapper}>
        <CustomInput 
          placeholder='Rédiger une critique...'
          value={content}
          onChangeText={setContent}
          multiline />
      </View>
      <CustomButton 
        text='Publier' 
        disabled={!user} 
        color='#9E00FF' 
        onPress={() => handleSubmit()} />
    </View>
  )
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
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
    fontFamily: 'baloo2-semibold',
  },
  contentInputWrapper: {
    flex: 1,
    paddingBottom: 10
  }
})
