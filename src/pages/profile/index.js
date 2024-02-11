import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../components/custom-header';
import styles from './styles';
import {useSelector} from 'react-redux';
import {getUserInfoByEmail} from '../../utils/utils';

const Profile = () => {
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

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.headerStyle}
          iconRight={
            <TouchableOpacity>
              <AntDesignIcon name="setting" size={30} color="black" />
            </TouchableOpacity>
          }
        />
        <View style={styles.topContainer} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 30 : 50,
            }}>
            <Image
              style={{
                width: 120,
                height: 120,
                backgroundColor: 'gray',
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                alignContent: 'center',
                overflow: 'hidden',
                resizeMode: 'contain',
                borderColor: 'purple',
                borderWidth: 5,
              }}
            />
          </View>
          <View
            style={{
              flex: 2,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              top: 50,
            }}>
            <View style={styles.centerContainer}>
              <View style={styles.centerView}>
                <Text>{userInfo?.birthdate}</Text>
              </View>
              <View style={styles.centerView}>
                <Text>Burç</Text>
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
