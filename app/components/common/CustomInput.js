import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default (props) => {
  const { 
    color = '#9E00FF',
    handleSubmit,
    onPress,
    autoFocus,
    secure,
    placeholder,
    icon,
    state,
    multiline } = props;

  let iconContainer = null;

  if (icon) {
    iconContainer = (
    <TouchableOpacity 
      onPress={onPress ? () => onPress() : null}
      style={{...styles.iconContainer, backgroundColor: color}}>
      <Icon color='#FDFDFD' name={icon} size={28}/>
    </TouchableOpacity>
    )
  }

  const containerStyle = multiline ? { ...styles.inputContainer, flex: 1, minHeight: 100, } : styles.inputContainer;
  const inputStyle = multiline ? { ...styles.input, textAlignVertical: 'top' } : styles.input;

  return (
    <View style={containerStyle}>
      <TextInput
        onSubmitEditing={handleSubmit ? () => handleSubmit() : null}
        numberOfLines={multiline ? 5 : 1}
        autoFocus={autoFocus}
        multiline={multiline}
        secureTextEntry={secure}
        style={inputStyle}
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
    padding: 10,
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