import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/container';
import {SignOut, getUserInfoByEmail} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);

  useEffect(() => {
    const userInfoControl = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        if (res === null) {
          navigation.navigate('UserInfo');
        }
      });
    };
    userInfoControl();
  }, [user]);

  return (
    <Container>
      <SafeAreaView>
        {userLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <TouchableOpacity style={{top: 50}} onPress={() => SignOut()}>
            <Text style={{backgroundColor: 'red'}}>UserInfo</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
