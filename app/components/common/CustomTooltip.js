import React from 'react';
import { Text } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

export default (props) => {
  const { 
    children, 
    placement = 'center',
    type, 
    visibleTooltip, 
    setVisibleTooltip } = props;
  let content;

  switch (type) {
    case 'username':
      content = 'Entre 3 et 20 caractères. Pas de caractères spéciaux sauf "." et "_". Pas de caractères spéciaux au début ou à la fin.';
      break;
    case 'password':
      content = 'Minimum 8 caractères dont un en majuscule, un en minuscule et un chiffre.';
      break;
    default:
      content = '';
  }

  return (
    <Tooltip
      isVisible={visibleTooltip === type}
      showChildInTooltip={false}
      placement={placement}
      content={<Text>{content}</Text>}
      onClose={() => setVisibleTooltip(null)}>
      {children}
    </Tooltip>
  )
};
