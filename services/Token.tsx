import AsyncStorage from '@react-native-community/async-storage';
/*
Url: https://react-native-community.github.io/async-storage/
Async Storage is asynchronous, unencrypted, persistent, 
key-value storage solution for your React Native application.
**/

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@auth_token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setToken = async (token:any) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    return null;
  }
};