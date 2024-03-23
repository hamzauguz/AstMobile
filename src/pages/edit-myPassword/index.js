import {
  ActivityIndicator,
  Alert,
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
import HeaderButton from '../../components/header-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputWithLabel from '../../components/input-with-label';
import LinearGradient from 'react-native-linear-gradient';
import {firebase} from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';

const EditMyPassword = () => {
  const navigation = useNavigation();

  const [userForm, setUserForm] = useState({
    currentPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState({
    currentPassword: true,
    newPassword: true,
    reNewPassword: true,
  });
  const [progressBar, setProgressBar] = useState(false);

  const handleInputChange = (field, value) => {
    setUserForm(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  async function changePassword(currentPassword) {
    const {auth} = firebase;
    const {currentUser} = auth();

    try {
      setProgressBar(true);
      if (userForm.newPassword === userForm.reNewPassword) {
        await auth().signInWithEmailAndPassword(
          currentUser.email,
          currentPassword,
        );
        await currentUser.updatePassword(userForm.newPassword);
        setProgressBar(false);
        Alert.alert('Bilgilendirme', 'Şifreniz değiştirildi.');
        navigation.navigate('Profile');
      } else {
        Alert.alert('Bilgilendirme', 'Yeni şifreler uyuşmuyor.');
        setProgressBar(false);
      }
    } catch (e) {
      Alert.alert(e.message);
      setProgressBar(false);
    }
  }

  return (
    <Container>
      <SafeAreaView>
        <CustomHeader
          containerStyle={styles.headerContainerStyle}
          titleStyle={styles.headerTitleStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Şifremi Değiştir'}
        />

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}
          extraHeight={130}
          scrollEnabled
          extraScrollHeight={Platform.OS === 'ios' ? 130 : 0}
          resetScrollToCoords={{x: 0, y: 0}}
          style={{width: '100%', flexGrow: 1}}>
          <InputWithLabel
            containerStyle={styles.inputContainerStyle}
            label={'Eski Şifre'}
            placeholder={'Eski Şifrenizi Giriniz.'}
            value={userForm.currentPassword}
            onChangeText={value => handleInputChange('currentPassword', value)}
            inputRightContainer
            inputRightClick={() =>
              setShowPasswordForm(prevState => ({
                ...prevState,
                currentPassword: !showPasswordForm.currentPassword,
              }))
            }
            inputRightIcon={
              showPasswordForm.currentPassword ? (
                <FeatherIcon size={28} color={'white'} name={'eye'} />
              ) : (
                <FeatherIcon size={28} color={'white'} name={'eye-off'} />
              )
            }
            secureTextEntry={showPasswordForm.currentPassword}
          />
          <InputWithLabel
            containerStyle={styles.inputContainerStyle}
            label={'Yeni Şifre'}
            placeholder={'Yeni Şifrenizi giriniz.'}
            value={userForm.newPassword}
            onChangeText={value => handleInputChange('newPassword', value)}
            inputRightContainer
            inputRightClick={() =>
              setShowPasswordForm(prevState => ({
                ...prevState,
                newPassword: !showPasswordForm.newPassword,
              }))
            }
            inputRightIcon={
              showPasswordForm.newPassword ? (
                <FeatherIcon size={28} color={'white'} name={'eye'} />
              ) : (
                <FeatherIcon size={28} color={'white'} name={'eye-off'} />
              )
            }
            secureTextEntry={showPasswordForm.newPassword}
          />
          <InputWithLabel
            containerStyle={styles.inputContainerStyle}
            label={'Yeni Şifre'}
            placeholder={'Tekrar Yeni Şifrenizi giriniz.'}
            value={userForm.reNewPassword}
            onChangeText={value => handleInputChange('reNewPassword', value)}
            inputRightContainer
            inputRightClick={() =>
              setShowPasswordForm(prevState => ({
                ...prevState,
                reNewPassword: !showPasswordForm.reNewPassword,
              }))
            }
            inputRightIcon={
              showPasswordForm.reNewPassword ? (
                <FeatherIcon size={28} color={'white'} name={'eye'} />
              ) : (
                <FeatherIcon size={28} color={'white'} name={'eye-off'} />
              )
            }
            secureTextEntry={showPasswordForm.reNewPassword}
          />
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              borderRadius: 10,
              width: '90%',
              alignItems: 'center',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => changePassword(userForm.currentPassword)}
              style={styles.button}>
              {progressBar ? (
                <ActivityIndicator size={'large'} color={'white'} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontFamily: 'EBGaramond-ExtraBold',
                  }}>
                  Şifremi Değiştir
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default EditMyPassword;

const styles = StyleSheet.create({
  headerContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
  },

  headerTitleStyle: {
    marginRight: -50,
  },

  customHeaderStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  itemwithLabel: {width: '100%', alignItems: 'center', marginTop: 10},
  labelStyle: {color: 'white', fontSize: 18, width: '90%'},
  customButton: {
    width: '90%',
    backgroundColor: 'black',
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'purple',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'white',
  },

  inputContainerStyle: {
    marginTop: 10,
  },
});
