import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

export default ({ text, icon, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{text}</Text>
      {icon ? (
        <TouchableOpacity onPress={onPress}>
          <Icon name={icon} color={colors.darkgrey} size={22} />
        </TouchableOpacity>) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'baloo2-semibold',
    color: colors.darkgrey,
  }
})
