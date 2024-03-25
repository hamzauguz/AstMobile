import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import InputWithLabel from '../../components/input-with-label';
import LinearGradient from 'react-native-linear-gradient';
import {firebase} from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [showProgressBar, setShowProgressBar] = useState(false);
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

  const handleResetPassword = () => {
    setShowProgressBar(true);
    if (formData.email === '') {
      Alert.alert('Uyarı', 'Lütfen mail adresini giriniz.');
      setShowProgressBar(false);
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(formData.email)
        .then(res => {
          Alert.alert('Bilgilendirme', 'Şifre sıfırlama için mail gönderildi');
        });
      setShowProgressBar(false);
    }
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
          iconTitle={'Şifremi Unuttum'}
        />
        <View style={styles.inputWithLabelContainer}>
          <InputWithLabel
            containerStyle={styles.customInputStyle}
            label={'Email'}
            placeholder={'Email adresinizi giriniz.'}
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
          />
        </View>
        <LinearGradient
          colors={['#b717d2', '#ce25ab']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.linearGradientContainer}>
          <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
            {showProgressBar ? (
              <ActivityIndicator size={'large'} color={'white'} />
            ) : (
              <Text style={styles.resetPasswordButonText}>Şifremi Sıfırla</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
  },
  customInputStyle: {
    marginTop: 20,
  },
  nowRegisterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetPasswordButonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EBGaramond-ExtraBold',
  },
  linearGradientContainer: {
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    top: 20,
  },
  inputWithLabelContainer: {width: '100%'},
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
