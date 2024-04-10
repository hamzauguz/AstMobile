import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import InputWithLabel from '../../components/input-with-label';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {phoneNumberRegex} from '../../utils/regex';
import {getUserInfoByEmail} from '../../utils/utils';
import HoroscopesModal from '../../components/horoscopes-modal';
import {doc, updateDoc} from 'firebase/firestore';
import {GOOGLE_MAPS_URL, GOOGLE_PLACES_API_KEY} from '@env';
import {db} from '../../utils/firebase';
import {
  convertToISOTime,
  formatWithoutSecondTime,
  windowHeight,
} from '../../utils/helpers';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';

const EditMyInfo = () => {
  const navigation = useNavigation();
  const [openBirthDate, setOpenBirthDate] = useState(false);

  const [openBirthTime, setOpenBirthTime] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '',
    location: null,
    horoscope: '',
    birthDate: new Date(),
    birthTime: new Date(),
  });

  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

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

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalHoroscopeVisible, setModalHoroscopeVisible] = useState(false);
  const {user} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoControl = async () => {
      setPageLoading(true);
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
        setUserForm(prevState => ({
          ...prevState,
          fullName: res.fullName,
          phone: res?.phone?.number,
          location: res.location,
          horoscope: res.horoscope,
          birthDate: new Date(res.birthdate, 0),
          birthTime: convertToISOTime(res.birthtime),
        }));
        setPageLoading(false);
      });
    };
    userInfoControl();
  }, [user]);

  const handleHoroscopeSelect = horoscope => {
    setUserForm(prevState => ({
      ...prevState,
      horoscope,
    }));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleHoroscopeModal = () => {
    setModalHoroscopeVisible(!isModalHoroscopeVisible);
  };
  const handleInputChange = (field, value) => {
    setUserForm(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateUserInfo = async () => {
    try {
      if (
        userForm.fullName == '' ||
        userForm.phone == '' ||
        userForm.city == ''
      )
        return Alert.alert('Bilgilendirme', 'Lütfen tüm alanları doldurunuz.');
      setProgressBar(true);

      const docRef = await doc(db, 'UserInfo', String(userInfo.collectionId));

      await updateDoc(docRef, {
        fullName: userForm.fullName,
        phone: {number: userForm.phone, validate: false},
        location: userForm.location,
        birthdate: userForm.birthDate.getFullYear(),
        birthtime: userForm.birthTime.toLocaleTimeString('tr-TR'),
        horoscope: userForm.horoscope,
      });

      Alert.alert('Tebrikler', 'Bilgileriniz güncellenmiştir');
      navigation.navigate('Profile');
      setProgressBar(false);
    } catch (e) {
      setProgressBar(false);
    }
  };

  return (
    <Container>
      {pageLoading ? (
        <ActivityIndicator size={'large'} color={'white'} />
      ) : (
        <SafeAreaView>
          <CustomHeader
            containerStyle={styles.headerContainerStyle}
            titleStyle={styles.headerTitleStyle}
            iconLeft={
              <HeaderButton
                onPress={() => navigation.goBack()}
                children={
                  <Icon size={24} name="chevron-left" color={'white'} />
                }
              />
            }
            iconTitle={'Bilgilerimi Düzenle'}
          />

          <ScrollView style={{height: windowHeight}}>
            <InputWithLabel
              label={'Ad & Soyad'}
              placeholder={'Adınızı ve soyadınızı giriniz.'}
              value={userForm.fullName}
              onChangeText={value => handleInputChange('fullName', value)}
            />
            <View style={styles.itemwithLabel}>
              <Text style={styles.labelStyle}>Tel No</Text>
              <MaskInput
                style={[styles.customButton, {fontSize: 16}]}
                placeholderTextColor={'white'}
                value={userForm.phone}
                onChangeText={(masked, unmasked) =>
                  handleInputChange('phone', unmasked)
                }
                mask={phoneNumberRegex}
              />
            </View>
            <View style={styles.itemwithLabel}>
              <Text style={styles.labelStyle}>Konum</Text>

              <GooglePlacesAutocomplete
                styles={{
                  container: {width: '90%'},
                  textInput: styles.customButton,
                }}
                placeholder="Konum Seçiniz"
                onPress={handlePlaceSelect}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
                fetchDetails={true}
                textInputProps={{
                  value: firstRender.current && userForm?.location?.description,
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

            <View style={styles.itemwithLabel}>
              <Text style={styles.labelStyle}>Doğum Tarihi</Text>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => setOpenBirthDate(true)}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'EBGaramond-SemiBold',
                  }}>
                  {userForm.birthDate.getFullYear()}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemwithLabel}>
              <Text style={styles.labelStyle}>Burç</Text>
              <TouchableOpacity
                onPress={toggleHoroscopeModal}
                style={styles.customButton}>
                <HoroscopesModal
                  visible={isModalHoroscopeVisible}
                  onClose={toggleHoroscopeModal}
                  onSelectHoroscope={handleHoroscopeSelect}
                  horoscopeValue={userForm.horoscope}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.itemwithLabel}>
              <Text style={styles.labelStyle}>Doğum Saati</Text>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => setOpenBirthTime(true)}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'EBGaramond-SemiBold',
                  }}>
                  {formatWithoutSecondTime(userForm.birthTime)}
                </Text>
              </TouchableOpacity>
            </View>
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
                onPress={() => updateUserInfo()}
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
                    Bilgilerimi Düzenle
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient>

            <DatePicker
              modal
              mode="time"
              open={openBirthTime}
              date={userForm.birthTime}
              androidVariant="iosClone"
              onConfirm={date => {
                setOpenBirthTime(false);
                setUserForm(prevState => ({
                  ...prevState,
                  birthTime: date,
                }));
              }}
              onCancel={() => {
                setOpenBirthTime(false);
              }}
              locale="tr"
            />
            <DatePicker
              modal
              mode="date"
              open={openBirthDate}
              date={userForm.birthDate}
              androidVariant="iosClone"
              onConfirm={date => {
                setOpenBirthDate(false);
                setUserForm(prevState => ({
                  ...prevState,
                  birthDate: date,
                }));
              }}
              onCancel={() => {
                setOpenBirthDate(false);
              }}
              locale="tr"
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </Container>
  );
};

export default EditMyInfo;

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
  labelStyle: {
    color: 'white',
    fontSize: 18,
    width: '90%',
    fontFamily: 'EBGaramond-Bold',
  },
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
    fontFamily: 'EBGaramond-SemiBold',
  },
});
