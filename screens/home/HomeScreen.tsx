import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import LoginScreen from '../../components/LoginScreen';
import { Text, View } from '../../components/Themed';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Log out" onPress={() => navigation.navigate('Login')} />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
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
