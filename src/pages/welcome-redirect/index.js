import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/container';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {setUser} from '../../store/features/user-slice';
import {getUserInfoByEmail} from '../../utils/utils';
import FastImage from 'react-native-fast-image';

const WelcomeRedirect = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function onAuthStateChanged(u) {
    await dispatch(setUser(u));
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const userLoginValidate = async () => {
      if (user) {
        await getUserInfoByEmail(user.email).then(res => {
          if (user && user.emailVerified) {
            if (res === null) {
              navigation.navigate('UserInfo');
            } else {
              navigation.navigate('Dashboard');
            }
          }
        });
      } else {
        navigation.navigate('Welcome');
      }
    };

    userLoginValidate();
    const unsubscribe = navigation.addListener('focus', () => {
      userLoginValidate();
    });

    return unsubscribe;
  }, [user, navigation]);

  return (
    <Container>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FastImage
          style={styles.appIconStyle}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fastrology3.jpg?alt=media&token=17f4d927-a427-49de-8dd4-12d13e0e65f6',
            priority: FastImage.priority.high,
          }}
        />
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={{width: 50, height: 50, backgroundColor: 'red'}}>
          <Text>hey</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </Container>
  );
};

export default WelcomeRedirect;

const styles = StyleSheet.create({
  appIconStyle: {height: 200, width: 200},
});
