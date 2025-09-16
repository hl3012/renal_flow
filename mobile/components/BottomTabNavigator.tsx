import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

type BottomTabNavigatorProps = {
  // 可以添加其他需要的props
};

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

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
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab]}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={24} 
              color={isActive ? '#2f9cff' : '#fff'} 
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  tabText: {
    color: '#fff',
    fontSize: 5,
    fontWeight: '400',
    marginTop: 2,
  },
  activeTabText: {
    color: '#2f9cff',
  },
});

export default BottomTabNavigator;