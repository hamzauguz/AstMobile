import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import InputWithLabel from '../../components/input-with-label';
import HeaderButton from '../../components/header-button';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <CustomHeader
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Giriş Yap'}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',

              justifyContent: 'space-around',
              flex: 0.75,
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/astrology.png')}
                style={{height: 200, width: 200}}
              />

              <TouchableOpacity style={styles.googleButton}>
                <AntDesignIcon size={30} name={'google'} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
              <InputWithLabel
                containerStyle={styles.customInputStyle}
                label={'Email'}
                placeholder={'Email adresinizi giriniz.'}
              />

              <InputWithLabel
                containerStyle={styles.customInputStyle}
                label={'Şifre'}
                placeholder={'Şifrenizi giriniz.'}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'white',

                  fontWeight: '500',
                  fontSize: 15,
                }}>
                Hesabın yokmu?
              </Text>

              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 5,
                }}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  Hemen kaydol
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              borderRadius: 10,
              width: '90%',
              alignItems: 'center',
              position: 'absolute',
              bottom: 50,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
              style={styles.button}>
              <Text style={{color: 'white', fontWeight: '600'}}>Giriş Yap</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  customInputStyle: {
    marginTop: 20,
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  googleButton: {
    width: '90%',
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'purple',
    marginTop: 20,
  },
});
