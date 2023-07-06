import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Routes from './router/routes';
import 'react-native-gesture-handler';
import Container from './src/components/container';
import auth from '@react-native-firebase/auth';

const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
