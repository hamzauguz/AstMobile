import {
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
import CustomInput from '../../components/custom-input';
import CustomHeader from '../../components/custom-header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import InputWithLabel from '../../components/input-with-label';
import HeaderButton from '../../components/header-button';
import LinearGradient from 'react-native-linear-gradient';
import {CreateUserWithEmailAndPassword} from '../../utils/utils';
const Register = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  console.log('formdata: ', formData);

  const handleSignIn = (email, password) => {
    CreateUserWithEmailAndPassword({email, password});
  };

  const handleRegister = () => {
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

              <TouchableOpacity style={styles.googleButton}>
                <AntDesignIcon size={30} name={'google'} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
              <InputWithLabel
                containerStyle={styles.customInputStyle}
                label={'İsim'}
                placeholder={'İsminizi giriniz.'}
                value={formData.name}
                onChangeText={value => handleInputChange('name', value)}
              />
              <InputWithLabel
                containerStyle={styles.customInputStyle}
                label={'Email'}
                placeholder={'Email adresinizi giriniz.'}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
              />
              <InputWithLabel
                containerStyle={styles.customInputStyle}
                label={'Telefon'}
                placeholder={'Telefon numaranızı giriniz.'}
                value={formData.phone}
                onChangeText={value => handleInputChange('phone', value)}
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
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={{color: 'white', fontWeight: '600'}}>Kayıt Ol</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  customHeaderStyle: {
    top: Platform.OS === 'ios' ? 0 : 50,
  },
});
