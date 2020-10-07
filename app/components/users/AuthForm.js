import { Form } from 'native-base';
import React, { useState } from 'react';
import { authenticate } from '../../data/user';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

export default ({ userContext, action }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = action === 'login';

  const login = () => {
    authenticate({username, password}, 'login')
      .then(res => {
        const { user, token, reviews } = res;
        userContext.setUser({...user, token, reviews})
      })
      .catch(err => console.log(err))
  }

  const register = () => {
    authenticate({username, email, password}, 'signup')
  }

  const handleSubmit = () => {
    isLogin? login() : register();
  }

  const emailInput = !isLogin ?
    <CustomInput 
      icon='mail-outline'
      placeholder="Email"
      state={{ value: email, callback: setEmail }} /> : null

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
        state={{ value: password, callback: setPassword }} />
      <CustomButton
        color='#FFB906'
        onPress={() => handleSubmit()}
        text={isLogin ? 'Se connecter' : 'Créer un compte'} />
    </Form>
  )
};