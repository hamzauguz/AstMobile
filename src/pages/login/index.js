import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/container';

const Login = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{backgroundColor: 'red'}}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
