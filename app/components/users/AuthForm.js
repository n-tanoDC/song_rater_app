import { Form } from 'native-base';
import React, { useState } from 'react';
import { authenticate } from '../../data/user';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

export default ({ userContext, action }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    if (action === 'login') {
      login()
    } else {
      register()
    }
  }

  const emailInput = action !== 'login' ?
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
        text='Créer un compte' />
    </Form>
  )
};