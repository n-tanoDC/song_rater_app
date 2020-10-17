import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from './CustomButton';
import UserAvatar from '../users/UserAvatar';
import ButtonIcon from './ButtonIcon';
import ContentSection from './ContentSection';

export default ({ user, element }) => {
  const navigation = useNavigation();

  const userSection = user ? 
    <View style={styles.user}>
      <Text style={styles.username}>{user.username}</Text>
      <UserAvatar user={user} small />
    </View>
    :
    <CustomButton onPress={() => navigation.navigate('User')} text='Se connecter' color='#9E00FF'/>

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <ButtonIcon name='chevron-left' color='#3A3A3A' onPress={() => navigation.goBack()}/>
        {userSection}
      </View>
      <ContentSection element={element} />
    </View>
  ) 
};

const styles = StyleSheet.create({
  headerTop: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E5E5E5'
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10
  },
  headerBottom: {
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    width: '100%'
  },
  elementInfosContainer: {
    width: '80%',
    flexDirection: 'row',
  },
  elementImageContainer: {
    marginRight: 10,
    width: '20%',
  },
  elementImage: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  elementInfos: {
    width: '80%',
    justifyContent: 'space-evenly'
  },
  artist: {
    fontSize: 14
  },
  year: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold'
  },
  elementRatingContainer: {
    width: '20%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
