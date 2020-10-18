import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { logout } from '../../data/user';

import { AppContext } from '../../AppContext';

export default () => {
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigation()

  return (
    <Menu>
      <MenuTrigger>
        <Icon name='dots-horizontal' color='#3A3A3A' size={28} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.container}>
        <MenuOption style={styles.option} onSelect={() => logout(setUser)}>
          <Icon style={styles.optionIcon} name='account-remove' size={24} color='#3A3A3A' />
          <Text style={styles.optionText}>Déconnexion</Text>
        </MenuOption>
        <MenuOption style={styles.option} onSelect={() => navigation.navigate('AccountForm', { user })}>
          <Icon style={styles.optionIcon} name='account-edit' size={24} color='#3A3A3A' />
          <Text style={styles.optionText}>Modifier mes informations</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 28,
    width: 'auto',
    borderRadius: 20,
  },
  option: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
  },
  optionText: {
  },
  optionIcon: {
    marginRight: 10,
  }
})