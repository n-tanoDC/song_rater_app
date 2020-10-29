import React, { memo, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ContentSection from '../common/ContentSection';
import UserAvatar from '../users/UserAvatar';
import { accountDeleted, getDate, isVisiting } from '../../functions';

import { UserContext } from '../../contexts/UserContext';
import RatingIcon from '../common/RatingIcon';
import colors from '../../styles/colors';

const ReviewCard = ({ review, hideMedia }) => {
  let { title, content, media, rating, created_at, author } = review;

  const navigation = useNavigation()
  
  const { connectedUser } = useContext(UserContext);

  let userProp, onPress, mediaSection;
  
  
  if (accountDeleted(author)) {
    author = { username: 'Utilisateur supprimé'};
    userProp = null;
    onPress = null
  } else {
    if (isVisiting(connectedUser, author)) {
      userProp = author;
      onPress = () => navigation.navigate('User', { user: author })
    } else {
      userProp = connectedUser
      onPress = () => navigation.navigate('Account')
    }
  }

  if (!hideMedia) {
    mediaSection = (
      <ContentSection media={media} />
    )
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Review', { reviewToShow: review })}>
        <View style={styles.header}>
          <View style={styles.userWrapper}>
            <UserAvatar 
              small 
              user={userProp}
              onPress={onPress} />
            <View style={styles.headerText}>
              <Text numberOfLines={1} style={styles.username}>{author.username}</Text>
              <Text numberOfLines={1} style={styles.date}>{getDate(created_at)}</Text>
            </View>
          </View>
          <RatingIcon rating={rating} />
        </View>
        <View style={styles.body}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={3} style={styles.content}>{content}</Text>
        </View>
      </TouchableOpacity>
      {mediaSection}
    </View>
  )
};

export default memo(ReviewCard);

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    overflow:'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    elevation: 5,
    backgroundColor: colors.white,

  },
  header: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userWrapper: {
    flexDirection: 'row'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  headerText: {
    marginLeft: 10,
    justifyContent: 'center',
    textAlign: "left",
  },
  username: {
    fontSize: 16,
    fontFamily: 'baloo2-semibold',
  },
  date: {
    fontSize: 12,
    color: 'grey'
  },
  body: {
    padding: 15,
  },
  title: {
    fontFamily: 'baloo2-semibold',
    fontSize: 14,
    color: colors.darkgrey,
    marginBottom: 10
  },
  content: {
    fontSize: 12
  }
});