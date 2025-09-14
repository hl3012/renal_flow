import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // 初始透明度为0

  useEffect(() => {
    // 设置淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,  // 目标透明度
      duration: 1500,  // 动画持续时间
      useNativeDriver: true,
    }).start();

    // 2秒后跳转到登录页面
    const timer = setTimeout(() => {
      navigation.replace('Login');  // 跳转到登录页面
    }, 2000); // 2秒

    return () => clearTimeout(timer); // 清除定时器
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        {/* 如果 logo 是图片，使用 Image 组件 */}
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
    backgroundColor: '#000',  // 背景色为黑色
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // 设置 logo 的大小
    height: 100,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40, // 设置 logo 文本的字体大小
    fontWeight: 'bold',
    color: '#56D13E',  // 与 logo 颜色相匹配的绿色
  },
  slogan: {
    color: '#fff',  // 白色字体
    marginTop: 10,
    fontSize: 16,  // 设置标语的字体大小
  },
});

export default SplashScreen;
