import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Routes from './router/routes';
import 'react-native-gesture-handler';
import Container from './src/components/container';

const App = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
