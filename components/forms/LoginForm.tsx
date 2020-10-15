import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { View, Text, Button } from '../../components/Themed';
import { setToken } from '../../services/Token';

const SignupForm = ({ buttonText, onSubmit, children, onSuccess, onFailure }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const submit = () => {
      onSubmit(email, password)
        .then(async (result:any) => {
          console.log({result: result, authenticated: result.authenticated, auth_token : result.auth_token});
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
       <label>Your UserName & Password:</label>
        <TextInput
          style={styles.input}
          onChangeText={(text:any) => onChangeEmail(text)}
          value={email}
          placeholder=" Username: "
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text:any) => onChangePassword(text)}
          value={password}
          placeholder=" Password: "
          secureTextEntry
        />
        <Button 
         style={{ color: 'White', backgroundColor: 'White' }}
         title={buttonText} onPress={submit} />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        {children}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
    },
  });
  
  export default SignupForm;