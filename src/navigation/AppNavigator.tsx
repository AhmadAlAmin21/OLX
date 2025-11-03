import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PostAdScreen from '../screens/PostAdScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type HomeStackParamList = {
  Home: undefined;
  PostAd: undefined;
  ViewAll: { categoryId?: number; categoryName?: string };
};

export type RootTabParamList = {
  HomeStack: undefined;
  Settings: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="PostAd" component={PostAdScreen} />
      <HomeStack.Screen name="ViewAll" component={ViewAllScreen} />
    </HomeStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.05)',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/images/home.png')}
                style={[styles.homeIcon, { opacity: focused ? 1 : 0.6 }]}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/images/settings.png')}
                style={[styles.settingsIcon, { opacity: focused ? 1 : 0.6 }]}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 45,
    height: 45,
  },
  settingsIcon: {
    width: 27,
    height: 27,
  },
});

export default AppNavigator;
