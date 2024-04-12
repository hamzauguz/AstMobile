import {Platform, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
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
import analytics from '@react-native-firebase/analytics';
import WelcomeRedirect from '../src/pages/welcome-redirect';
import PublicPosts from '../src/pages/public-posts';
//switcher

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const routeNameRef = useRef();
  const navigationRef = useRef();

  const stackOptions = {
    headerTransparent: true,
    headerShown: false,
    backgroundColor: 'transparent',
    animationEnabled: true,
    animation: Platform?.OS === 'ios' ? 'simple_push' : 'slide_from_right',
  };
  const Tab = createMaterialBottomTabNavigator();

  async function onAuthStateChanged(u) {
    await dispatch(setUser(u));
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [user]);

  console.log('routeNameRef: ', routeNameRef);

  const Dashboard = () => {
    // const route = useRoute();
    // console.log('route name: ', route);
    const [activeTabTitle, setActiveTabTitle] = useState('');
    console.log('active tab: ', activeTabTitle);
    return (
      <Container>
        <Tab.Navigator
          activeColor="#0c2337"
          inactiveColor="purple"
          screenOptions={({route, navigation}) => {
            return {
              tabBarLabel: navigation.isFocused() ? (
                <Text style={styles.tabBarLabel}>
                  {route.name === 'Home'
                    ? 'Ana Sayfa'
                    : route.name === 'Profile'
                    ? 'Profil'
                    : route.name === 'HoroscopeCompatibility'
                    ? 'Burç Uyumu'
                    : route.name === 'AstrologyDate'
                    ? 'Önemli Tarihler'
                    : route.name === 'PublicPosts'
                    ? 'Gönderiler'
                    : route.name}
                </Text>
              ) : null,
            };
          }}
          barStyle={{
            backgroundColor: '#bfbafc',
            height: Platform.OS === 'ios' ? 90 : 70,
            opacity: 0.9,
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={({route}) => ({
              tabBarIcon: ({color}) => (
                <AntDesignIcon name="home" color={'purple'} size={26} />
              ),
            })}
          />
          <Tab.Screen
            name="PublicPosts"
            component={PublicPosts}
            options={({route}) => ({
              tabBarIcon: ({color}) => (
                <AntDesignIcons name="switcher" color={'purple'} size={26} />
              ),
            })}
          />
          <Tab.Screen
            name="HoroscopeCompatibility"
            component={HoroscopeCompatibility}
            options={({route}) => ({
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="cards-playing-heart-multiple-outline"
                  color={'purple'}
                  size={26}
                />
              ),
            })}
          />

          <Tab.Screen
            name="AstrologyDate"
            component={AstrologyDate}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons name="date-range" color={'purple'} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
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
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={'WelcomeRedirect'}
        screenOptions={stackOptions}>
        <Stack.Screen name="WelcomeRedirect" component={WelcomeRedirect} />

        {user && user.emailVerified ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="EditMyInfo" component={EditMyInfo} />
            <Stack.Screen name="EditMyPassword" component={EditMyPassword} />
            <Stack.Screen name="EditMyPhoto" component={EditMyPhoto} />
            <Stack.Screen
              name="AskQuestion"
              options={{
                presentation: 'modal',
                animationTypeForReplace: 'push',
              }}
              component={AskQuestion}
            />
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
