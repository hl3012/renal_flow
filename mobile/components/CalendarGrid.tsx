import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, 
  TouchableWithoutFeedback, ScrollView, TextInput, Alert, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CalendarGridProps {
  onDateSelect?: (date: Date) => void;
}

interface DateItem {
  date: Date;
  isCurrentMonth: boolean;
  key: string;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [dates, setDates] = useState<DateItem[]>([]);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  // 待办事项数据
  const [todos, setTodos] = useState<{[key: string]: string[]}>({
    '2025-3-11': ['Follow-up appointment with Dr. Smith at 10:00 AM', 'Take blood pressure medication'],
    '2025-3-15': ['Lab test at Central Hospital', 'Pick up prescription'],
    '2025-3-20': ['Physical therapy session', 'Weekly health check'],
    '2025-3-25': ['Dentist appointment', 'Blood test fasting required'],
  });

  useEffect(() => {
    generateDates(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    // 确保日期生成完成后再滚动
    if (dates.length > 0) {
      setTimeout(() => {
        scrollToDate(selectedDate);
      }, 100);
    }
  }, [dates]);

  const generateDates = (year: number, month: number) => {
    const dateArray: DateItem[] = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 添加前面的空白日期（如果需要）
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(year, month, 1 - i);
      dateArray.unshift({
        date: prevDate,
        isCurrentMonth: false,
        key: `prev-${i}`
      });
    }
    
    // 添加当月日期
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const currentDate = new Date(year, month, d);
      dateArray.push({
        date: currentDate,
        isCurrentMonth: true,
        key: `current-${d}`
      });
    }
    
    // 添加后面的空白日期（如果需要）
    const endDay = lastDay.getDay();
    for (let i = 1; i < (7 - endDay); i++) {
      const nextDate = new Date(year, month + 1, i);
      dateArray.push({
        date: nextDate,
        isCurrentMonth: false,
        key: `next-${i}`
      });
    }
    
