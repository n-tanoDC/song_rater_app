import React, { memo, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ContentSection from '../common/ContentSection';
import UserAvatar from '../users/UserAvatar';
import { isVisiting } from '../../functions';

import { UserContext } from '../../App';

const ReviewCard = ({ showUser, review }) => {
  const { title, content, element, rating, created_at, author } = review;

  const { user } = useContext(UserContext);
  const navigation = useNavigation()

  let userProp, onPress;
  
  if (isVisiting(user, author)) {
    userProp = author;
    onPress = () => navigation.navigate('User', { user: author })
  } else {
    userProp = user
    onPress = () => navigation.navigate('Account')
  }

  let avatar;
  
  if (showUser) {
    avatar = (
      <UserAvatar 
        small 
        user={userProp}
        onPress={onPress} />
    )
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Review', { reviewToShow: review } )} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>"{title}"</Text>
          <Text style={styles.date}>{created_at}</Text>
        </View>
        {avatar}
      </View>
      {content ? 
      (<View>
          <Text numberOfLines={2} style={styles.body}>{content}</Text>
      </View>) : null}
      <ContentSection element={element} rating={rating} />
    </TouchableOpacity>
  )
};

export default memo(ReviewCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    overflow:'hidden',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#FDFDFD',

  },
  header: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  headerText: {
    flex: 4,
    justifyContent: 'center',
    textAlign: "left",
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'grey'
  },
  body: {
    fontSize: 14,
    padding: 10
  }
})
