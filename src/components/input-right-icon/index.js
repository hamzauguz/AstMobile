import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const InputRightIcon = ({icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',

        width: 50,
        height: 30,
        top: 15,
      }}>
      {icon}
    </TouchableOpacity>
  );
};

export default InputRightIcon;

const styles = StyleSheet.create({});
