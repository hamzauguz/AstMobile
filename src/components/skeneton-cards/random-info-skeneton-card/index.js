import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';
import {windowWidth} from '../../../utils/helpers';

const RandomInfoSkenetonCard = () => {
  return (
    <Skeleton backgroundColor="#BFBAFC">
      <View
        style={{
          flex: 1.1,
          //   height: 100,
          justifyContent: 'center',
          alignContent: 'flex-end',
          alignItems: 'center',
          marginTop: 200,
          borderRadius: 10,
          bottom: 20,
          margin: 5,
        }}>
        <View
          style={{
            borderRadius: 10,
            width: windowWidth - 40,
            flex: 1,
          }}
        />
      </View>
    </Skeleton>
  );
};

export default RandomInfoSkenetonCard;

const styles = StyleSheet.create({});
