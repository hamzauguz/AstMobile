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
import {getUserInfoByEmail} from '../../utils/utils';
import moment from 'moment';
import {windowHeight, windowWidth} from '../../utils/helpers';
import OptionsMenu from 'react-native-option-menu';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  moment.locale('tr');
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoControl = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
      });
    };
    userInfoControl();
  }, [user]);

  console.log('windowHeight: ', windowHeight);
  console.log('windowWidth: ', windowWidth);
  const EditMyInfoNavigate = () => navigation.navigate('EditMyInfo');
  const EditMyPasswordNavigate = () => navigation.navigate('EditMyPassword');
  const EditMyPhotoNavigate = () => navigation.navigate('EditMyPhoto');
  const deletePost = () => alert('delete post');

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
              options={[
                'Bilgilerimi Düzenle',
                'Profil Fotoğrafımı Değiştir',
                'Şifremi Değiştir',
                'Cancel',
              ]}
              actions={[
                EditMyInfoNavigate,
                EditMyPasswordNavigate,
                EditMyPhotoNavigate,
                deletePost,
              ]}
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
              src={user.photoURL}
            />
          </View>
          <View
            style={{
              flex: 2,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              top: windowHeight / 13.34,
            }}>
            <TouchableOpacity
              // onPress={selectImage}
              style={{backgroundColor: 'red'}}>
              <Text>Profil Fotoğrafı Yükle</Text>
            </TouchableOpacity>
            <View style={styles.centerContainer}>
              <View style={styles.centerView}>
                <Text>{new Date().getFullYear() - userInfo?.birthdate}</Text>
              </View>
              <View style={styles.centerView}>
                <Text>{userInfo?.horoscope}</Text>
              </View>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.centerView}>
                <Text>{userInfo?.country}</Text>
              </View>
              <View style={styles.centerView}>
                <Text>{userInfo?.birthtime}</Text>
              </View>
            </View>
          </View>
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
            }}>
            <Text>Burcuna göre günlük bilgiler</Text>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Profile;
