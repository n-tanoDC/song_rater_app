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
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderTopWidth: 1, 
    borderColor: '#F4F4F4',
    backgroundColor: '#FDFDFD',
  },
  elementContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  elementImg: { 
    width: '20%',
    aspectRatio: 1
  },
  elementInfos: { 
    width: '80%',
    marginHorizontal: 10, 
    justifyContent: 'space-evenly'
  },
  elementName: { 
    fontSize: 14, 
    fontWeight: 'bold',
  },
  artistName: { 
    fontSize: 12,
    color: '#A0A0A0'
  },
  ratingContainer: {
    padding: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'flex-end',
  },
  ratingText: {
    fontSize: 16, 
    fontWeight: "bold",
  },
})
