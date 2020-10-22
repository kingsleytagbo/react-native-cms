/**
 * React Native - Login Form Component
 * Author:  Kingsley Tagbo
 * Github:  https://github.com/kingsleytagbo
 * Twitter: https://twitter.com/kingsleytagbo
 * Website: http://www.launchfeatures.com
 * Gists:   https://gist.github.com/kingsleytagbo
 */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Button } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { setToken } from '../../services/Token';


const LoginForm = ({ buttonText, onSubmit, children, onSuccess, onFailure }:any) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = () => {
      onSubmit(email, password)
        .then(async (result:any) => {
          // console.log({result: result, authenticated: result.authenticated, auth_token : result.auth_token});
          if (result.authenticated == true) {
            await setToken(result.auth_token);
            onSuccess();
          }
          else{
            await setToken(null);
            onFailure();
          }
        })
        .catch((res:any) => setErrorMessage(res.error));
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.label}><label><Ionicons name="ios-people" />UserName:</label>
        <TextInput
            style={styles.textInput}
            onChangeText={(text: any) => onChangeEmail(text)}
            value={email}
            placeholder="Enter your Username ..."
            keyboardType="email-address"
          />
        </View>

        <View style={styles.label}><label><Ionicons name="ios-key" />Password:</label>
          <TextInput
            style={styles.textInput}
            onChangeText={(text: any) => onChangePassword(text)}
            value={password}
            placeholder="Enter your Password ..."
            secureTextEntry
          />
        </View>

        <Button 
         style={{ color: 'White', backgroundColor: 'White' }}
         title={buttonText} onPress={submit} />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        {children}
      </ScrollView>
    );
  };
  

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
      fontSize: '1em',
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
    label: { height: '2em', fontSize: '1em', marginBottom: '2em', color: '#191970', fontWeight:'normal'}

  });
  
  export default LoginForm;