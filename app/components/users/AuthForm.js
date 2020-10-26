import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import CustomSegment from '../common/CustomSegment';

import { login, register } from '../../data/user'
import { showToast } from '../../functions';

import { UserContext } from '../../contexts/UserContext';
import colors from '../../styles/colors';

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
    // Loop on every values of an object and check if one is empty.
    //  => return false with a message if it is the case.
    for (let item of Object.values(data)) {
      if (item === '') {
        return { valid: false, message: 'Veuillez remplir tous les champs.'}
      }
    }

    // Check if the password and the password confirmation are different.
    // But only if the user is not trying to login, hence creating an account ('!isLogin').
    //  => return false with a message if the passwords are different. 
    if (passwordConf !== password && !isLogin) {
      return { valid: false, message: 'Les mots de passes ne sont pas identiques.'}
    }

    // => return true with no message if everything went well.
    return { valid: true };
  }

  
  const handleSubmit = () => {
    // Get valid and messages properties from formValidator function.
    const { valid, message } = formValidator()
    if (valid) {
      // Pick a function depending on if the user is trying to login or not
      const authFunction = isLogin ? login : register;
      authFunction(data)
        .then(res => {
          // if the function returned an error, throw it to end the function
          if (res instanceof Error) {
            throw res
          }
          // if not update the user context with the information in the response
          const { user, token } = res;
          setConnectedUser({ ...user, token })
        })
        // catch the error thrown in the then() and display its message in the form of a Toast
        .catch(err => showToast(err.message))
    } else {
      // if the form is not valid, display the error message (defined in the formValidator function)
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
            color={colors.secondary}
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