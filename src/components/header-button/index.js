import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HeaderButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'black',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 10,
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({});
