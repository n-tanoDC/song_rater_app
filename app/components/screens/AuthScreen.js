import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import CustomTabView from '../users/CustomTabView';

export default () => {
  const sections = [
    {
      title: 'Se connecter',
      render: () => (<LoginForm styles={styles} />)
    },
    {
      title: 'Créer un compte',
      render: () => (<RegisterForm styles={styles} />)
    }
  ]
  
  return (    
    <SafeAreaView style={styles.container}>
      <CustomTabView
        sections={sections}
        style='rounded' />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginVertical: 20,
    padding: 10,
    alignSelf: 'flex-end'
  }
})