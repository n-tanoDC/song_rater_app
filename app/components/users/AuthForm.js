import { Form, Toast } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { UserContext } from '../../App';
import { login, register } from '../../data/user'
import { Alert } from 'react-native';


export default ({ action }) => {
  const [username, setUsername] = useState('testrn');
  const [email, setEmail] = useState('nicolas@gmail');
  const [password, setPassword] = useState('Password22');
  const [data, setData] = useState({})
  
  const isLogin = action === 'login';
  const { setUser } = useContext(UserContext)

  useEffect(() => { 
    isLogin? setData({ username, password }) : setData({ username, password, email })
  }, [username, email, password])
  
  const checkForm = () => {
    for (let item of Object.values(data)) {
      if (item === '') {
        return false
      }
    }
    return true;
  }

  const handleSubmit = () => {
    if (checkForm()) {
      isLogin? login(setUser, data) : register(setUser, data);
    } else {
      Toast.show({ text: 'Veuillez remplir tous les champs.', buttonText: 'Ok', type: 'warning' })
    }
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