import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/helpers';
import LottieView from 'lottie-react-native';

const LottieLoading = ({lottieSource, bgColor}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          width: windowWidth,
          height: windowHeight,
          backgroundColor: bgColor,
          opacity: 0.2,
          zIndex: 9999,
        }}
      />
      <LottieView
        source={lottieSource}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          alignSelf: 'center',
          bottom: '5%',
          top: windowHeight / 3.5,
          opacity: 1,
          zIndex: 9999,
        }}
        autoPlay
        loop
      />
    </>
  );
};

export default LottieLoading;

const styles = StyleSheet.create({});
