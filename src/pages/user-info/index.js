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

import {addDoc, collection, db} from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getBirthdateToHoroscopeDate} from '../../utils/helpers';

moment.locale('tr');
const UserInfo = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [birthTime, setBirthTime] = useState(new Date());
  const [openBirthTimePicker, setOpenBirthTimePicker] = useState(false);
  const [progressBar, setProgressBar] = useState(false);

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

  console.log('getbirtdate: ', moment(date).year());

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
        birthtime: birthTime.toLocaleTimeString('tr-TR'),
        horoscope: getBirthdateToHoroscopeDate(
          moment(date).dayOfYear(),
          moment(date).month(),
        ),
        email: user.email,
      }).then(() => {
        Alert.alert('Tebrikler', 'Kaydınız tamamlanmıştır');
        navigation.navigate('Dashboard');
        setProgressBar(false);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      setProgressBar(false);
    }
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
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
          style={{width: '100%', flexGrow: 1}}>
          <TouchableOpacity onPress={() => SignOut()}>
            <Text style={{backgroundColor: 'red'}}>Home</Text>
          </TouchableOpacity>
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
            <TouchableOpacity onPress={toggleModal} style={styles.customButton}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                {userForm.city === '' ? 'Şehir Seçiniz.' : userForm.city}
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                {birthTime.toLocaleTimeString('tr-TR')}
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
              onPress={() => addUserInfo()}
              style={styles.button}>
              {progressBar ? (
                <ActivityIndicator size={'large'} color={'white'} />
              ) : (
                <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                  Bilgilerimi Kaydet
                </Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

          <DatePicker
            modal
            mode="date"
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

const styles = StyleSheet.create({
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
});
