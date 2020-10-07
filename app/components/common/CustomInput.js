import { Input, Item, Icon, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ placeholder, icon, state }) => {
  let iconContainer = null;
  if (icon) {
    iconContainer = (
    <View style={styles.iconContainer}>
      <Icon style={styles.icon} name={icon} />
    </View>
    )
  }

  return (
    <Item regular style={styles.inputContainer}>
      <Input style={styles.input} value={state.value} onChangeText={state.callback} placeholder={placeholder}/>
      {iconContainer}
    </Item>
  )
  
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#9E00FF',
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: '#FDFDFD'
  }, 
  inputContainer: {
    paddingLeft: 10,
    marginBottom: 30,
    overflow: "hidden",
    borderRadius: 10
  }
})