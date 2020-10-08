import { Form } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { UserContext } from '../../App';
import { login, register } from '../../data/user'


export default ({ action }) => {
  const [username, setUsername] = useState('test');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [data, setData] = useState({})

  useEffect(() => { 
    setData({ username, email, password })
  }, [username, email, password])

  const { setUser } = useContext(UserContext)

  const isLogin = action === 'login';

  const handleSubmit = () => {
    isLogin? login(setUser, data) : register(data);
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
        secure
        state={{ value: password, callback: setPassword }} />
      <CustomButton
        color='#FFB906'
        onPress={handleSubmit}
        text={isLogin ? 'Se connecter' : 'Créer un compte'} />
    </Form>
  )
};