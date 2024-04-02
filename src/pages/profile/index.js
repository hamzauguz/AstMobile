import {Image, SafeAreaView, Text, View} from 'react-native';
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

const Profile = () => {
  moment.locale('tr');
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
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
    const unsubscribe = navigation.addListener('focus', () => {
      userInfoControl();
    });

    return unsubscribe;
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
              destructiveIndex={2}
              customButton={
                <AntDesignIcon name="setting" size={30} color="black" />
              }
              options={[
                'Bilgilerimi Düzenle',
                'Şifremi Değiştir',
                'Çıkış Yap',
                'İptal',
              ]}
              actions={[EditMyInfoNavigate, EditMyPasswordNavigate, SignOut]}
            />
          }
        />
        <View style={styles.topContainer} />
        <View style={styles.avatarView}>
          <View>
            {userInfo === null ? (
              <AvatarSkeneton />
            ) : (
              <Image
                style={styles.avatarImageStyle}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fmisis-lady.jpg?alt=media&token=ac97c720-d935-4120-9441-5d39127da786',
                }}
                resizeMode="cover"
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
