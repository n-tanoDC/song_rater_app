import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ReviewsList from '../reviews/ReviewsList';
import UserAvatar from './UserAvatar';
import PopMenu from '../common/PopMenu';
import CustomButton from '../common/CustomButton';
import { AppContext } from '../../AppContext';
import { isFollowing } from '../../functions';
import { API_URL } from '../../config';
import { getOptions } from '../../data/helpers';

export default ({ user, visit }) => {
  const currentUser = useContext(AppContext).user;
  const setCurrentUser = useContext(AppContext).setUser;
  let followButton;

  const follow = (action) => {
    fetch(API_URL + 'users/' + user.username + '/' + action, getOptions(null, currentUser.token, 'GET'))
      .then(res => { 
        if (res.status === 200) {
          if (action === 'follow') {
            setCurrentUser({...currentUser, following: [...currentUser.following, user._id]})
          } else {
            const userIndex = currentUser.following.findIndex(userId => userId === user._id)
            let updatedFollowing = currentUser.following;
            updatedFollowing.splice(userIndex, userIndex+1);
            setCurrentUser({...currentUser, following: updatedFollowing})
          }
        }
      })  
      .catch(err => console.log('Error :', err))
  }

  if (currentUser) {
    const following = isFollowing(currentUser, user);
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
