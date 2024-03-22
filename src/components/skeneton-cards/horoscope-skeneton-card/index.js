import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';

const HoroscopeSkenetonCard = ({viewContainerStyle}) => {
  return (
    <Skeleton speed={1000} backgroundColor="#6768B3" highlightColor="#141848">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              borderRadius: 10,
            },
            viewContainerStyle,
          ]}
        />
        <View
          style={{
            marginLeft: Platform.OS === 'ios' ? -160 : -140,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: Platform.OS === 'ios' ? 120 : 100,
              height: Platform.OS === 'ios' ? 120 : 100,
              borderRadius: Platform.OS === 'ios' ? 60 : 50,
              bottom: 10,
            }}
          />
          <View
            style={{
              width: 70,
              height: 20,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              width: 100,
              height: 20,
              borderRadius: 4,
              top: 10,
            }}
          />
        </View>
      </View>
    </Skeleton>
  );
};

export default HoroscopeSkenetonCard;

const styles = StyleSheet.create({});
