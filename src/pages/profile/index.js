import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Container from '../../components/container';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../components/custom-header';
import styles from './styles';
import {useSelector} from 'react-redux';
import {
  getHoroscopesInfoCollection,
  getUserInfoByEmail,
} from '../../utils/utils';
import moment from 'moment';
import {windowHeight, windowWidth} from '../../utils/helpers';
import OptionsMenu from 'react-native-option-menu';
import {useNavigation} from '@react-navigation/native';
import AvatarSkeneton from '../../components/skeneton-cards/avatar-skeneton';
import ProfileSkenetonCard from '../../components/skeneton-cards/profile-skeneton-card';
import RandomInfoSkenetonCard from '../../components/skeneton-cards/random-info-skeneton-card';

const Profile = () => {
  moment.locale('tr');
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [horoscopeInfo, setHoroscopeInfo] = useState('');

  useEffect(() => {
    const userInfoControl = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
      });
      await getHoroscopesInfoCollection().then(res => {
        setHoroscopeInfo(res.label);
      });
    };
    userInfoControl();
  }, [user]);

  const EditMyInfoNavigate = () => navigation.navigate('EditMyInfo');
  const EditMyPasswordNavigate = () => navigation.navigate('EditMyPassword');

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.headerStyle}
          iconRight={
            <OptionsMenu
              customButton={
                <AntDesignIcon name="setting" size={30} color="black" />
              }
              // destructiveIndex={3}
              options={['Bilgilerimi Düzenle', 'Şifremi Değiştir', 'Cancel']}
              actions={[EditMyInfoNavigate, EditMyPasswordNavigate]}
            />
          }
        />
        <View style={styles.topContainer} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View>
            {userInfo === null ? (
              <AvatarSkeneton />
            ) : (
              <Image
                style={{
                  width: windowWidth > 400 ? 120 : 100,
                  height: windowWidth > 400 ? 120 : 100,
                  backgroundColor: 'gray',
                  borderRadius: windowWidth > 400 ? 60 : 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  alignContent: 'center',
                  overflow: 'hidden',
                  resizeMode: 'contain',
                  borderColor: 'purple',
                  borderWidth: 5,
                }}
                // src={user.photoURL}
                source={require('../../../assets/misis-lady.jpg')}
                resizeMode="cover"
              />
            )}
          </View>
          <View
            style={{
              flex: 2,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              top: windowHeight / 13.34,
            }}>
            <View style={styles.centerContainer}>
              {userInfo === null ? (
                <>
                  <ProfileSkenetonCard />
                  <ProfileSkenetonCard />
                </>
              ) : (
                <>
                  <View style={styles.centerView}>
                    <Text style={styles.dorianFontStyle}>
                      {new Date().getFullYear() - userInfo?.birthdate}
                    </Text>
                  </View>
                  <View style={styles.centerView}>
                    <Text style={styles.dorianFontStyle}>
                      {userInfo?.horoscope}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.centerContainer}>
              {userInfo === null ? (
                <>
                  <ProfileSkenetonCard />
                  <ProfileSkenetonCard />
                </>
              ) : (
                <>
                  <View style={styles.centerView}>
                    <Text style={styles.dorianFontStyle}>
                      {userInfo?.country}
                    </Text>
                  </View>
                  <View style={styles.centerView}>
                    <Text style={styles.dorianFontStyle}>
                      {userInfo?.birthtime}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
          {horoscopeInfo === null ? (
            <RandomInfoSkenetonCard />
          ) : (
            <View
              style={{
                flex: 1,
                width: '90%',
                height: 100,
                backgroundColor: '#BFBAFC',
                justifyContent: 'center',
                alignContent: 'flex-end',
                alignItems: 'center',
                marginTop: 200,
                borderRadius: 10,
                bottom: 20,
                padding: 10,
              }}>
              <Text style={styles.dorianFontStyle}>{horoscopeInfo}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Profile;
