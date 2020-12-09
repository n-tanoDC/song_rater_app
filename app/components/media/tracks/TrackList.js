import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getCover } from '../../../functions/helpers';
import colors from '../../../styles/colors';

const TrackListItem = ({ track }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push('Media', { media: track })} style={styles.trackListItem}>
      <Image source={{ uri: getCover(track) }} style={styles.trackImage} />
      <Text style={styles.trackName}>{track.name}</Text>
    </TouchableOpacity>
  )
}

export default ({ tracks }) => {
  const jsxTracks = tracks.map((track) => <TrackListItem key={track.id} track={track}/>)
  return (
    <View>
      {jsxTracks}
    </View>
  )
}

const styles = StyleSheet.create({
  trackListItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.lightgrey,
    flexDirection: 'row',
    width: '100%',
  },
  trackImage: {
    aspectRatio: 1,
    width: 50,
  },
  trackName: {
    color: colors.darkgrey,
    marginLeft: 10,
  },
})
