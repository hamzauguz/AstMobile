import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import {SignOut} from '../../utils/utils';

const Home = () => {
  return (
    <Container>
      <SafeAreaView>
        <TouchableOpacity style={{top: 50}} onPress={() => SignOut()}>
          <Text style={{backgroundColor: 'red'}}>Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
