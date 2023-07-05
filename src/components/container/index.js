import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Container = ({children}) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#030A18', '#030A18', '#121341']}
        style={styles.linearGradient}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../../assets/background.jpeg')}
          style={styles.container}>
          {children}
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
});

export default Container;
