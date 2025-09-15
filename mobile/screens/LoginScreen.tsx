import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={styles.container}>

      <Text style={styles.logoText}>RenalFlow</Text>


      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
      />


      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


      <View style={styles.rowLinks}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>New User?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff', // 和 Splash 一致
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 30,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  linkText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
