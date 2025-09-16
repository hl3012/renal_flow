import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // 模拟的用户数据和内容
  const user = {
    name: 'Elina Krohnke',
    avatar: require('../assets/Logo.png'),  // 使用你提供的图片路径
  };
  const healthSummary = "Your overall health status and metrics will be displayed here.";
  const upcomingFollowUp = "You have a follow-up on March 11th, 2025.";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 顶部用户信息栏 */}
      <View style={styles.topBar}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* 健康总结、实验室结果等内容 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Summary</Text>
        <Text style={styles.sectionContent}>{healthSummary}</Text>
      </View>

      {/* 跳转按钮 */}
      <View style={styles.navButtonsContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HealthSummary')}>
          <Text style={styles.navButtonText}>Health Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MedicineHistory')}>
          <Text style={styles.navButtonText}>Medicine History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('LabResults')}>
          <Text style={styles.navButtonText}>Lab Results</Text>
        </TouchableOpacity>
      </View>

      {/* 即将到来的随访 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Follow-up</Text>
        <Text style={styles.sectionContent}>{upcomingFollowUp}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // 设置背景颜色为黑色
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#ccc',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
