import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';
import {windowHeight, windowWidth} from '../../../utils/helpers';

const CalendarSkeneton = () => {
  return (
    <Skeleton speed={1000} backgroundColor="#BFBAFC">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height:
            Platform.OS === 'ios' ? windowHeight / 2.9 : windowHeight / 2.6,
        }}></View>
    </Skeleton>
  );
};

export default CalendarSkeneton;

const styles = StyleSheet.create({});
