import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeableRating from 'react-native-swipeable-rating';

import { Container } from '../common/Layout';
import CustomButton from '../common/buttons/CustomButton';
import CustomInput from '../common/CustomInput';
import MessageView from '../common/MessageView';
import ReviewHeader from './ReviewHeader';

import { showToast, getMediaData } from '../../functions/helpers';
import { catchErrors } from '../../functions/errors';
import { postReview } from '../../functions/reviews';

import { AppContext } from '../../contexts/AppContext';
import { UserContext } from '../../contexts/UserContext';

export default ({ route }) => {

  const { media } = route.params;

  const { setUpdates } = useContext(AppContext);
  const { connectedUser } = useContext(UserContext)

  // Show a message and hide the form if the user is not connected
  if (!connectedUser) {
    return (<MessageView message='Connectez-vous pour publier une critique.' />)
  }
  
  // State variables to control inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const navigation = useNavigation();
  
  const handleSubmit = () => {
    //create the body of the request
    const body = { 
      title,
      content, 
      rating, 
      media: getMediaData(media),
    }

    // If the user writes a title or a content, he has to write both
    if (!title && content) {
      return showToast('Veuillez saisir un titre.')
    } else if (title && !content) {
      return showToast('Veuillez saisir une critique.')
    }

    // Check if the user is only rating the media
    let ratingOnly = (!title || !content)

    // Call POST function, passing the body and the user token
    postReview(body, connectedUser.token)
      .then(res => {
        if (res) {
          const message = ratingOnly ? 'Note publiée' : 'Critique publiée';
          showToast(message)
          setUpdates(!ratingOnly)
          navigation.goBack();
        }
      })
      .catch(catchErrors)
  }

  return (
    <Container>
      <ReviewHeader
        user={connectedUser} 
        media={media} />
      <View style={styles.form}>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingDisplay}>
            <Text style={styles.ratingText}>{rating}/10</Text>
          </View>
          <SwipeableRating
            color={colors.secondary}
            emptyColor={colors.secondary}
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
          minLength={5}
          maxLength={70} />
        <View style={styles.contentInputWrapper}>
          <CustomInput 
            placeholder='Rédiger une critique...'
            value={content}
            onChangeText={setContent}
            multiline
            minLength={10}
            maxLength={5000} />
        </View>
        <View style={styles.submitButtonWrapper}>
          <CustomButton 
            text='Publier'
            onPress ={() => handleSubmit()} />
        </View>
      </View>
    </Container>
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
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  ratingText: {
    color: colors.white,
    fontFamily: 'baloo2-semibold',
  },
  contentInputWrapper: {
    flex: 1,
    paddingBottom: 10
  },
  submitButtonWrapper: {
    alignSelf: 'flex-end'
  }
})
