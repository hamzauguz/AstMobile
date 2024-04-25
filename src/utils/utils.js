import auth from '@react-native-firebase/auth';
import {Alert, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {IOS_GOOGLE_WEB_CLIENT_ID, ANDROID_GOOGLE_WEB_CLIENT_ID} from '@env';
import seedrandom from 'seedrandom';

GoogleSignin.configure({
  webClientId: Platform.select({
    ios: IOS_GOOGLE_WEB_CLIENT_ID,
    android: ANDROID_GOOGLE_WEB_CLIENT_ID,
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

    return {...userInfo, collectionId: querySnapshot.docs[0].id};
  } catch (error) {
    return null;
  }
};

export const getUserPostsByEmail = async userId => {
  try {
    const querySnapshot = await firestore()
      .collection('Posts')
      .where('userId', '==', userId)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const posts = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      collectionId: doc.id,
    }));
    console.log('posts: ', posts);
    return posts;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

export const getUserInfosCollection = async () => {
  try {
    const querySnapshot = await firestore().collection('UserInfo').get();

    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });
    return objectsArray;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getPostsCollection = async postsPerLoad => {
  try {
    const querySnapshot = await firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      .limit(postsPerLoad)
      .get();

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const posts = [];
    querySnapshot.forEach(user => {
      posts.push(user.data());
    });
    return {posts, lastVisible};
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getMorePostsCollection = async (startAfter, postsPerLoad) => {
  try {
    const querySnapshot = await firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      .startAfter(startAfter)
      .limit(postsPerLoad)
      .get();

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const posts = [];
    querySnapshot.forEach(user => {
      posts.push(user.data());
    });
    return {posts, lastVisible};
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getMoreUserInfosCollection = async () => {
  try {
    const querySnapshot = await firestore()
      .collection('UserInfo')
      // .startAfter(startAfter)
      // .limit(postsPerLoad)
      .get();

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });
    console.log(objectsArray);
    return {objectsArray, lastVisible};
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getHoroscopesCollection = async () => {
  try {
    const querySnapshot = await firestore()
      .collection('Horoscopes')
      .orderBy('id', 'asc')
      .get();
    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });
    console.log(objectsArray);
    return objectsArray;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getHoroscopesInfoCollection = async () => {
  try {
    const querySnapshot = await firestore().collection('HoroscopesInfo').get();
    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });

    const seed = Math.random().toString();
    const rng = seedrandom(seed);
    const randomIndex = Math.floor(rng() * objectsArray.length);
    const randomItem = objectsArray[randomIndex];

    console.log(randomItem);
    return randomItem;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getCitiesCollection = async () => {
  try {
    const querySnapshot = await firestore()
      .collection('Cities')
      .orderBy('cityName', 'asc')
      .get();
    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });
    console.log(objectsArray);
    return objectsArray;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};

export const getImportantDates = async () => {
  try {
    const querySnapshot = await firestore().collection('ImportantDates').get();
    const objectsArray = [];
    querySnapshot.forEach(user => {
      objectsArray.push(user.data());
    });
    console.log(objectsArray);
    return objectsArray;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
};
