import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';
import {windowWidth} from '../../../utils/helpers';

const AvatarSkeneton = () => {
  return (
    <Skeleton backgroundColor="purple" highlightColor="#BFBAFC">
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: windowWidth > 400 ? 120 : 100,
            height: windowWidth > 400 ? 120 : 100,
            borderRadius: 50,
          }}
        />
      </View>
    </Skeleton>
  );
};

export default AvatarSkeneton;

const styles = StyleSheet.create({});
