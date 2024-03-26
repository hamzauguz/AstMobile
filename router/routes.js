import {Platform, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import UserInfo from '../src/pages/user-info';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../src/store/features/user-slice';
import HoroscopeDetail from '../src/pages/horoscope-detail';
import EditMyInfo from '../src/pages/edit-myInfo';
import EditMyPassword from '../src/pages/edit-myPassword';
import EditMyPhoto from '../src/pages/edit-myPhoto';
import HoroscopeCompatibilityDetail from '../src/pages/horoscope-compatibility-detail';
import ForgotPassword from '../src/pages/forgot-password';
import AskQuestion from '../src/pages/ask-question';
import DreamComment from '../src/pages/dream-comment';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const stackOptions = {
    headerTransparent: true,
    headerShown: false,
    backgroundColor: 'transparent',
  };
  const Tab = createMaterialBottomTabNavigator();

  async function onAuthStateChanged(u) {
    await dispatch(setUser(u));
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [user]);

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
          }}
          screenOptions={() => ({
            tabBarLabelStyle: styles.tabBarLabelStyle,
          })}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: <Text style={styles.tabBarLabel}>Anasayfa</Text>,
              tabBarIcon: ({color}) => (
                <AntDesignIcon name="home" color={'purple'} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="HoroscopeCompatibility"
            component={HoroscopeCompatibility}
            options={{
              tabBarLabel: <Text style={styles.tabBarLabel}>Burç Uyumu</Text>,
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
              tabBarLabel: (
                <Text style={styles.tabBarLabel} numberOfLines={1}>
                  Önemli Tarihler
                </Text>
              ),
              tabBarIcon: ({color}) => (
                <MaterialIcons name="date-range" color={'purple'} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: <Text style={styles.tabBarLabel}>Profil</Text>,
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
        {user && user.emailVerified ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="EditMyInfo" component={EditMyInfo} />
            <Stack.Screen name="EditMyPassword" component={EditMyPassword} />
            <Stack.Screen name="EditMyPhoto" component={EditMyPhoto} />
            <Stack.Screen name="AskQuestion" component={AskQuestion} />
            <Stack.Screen name="DreamComment" component={DreamComment} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="HoroscopeDetail" component={HoroscopeDetail} />
            <Stack.Screen
              name="HoroscopeCompatibilityDetail"
              component={HoroscopeCompatibilityDetail}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
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
  tabBarLabel: {
    fontFamily: 'EBGaramond-ExtraBoldItalic',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
});
