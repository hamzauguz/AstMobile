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
import {phoneNumberRegex} from '../../utils/regex';
import {getUserInfoByEmail} from '../../utils/utils';
import HoroscopesModal from '../../components/horoscopes-modal';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import {convertToISOTime} from '../../utils/helpers';

const EditMyInfo = () => {
  const navigation = useNavigation();
  const [openBirthDate, setOpenBirthDate] = useState(false);

  const [openBirthTime, setOpenBirthTime] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    horoscope: '',
    birthDate: new Date(),
    birthTime: new Date(),
  });

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
          phone: res.phone,
          city: res.country,
          horoscope: res.horoscope,
          birthDate: new Date(res.birthdate, 0),
          birthTime: convertToISOTime(res.birthtime),
        }));
        setPageLoading(false);
      });
    };
    userInfoControl();
  }, [user]);

  const handleCitySelect = city => {
    setUserForm(prevState => ({
      ...prevState,
      city,
    }));
  };
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
        phone: userForm.phone,
        country: userForm.city,
        birthdate: userForm.birthDate.getFullYear(),
        birthtime: userForm.birthTime.toLocaleTimeString('tr-TR'),
        horoscope: userForm.horoscope,
      });

      Alert.alert('Tebrikler', 'Bilgileriniz güncellenmiştir');
      navigation.navigate('Profile');
      setProgressBar(false);
    } catch (e) {
      console.error('Error updating document: ', e);
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
              <Text style={styles.labelStyle}>Şehir</Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.customButton}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                  {userForm.city === '' ? 'Şehir Seçiniz.' : userForm.city}
                </Text>
              </TouchableOpacity>
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
                  }}>
                  {userForm.birthTime.toLocaleTimeString()}
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
                    style={{color: 'white', fontWeight: '600', fontSize: 18}}>
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
            <CityModal
              visible={isModalVisible}
              onClose={toggleModal}
              onSelectCity={handleCitySelect}
            />
          </KeyboardAwareScrollView>
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
