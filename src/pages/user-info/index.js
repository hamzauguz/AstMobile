import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SignOut} from '../../utils/utils';
import Container from '../../components/container';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaskInput from 'react-native-mask-input';
import {phoneNumberRegex} from '../../utils/regex';
import InputWithLabel from '../../components/input-with-label';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CityModal from '../../components/city-modal';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from 'react-native-step-indicator';
import {addDoc, collection, db} from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  formatWithoutSecondTime,
  getBirthdateToHoroscopeDate,
  windowWidth,
} from '../../utils/helpers';
import styles from './styles';

moment.locale('tr');

const labels = ['Ad & Soyad', 'Tel & Şehir', 'Doğum Tarihi & Saati'];
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
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const {user} = useSelector(state => state.user);
  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '',
    city: '',
  });

  const handleCitySelect = city => {
    setUserForm(prevState => ({
      ...prevState,
      city,
    }));
  };

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
        userForm.city == ''
      )
        return Alert.alert('Bilgilendirme', 'Lütfen tüm alanları doldurunuz.');
      setProgressBar(true);

      await addDoc(collection(db, 'UserInfo'), {
        fullName: userForm.fullName,
        phone: userForm.phone,
        country: userForm.city,
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
    } catch (e) {
      setProgressBar(false);
    }
  };

  const backStepPosition = () => {
    if (currentPosition >= 1) {
      setCurrentPosition(prev => prev - 1);
    }
  };
  const nextStepPosition = () => {
    if (currentPosition === 0 && userForm.fullName === '') {
      Alert.alert('Uyarı', 'Lütfen isminizi giriniz.');
    } else if (
      currentPosition === 1 &&
      (userForm.phone === '' ||
        userForm.phone.length !== 10 ||
        userForm.city === '')
    ) {
      Alert.alert('Uyarı', 'Lütfen Tel & Şehir bilgilerinizi eksiksiz giriniz');
    } else {
      setCurrentPosition(prev => prev + 1);
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
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}
          extraHeight={130}
          scrollEnabled
          extraScrollHeight={Platform.OS === 'ios' ? 130 : 0}
          resetScrollToCoords={{x: 0, y: 0}}
          style={{width: '100%', flexGrow: 1, marginTop: 30}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={3}
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
                <View style={styles.itemwithLabel}>
                  <Text style={styles.labelStyle}>Tel No</Text>
                  <MaskInput
                    style={[styles.customButton, {fontSize: 16, marginTop: 5}]}
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
                    <Text style={styles.citySelectTextStyle}>
                      {userForm.city === '' ? 'Şehir Seçiniz.' : userForm.city}
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
            {currentPosition === 2 && (
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

export default UserInfo;
