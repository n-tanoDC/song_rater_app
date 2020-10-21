import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import UserAvatar from './UserAvatar';
import ReviewsList from '../reviews/ReviewsList';
import PopMenu from '../common/PopMenu';
import CustomButton from '../common/CustomButton';

import { API_URL } from '../../config';
import { isFollowing } from '../../functions';
import { getOptions } from '../../data/helpers';

import { UserContext } from '../../contexts/UserContext';
import { getAllReviewsForOneUser } from '../../data/reviews';

export default ({ user, visit }) => {
  const { connectedUser, setConnectedUser } = useContext(UserContext);
  
  const follow = (action) => {
    fetch(API_URL + 'users/' + user.username + '/' + action, getOptions(null, connectedUser.token, 'GET'))
    .then(res => { 
      if (res.status === 200) {
        if (action === 'follow') {
          setConnectedUser({...connectedUser, following: [...connectedUser.following, user._id]})
        } else {
          const userIndex = connectedUser.following.findIndex(userId => userId === user._id)
          let updatedFollowing = connectedUser.following;
          updatedFollowing.splice(userIndex, userIndex+1);
          setConnectedUser({...connectedUser, following: updatedFollowing})
        }
      }
    })  
    .catch(err => console.log('Error :', err))
  }

  let followButton;
  
  if (connectedUser) {
    const following = isFollowing(connectedUser, user);
    const action = following ? 'unfollow' : 'follow';

    followButton = (
      <CustomButton 
        text={following ? 'Suivi' : 'Suivre'} 
        color={following ? 'green' : null} 
        onPress={() => follow(action)} />
    )
  }
  

  return (
    <>
      <View style={styles.header}>
        <UserAvatar user={user} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.description}>{user.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!visit ? <PopMenu /> : followButton}
        </View>
      </View>
      <View style={styles.content}>
        <ReviewsList object={user} getReviews={getAllReviewsForOneUser}/>
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
