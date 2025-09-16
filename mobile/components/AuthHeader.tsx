// AuthHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AuthHeader: React.FC = () => {
  return (
    <View style={styles.topBox}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.logoText}>RenalFlow</Text>
      <Text style={styles.subtitleText}>From daily metrics to better kidney care</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBox: {
    position: 'absolute',
    top: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '500',
    fontFamily: 'Courier',
  },
});

export default AuthHeader;