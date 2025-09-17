import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// 定义导航类型
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  LabResults: undefined;
  Record: undefined;
  Discussion: undefined;
  News: undefined;
};

type LabResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LabResults'>;

const LabResultsScreen = () => {
  const navigation = useNavigation<LabResultsScreenNavigationProp>();
  const [selectedYear, setSelectedYear] = useState('2025');

  // 简单的图表组件替代方案
  const SimpleChart = ({ data }: { data: number[] }) => {
    const maxValue = Math.max(...data);
    const chartHeight = 150;
    
    return (
      <View style={styles.simpleChartContainer}>
        <View style={styles.simpleChart}>
          {data.map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  { height: (value / maxValue) * chartHeight }
                ]}
              />
              <Text style={styles.barLabel}>{index + 1}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartAxis}>
          <Text style={styles.axisLabel}>0</Text>
          <Text style={styles.axisLabel}>{maxValue.toFixed(1)}</Text>
        </View>
      </View>
    );
  };

  const labResults = [
    {
      name: 'Creatinine',
      data: [0.526, 1.197, 0.754, 0.423, 0.533, 0.486, 0.478, 0.15],
      referenceRange: '0.0 - 0.15 g/d',
    },
    {
      name: '24-Hour Urinary Protein',
      data: [0.650, 1.987, 0.534, 0.752, 0.812, 0.621, 0.482, 0.215],
      referenceRange: '0.0 - 0.15 g/d',
    },
    {
      name: 'Urea',
      data: [0.423, 0.632, 0.745, 0.987, 0.543, 0.632, 0.587, 0.470],
      referenceRange: '0.0 - 0.40 g/d',
    },
  ];

  const handleAddLabResult = () => {
    // 处理添加新实验室结果
    alert('Add Lab Result functionality would go here');
  };

  const handleUpdateLabResult = () => {
    // 处理更新现有实验室结果
    alert('Update Lab Result functionality would go here');
  };

  const handleDeleteLabResult = () => {
    // 处理删除实验室结果
    alert('Delete Lab Result functionality would go here');
  };

  return (
    <View style={styles.container}>
      {/* 用户信息 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
          <View style={styles.avatarContainer}>
            <Image source={require('../assets/Logo.png')} style={styles.avatar} />
          </View>
        </TouchableOpacity>

        <Text style={styles.userName}>Elina Krohnke</Text>
      </View>

      {/* 实验室结果 */}
      <ScrollView style={styles.labResultsContainer} horizontal={true}>
        {labResults.map((lab, index) => (
          <View key={index} style={styles.labResultCard}>
            <Text style={styles.labName}>{lab.name}</Text>

            {/* 简单图表替代方案 */}
            <SimpleChart data={lab.data} />
            
            <Text style={styles.referenceRange}>Reference Range: {lab.referenceRange}</Text>
            <Text style={styles.currentValue}>Current: {lab.data[lab.data.length - 1]}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 年份选择器 */}
      <View style={styles.yearPickerContainer}>
        <Text style={styles.selectYearText}>Select Year:</Text>
        <TextInput
          value={selectedYear}
          onChangeText={setSelectedYear}
          style={styles.yearInput}
          keyboardType="numeric"
        />
      </View>

      {/* 管理实验室结果的按钮 */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddLabResult}>
          <Text style={styles.buttonText}>Add New Lab Result</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpdateLabResult}>
          <Text style={styles.buttonText}>Update Lab Result</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteLabResult}>
          <Text style={styles.buttonText}>Delete Lab Result</Text>
        </TouchableOpacity>
      </View>

      {/* 底部导航 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Home' as never)}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navIconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Record' as never)}>
          <Ionicons name="book" size={24} color="#fff" />
          <Text style={styles.navIconText}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('Discussion' as never)}>
          <Ionicons name="chatbubble" size={24} color="#fff" />
          <Text style={styles.navIconText}>Discussion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('News' as never)}>
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
    paddingBottom: 70, // 为底部导航留出空间
  },
  topBar: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 60,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#2f9cff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  labResultsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  labResultCard: {
    backgroundColor: '#2e2e2e',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 280,
  },
  labName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  simpleChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 180,
    marginBottom: 10,
  },
  simpleChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    marginRight: 10,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    height: 150,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    backgroundColor: '#2f9cff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5,
  },
  barLabel: {
    color: '#fff',
    fontSize: 10,
  },
  chartAxis: {
    justifyContent: 'space-between',
    height: 150,
    paddingVertical: 5,
  },
  axisLabel: {
    color: '#fff',
    fontSize: 10,
  },
  referenceRange: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 10,
  },
  currentValue: {
    color: '#2f9cff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  yearPickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  selectYearText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  yearInput: {
    color: '#fff',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#2f9cff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 5,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
});

export default LabResultsScreen;