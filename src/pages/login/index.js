import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import Icon from 'react-native-vector-icons/FontAwesome5';

import InputWithLabel from '../../components/input-with-label';
import HeaderButton from '../../components/header-button';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SignIn, SignInWithGoogle} from '../../utils/utils';
import LoginWithGoogleButton from '../../components/login-with-google-button';
import styles from './styles';

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignIn = (email, password) => {
    SignIn({email, password, setShowProgressBar});
  };

  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleDashboardNavigate = () => {
    setShowProgressBar(true);
    handleSignIn(formData.email, formData.password);
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.headerStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Giriş Yap'}
        />

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.keyboardContentContainer}
          extraHeight={130}
          scrollEnabled
          extraScrollHeight={Platform.OS === 'ios' ? 130 : 0}
          resetScrollToCoords={{x: 0, y: 0}}
          style={styles.keyboardContainer}>
          <View style={styles.keyboardViewContainer}>
            <View style={styles.formView}>
              <View style={styles.topContainer}>
                <Image
                  source={require('../../../assets/astrology3.png')}
                  style={styles.appIcon}
                />
                <LoginWithGoogleButton onPress={SignInWithGoogle} />
              </View>
              <View style={styles.inputWithLabelContainer}>
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
              </View>
              <View style={styles.registerContainer}>
                <Text style={styles.haventAccountText}>Hesabın yokmu?</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  style={styles.nowRegisterStyle}>
                  <Text style={styles.nowRegisterText}>Hemen kaydol</Text>
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradient
              colors={['#b717d2', '#ce25ab']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.linearGradientContainer}>
              <TouchableOpacity
                onPress={() => handleDashboardNavigate()}
                style={styles.button}>
                {showProgressBar ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text style={styles.loginButonText}>Giriş Yap</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Login;
