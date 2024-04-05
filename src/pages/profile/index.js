import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../components/custom-header';
import styles from './styles';
import {useSelector} from 'react-redux';
import {
  getHoroscopesInfoCollection,
  getUserInfoByEmail,
  SignOut,
} from '../../utils/utils';
import moment from 'moment';
import OptionsMenu from 'react-native-option-menu';
import {useNavigation} from '@react-navigation/native';
import AvatarSkeneton from '../../components/skeneton-cards/avatar-skeneton';
import ProfileSkenetonCard from '../../components/skeneton-cards/profile-skeneton-card';
import RandomInfoSkenetonCard from '../../components/skeneton-cards/random-info-skeneton-card';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  moment.locale('tr');
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [horoscopeInfo, setHoroscopeInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfoControl = async () => {
      setLoading(true);
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
      });
      await getHoroscopesInfoCollection().then(res => {
        setHoroscopeInfo(res.label);
      });
      setLoading(false);
    };
    userInfoControl();
    const unsubscribe = navigation.addListener('focus', () => {
      setUserInfo(null);
      userInfoControl();
    });

    return unsubscribe;
  }, [user, navigation]);

  const EditMyInfoNavigate = () => navigation.navigate('EditMyInfo');
  const EditMyPhoto = () => navigation.navigate('EditMyPhoto');
  const EditMyPasswordNavigate = () => navigation.navigate('EditMyPassword');
  console.log('userInfo?.profilePhoto: ', userInfo?.profilePhoto);
  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.headerStyle}
          iconRight={
            <OptionsMenu
              destructiveIndex={2}
              customButton={
                <AntDesignIcon name="setting" size={30} color="black" />
              }
              options={[
                'Bilgilerimi Düzenle',
                'Fotoğrafımı Değiştir',
                'Şifremi Değiştir',
                'Çıkış Yap',
                'İptal',
              ]}
              actions={[
                EditMyInfoNavigate,
                EditMyPhoto,
                EditMyPasswordNavigate,
                SignOut,
              ]}
            />
          }
        />
        <View style={styles.topContainer} />
        <View style={styles.avatarView}>
          <View>
            {userInfo === null ? (
              <AvatarSkeneton />
            ) : (
              <FastImage
                source={{
                  uri: userInfo?.profilePhoto,
                  priority: FastImage.priority.high,
                }}
                resizeMode="cover"
                style={styles.avatarImageStyle}
              />
            )}
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.centerContainer}>
              {userInfo === null ? (
                <>
                  <ProfileSkenetonCard />
                  <ProfileSkenetonCard />
                </>
              ) : (
                <>
                  <View style={styles.centerView}>
                    <Text style={styles.garamondFontStyle}>
                      {new Date().getFullYear() - userInfo?.birthdate}
                    </Text>
                  </View>
                  <View style={styles.centerView}>
                    <Text style={styles.garamondFontStyle}>
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
                    <Text style={styles.garamondFontStyle}>
                      {userInfo?.country}
                    </Text>
                  </View>
                  <View style={styles.centerView}>
                    <Text style={styles.garamondFontStyle}>
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
            <View style={styles.randomInfoContainer}>
              <Text style={styles.garamondFontStyle}>{horoscopeInfo}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Profile;
