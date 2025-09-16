import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

const SplashScreen = () => {
  type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.logoContainer,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>RenalFlow</Text>
        <Text style={styles.slogan}>From daily metrics to better kidney care</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // 全黑
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 190,
    height: 190,
  },
  logoText: {
    marginTop: -15, 
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    fontFamily: 'Courier',
  },
  slogan: {
    marginTop: 15, 
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'Courier',
  },
});

export default SplashScreen;
