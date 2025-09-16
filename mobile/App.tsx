import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';  
import HealthSummaryScreen from './screens/HealthSummaryScreen';
import MedicineHistoryScreen from './screens/MedicineHistoryScreen';
import LabResultsScreen from './screens/LabResultsScreen';

export type RootStackParamList = {
  Splash: undefined;

  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  Home: undefined; 
  HealthSummary: undefined;
  MedicineHistory: undefined;
  LabResults: undefined;


};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
      {/* 启用 Splash 页面 */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      
      {/* 启用其他页面 */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      
      {/* 启用 Home 页面 */}
      <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="HealthSummary" component={HealthSummaryScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="MedicineHistory" component={MedicineHistoryScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="LabResults" component={LabResultsScreen}  options={{ headerShown: false }} />
      
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
