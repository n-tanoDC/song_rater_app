import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getArtists, getCover } from '../../functions';

export default ({ element, rating }) => {
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
    <View style={styles.container}>
      <View style={styles.elementContainer}>
        <Image style={styles.elementImg} source={{ uri: getCover(element) }} />
        <View style={styles.elementInfos}>
          <Text numberOfLines={1} style={styles.elementName}>{element.name}</Text>
          <Text numberOfLines={1} style={styles.artistName}>{getArtists(element.artists)}</Text>
        </View>
      </View>
      {reviewRating}
    </View>
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
  elementContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  elementImg: { 
    aspectRatio: 1,
    width: '20%',
  },
  elementInfos: { 
    justifyContent: 'space-evenly',
    marginHorizontal: 10, 
    width: '80%',
  },
  elementName: { 
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
