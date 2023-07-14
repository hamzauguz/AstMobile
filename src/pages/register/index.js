import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/container';

import CustomHeader from '../../components/custom-header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

import InputWithLabel from '../../components/input-with-label';
import HeaderButton from '../../components/header-button';
import LinearGradient from 'react-native-linear-gradient';
import {
  CreateUserWithEmailAndPassword,
  SignInWithGoogle,
} from '../../utils/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import LoginWithGoogleButton from '../../components/login-with-google-button';

const Register = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  console.log('formdata: ', formData);

  const handleSignIn = (email, password) => {
    CreateUserWithEmailAndPassword({email, password, setShowProgressBar});
  };

  const handleRegister = () => {
    if (formData.password !== formData.rePassword)
      return Alert.alert('Uyarı', 'Şifreler eşleşmiyor!');
    setShowProgressBar(true);
    handleSignIn(formData.email, formData.password);
  };

  return (
    <Container>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <CustomHeader
          containerStyle={styles.customHeaderStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Kayıt Ol'}
        />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}
          extraHeight={130}
          scrollEnabled
          extraScrollHeight={Platform.OS === 'ios' ? 130 : 0}
          resetScrollToCoords={{x: 0, y: 0}}
          style={{width: '100%', flexGrow: 1}}>
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
                justifyContent: 'center',
                flex: 0.75,
              }}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/astrology.png')}
                  style={{height: 100, width: 100}}
                />

                <LoginWithGoogleButton
                  onPress={() =>
                    SignInWithGoogle().then(() =>
                      Alert.alert('Info', 'Signed In'),
                    )
                  }
                />
              </View>
              <View style={{width: '100%'}}>
                <InputWithLabel
                  containerStyle={styles.customInputStyle}
                  label={'Email'}
                  placeholder={'Email adresinizi giriniz.'}
                  value={formData.email}
                  onChangeText={value => handleInputChange('email', value)}
                />

                <InputWithLabel
                  containerStyle={styles.customInputStyle}
                  label={'Şifre'}
                  placeholder={'Şifrenizi giriniz.'}
                  value={formData.password}
                  onChangeText={value => handleInputChange('password', value)}
                  inputRightContainer
                  inputRightClick={() => setShowPassword(!showPassword)}
                  inputRightIcon={
                    showPassword ? (
                      <FeatherIcon size={28} color={'white'} name={'eye'} />
                    ) : (
                      <FeatherIcon size={28} color={'white'} name={'eye-off'} />
                    )
                  }
                  secureTextEntry={showPassword}
                />
                <InputWithLabel
                  containerStyle={styles.customInputStyle}
                  label={'Şifre Tekrar'}
                  placeholder={'Tekrar şifrenizi giriniz.'}
                  value={formData.rePassword}
                  onChangeText={value => handleInputChange('rePassword', value)}
                  inputRightContainer
                  inputRightClick={() => setShowRePassword(!showRePassword)}
                  inputRightIcon={
                    !showRePassword ? (
                      <FeatherIcon size={28} color={'white'} name={'eye'} />
                    ) : (
                      <FeatherIcon size={28} color={'white'} name={'eye-off'} />
                    )
                  }
                  secureTextEntry={!showRePassword}
                />
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
              }}>
              <TouchableOpacity onPress={handleRegister} style={styles.button}>
                {showProgressBar ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text style={{color: 'white', fontWeight: '600'}}>
                    Kayıt Ol
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({
  customInputStyle: {
    marginTop: 10,
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  customHeaderStyle: {
    top: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
});
