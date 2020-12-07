import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../../styles/colors';

export default ({ artist, last }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Artist', { artist })}>
      <Text numberOfLine={1} style={styles.artists}>{artist.name}{last ? '' : ', '}</Text>
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
