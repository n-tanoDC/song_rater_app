import { Input, Item, Icon, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ secure, placeholder, icon, state, multiline }) => {
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
      <Input
        multiline={multiline}
        secureTextEntry={secure}
        style={styles.input}
        value={state.value}
        onChangeText={state.callback}
        placeholder={placeholder}/>
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
    marginBottom: 50,
    overflow: "hidden",
    borderRadius: 10
  }
})