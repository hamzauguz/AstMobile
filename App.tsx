import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './router/routes';
import 'react-native-gesture-handler';
import {auth, onAuthStateChanged} from './src/utils/firebase';

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
