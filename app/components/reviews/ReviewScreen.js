import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ReviewHeader from './ReviewHeader';
import VotingSection from './VotingSection';
import CustomButton from '../common/buttons/CustomButton';
import { Container, ScrollingContent } from '../common/Layout';

import { API_URL } from '../../config.local';
import { accountDeleted, confirmDelete, getOptions, showToast } from '../../functions/helpers';
import { catchErrors } from '../../functions/errors';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';

export default ({ route }) => {
  const { review, setReview } = route.params
  const { connectedUser } = useContext(UserContext)
  const { setUpdates } = useContext(AppContext)

  const navigation = useNavigation()
    
  const userProp = accountDeleted(review.author) ? { username: 'Utilisateur supprimé' } : review.author;

  const deleteReview = (id) => {
    fetch(API_URL + 'reviews/delete/' + id, getOptions(null, connectedUser.token, 'GET'))
      .then(res => {
        if (res.status === 204) {
          showToast('Critique supprimée.')
          setUpdates(true)
          navigation.pop()
        }
      })
      .catch(catchErrors)
  }

  const handleDelete = () => {
    confirmDelete(() => deleteReview(review._id))
  }

  return (
    <Container>
      <ReviewHeader 
        user={userProp} 
        rating={review ? review.rating : null} 
        media={review ? review.media : media} />
      <ScrollingContent>
        <View style={styles.subHeader}>
          <VotingSection review={review} setReview={setReview} />
          {connectedUser._id === review.author._id ? 
            <CustomButton 
              text='Supprimer' 
              icon='trash-can' 
              backgroundColor={colors.red} 
              onPress={() => handleDelete()} /> : null} 
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>{review.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{review.rating}/10</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{review.content}</Text>
        </View>
      </ScrollingContent>
    </Container>
  )
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F9F9F9',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'baloo2-semibold',
    width: '75%',
    paddingVertical: 5,
  },
  ratingContainer: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '20%',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'baloo2-semibold',
    color: colors.white
  },
  contentContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#F9F9F9'
  },
  content: {
    textAlign: 'justify'
  }
})
