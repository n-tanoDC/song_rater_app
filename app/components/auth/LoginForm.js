import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/buttons/CustomButton';

import { login } from '../../functions/user'
import { formValidator, showToast } from '../../functions/helpers';
import { catchErrors } from '../../functions/errors';

import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';
import { STORAGE_KEY } from '../../config.local';

export default ({ styles }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const [data, setData] = useState({})
  
  const { setConnectedUser } = useContext(UserContext)

  useEffect(() => setData({ username, password }), [username, password])

  const saveUserData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    const { error } = formValidator(data);

    if (error) {
      return showToast(error);
    }

    login(data)
      .then(res => {
        if (res) {
          const { user, token } = res;
          if (rememberUser) {
            saveUserData(data)
          }
          setConnectedUser({ ...user, token })
        }
      })
      .catch(catchErrors)
  }

  return (    
      <View style={styles.form}>
        <CustomInput
          label="Nom d'utilisateur"
          icon='account'
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername} />
        <CustomInput
          label='Mot de passe' 
          icon='lock'
          placeholder="Mot de passe"
          secure
          value={password}
          onChangeText={setPassword} />
        <TouchableWithoutFeedback
          onPress={() => setRememberUser(!rememberUser)}>
          <View  style={styles.checkboxWrapper}>
            <CheckBox
              value={rememberUser}
              onValueChange={newValue => setRememberUser(newValue)}
              tintColors={{ true: colors.green, false: colors.grey }}
            />
            <Text style={styles.checkboxLabel}>Rester connecté</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonWrapper}>
          <CustomButton 
            backgroundColor={colors.secondary}
            onPress={handleSubmit}
            text='Se connecter' />
        </View>
      </View>
  )
};