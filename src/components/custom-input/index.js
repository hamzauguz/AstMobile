import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import InputRightIcon from '../input-right-icon';

const CustomInput = ({
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
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {inputRightContainer && (
        <InputRightIcon onPress={inputRightClick} icon={inputRightIcon} />
      )}
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
