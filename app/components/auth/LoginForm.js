import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

import { login } from '../../data/user'
import { formValidator, showToast } from '../../functions';
import { catchErrors } from '../../data/errors';

import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ styles }) => {
  const [username, setUsername] = useState('Nicolas');
  const [password, setPassword] = useState('Password22');

  const [data, setData] = useState({})
  
  const { setConnectedUser } = useContext(UserContext)

  useEffect(() => setData({ username, password }), [username, password])

  const handleSubmit = () => {
    const { error } = formValidator(data);

    if (error) {
      return showToast(error);
    }

    login(data)
      .then(res => {
        if (res) {
          const { user, token } = res;
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
        <View style={styles.buttonWrapper}>
          <CustomButton 
            backgroundColor={colors.secondary}
            onPress={handleSubmit}
            text='Se connecter' />
        </View>
      </View>
  )
};