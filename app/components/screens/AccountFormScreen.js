import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';

import { API_URL } from '../../config';
import { getUpdatedFields, pickImage, showToast } from '../../functions';
import { deleteAccount, editAccount, logout } from '../../data/user';

import { UserContext } from '../../contexts/UserContext';
import { AppContext } from '../../contexts/AppContext';
import colors from '../../styles/colors';
import { catchErrors } from '../../data/errors';

export default ({ route }) => {
  const { user } = route.params;

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [newAvatar, setNewAvatar] = useState(null);

  const { setConnectedUser, connectedUser } = useContext(UserContext);
  const { setUpdates } = useContext(AppContext);

  const navigation = useNavigation();
  
  let source = API_URL + 'uploads/' + avatar;

  const handleSubmit = () => {
    const fields = getUpdatedFields({ username, email }, connectedUser)
    editAccount(fields, user.token, newAvatar)
      .then(res => {
        if (res) {
          setConnectedUser({ ...connectedUser, ...res });
          showToast('Modifications enregistrées');
          setUpdates(true);
          navigation.pop();
        }
      })
      .catch(catchErrors);
  }


  const handleDelete = () => {
    deleteAccount(connectedUser.token)
      .then(res => {
        logout(setConnectedUser);
        showToast('Votre compte a été bien été supprimé.');
        navigation.pop();
      })
      .catch(catchErrors)
  }
  
  if (newAvatar) {
    source = newAvatar.uri
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: source }} style={styles.image} />
        <CustomInput
          disabled
          label="Photo de profil"
          icon='image'
          onPress={() => pickImage(setNewAvatar)}
          placeholder="Choisissez une photo..."
          value={newAvatar ? newAvatar.uri : ''}
          onChangeText={setNewAvatar} />
        <View>
          <CustomInput 
            label="Nom d'utilisateur"
            placeholder="Nom d'utilisateur" 
            value={username}
            onChangeText={setUsername} />
          <CustomInput 
            label="Adresse email"
            placeholder="Email" 
            value={email}
            onChangeText={setEmail} />
        </View>
        <CustomButton 
          text='Mettre à jour' 
          onPress={() => handleSubmit()} />
        <CustomButton 
          text='Supprimer mon compte'
          color={colors.red}
          onPress={() => handleDelete()} />
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scrollContainer: {
    justifyContent: "space-around",
    minHeight: '100%',
  },
  image: {
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 100,
    width: '40%',
  },
})
