import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const LoginWithGoogleButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.googleButton}>
      <AntDesignIcon
        style={{width: '20%'}}
        size={30}
        name={'google'}
        color={'white'}
      />
      <Text
        style={{
          color: 'white',
          width: '60%',
          fontSize: 18,
          fontFamily: 'EBGaramond-Bold',
        }}>
        Google ile Giriş Yap
      </Text>
    </TouchableOpacity>
  );
};

export default LoginWithGoogleButton;

const styles = StyleSheet.create({
  googleButton: {
    width: '90%',
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'purple',
    marginTop: 20,
    flexDirection: 'row',
  },
});
