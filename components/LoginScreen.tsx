import React, { useState } from 'react';
import { View, Text, Button } from '../components/Themed';
import { StyleSheet } from 'react-native';
import { login } from '../services/Api';
import LoginForm from '../components/forms/LoginForm';

type Props = {
  navigation: any;
};

const LoginScreen = ({ navigation }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginUser = () => {
    setErrorMessage('');
    login('test@test.ca', 'password', false)
      .then((val) => {
        console.log({"Login Success ..." : val});
        navigation.navigate('Home');
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/*
      <Text>LoginScreen</Text>
      <Button title="Log in" onPress={loginUser} />
    */}
      <LoginForm
        buttonText="Log in"
        onSubmit={login}
        onAuthentication={() => navigation.navigate('Home')}
      >
        <Button
          title="Create account"
          onPress={() => navigation.navigate('CreateAccount')}
        />
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      </LoginForm>
    </View>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  export default LoginScreen;