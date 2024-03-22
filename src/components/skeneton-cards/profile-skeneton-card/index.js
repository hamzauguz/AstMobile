import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';
import {windowWidth} from '../../../utils/helpers';

const ProfileSkenetonCard = () => {
  return (
    <Skeleton backgroundColor="#BFBAFC">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
        }}>
        <View
          style={{borderRadius: 10, width: windowWidth / 2 - 30, flex: 1}}
        />
      </View>
    </Skeleton>
  );
};

export default ProfileSkenetonCard;

const styles = StyleSheet.create({});
