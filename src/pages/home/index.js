import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {SignOut, getUserInfoByEmail} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../utils/firebase';

const Home = () => {
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('useremail');

        if (userEmail !== null) {
          setUserEmail(userEmail);
        }
      } catch (error) {
        console.log(error); // Hata durumunda işlemleri yönetebilirsiniz
      }
    };

    getData();
  }, []);
  getUserInfoByEmail(userEmail);

  return (
    <Container>
      <SafeAreaView>
        <TouchableOpacity style={{top: 50}} onPress={() => SignOut()}>
          <Text style={{backgroundColor: 'red'}}>UserInfo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
