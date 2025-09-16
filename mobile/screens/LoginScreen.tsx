import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 要改成向后端发起请求验证用户信息
    // 当前代码只是模拟登录

    if (username && password) {
      navigation.replace('Home'); 
    } else {
      alert('Invalid username or password'); 
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  // iOS 和 Android 上的行为设置不同
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled" // 点击键盘外区域时关闭键盘，确保可点击
      >
        <View style={styles.inner}>
          <View style={styles.topBox}>
            <Image source={require('../assets/Logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>RenalFlow</Text>
            <Text style={styles.subtitleText}>From daily metrics to better kidney care</Text>
          </View>

          <View style={styles.bottomBox}>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={username}
                onChangeText={setUsername} // 绑定输入
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry
                value={password}
                onChangeText={setPassword} // 绑定输入
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.rowLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.linkText}>Forgot password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.linkText}>Register</Text>
                </TouchableOpacity>
              </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBox:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 190,
    height: 190,
    marginBottom: 5,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 5,
    fontFamily: 'Courier',
  },
  subtitleText: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 80,
    fontWeight: '500',
    fontFamily: 'Courier',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginVertical: 3,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  button: {
    width: '100%',
    backgroundColor: '#5b933b',
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 2,
  },
  rowLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
