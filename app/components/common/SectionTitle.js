import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default ({ text }) => {
  return (
    <Text style={styles.sectionTitle}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    marginVertical: 15,
    fontFamily: 'baloo2-semibold',
    color: colors.darkgrey,
  }
})
