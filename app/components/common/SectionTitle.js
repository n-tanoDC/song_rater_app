import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default ({ text }) => {
  return (
    <Text style={styles.sectionTitle}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    marginVertical: 20,
    fontFamily: 'baloo2-semibold',
    color: colors.darkgrey,
  }
})
