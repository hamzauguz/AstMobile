import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({placeholder, containerStyle}) => {
  return (
    <View
      style={[
        containerStyle,
        {
          width: '90%',
        },
      ]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'white'}
        style={styles.textStyle}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textStyle: {
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: 'purple',
    borderWidth: 2,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
  },
});
