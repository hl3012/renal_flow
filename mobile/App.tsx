// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './screens/SplashScreen';  // 导入开机页面
// import LoginScreen from './screens/LoginScreen';    // 导入登录页面


// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import api from './utils/axios';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/api/health')
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Error connecting to server'));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message || 'Loading...'}</Text>
    </View>
  );
}
