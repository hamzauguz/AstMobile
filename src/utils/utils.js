import auth from '@react-native-firebase/auth';
import {Alert, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: Platform.select({
    ios: '28271342960-c0i41k486gjf163hsmasdfsg7gvk3d5j.apps.googleusercontent.com',
    android:
      '28271342960-gkacljivqssjd6tg1ende3s4av82be9b.apps.googleusercontent.com',
  }),
  scopes: ['email'],
  offlineAccess: true,
});

export const CreateUserWithEmailAndPassword = ({
  email,
  password,
  setShowProgressBar,
  handleOkey,
}) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      setShowProgressBar(true);

      userCredential.user
        .sendEmailVerification()
        .then(() => {
          Alert.alert(
            'Bilgilendirme',
            `Giriş yapabilmek için ${userCredential.user.email} adresine gönderdiğimiz e-postadaki bağlantıya tikla.`,
            [
              {
                text: 'Tamam',
                onPress: () => handleOkey(),
              },
            ],
          );
        })
        .then(() => {
          SignOut();
          setShowProgressBar(false);
        });
    })

    .catch(error => {
      setShowProgressBar(false);

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Uyarı', 'Bu mail adresi kullanılıyor!');
      }

      if (error.code === 'auth/user-not-found') {
        Alert.alert('Uyarı', 'Lütfen geçerli email ve şifre giriniz!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Uyarı', 'Geçerli bir mail adresi giriniz!');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Uyarı', 'Şifre hatalı');
      }
    });
};

export const SignIn = ({email, password, setShowProgressBar}) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      if (!user.user.emailVerified)
        return (
          Alert.alert(
            'Uyarı',
            'Lütfen mail adresinizi doğrulayın',

            [
              {
                text: 'Tamam',
                style: 'cancel',
                onPress: () => {
                  SignOut();
                  setShowProgressBar(false);
                },
              },
              {
                text: 'Tekrar gönder',
                style: 'default',
                onPress: () => {
                  console.log('Evet seçeneği seçildi.');
                  auth()
                    .currentUser.sendEmailVerification()
                    .then(() => {
                      Alert.alert(
                        'Bilgilendirme',
                        'Hesabı doğrulamak için mail gönderilmiştir.',
                      );
                    })
                    .finally(() => {
                      SignOut();
                      setShowProgressBar(false);
                    });
                },
              },
            ],
            {cancelable: false},
          ),
          console.log('User account created & signed in!')
        );
      setShowProgressBar(true);
    })
    .catch(error => {
      setShowProgressBar(false);

      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Uyarı', 'Bu mail adresi kullanılıyor!');
      }

      if (error.code === 'auth/user-not-found') {
        Alert.alert('Uyarı', 'Lütfen geçerli email ve şifre giriniz!');
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

export const SignInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

export const SignOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    });
};

export const getUserInfoByEmail = async email => {
  try {
    const querySnapshot = await firestore()
      .collection('UserInfo')
      .where('email', '==', email)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const userInfo = await querySnapshot.docs[0].data();

    console.log('Kullanıcı bilgileri:', userInfo);

    return userInfo;
  } catch (error) {
    return null;
  }
};
