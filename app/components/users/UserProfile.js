import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ReviewsList from '../reviews/ReviewsList';
import CustomButton from '../common/CustomButton';
import UserAvatar from './UserAvatar';
import { logout } from '../../data/user';

import { UserContext } from '../../App';

export default ({ user, visit }) => {
  let logoutButton;

  if (!visit) {
    const { setUser } = useContext(UserContext)
    logoutButton = (<CustomButton onPress={() => logout(setUser)} text='Se déconnecter' />)
  }

  return (
    <>
      <View style={styles.header}>
        <UserAvatar user={user} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.description}>{user.description}</Text>
          <View style={styles.buttonContainer}>
            {logoutButton}
          </View>
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
    height: '15%',
    flexDirection: 'row',
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
  buttonContainer: {
    position: "absolute",
    right: 0,
    top: 0
  }
})
