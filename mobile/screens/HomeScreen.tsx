import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  const user = {
    name: 'Elina Krohnke',
    avatar: require('../assets/Logo.png'),
  };

  const handleHealthSummary = () => navigation.navigate('HealthSummary');
  const handleMedicineHistory = () => navigation.navigate('MedicineHistory');
  const handleLabResults = () => navigation.navigate('LabResults');

  return (
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
      <View style={styles.bottomBox}>
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
      </View>

      {/* 底部导航栏 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Record')}>
          <Ionicons name="book" size={24} color="#fff" />
          <Text style={styles.navIconText}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Discussion')}>
          <Ionicons name="chatbubble" size={24} color="#fff" />
          <Text style={styles.navIconText}>Discussion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('News')}>
          <Ionicons name="notifications" size={24} color="#fff" />
          <Text style={styles.navIconText}>News</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginVertical: 3, 
    backgroundColor: '#2e2e2e',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    alignItems: 'center', 
    paddingBottom: 20,
    minHeight: 400
  },
  bottomBox: {
    flex: 1, 
    paddingTop: 30, 
    width: '100%', 
    borderRadius: 30,
    borderTopWidth: 3, 
    borderTopColor: 'rgba(255,255,255,0)',
    shadowColor: 'rgba(255,255,255,0.62)', 
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.6, 
    shadowRadius: 10, 
    backgroundColor: '#161616', 
    paddingHorizontal: 18,
    marginTop: -15, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#1E1E1E', 
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  navIcon: { 
    alignItems: 'center' 
  },
  navIconText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
});

export default HomeScreen;