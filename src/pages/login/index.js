import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import InputWithLabel from '../../components/input-with-label';
import HeaderButton from '../../components/header-button';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SignIn, SignInWithGoogle} from '../../utils/utils';
import LoginWithGoogleButton from '../../components/login-with-google-button';
import styles from './styles';
import {windowWidth} from '../../utils/helpers';
import PrivacyPolicyText from '../../components/privacy-policy-text';

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

  const googleAuthPress = () => {
    setShowProgressBar(true);
    SignInWithGoogle()
      .then(res => setShowProgressBar(false))
      .catch(err => setShowProgressBar(false));
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

        <ScrollView style={{width: windowWidth}}>
          <KeyboardAvoidingView
            style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
            behavior={'position'}
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 40}>
            <View style={styles.keyboardViewContainer}>
              <View style={styles.formView}>
                <View style={styles.topContainer}>
                  <FastImage
                    style={styles.appIcon}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fastrology3.jpg?alt=media&token=17f4d927-a427-49de-8dd4-12d13e0e65f6',
                      priority: FastImage.priority.high,
                    }}
                  />
                  <LoginWithGoogleButton onPress={googleAuthPress} />
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
                        <FeatherIcon
                          size={28}
                          color={'white'}
                          name={'eye-off'}
                        />
                      )
                    }
                    secureTextEntry={showPassword}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.registerContainer}>
                  <Text style={styles.haventAccountText}>
                    Şifrenimi unuttun?
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ForgotPassword');
                    }}
                    style={styles.nowRegisterStyle}>
                    <Text style={styles.nowRegisterText}>Hemen tıkla</Text>
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
              <PrivacyPolicyText />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Login;
