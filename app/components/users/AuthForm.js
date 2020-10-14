import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Toast } from 'native-base';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import CustomSegment from '../common/CustomSegment';

import { UserContext } from '../../App';
import { login, register } from '../../data/user'

export default () => {
  const [username, setUsername] = useState('test');
  const [email, setEmail] = useState('nicolas@mail.com');
  const [password, setPassword] = useState('password');
  const [passwordConf, setPasswordConf] = useState('Password')
  const [data, setData] = useState({})
  const [selected, setSelected] = useState(0);
  const isLogin = !selected;
  
  const { setUser } = useContext(UserContext)

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
      isLogin ? login(setUser, data) : register(setUser, data);
    } else {
      Toast.show({ text: message, type: 'warning' })
    }
  }

  const emailInput = !isLogin ?
    <CustomInput 
      icon='mail-outline'
      placeholder="Email"
      state={{ value: email, callback: setEmail }} /> : null

  const passwordConfInput = !isLogin ?
    <CustomInput 
      icon='checkmark'
      secure
      placeholder="Confirmer le mot de passe"
      state={{ value: passwordConf, callback: setPasswordConf }} /> : null

  return (    
    <View style={styles.contentContainer}>
      <View style={styles.segmentContainer}>
        <CustomSegment data={['Se connecter', 'Créer un compte']} state={{ selected, setSelected }}/>
      </View>
      <View style={styles.form}>
        <CustomInput
          icon='person-circle-outline'
          placeholder="Nom d'utilisateur"
          state={{ value: username, callback: setUsername }} />
        {emailInput}
        <CustomInput 
          icon='lock-closed-outline'
          placeholder="Mot de passe"
          secure
          state={{ value: password, callback: setPassword }} />
        {passwordConfInput}
        <CustomButton
          color='#FFB906'
          onPress={handleSubmit}
          text={isLogin ? 'Se connecter' : 'Créer un compte'} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    padding: 10,
  },
  segmentContainer: {
    height: '10%'
  },
  form: {
    justifyContent: 'center',
    height: '90%' 
  }
})