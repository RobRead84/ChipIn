import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList, MainTabParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SavedSearchesScreen from '../screens/SavedSearchesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = { Home: '🏠', SavedSearches: '🔍', Profile: '👤' };
  return (
    <View style={{ opacity: focused ? 1 : 0.5 }}>
      <Text style={{ fontSize: 24 }}>{icons[name]}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#0077B5',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Search' }} />
      <Tab.Screen name="SavedSearches" component={SavedSearchesScreen} options={{ title: 'Saved' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
