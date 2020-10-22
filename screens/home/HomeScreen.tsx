import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Button, Text, View } from '../../components/Themed';
import { getToken, setToken } from '../../services/Token';

const HomeScreen = ({ navigation }:any ) => {
  const [authenticated, setAuthenticated] = useState(false);
  const refreshAuthentication = async () => {
    return () => setAuthenticated(value => !!value); // update the state to force render
}
refreshAuthentication();

  const logout = async () => {
    await setToken(null);
    navigation.navigate('Login');
  };

  const login = async () => {
    navigation.navigate('Login');
  };

  const getAuthentication = async () => {
    const token = await getToken() || 'null';
    if(token && (token != 'null') && (token != 'undefined') && (token.length > 10)){
      setAuthenticated(true);
    }
    console.log({token: token, authenticated: authenticated});
  };

  useEffect(() => {
    getAuthentication();
  });

  return (
    <View style={styles.container}>
      <Text>{authenticated ? 'Welcome, you are logged in' : 'You are not logged in'}</Text>
      { (authenticated !== null) && (
        <Button
          onPress={() => authenticated ? logout() : login()}
          title={authenticated ? 'Logout' : 'Login'}
        >
        </Button>
      )}
    </View>
  );
};

export default HomeScreen;

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
