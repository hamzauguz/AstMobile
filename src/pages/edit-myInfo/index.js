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
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import InputWithLabel from '../../components/input-with-label';
import LinearGradient from 'react-native-linear-gradient';
import CityModal from '../../components/city-modal';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {phoneNumberRegex} from '../../utils/regex';
import {getUserInfoByEmail} from '../../utils/utils';
import HoroscopesModal from '../../components/horoscopes-modal';
import RNPickerSelect from 'react-native-picker-select';
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import {getBirthdateToHoroscopeDate} from '../../utils/helpers';

const EditMyInfo = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [dateTime, setDateTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [progressBar, setProgressBar] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalHoroscopeVisible, setModalHoroscopeVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHoroscope, setSelectedHoroscope] = useState('');
  const {user} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);

  function convertToISOTime(timeString) {
    const now = new Date();
    const [hour, minute, second] = timeString.split(':').map(Number);
    now.setHours(hour);
    now.setMinutes(minute);
    now.setSeconds(second);

    return now;
  }

  useEffect(() => {
    const userInfoControl = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
        setFormData({fullName: res.fullName, phone: res.phone});
        setDate(new Date(res.birthdate, 0));
        setSelectedCity(res.country);
        setSelectedHoroscope(res.horoscope);
        setDateTime(convertToISOTime(res.birthtime));
      });
    };
    userInfoControl();
  }, [user]);

  const handleCitySelect = city => {
    setSelectedCity(city);
  };
  const handleHoroscopeSelect = horoscope => {
    setSelectedHoroscope(horoscope);
  };

  console.log('userinfo: ', userInfo);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleHoroscopeModal = () => {
    setModalHoroscopeVisible(!isModalHoroscopeVisible);
  };
  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  console.log('moment: ', moment(date).dayOfYear(), moment(date).month() + 1);

  const updateUserInfo = async () => {
    try {
      if (formData.fullName == '' || formData.phone == '' || selectedCity == '')
        return Alert.alert('Bilgilendirme', 'Lütfen tüm alanları doldurunuz.');
      setProgressBar(true);

      const docRef = await doc(db, 'UserInfo', String(userInfo.collectionId));

      await updateDoc(docRef, {
        fullName: formData.fullName,
        phone: formData.phone,
        country: selectedCity,
        birthdate: date.getFullYear(),
        birthtime: dateTime.toLocaleTimeString('tr-TR'),
        horoscope: selectedHoroscope,
        // email: user.email,
      });

      Alert.alert('Tebrikler', 'Bilgileriniz güncellenmiştir');
      // navigation.navigate('Dashboard');
      setProgressBar(false);
    } catch (e) {
      console.error('Error updating document: ', e);
      setProgressBar(false);
    }
  };

  console.log('year date: ', date);

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
          iconTitle={'Bilgilerimi Düzenle'}
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
            label={'Ad & Soyad'}
            placeholder={'Adınızı ve soyadınızı giriniz.'}
            value={formData.fullName}
            onChangeText={value => handleInputChange('fullName', value)}
          />
          <View style={styles.itemwithLabel}>
            <Text style={styles.labelStyle}>Tel No</Text>
            <MaskInput
              style={[styles.customButton, {fontSize: 16}]}
              placeholderTextColor={'white'}
              value={formData.phone}
              // onChangeText={(masked, unmasked) => {
              //   setPhone(masked); // you can use the unmasked value as well

              //   // assuming you typed "9" all the way:
              //   console.log(masked); // (99) 99999-9999
              //   console.log(unmasked); // 99999999999
              // }}
              onChangeText={(masked, unmasked) =>
                handleInputChange('phone', unmasked)
              }
              mask={phoneNumberRegex}
            />
          </View>
          <View style={styles.itemwithLabel}>
            <Text style={styles.labelStyle}>Şehir</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.customButton}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                {selectedCity === '' ? 'Şehir Seçiniz.' : selectedCity}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemwithLabel}>
            <Text style={styles.labelStyle}>Doğum Tarihi</Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => setOpen(true)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                {date.getFullYear()}
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
                horoscopeValue={selectedHoroscope}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.itemwithLabel}>
            <Text style={styles.labelStyle}>Doğum Saati</Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => setOpenTime(true)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                {dateTime.toLocaleTimeString()}
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
                <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                  Bilgilerimi Düzenle
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

          <DatePicker
            modal
            mode="time"
            open={openTime}
            date={dateTime}
            androidVariant="iosClone"
            onConfirm={date => {
              console.log('date:22: ', date);
              setOpenTime(false);
              setDateTime(date);
              // convertToISOTime(res.birthtime)
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
            locale="tr"
          />
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
          <CityModal
            visible={isModalVisible}
            onClose={toggleModal}
            onSelectCity={handleCitySelect}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
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
});
