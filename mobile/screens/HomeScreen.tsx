import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import CalendarGrid from '../components/CalendarGrid';

type RootStackParamList = {
  Home: undefined;
  HealthSummary: undefined;
  MedicineHistory: undefined;
  LabResults: undefined;
  Record: undefined;
  Discussion: undefined;
  News: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // 监听键盘事件
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const user = {
    name: 'Elina Krohnke',
    avatar: require('../assets/Logo.png'),
  };

  const handleHealthSummary = () => navigation.navigate('HealthSummary');
  const handleMedicineHistory = () => navigation.navigate('MedicineHistory');
  const handleLabResults = () => navigation.navigate('LabResults');

  // 底部导航栏数据
  const tabs = [
    {
      name: 'Home' as const,
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'Record' as const,
      icon: 'book',
      label: 'Record',
    },
    {
      name: 'Discussion' as const,
      icon: 'chatbubble',
      label: 'Discussion',
    },
    {
      name: 'News' as const,
      icon: 'notifications',
      label: 'News',
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* 用户信息 */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.avatarContainer}>
              <Image source={user.avatar} style={styles.avatar} />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{user.name}</Text>
        </View>

        {/* 底部盒子 */}
        <KeyboardAvoidingView 
          style={styles.bottomBox}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* 导航按钮 */}
            <View style={styles.navBar}>
              <TouchableOpacity style={styles.navButton} onPress={handleHealthSummary}>
                <View style={styles.navButtonTextContainer}>
                  <Text style={styles.navButtonText}>Health</Text>
                  <Text style={styles.navButtonText}>Summary</Text>
                </View>
                <Ionicons name="pulse" size={35} color="#fff" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={handleMedicineHistory}>
                <View style={styles.navButtonTextContainer}>
                  <Text style={styles.navButtonText}>Medicine</Text>
                  <Text style={styles.navButtonText}>History</Text>
                </View>
                <Ionicons name="medkit" size={35} color="#fff" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={handleLabResults}>
                <View style={styles.navButtonTextContainer}>
                  <Text style={styles.navButtonText}>Lab</Text>
                  <Text style={styles.navButtonText}>Results</Text>
                </View>
                <Ionicons name="flask" size={35} color="#fff" style={styles.icon} />
              </TouchableOpacity>
            </View>

            {/* 大模块 */}
            <View style={styles.mainModule}>
              {/* 日历组件 */}
              <CalendarGrid />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* 底部导航栏 - 只在键盘隐藏时显示 */}
        {!keyboardVisible && (
          <View style={styles.bottomNav}>
            {tabs.map((tab) => {
              const isActive = route.name === tab.name;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={styles.navIcon}
                  onPress={() => navigation.navigate(tab.name)}
                >
                  <Ionicons 
                    name={tab.icon as any} 
                    size={24} 
                    color={isActive ? '#2f9cff' : '#fff'} 
                  />
                  <Text style={[
                    styles.navIconText, 
                    isActive && styles.activeNavIconText
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
  },
  topBar: { 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    marginBottom: 30, 
    marginTop: 60 
  },
  avatarContainer: {
    width: 120, 
    height: 120, 
    borderRadius: 80, 
    borderWidth: 5,
    borderColor: '#2f9cff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 45 
  },
  userName: { 
    fontSize: 24, 
    fontWeight: '600', 
    color: '#fff' 
  },
  navBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10, 
    flexWrap: 'wrap' 
  },
  navButton: {
    backgroundColor: '#2e2e2e', 
    paddingVertical: 20, 
    paddingHorizontal: 15,
    borderRadius: 15, 
    width: '31%', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-end',
    paddingBottom: 5, 
    marginBottom: 10,
  },
  navButtonTextContainer: { 
    marginTop: 5, 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginBottom: 20 
  },
  navButtonText: { 
    color: '#fff', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  icon: { 
    marginBottom: 10, 
    alignSelf: 'flex-end' 
  },
  mainModule: { 
    flex: 1, 
    marginVertical: -8, 
    backgroundColor: '#2e2e2e',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    alignItems: 'center', 
    paddingBottom: 20,
    minHeight: 600
  },
  bottomBox: {
    flex: 1, 
    paddingTop: 30, 
    width: '100%', 
    borderRadius: 30,
    borderTopWidth: 3, 
    borderTopColor: 'rgba(255,255,255,0)',
    shadowColor: 'rgba(255, 255, 255, 0.28)', 
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.6, 
    shadowRadius: 10, 
    backgroundColor: '#161616', 
    paddingHorizontal: 18,
    marginTop: -5, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#1E1E1E', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
  },
  navIcon: { 
    alignItems: 'center',
    flex: 1,
  },
  navIconText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '400',
    marginTop: 2,
  },
  activeNavIconText: {
    color: '#2f9cff',
    fontWeight: '600',
  },
});

export default HomeScreen;