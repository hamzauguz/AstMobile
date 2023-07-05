import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../src/pages/login';
import Register from '../src/pages/register';
import Welcome from '../src/pages/welcome';
import Container from '../src/components/container';
import Home from '../src/pages/home';
import Profile from '../src/pages/profile';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const stackOptions = {
    headerTransparent: true,
    headerShown: false,
    backgroundColor: 'transparent',
  };

  const Tab = createMaterialBottomTabNavigator();

  const Dashboard = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
