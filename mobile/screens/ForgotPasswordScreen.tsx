import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import api from '../utils/axios';
import AuthHeader from '../components/AuthHeader';

type ForgotResetScreenProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotResetScreen: React.FC = () => {
  const navigation = useNavigation<ForgotResetScreenProp>();
  const [stage, setStage] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendEmail = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    try {
      await api.post('/api/auth/forgot-password', { email });
      Alert.alert('Success', 'Password reset link sent to your email');
      setStage('reset'); 
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Request failed');
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await api.post('/api/auth/reset-password', { email, password });
      Alert.alert('Success', 'Password reset successful');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <AuthHeader />

          <View style={styles.bottomBox}>
            {stage === 'email' ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                  <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
                  <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
                  <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
              </>
            )}
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
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
  backLink: {
    marginTop: 15,
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default ForgotResetScreen;