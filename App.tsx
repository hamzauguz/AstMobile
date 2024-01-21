import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './router/routes';
import {Provider} from 'react-redux';
import store from './src/store';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
      </View>
    </Provider>
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
