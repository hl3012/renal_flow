// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import AuthHeader from '../components/AuthHeader';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const headerOpacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(headerOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [headerOpacity]);

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('Home'); 
    } else {
      alert('Invalid username or password'); 
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <AuthHeader />
      </Animated.View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, isKeyboardVisible && styles.scrollContainerKeyboardVisible]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 200, // 为Header留出空间
  },
  scrollContainerKeyboardVisible: {
    paddingTop: 200, // 键盘弹出时减少顶部空间
    justifyContent: 'flex-start',
  },
  formContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginVertical: 3,
    color: '#fff',
    fontSize: 12,
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
    fontSize: 15,
    letterSpacing: 2,
  },
  rowLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;