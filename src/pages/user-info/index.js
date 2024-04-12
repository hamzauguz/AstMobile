import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaskInput from 'react-native-mask-input';
import {phoneNumberRegex} from '../../utils/regex';
import InputWithLabel from '../../components/input-with-label';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from 'react-native-step-indicator';
import {addDoc, collection, db} from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import {GOOGLE_MAPS_URL, GOOGLE_PLACES_API_KEY} from '@env';

import {
  formatWithoutSecondTime,
  getBirthdateToHoroscopeDate,
} from '../../utils/helpers';

import styles from './styles';
import {PERMISSIONS, request} from 'react-native-permissions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

moment.locale('tr');

const labels = [
  'Ad & Soyad',
  'Profil Fotoğraf',
  'Tel & Şehir',
  'Doğum Tarihi & Saati',
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 32,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'white',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'white',
  stepStrokeUnFinishedColor: 'purple',
  separatorFinishedColor: 'purple',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'purple',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: 'black',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelCurrentColor: 'white',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: 'white',
  labelSize: 13,
  currentStepLabelColor: 'white',
};

const UserInfo = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [birthTime, setBirthTime] = useState(new Date());
  const [openBirthTimePicker, setOpenBirthTimePicker] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [imageProgressBar, setImageProgressBar] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [validateSelectPhoto, setValidateSelectPhoto] = useState(false);
  const refRBSheet = useRef();
  const refRBSheetGender = useRef();
  const [selectedImage, setSelectedImage] = useState({
    path: '',
  });
  const [userProfilePhotoURL, setUserProfilePhotoURL] = useState('');
  const {user} = useSelector(state => state.user);
  console.log('user: ', user);
  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '90',
    location: null,
    gender: '',
  });

  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  useEffect(() => {
    userForm.gender === 'Male'
      ? setSelectedImage({
          path: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/userProfilePhotos%2Favatar-male.jpg?alt=media&token=a596ffea-487e-425c-ae1b-616569f08934',
        })
      : setSelectedImage({
          path: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/userProfilePhotos%2Favatar-photo.jpg?alt=media&token=c6dc6eef-a68f-467f-8aac-1efc786fb08b',
        });
  }, [userForm.gender]);

  const reference = storage().ref(
    `userProfilePhotos/${
      Platform.OS === 'ios'
        ? `${selectedImage?.modificationDate}-${user?.uid}`
        : selectedImage?.modificationDate
    }-${user?.uid}`,
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (field, value) => {
    setUserForm(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  const navigation = useNavigation();
  const addUserInfo = async () => {
    try {
      if (
        userForm.fullName == '' ||
        userForm.phone == '' ||
        userForm.location == null
      ) {
        Alert.alert('Bilgilendirme', 'Lütfen tüm alanları doldurunuz.');
      } else if (new Date().getFullYear() - date.getFullYear() < 16) {
        Alert.alert('Bilgilendirme', 'Yaş sınırı 16');
      } else {
        setProgressBar(true);

        await addDoc(collection(db, 'UserInfo'), {
          fullName: userForm.fullName,
          phone: {number: userForm.phone, verified: false},
          location: userForm.location,
          gender: userForm.gender,
          role: {id: 1, title: 'user'},
          profilePhoto: userProfilePhotoURL,
          birthdate: moment(date).year(),
          birthtime: formatWithoutSecondTime(birthTime),
          horoscope: getBirthdateToHoroscopeDate(
            moment(date).date(),
            moment(date).month() + 1,
          ),
          email: user.email,
        }).then(() => {
          Alert.alert('Tebrikler', 'Kaydınız tamamlanmıştır');
          navigation.navigate('Dashboard');
          setProgressBar(false);
        });
      }
    } catch (e) {
      setProgressBar(false);
    }
  };

  const backStepPosition = () => {
    if (currentPosition >= 1) {
      setCurrentPosition(prev => prev - 1);
    }
  };
  const nextStepPosition = async () => {
    if (
      currentPosition === 0 &&
      (userForm.fullName === '' || userForm.gender === '')
    ) {
      Alert.alert('Uyarı', 'Lütfen bilgilerinizi eksiksiz giriniz.');
    } else if (currentPosition === 1 && validateSelectPhoto === false) {
      Alert.alert('Uyarı', 'Lütfen profil fotoğrafınızı seçiniz');
    } else if (currentPosition === 1) {
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
        setCurrentPosition(2);
      });
    } else if (
      currentPosition === 2 &&
      (userForm.phone === '' ||
        userForm.phone.length !== 12 ||
        userForm.location === null)
    ) {
      Alert.alert('Uyarı', 'Lütfen Tel & Konum bilgilerinizi eksiksiz giriniz');
    } else {
      setCurrentPosition(prev => prev + 1);
    }
  };

  const onPressGender = () => {
    refRBSheetGender.current.open();
  };

  const takePhotoFromCamera = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {});
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      useFrontCamera: true,
    }).then(image => {
      setValidateSelectPhoto(true);
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
      setValidateSelectPhoto(true);
      setSelectedImage(image);
      refRBSheet.current.close();
    });
  };

  const RenderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Fotoğraf Yükle</Text>
        <Text style={styles.panelSubtitle}>Profil Resminizi Seçin</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Fotoğraf Çekimi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Galeriden Fotoğraf Seçimi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => refRBSheet.current.close()}>
        <Text style={styles.panelButtonTitle}>İptal</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    Geolocation.requestAuthorization();
    navigator.geolocation = require('@react-native-community/geolocation');
  }, []);

  const handlePlaceSelect = async (data, details) => {
    try {
      const placeId = data.place_id;

      const response = await fetch(
        `${GOOGLE_MAPS_URL}?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`,
      );

      const result = await response.json();

      const location = result.result.geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      handleInputChange('location', {...data, latitude, longitude});
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.customHeaderStyle}
          iconLeft={
            <HeaderButton
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Bilgilerim'}
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
        <RBSheet
          height={300}
          ref={refRBSheetGender}
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                handleInputChange('gender', 'Male');
                refRBSheetGender.current.close();
              }}
              style={{
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/userProfilePhotos%2Fmale-gender-symbol.png?alt=media&token=d9fb017e-b398-4d5f-ab94-36def0f1bfb2',
                  priority: FastImage.priority.high,
                }}
                style={{height: 140, width: 140}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleInputChange('gender', 'Female');
                refRBSheetGender.current.close();
              }}
              style={{
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/userProfilePhotos%2Ffemale-gender-symbol.jpg?alt=media&token=a7c514ee-f074-46ac-b3e7-e3286c5a85f0',
                  priority: FastImage.priority.high,
                }}
                style={{height: 200, width: 200}}
              />
            </TouchableOpacity>
          </View>
        </RBSheet>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          extraHeight={130}
          scrollEnabled
          extraScrollHeight={Platform.OS === 'ios' ? 130 : 0}
          resetScrollToCoords={{x: 0, y: 0}}
          style={{width: '100%', flexGrow: 1, marginTop: 30}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={4}
            labels={labels}
          />
          <View style={{marginTop: 30}}>
            {currentPosition === 0 && (
              <>
                <InputWithLabel
                  label={'Ad & Soyad'}
                  placeholder={'Adınızı ve soyadınızı giriniz.'}
                  value={userForm.fullName}
                  onChangeText={value => handleInputChange('fullName', value)}
                />
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Cinsiyet</Text>
                  <TouchableOpacity
                    onPress={onPressGender}
                    style={styles.customButton}>
                    <Text style={styles.citySelectTextStyle}>
                      {userForm.gender === ''
                        ? 'Cinsiyet Seçiniz'
                        : userForm.gender === 'Male'
                        ? 'Erkek'
                        : 'Kadın'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stepButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButtonStyle}
                    onPress={backStepPosition}>
                    <Text style={{color: 'white'}}>Geri</Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['#b717d2', '#ce25ab']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.nextButtonStyle}>
                    <TouchableOpacity
                      onPress={nextStepPosition}
                      style={styles.button}>
                      <Text style={styles.saveInfoTextStyle}>Devam</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
            {currentPosition === 1 && (
              <>
                <View
                  style={{
                    alignItems: 'center',
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
                  <TouchableOpacity
                    style={styles.backButtonStyle}
                    onPress={backStepPosition}>
                    <Text style={{color: 'white'}}>Geri</Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['#b717d2', '#ce25ab']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.nextButtonStyle}>
                    <TouchableOpacity
                      onPress={nextStepPosition}
                      style={styles.button}>
                      {imageProgressBar ? (
                        <ActivityIndicator size={'large'} color={'white'} />
                      ) : (
                        <Text style={styles.saveInfoTextStyle}>Devam</Text>
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
            {currentPosition === 2 && (
              <>
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Tel No</Text>
                  <MaskInput
                    style={[styles.customButton, {fontSize: 16, marginTop: 5}]}
                    placeholderTextColor={'white'}
                    value={userForm.phone}
                    keyboardType="number-pad"
                    onChangeText={(masked, unmasked) =>
                      handleInputChange('phone', unmasked)
                    }
                    mask={phoneNumberRegex}
                  />
                </View>
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Şehir</Text>
                  <GooglePlacesAutocomplete
                    styles={{
                      container: {width: '90%'},
                      textInput: styles.customButton,
                      description: {color: 'black'},
                    }}
                    placeholder="Konum Seçiniz"
                    onPress={handlePlaceSelect}
                    query={{
                      key: GOOGLE_PLACES_API_KEY,
                      language: 'en',
                    }}
                    fetchDetails={true}
                    textInputProps={{
                      value:
                        firstRender.current && userForm?.location?.description,
                      onChangeText: newText => {
                        if (firstRender.current) {
                          handleInputChange('location', newText);
                        }
                      },
                      defaultValue: userForm?.location?.description,
                      placeholderTextColor: 'white',
                    }}
                    currentLocation={true}
                    currentLocationLabel="Şuanki Konumunuz"
                  />
                </View>
                <View style={styles.stepButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButtonStyle}
                    onPress={backStepPosition}>
                    <Text style={{color: 'white'}}>Geri</Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['#b717d2', '#ce25ab']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.nextButtonStyle}>
                    <TouchableOpacity
                      onPress={nextStepPosition}
                      style={styles.button}>
                      <Text style={styles.saveInfoTextStyle}>Devam</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
            {currentPosition === 3 && (
              <>
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Doğum Tarihi</Text>
                  <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => setOpen(true)}>
                    <Text style={styles.dateSelectStyle}>
                      {date.toLocaleDateString('tr-TR')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  androidVariant="iosClone"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  locale="tr"
                />
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Doğum Saati</Text>
                  <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => setOpenBirthTimePicker(true)}>
                    <Text style={styles.dateSelectStyle}>
                      {formatWithoutSecondTime(birthTime)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.stepButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButtonStyle}
                    onPress={backStepPosition}>
                    <Text style={{color: 'white'}}>Geri</Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['#b717d2', '#ce25ab']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.nextButtonStyle}>
                    <TouchableOpacity
                      onPress={() => addUserInfo()}
                      style={styles.button}>
                      {progressBar ? (
                        <ActivityIndicator size={'large'} color={'white'} />
                      ) : (
                        <Text style={styles.saveInfoTextStyle}>
                          Bilgilerimi Kaydet
                        </Text>
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
          </View>
          <DatePicker
            modal
            mode="time"
            open={openBirthTimePicker}
            date={birthTime}
            androidVariant="iosClone"
            onConfirm={date => {
              setOpenBirthTimePicker(false);
              setBirthTime(date);
            }}
            onCancel={() => {
              setOpenBirthTimePicker(false);
            }}
            locale="tr"
            format="DD/MM/YYY"
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default UserInfo;
