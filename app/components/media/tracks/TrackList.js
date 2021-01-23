import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CollapsibleList from 'react-native-collapsible-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SpotifyButton } from '../../common/buttons/Buttons';

import { getArtists, getCover, getLink } from '../../../functions/helpers';

import colors from '../../../styles/colors';

const TrackListItem = ({ track, showArtist }) => {
  const navigation = useNavigation();
  const artist = showArtist ? <Text style={styles.artists}>{getArtists(track.artists)}</Text> : null;
  return (
    <TouchableOpacity onPress={() => navigation.push('Media', { media: track })} style={styles.trackListItem}>
      <Image source={{ uri: getCover(track) }} style={styles.trackImage} />
      <View style={styles.trackNameContainer}>
        <Text numberOfLines={1} style={styles.trackName}>{track.name}</Text>
        {artist}
      </View>
      <SpotifyButton link={getLink(track)} />
    </TouchableOpacity>
  )
}

export default ({ tracks, showArtist }) => {
  const jsxTracks = tracks.map((track) => <TrackListItem key={track.id} showArtist={showArtist} track={track}/>)
  const [buttonIcon, setButtonIcon] = useState('chevron-down')

  const button = (
    <View style={styles.buttonContainer}>
      <Icon color={colors.darkgrey} name={buttonIcon} size={24} />
    </View>
  )
  return (
    <CollapsibleList
      numberOfVisibleItems={3}
      buttonContent={button}
      onToggle={(collapsed) => setButtonIcon(collapsed ? 'chevron-up' : 'chevron-down')}>
      {jsxTracks}
    </CollapsibleList>
  )     
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 5
  },
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
  trackNameContainer: {
    flex: 1
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
