import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { updateUser } from '../../services/Api';
import Login from '../../models/Login';
import User from '../../models/User';

type Props = {
    navigation: any;
    route: any;
};

const EditUser = ({ route, navigation }: Props) => {
  const user:User = {... route.params.user};
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const buttonText = 'Save User';

  const saveUser = () => {
    const editedUser = Object.assign(user, new User(email, password));
    console.log({ "EditUser Begins": editedUser, user: user, password: password });
    updateUser(editedUser, true)
      .then((val) => {
        console.log({ "EditUser Success": val });
        navigation.navigate('Root', {
          screen: 'Users',
          params: {
            screen: 'Users',
          },
        });
      })
      .catch((err) => {
        setErrorMessage('User could not be saved ...')
        console.log('error:', err.message);
      }
    );
  };

  useEffect(() => {
    onChangeEmail(route.params.user.user_nicename);
    onChangePassword(route.params.user.user_pass);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.label}><label>User Name:</label>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            onChangeEmail(value)
          }}
          value={email}
          placeholder="Enter your Username ..."
          keyboardType="email-address"
        />
      </View>

      <View style={styles.label}><label>Password:</label>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            onChangePassword(value)
          }}
          value={password}
          placeholder="Enter your Password ..."
          secureTextEntry
        />
      </View>

      <Button
        style={{ color: 'White', backgroundColor: 'White', }}
        title={buttonText} onPress={saveUser} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

export default EditUser;

const TextInputStyle:TextStyle = {
  height: '2em',
  width: 300,
  fontSize: 14,
  borderColor: Colors.light.tint,
  borderWidth: 1,
  marginTop: 2,
  marginBottom: '1em',
  paddingStart: '0.5em',
  paddingBottom: '0.5em',
  paddingTop: '0.5em',
  color: 'Colors.light.tint'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: '2em',
    width: 300,
    fontSize: 12,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    marginTop: 2,
    marginBottom: '1em',
    paddingStart: '0.5em',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    color: Colors.light.tint,
    selectionColor:"#FFFFFF",
    placeholderTextColor:'gray'
  },
  textInput: TextInputStyle,
  label: { height: '2em', fontSize: 12, marginBottom: '2em', color: '#191970', fontWeight:'normal'}

});