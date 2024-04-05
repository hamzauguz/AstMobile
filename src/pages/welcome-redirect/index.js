import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/container';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {setUser} from '../../store/features/user-slice';
import {getUserInfoByEmail} from '../../utils/utils';

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
    if (user) {
      const userLoginValidate = async () => {
        await getUserInfoByEmail(user.email).then(res => {
          if (user && user.emailVerified) {
            if (res === null) {
              navigation.navigate('UserInfo');
            } else {
              navigation.navigate('Dashboard');
            }
          }
        });
      };

      userLoginValidate();
      const unsubscribe = navigation.addListener('focus', () => {
        userLoginValidate();
      });

      return unsubscribe;
    } else {
      navigation.navigate('Welcome');
    }
  }, [user, navigation]);

  useEffect(() => {
    navigation.navigate('Welcome');
  }, []);

  console.log('user: ', user);

  return (
    <Container>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fastrology3.jpg?alt=media&token=17f4d927-a427-49de-8dd4-12d13e0e65f6',
            cache: 'force-cache',
          }}
          style={styles.appIconStyle}
        />
      </SafeAreaView>
    </Container>
  );
};

export default WelcomeRedirect;

const styles = StyleSheet.create({
  appIconStyle: {height: 200, width: 200},
});
