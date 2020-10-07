import React from 'react';
import { View, Text } from '../components/Themed';
import { StyleSheet, Button } from 'react-native';
  

const LoginScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccount')}
      />
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