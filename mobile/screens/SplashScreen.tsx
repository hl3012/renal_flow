import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

const SplashScreen = () => {
  type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

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
        <Image source={require('../assets/Logo.png')} style={[styles.logo, { opacity: 0.6 }]} />
        <Text style={[styles.logoText, { opacity: 0.6 }]}>RenalFlow</Text>
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
    backgroundColor: '#000000ff', 
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 75, 
    height: 75,
    marginBottom: 5,
  },
  logoText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#2E7D32',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  slogan: {
    fontSize: 14, 
    color: '#a69f9f71', 
    marginTop: 5,
    textAlign: 'center',
  },
});

export default SplashScreen;
