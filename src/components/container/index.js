import {StyleSheet, ImageBackground, StatusBar} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../../utils/helpers';

const Container = ({children}) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#030A18', '#030A18', '#121341']}
        style={styles.linearGradient}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../../assets/background.jpg')}
          style={styles.container}>
          <LottieView
            source={require('../../../assets/lotties/bg-lottie-container.json')}
            style={{
              width: windowWidth,
              height: windowHeight,
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: 'transparent',
              elevation: Platform.OS === 'android' ? 50 : 0,
              opacity: 0.4,
            }}
            autoPlay
            loop
          />

          {children}
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
    position: 'relative',
  },
});

export default Container;
