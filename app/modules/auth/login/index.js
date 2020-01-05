import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { string } from 'yup';
import useForm from '../../../../src/form';

const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',

    marginTop: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#555',
    borderRadius: 10,
    width: WIDTH * 0.8,
  },
  loginButton: {
    height: 60,
    width: WIDTH * 0.8,

    backgroundColor: 'steelblue',
    borderRadius: 30,

    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 28,
    color: '#CCC',
  },
});

const LoginForm: () => React$Node = () => {
  const { data, inputFields, error } = useForm(
    {
      email: '',
      password: '',
    },
    {
      nextField: {
        email: 'password',
        password: 'submit',
      },
      validation: {
        email: string()
          .required()
          .email(),
        password: string()
          .required()
          .min(4),
      },
      onSubmit: () => {
        alert('Logged In');
      },
    },
  );

  const login = () => {
    console.log('login', data);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} {...inputFields('email')} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} {...inputFields('password')} />
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(error, null, 2)}</Text>
      </View>
    </View>
  );
};

export default LoginForm;
