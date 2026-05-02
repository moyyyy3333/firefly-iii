import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import NetworkScreen from './src/screens/NetworkScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { COLORS } from './src/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Tab = createBottomTabNavigator();

const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    primary: COLORS.blue,
  },
};

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <NavigationContainer theme={NAV_THEME}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: COLORS.surface,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              paddingTop: 8,
              height: Platform.OS === 'ios' ? 80 : 60,
            },
            tabBarActiveTintColor: COLORS.blue,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              marginTop: 2,
            },
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Scan: focused ? 'scan' : 'scan-outline',
                Camera: focused ? 'camera' : 'camera-outline',
                Network: focused ? 'wifi' : 'wifi-outline',
                Settings: focused ? 'settings' : 'settings-outline',
              };
              return <Ionicons name={icons[route.name]} size={22} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Scan" component={HomeScreen} />
          <Tab.Screen name="Camera" component={ScanScreen} />
          <Tab.Screen name="Network" component={NetworkScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('security-alerts', {
      name: 'Security Alerts',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0080ff',
      sound: true,
    });
  }
}