    setDates(dateArray);
  };

  const scrollToDate = (date: Date) => {
    if (flatListRef.current && dates.length > 0) {
      const targetIndex = dates.findIndex(item => 
        item.date.getDate() === date.getDate() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear()
      );
      
      if (targetIndex !== -1) {
        flatListRef.current.scrollToIndex({
          index: targetIndex,
          animated: true,
          viewPosition: 0.5
        });
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setShowMonthPicker(false);
    
    // 如果切换月份后，检查当前选中的日期是否在新月份中
    const newDate = new Date(selectedYear, month, Math.min(selectedDate.getDate(), new Date(selectedYear, month + 1, 0).getDate()));
    setSelectedDate(newDate);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setShowYearPicker(false);
    
    // 如果切换年份后，检查当前选中的日期是否在新年份中
    const newDate = new Date(year, selectedMonth, Math.min(selectedDate.getDate(), new Date(year, selectedMonth + 1, 0).getDate()));
    setSelectedDate(newDate);
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getTodosForDate = (date: Date) => {
    const key = formatDateKey(date);
    return todos[key] || [];
  };

  const addTodoForSelectedDate = () => {
    if (!newTodoText.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return;
    }
    
    const key = formatDateKey(selectedDate);
    const updatedTodos = {
      ...todos,
      [key]: [...(todos[key] || []), newTodoText]
    };
    
    setTodos(updatedTodos);
    setNewTodoText('');
    setShowAddTodoModal(false);
    
    Alert.alert('Success', 'Task added successfully');
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderItem = ({ item }: { item: DateItem }) => {
    const date = item.date;
    const todayFlag = isToday(date);
    const isSelected = 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const hasTodos = getTodosForDate(date).length > 0;

    return (
      <TouchableOpacity
        style={[
          styles.dateItem, 
          todayFlag && styles.todayItem,
          !item.isCurrentMonth && styles.nonCurrentMonth,
          isSelected && styles.selectedItem
        ]}
        onPress={() => handleDateSelect(date)}
      >
        <Text style={[
          styles.weekdayText, 
          todayFlag && styles.todayText,
          !item.isCurrentMonth && styles.nonCurrentMonthText,
          isSelected && styles.selectedText
        ]}>
          {weekday}
        </Text>
        <Text style={[
          styles.dateText, 
          todayFlag && styles.todayText,
          !item.isCurrentMonth && styles.nonCurrentMonthText,
          isSelected && styles.selectedText
        ]}>
          {date.getDate()}
        </Text>
        {hasTodos && <View style={styles.todoIndicator} />}
      </TouchableOpacity>
    );
  };

  // 生成年份和月份选项
  const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i);

  return (
    <View style={styles.container}>
      {/* 年份和月份选择器 */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity 
          style={styles.pickerWrapper}
          onPress={() => setShowYearPicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#fff" style={styles.pickerIcon} />
          <View style={styles.picker}>
            <Text style={styles.pickerLabel}>Year:</Text>
            <View style={styles.pickerValue}>
              <Text style={styles.pickerValueText}>{selectedYear}</Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.pickerWrapper}
          onPress={() => setShowMonthPicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#fff" style={styles.pickerIcon} />
          <View style={styles.picker}>
            <Text style={styles.pickerLabel}>Month:</Text>
            <View style={styles.pickerValue}>
              <Text style={styles.pickerValueText}>
                {new Date(0, selectedMonth).toLocaleString('en-US', { month: 'short' })}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 日期水平滚动列表 */}
      <View style={styles.calendarContainer}>
        <FlatList
          ref={flatListRef}
          data={dates}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.flatListContainer}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index,
          })}
          initialScrollIndex={dates.findIndex(item => 
            item.date.getDate() === today.getDate() &&
            item.date.getMonth() === today.getMonth() &&
            item.date.getFullYear() === today.getFullYear()
          )}
        />
      </View>

      {/* 选中日期的待办事项 */}
      <View style={styles.todoSection}>
        <View style={styles.todoHeader}>
          <Text style={styles.todoTitle}>
            Tasks for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddTodoModal(true)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {getTodosForDate(selectedDate).length > 0 ? (
          getTodosForDate(selectedDate).map((todo, index) => (
            <View key={index} style={styles.todoItem}>
              <Ionicons name="checkmark-circle" size={16} color="#87ceeb" />
              <Text style={styles.todoText}>{todo}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTodosText}>No tasks scheduled for this day</Text>
        )}
      </View>

      {/* 年份选择模态框 */}
      <Modal
        visible={showYearPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowYearPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Year</Text>
              <ScrollView style={styles.modalScrollView}>
                {yearOptions.map(year => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.modalOption,
                      selectedYear === year && styles.selectedModalOption
                    ]}
                    onPress={() => handleYearChange(year)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      selectedYear === year && styles.selectedModalOptionText
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 月份选择模态框 */}
      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMonthPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <ScrollView style={styles.modalScrollView}>
                {monthOptions.map(month => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.modalOption,
                      selectedMonth === month && styles.selectedModalOption
                    ]}
                    onPress={() => handleMonthChange(month)}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      selectedMonth === month && styles.selectedModalOptionText
                    ]}>
                      {new Date(0, month).toLocaleString('en-US', { month: 'long' })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 添加待办事项模态框 */}
      <Modal
        visible={showAddTodoModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddTodoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addTodoModalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <Text style={styles.modalSubtitle}>
              For {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            
            <TextInput
              style={styles.todoInput}
              placeholder="Enter task description"
              placeholderTextColor="#888"
              value={newTodoText}
              onChangeText={setNewTodoText}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddTodoModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.addTodoButton]}
                onPress={addTodoForSelectedDate}
              >
                <Text style={styles.addTodoButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  calendarContainer: {
    height: 80, // 确保有足够的高度显示滚动条
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
    width: '48%',
  },
  pickerIcon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
  },
  pickerLabel: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  pickerValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerValueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  dateItem: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  todayItem: {
    backgroundColor: '#2f9cff',
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#87ceeb',
    backgroundColor: '#4a4a4a',
  },
  nonCurrentMonth: {
    opacity: 0.4,
  },
  weekdayText: {
    color: '#ccc',
    fontSize: 12,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  todayText: {
    color: '#fff',
    fontWeight: '700',
  },
  selectedText: {
    color: '#87ceeb',
    fontWeight: '700',
  },
  nonCurrentMonthText: {
    color: '#888',
  },
  todoIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#87ceeb',
  },
  todoSection: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#2f9cff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
  },
  todoText: {
    color: '#fff',
    marginLeft: 8,
    flex: 1,
  },
  noTodosText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  addTodoModalContent: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  selectedModalOption: {
    backgroundColor: '#87ceeb',
    borderRadius: 6,
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedModalOptionText: {
    color: '#000',
    fontWeight: '600',
  },
  todoInput: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  addTodoButton: {
    backgroundColor: '#2f9cff',
  },
  cancelButtonText: {
    color: '#fff',
  },
  addTodoButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CalendarGrid;