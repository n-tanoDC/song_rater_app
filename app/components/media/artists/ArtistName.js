import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../styles/colors';
import TextTicker from 'react-native-text-ticker';

export default ({ artist, last, scroll }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Artist', { artist })}>
      {scroll ? 
        <TextTicker bounce scrollSpeed={250} scroll={false} style={styles.artists}>{artist.name}{last ? '' : ', '}</TextTicker> : 
        <Text numberOfLines={1} style={styles.artists}>{artist.name}{last ? '' : ', '}</Text>}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  artists: {
    color: colors.white,
    textShadowColor: colors.darkgrey,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
})
