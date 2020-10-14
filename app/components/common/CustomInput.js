import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from 'native-base';

export default (props) => {
  const { 
    color = '#9E00FF',
    handleSubmit,
    autoFocus,
    secure,
    placeholder,
    icon,
    state,
    multiline } = props;

  let iconContainer = null;

  if (icon) {
    iconContainer = (
    <View style={{...styles.iconContainer, backgroundColor: color}}>
      <Icon style={styles.icon} type='MaterialCommunityIcons' name={icon} />
    </View>
    )
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onSubmitEditing={handleSubmit ? () => handleSubmit() : null}
        autoFocus={autoFocus}
        multiline={multiline}
        secureTextEntry={secure}
        style={styles.input}
        value={state.value}
        onChangeText={state.callback}
        placeholder={placeholder}/>
      {iconContainer}
    </View>
  )
  
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9'
  },
  input: {
    backgroundColor: '#FDFDFD',
    paddingLeft: 10,
    flex: 1
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: '#FDFDFD'
  }, 
})