import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import {doc, updateDoc} from 'firebase/firestore';
import {getUserInfoByEmail} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {convertToISOTime} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {db} from '../../utils/firebase';

const EditMyPhoto = () => {
  const refRBSheet = useRef();

  const [imageProgressBar, setImageProgressBar] = useState(false);
  const {user} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [userProfilePhotoURL, setUserProfilePhotoURL] = useState('');
  const navigation = useNavigation();

  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    horoscope: '',
    birthDate: new Date(),
    birthTime: new Date(),
    profilePhoto: '',
  });
  const [selectedImage, setSelectedImage] = useState({
    path: '',
  });

  useEffect(() => {
    const userInfoControl = async () => {
      setPageLoading(true);
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
        setUserForm(prevState => ({
          ...prevState,
          fullName: res.fullName,
          phone: res.phone,
          city: res.country,
          horoscope: res.horoscope,
          birthDate: new Date(res.birthdate, 0),
          birthTime: convertToISOTime(res.birthtime),
          profilePhoto: res.profilePhoto,
        }));
        setPageLoading(false);
        setSelectedImage({path: res.profilePhoto});
      });
    };
    userInfoControl();
  }, [user]);

  useEffect(() => {
    if (userProfilePhotoURL !== '') {
      const uploadImageFromFireStore = async () => {
        const docRef = await doc(db, 'UserInfo', String(userInfo.collectionId));
        await updateDoc(docRef, {
          profilePhoto: userProfilePhotoURL,
        });

        Alert.alert('Bilgilendirme', 'Profil fotoğrafi değiştirildi');
        navigation.navigate('Profile');
      };
      uploadImageFromFireStore();
    }
  }, [userProfilePhotoURL]);

  const reference = storage().ref(
    `userProfilePhotos/${
      Platform.OS === 'ios'
        ? `${selectedImage?.modificationDate}-${user?.uid}`
        : selectedImage?.modificationDate
    }-${user?.uid}`,
  );

  const uploadImage = async () => {
    setImageProgressBar(true);
    const pathToFile = selectedImage?.path;
    await reference.putFile(pathToFile).then(res => {
      const encodedName = encodeURIComponent(
        Platform.OS === 'ios'
          ? res.metadata.name
          : `userProfilePhotos/${res.metadata.name}`,
      );
      setUserProfilePhotoURL(
        `https://firebasestorage.googleapis.com/v0/b/${res.metadata.bucket}/o/${encodedName}?alt=media`,
      );
      setImageProgressBar(false);
    });
  };

  const takePhotoFromCamera = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      useFrontCamera: true,
    }).then(image => {
      setSelectedImage(image);
      refRBSheet.current.close();
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setSelectedImage(image);
      refRBSheet.current.close();
    });
  };

  const RenderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => refRBSheet.current.close()}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <Container>
      {pageLoading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <SafeAreaView style={styles.safeAreaContainer}>
          <CustomHeader
            containerStyle={styles.customHeaderStyle}
            iconLeft={
              <HeaderButton
                onPress={() => navigation.goBack()}
                children={
                  <Icon size={24} name="chevron-left" color={'white'} />
                }
              />
            }
            iconTitle={'Düzenle'}
          />
          <RBSheet
            height={400}
            ref={refRBSheet}
            draggable
            dragOnContent
            useNativeDriver={false}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}
            customModalProps={{
              animationType: 'slide',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}>
            <RenderInner />
          </RBSheet>
          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <View
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 3,
                  borderColor: 'purple',
                }}>
                <ImageBackground
                  source={{
                    uri: selectedImage?.path,
                  }}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  imageStyle={{
                    borderRadius: 15,
                    borderWidth: 3,
                    borderColor: 'purple',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.stepButtonContainer}>
            <LinearGradient
              colors={['#b717d2', '#ce25ab']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.linearGradientSaveInfo}>
              <TouchableOpacity onPress={uploadImage} style={styles.button}>
                {imageProgressBar ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'EBGaramond-ExtraBold',
                    }}>
                    Fotoğrafımı Değiştir
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      )}
    </Container>
  );
};

export default EditMyPhoto;
