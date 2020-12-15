import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getArtists, getCover } from '../../../functions/helpers';
import colors from '../../../styles/colors';

const TrackListItem = ({ track, showArtist }) => {
  const navigation = useNavigation();
  const artist = showArtist ? <Text style={styles.artists}>{getArtists(track.artists)}</Text> : null;
  return (
    <TouchableOpacity onPress={() => navigation.push('Media', { media: track })} style={styles.trackListItem}>
      <Image source={{ uri: getCover(track) }} style={styles.trackImage} />
      <View>
        <Text style={styles.trackName}>{track.name}</Text>
        {artist}
      </View>
    </TouchableOpacity>
  )
}

export default ({ tracks, showArtist }) => {
  const jsxTracks = tracks.map((track) => <TrackListItem key={track.id} showArtist={showArtist} track={track}/>)
  return jsxTracks
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
    width: 60,
    marginRight: 10,
  },
  trackName: {
    fontFamily: 'baloo2-semibold',
    color: colors.darkgrey,
    fontSize: 16
  },
  artists: {
    color: colors.darkgrey,
    fontSize: 14,
  }
})
