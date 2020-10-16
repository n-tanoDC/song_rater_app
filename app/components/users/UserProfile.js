import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import ButtonIcon from '../common/ButtonIcon';
import CustomSegment from '../common/CustomSegment';
import ReviewsList from '../reviews/ReviewsList';
import UserAvatar from '../common/UserAvatar';
import Loader from '../common/Loader';

import { logout } from '../../data/user'

import { UserContext } from '../../App';

export default ({ user }) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(0);

  useEffect(() => setLoading(!isFocused), [isFocused])
  
  const userContext = useContext(UserContext);
  
  if (loading) {
    return (<Loader />)
  }

  const button = user === userContext.user ?
    <ButtonIcon onPress={() => logout(userContext.setUser)} name='dots-horizontal' color='#3A3A3A' /> : null
  
  return (
    <>
      <View style={styles.header}>
        <UserAvatar user={user} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.description}>{user.description}</Text>
          <View style={styles.buttonContainer}>
            {button}
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <CustomSegment data={['Critiques', 'Favoris']} state={{ selected, setSelected }}/>
        {!selected ? 
          <ReviewsList user={user}/> : 
          <FavsList user={user} navigation={navigation} />}
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
