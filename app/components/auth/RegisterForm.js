import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/buttons/CustomButton';
import CustomTooltip from '../common/CustomTooltip';

import { register } from '../../functions/user'
import { formValidator, showToast } from '../../functions/helpers';
import { catchErrors } from '../../functions/errors';
import colors from '../../styles/colors';

import { UserContext } from '../../contexts/UserContext';

export default ({ styles }) => {
  const [username, setUsername] = useState('Nicolas');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password22');
  const [passwordConf, setPasswordConf] = useState('')
  const [data, setData] = useState({})
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  
  const { setConnectedUser } = useContext(UserContext)

  useEffect(() => setData({ username, password, email }), [username, email, password, passwordConf])

  const handleSubmit = () => {
    const { error } = formValidator(data);

    if (error) {
      return showToast(error);
    }

    register(data)
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

      <CustomTooltip
        type='username'
        setVisibleTooltip={setVisibleTooltip}
        visibleTooltip={visibleTooltip}>
        <CustomInput
          label="Nom d'utilisateur"
          icon='account'
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          onPress={() => setVisibleTooltip('username')} />
      </CustomTooltip>

      <CustomInput 
        label='Adresse email'
        icon='email'
        placeholder="Email"
        value={email}
        onChangeText={setEmail} />

      <CustomTooltip
        type='password'
        setVisibleTooltip={setVisibleTooltip}
        placement='bottom'
        visibleTooltip={visibleTooltip}>
        <CustomInput
          label='Mot de passe' 
          icon='lock'
          placeholder="Mot de passe"
          secure
          value={password}
          onChangeText={setPassword}
          onPress={() => setVisibleTooltip('password')} />   
      </CustomTooltip>
      
      <CustomInput 
        label='Confirmer le mot de passe'
        icon='lock-check'
        secure
        placeholder="Confirmer le mot de passe"
        value={passwordConf}
        onChangeText={setPasswordConf} />

      <View style={styles.buttonWrapper}>
        <CustomButton 
          backgroundColor={colors.secondary}
          onPress={handleSubmit}
          text='Créer un compte' />
      </View>

    </View>
  )
};