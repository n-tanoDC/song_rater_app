import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ReviewsList from '../reviews/ReviewsList';
import UserAvatar from './UserAvatar';
import PopMenu from '../common/PopMenu';

export default ({ user, visit }) => {
  return (
    <>
      <View style={styles.header}>
        <UserAvatar user={user} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.description}>{user.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!visit ? <PopMenu /> : null}
        </View>
      </View>
      <View style={styles.content}>
        <ReviewsList user={user}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    height: '85%'
  },
  imageContainer: {
    justifyContent: 'center'
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    aspectRatio: 1
  }, 
  textContainer: {
    justifyContent: 'space-evenly',
    flex: 5,
    paddingHorizontal: 10
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
})
