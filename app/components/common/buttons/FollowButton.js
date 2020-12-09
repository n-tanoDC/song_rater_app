import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from './CustomButton';

import { updateFollow } from '../../../functions/user';
import { isFollowing } from '../../../functions/helpers';
import { catchErrors } from '../../../functions/errors';

import colors from '../../../styles/colors';

import { UserContext } from '../../../contexts/UserContext';
import { AppContext } from '../../../contexts/AppContext';

export default ({ user }) => {
  const { connectedUser, setConnectedUser } = useContext(UserContext);
  const { setUpdates } = useContext(AppContext)

  const handlePress = (action) => {
    updateFollow(action, user.username, connectedUser.token)
      .then(res => {
        if (res instanceof Error) {
          throw res
        } 
        setConnectedUser({ ...connectedUser, ...res.updatedUser })
        setUpdates(true)
      })
      .catch(catchErrors)
  }

  let action, text, color;
  
      if (isFollowing(connectedUser, user)) {
        action = 'unfollow';
        text = 'Suivi';
        color = colors.green;
      } else {
        action = 'follow';
        text = 'Suivre';
        color = colors.secondary;
      }
   
  return (
    <View style={[styles.buttonWrapper, { backgroundColor: color }]}>
      <CustomButton 
        text={text} 
        transparent
        onPress={() => handlePress(action)} />
    </View>
  )
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});
