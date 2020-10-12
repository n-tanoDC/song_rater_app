import { Form, Toast } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { UserContext } from '../../App';
import { login, register } from '../../data/user'

export default ({ action }) => {
  const [username, setUsername] = useState('test');
  const [email, setEmail] = useState('nicolas@mail.com');
  const [password, setPassword] = useState('password');
  const [passwordConf, setPasswordConf] = useState('Password')
  const [data, setData] = useState({})
  
  const isLogin = action === 'login';
  const { setUser } = useContext(UserContext)

  useEffect(() => { 
    isLogin? setData({ username, password }) : setData({ username, password, email })
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
      isLogin? login(setUser, data) : register(setUser, data);
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
    <Form>
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
    </Form>
  )
};