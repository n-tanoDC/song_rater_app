import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import CustomSegment from '../common/CustomSegment';

import { login, register } from '../../data/user'
import { showToast } from '../../functions';

import { UserContext } from '../../contexts/UserContext';

export default () => {
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password22');
  const [passwordConf, setPasswordConf] = useState('')

  const [data, setData] = useState({})
  const [selected, setSelected] = useState(0);
  const isLogin = !selected;
  
  const { setConnectedUser } = useContext(UserContext)

  useEffect(() => { 
    isLogin ? setData({ username, password }) : setData({ username, password, email })
  }, [username, email, password, passwordConf])
  

  const formValidator = () => {
    for (let item of Object.values(data)) {
      if (item === '') {
        return { valid: false, message: 'Veuillez remplir tous les champs.'}
      }
    }

    if (passwordConf !== password && !isLogin) {
      return { valid: false, message: 'Les mots de passes ne sont pas identiques.'}
    }

    return { valid: true };
  }

  
  const handleSubmit = () => {
    const { valid, message } = formValidator()
    if (valid) {
      const authFunction = isLogin ? login : register;
      authFunction(data)
        .then(res => {
          if (res instanceof Error) {
            throw res
          }
          const { user, token } = res;
          setConnectedUser({ ...user, token })
        })
        .catch(err => showToast(err.message))
    } else {
      showToast(message);
    }
  }

  let emailInput, passwordConfInput;

  if (!isLogin) {
    emailInput = (
      <CustomInput 
        label='Adresse email'
        icon='email'
        placeholder="Email"
        value={email}
        onChangeText={setEmail} />)
    passwordConfInput = (
      <CustomInput 
        label='Confirmer le mot de passe'
        icon='lock-check'
        secure
        placeholder="Confirmer le mot de passe"
        value={passwordConf}
        onChangeText={setPasswordConf} />)
  }

  return (    
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        <CustomSegment data={['Se connecter', 'Créer un compte']} index={selected} callback={setSelected} />
      </View>
      <View style={styles.form}>
        <CustomInput
          label="Nom d'utilisateur"
          icon='account'
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername} />
        {emailInput}
        <CustomInput
          label='Mot de passe' 
          icon='lock'
          placeholder="Mot de passe"
          secure
          value={password}
          onChangeText={setPassword} />
        {passwordConfInput}
        <View style={styles.buttonWrapper}>
          <CustomButton
            color='#FFB906'
            onPress={handleSubmit}
            text={isLogin ? 'Se connecter' : 'Créer un compte'} />
        </View>
      </View>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  segmentContainer: {
    paddingBottom: 20,
  },
  form: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginVertical: 20
  }
})