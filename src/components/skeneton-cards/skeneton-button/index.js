import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '@thevsstech/react-native-skeleton';
import {windowWidth} from '../../../utils/helpers';

const SkenetonButton = () => {
  return (
    <Skeleton
      speed={1000}
      backgroundColor="#8B5DB6BF"
      highlightColor="#FFFFFFBF">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              borderRadius: 10,
              width: windowWidth - 30,
              height: 60,
              borderRadius: 20,
            },
          ]}
        />
      </View>
    </Skeleton>
  );
};

export default SkenetonButton;

const styles = StyleSheet.create({});
