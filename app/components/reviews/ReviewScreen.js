import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ReviewHeader from './ReviewHeader';

import { accountDeleted } from '../../functions/helpers';
import { Container } from '../common/Layout';

export default ({ route }) => {
  const { review } = route.params;
    
  const userProp = accountDeleted(review.author) ? { username: 'Utilisateur supprimé' } : review.author;
  
  return (
    <Container>
      <ReviewHeader 
        user={userProp} 
        rating={review ? review.rating : null} 
        media={review ? review.media : media} />
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>{review.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{review.rating}/10</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{review.content}</Text>
        </View>
      </ScrollView>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
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
