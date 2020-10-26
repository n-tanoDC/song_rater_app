import {
  setCustomTextInput,
  setCustomText,
} from 'react-native-global-props';
 
const customTextProps = {
  style: {
    fontFamily: 'baloo2-regular'
  }
};

setCustomTextInput(customTextProps);
setCustomText(customTextProps);
