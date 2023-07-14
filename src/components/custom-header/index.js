import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomHeader = ({iconLeft, iconTitle, containerStyle}) => {
  return (
    <View
      style={[
        containerStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 50,
        }}>
        <View>{iconLeft}</View>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',

            left: 10,
          }}>
          {iconTitle}
        </Text>
      </View>
      <View style={{width: '50%'}}></View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
