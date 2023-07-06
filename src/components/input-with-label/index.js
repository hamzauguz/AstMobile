import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInput from '../custom-input';

const InputWithLabel = ({
  label,
  placeholder,
  containerStyle,
  value,
  onChangeText,
  inputRightContainer,
  inputRightIcon,
  secureTextEntry,
  inputRightClick,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <CustomInput
        containerStyle={styles.customInputStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        inputRightContainer={inputRightContainer}
        inputRightIcon={inputRightIcon}
        secureTextEntry={secureTextEntry}
        inputRightClick={inputRightClick}
      />
    </View>
  );
};

export default InputWithLabel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  customInputStyle: {
    marginTop: 5,
  },
  labelStyle: {
    color: 'white',
    fontSize: 18,
    width: '90%',
  },
});
