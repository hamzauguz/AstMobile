import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../src/pages/login';
import Register from '../src/pages/register';
import Welcome from '../src/pages/welcome';
import Container from '../src/components/container';
import Home from '../src/pages/home';
import Profile from '../src/pages/profile';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HoroscopeCompatibility from '../src/pages/horoscope-compatibility';
import AstrologyDate from '../src/pages/astrology-date';
import auth from '@react-native-firebase/auth';

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

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const Dashboard = () => {
    return (
      <Container>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#0c2337"
          inactiveColor="purple"
          barStyle={{
            backgroundColor: '#bfbafc',
            height: Platform.OS === 'ios' ? 90 : 70,
            opacity: 0.9,
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Anasayfa',
              tabBarIcon: ({color}) => (
                <AntDesignIcon name="home" color={'purple'} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="HoroscopeCompatibility"
            component={HoroscopeCompatibility}
            options={{
              tabBarLabel: 'Burç Uyumu',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="cards-playing-heart-multiple-outline"
                  color={'purple'}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AstrologyDate"
            component={AstrologyDate}
            options={{
              tabBarLabel: 'Önemli Tarihler',
              tabBarIcon: ({color}) => (
                <MaterialIcons name="date-range" color={'purple'} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profil',
              tabBarIcon: ({color}) => (
                <AntDesignIcon name="user" color={'purple'} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </Container>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions}>
        {user ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
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
