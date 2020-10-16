import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle } from 'react-native';
import { View, Text, Button } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { setToken } from '../../services/Token';

const SignupForm = ({ buttonText, onSubmit, children, onSuccess, onFailure }:any) => {
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

        <View style={styles.label}><label>Username:</label>
        <TextInput
            style={styles.textInput}
            onChangeText={(text: any) => onChangeEmail(text)}
            value={email}
            placeholder="Enter Your Username:"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.label}><label>Password:</label>
          <TextInput
            style={styles.textInput}
            onChangeText={(text: any) => onChangePassword(text)}
            value={password}
            placeholder="Enter Your Password:"
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
    fontSize: 15,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    marginTop: 2,
    marginBottom: '1em',
    paddingStart: '0.5em',
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
    color: Colors.light.tint
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
    label: { height: '2em', fontSize: '1em', marginBottom: '2em', color: '#000'}

  });
  
  export default SignupForm;