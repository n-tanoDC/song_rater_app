import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getArtists, getCover } from '../../functions';

export default ({ media, rating }) => {
  const navigation = useNavigation();

  let reviewRating = null;

  if (rating) {
    reviewRating = (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating} </Text>
        <Icon name='star' color='#FFB906' size={20} /> 
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Media', { mediaToShow: media })} style={styles.container}>
      <View style={styles.mediaContainer}>
        <Image style={styles.mediaImg} source={{ uri: getCover(media) }} />
        <View style={styles.mediaInfos}>
          <Text numberOfLines={1} style={styles.mediaName}>{media.name}</Text>
          <Text numberOfLines={1} style={styles.artistName}>{getArtists(media)}</Text>
        </View>
      </View>
      {reviewRating}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#FDFDFD',
    borderColor: '#F4F4F4',
    borderTopWidth: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  mediaContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  mediaImg: { 
    aspectRatio: 1,
    width: '20%',
  },
  mediaInfos: { 
    justifyContent: 'space-evenly',
    marginHorizontal: 10, 
    width: '80%',
  },
  mediaName: { 
    fontSize: 14, 
    fontWeight: 'bold',
  },
  artistName: { 
    color: '#A0A0A0',
    fontSize: 12,
  },
  ratingContainer: {
    alignItems: "center", 
    flexDirection: "row", 
    justifyContent: 'flex-end',
    padding: 10,
  },
  ratingText: {
    fontSize: 16, 
    fontWeight: "bold",
  },
})
