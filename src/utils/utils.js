import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const CreateUserWithEmailAndPassword = ({email, password}) => {
  console.log(email, password);
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      Alert.alert('Tebrikler', 'Hesap başarıyla oluşturuldu.');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Uyarı', 'Bu mail adresi kullanılıyor!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Uyarı', 'Geçerli bir mail adresi giriniz!');
      }

      console.error(error);
    });
};

export const SignIn = ({email, password}) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Uyarı', 'Bu mail adresi kullanılıyor!');
      }

      if (error.code === 'auth/user-not-found') {
        Alert.alert('Uyarı', 'Bu geçerli email ve şifre giriniz!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Uyarı', 'Geçerli bir mail adresi giriniz!');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Uyarı', 'Şifre hatalı');
      }
      if (error.code === 'auth/too-many-requests') {
        Alert.alert(
          'Uyarı',
          'Deneme sınırını geçtiniz. Giriş yapmak için şifremi unuttum sayfasına gidin!',
        );
      }
    });
};

export const SignOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
