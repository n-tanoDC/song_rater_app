import React, { useContext } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import UserAvatar from './UserAvatar';
import ReviewsList from '../reviews/ReviewsList';
import PopMenu from '../common/PopMenu';
import CustomButton from '../common/CustomButton';

import { API_URL } from '../../config';
import { isFollowing } from '../../functions';
import { getOptions } from '../../data/helpers';

import { UserContext } from '../../contexts/UserContext';
import { getAllReviewsForOneUser } from '../../data/reviews';
import colors from '../../styles/colors';

export default ({ user, visit }) => {
  const { connectedUser, setConnectedUser } = useContext(UserContext);
  
  const follow = (action) => {
    fetch(API_URL + 'users/' + user.username + '/' + action, getOptions(null, connectedUser.token, 'GET'))
    .then(res => { 
      if (res.status === 200) {
        if (action === 'follow') {
          const updatedFollowing = connectedUser.following;
          updatedFollowing.push(user._id)
          setConnectedUser({...connectedUser, following: updatedFollowing})
        } else {
          const index = connectedUser.following.findIndex(userId => userId === user._id)
          const updatedFollowing = connectedUser.following;
          updatedFollowing.splice(index, 1);
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
        <ImageBackground
          blurRadius={20}
          style={styles.headerBackground}
          source={{ uri: API_URL + 'uploads/' + user.avatar }}>
        <UserAvatar user={user} />
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.buttonContainer}>
          {!visit ? <PopMenu /> : followButton}
        </View>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <ReviewsList padder object={user} getReviews={getAllReviewsForOneUser}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: '30%',
  },
  headerBackground: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    marginTop: 10,
    fontFamily: 'baloo2-semibold',
    fontSize: 18,
    color: colors.white,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  content: {},
})
