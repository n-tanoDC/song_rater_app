import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../styles/colors';

export default (props) => {
  const {
    disabled,
    autoFocus,
    color = colors.primary,
    handleSubmit,
    icon,
    label,
    maxLength,
    minLength,
    multiline,
    numberOfLines,
    onChangeText,
    onPress,
    placeholder,
    secure,
    value, } = props;

  let iconContainer, labelContainer;

  if (label) {
    labelContainer = (
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }

  if (icon) {
    iconContainer = (
    <TouchableOpacity 
      onPress={onPress ? () => onPress() : null}
      style={{...styles.iconContainer, backgroundColor: color}}>
      <Icon color={colors.white} name={icon} size={28}/>
    </TouchableOpacity>
    )
  }

  const containerStyle = multiline && !numberOfLines ? { ...styles.inputContainer, marginVertical: 0, minHeight: '100%' } : styles.inputContainer;
  const inputStyle = multiline && !numberOfLines ? { ...styles.input, textAlignVertical: 'top' } : styles.input;

  return (
    <View>
      {labelContainer}
      <View style={containerStyle}>
        <TextInput
          autoFocus={autoFocus}
          editable={!disabled}
          maxLength={maxLength}
          minLength={minLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit ? () => handleSubmit() : null}
          placeholder={placeholder}
          secureTextEntry={secure}
          style={inputStyle}
          value={value}
            
          />
        {iconContainer}
      </View>
    </View>
  )  
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#E9E9E9',
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: "hidden",
  },
  input: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  label: {
    fontSize: 12,
    fontFamily: 'baloo2-semibold'
  }
})