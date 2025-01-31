import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';


import HomeScreen from '../screens/HomeScreen';
import ApplicationScreen from '../screens/ApplicationScreen'; 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import SplashScreen from '../screens/SplashScreen';
import InformationScreen from '../screens/InformationScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ModuleScreen from '../screens/ModuleScreen'; 
import ForumScreen from '../screens/ForumScreen'; 
import GiziMaterialScreen from '../screens/GiziMaterialScreen'; 
import MentalMaterialScreen from '../screens/MentalMaterialScreen'; 
import LearningSessionScreen from '../screens/LearningSessionScreen';
import { getToken } from '../utils/handlingDataLogin'; 
import TelehealthScreen from '../screens/TelehealthScreen';
import MedicalProfessionalSelectionScreen from '../screens/MedicalProfessionalSelectionScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Information: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  LearningSession: { topic: string; segmentIds: string[] }; 
  GiziMaterial: { id: string }; 
  MentalHealthMaterial: { id: string }; 
  BMICalculator: undefined;
  EditProfile: undefined;
  Telehealth: undefined;
  MedicalProfessionalSelectionScreen: undefined;
};

const BottomTabNavigation = () => (
  <Tab.Navigator 
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#18B2A0', // Set background color
        height: 70, // Reset the height of the tab bar to a normal size
      },
      tabBarActiveTintColor: '#FFFFFF', // Set active icon color to white
      tabBarInactiveTintColor: '#DFDFDF', // Optional: Set inactive icon color
      tabBarIconStyle: {
         // Reset the margin of the icon
      },
      tabBarItemStyle: {
        marginBottom: 10, // Reset the margin of the tab item
      },
     
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: false, 
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons name="home" size={focused ? 36 : 24} color={color} /> // Active size 1.5x (36), inactive size (24)
        ) 
      }} 
    />
    <Tab.Screen 
      name="Learning" 
      component={ModuleScreen} 
      options={{ headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome5 name="book" size={focused ? 36 : 24} color={color} /> // Active size 1.5x (36), inactive size (24)
        ) 
      }} 
    />
    <Tab.Screen 
      name="Forum" 
      component={ForumScreen} 
      options={{ 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="chatbubble-outline" size={focused ? 36 : 24} color={color} /> // Active size 1.5x (36), inactive size (24)
        ) 
      }} 
    />
    <Tab.Screen 
      name="Application" 
      component={ApplicationScreen} 
      options={{ 
        tabBarIcon: ({ color, focused }) => (
          <AntDesign name="appstore-o" size={focused ? 36 : 24} color={color} /> // Active size 1.5x (36), inactive size (24)
        ) 
      }} 
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Splash');

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setInitialRoute(token ? 'MainTabs' : 'Login');
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Information" component={InformationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (  
            <LoginScreen onLogin={() => navigation.navigate('MainTabs')} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LearningSession" 
          component={LearningSessionScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="GiziMaterial" 
          component={GiziMaterialScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="MentalHealthMaterial" 
          component={MentalMaterialScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="BMICalculator" 
          component={BMICalculatorScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ headerShown: true }} 
        />
                <Stack.Screen 
          name="Telehealth" 
          component={TelehealthScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen name="MedicalProfessionalSelectionScreen" component={MedicalProfessionalSelectionScreen} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
