import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../styles/colors';

export default ({ artist, last }) => {
  const navigation = useNavigation();

  return (
      <Text 
        onPress={() => navigation.push('Artist', { artist })}
        style={styles.artists}>
        {artist.name}{last ? '' : ', '}
      </Text>
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
