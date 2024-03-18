import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomHeader = ({
  iconLeft,
  iconTitle,
  titleStyle,
  containerStyle,
  iconRight,
}) => {
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
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 50,
        }}>
        <View>{iconLeft}</View>
        <Text
          style={[
            titleStyle,
            {
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              left: 10,
            },
          ]}>
          {iconTitle}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={{color: 'white', textAlign: 'right', right: 30}}>
          {iconRight}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
