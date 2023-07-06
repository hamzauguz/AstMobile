import {StyleSheet, View} from 'react-native';
import React from 'react';
import Routes from './router/routes';
import 'react-native-gesture-handler';

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
