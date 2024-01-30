import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Profile = () => {
  return (
    <Container>
      <SafeAreaView style={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#BFBAFC',
            position: 'absolute',
            width: '100%',
            height: 200,
          }}
        />
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              top: Platform.OS === 'ios' ? 70 : 130,
            }}>
            <AntDesignIcon
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                zIndex: 99,
                right: 0,
              }}
              name="edit"
              size={30}
            />
            <Image
              style={{
                width: 120,
                height: 120,
                backgroundColor: 'red',
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                alignContent: 'center',
                borderWidth: 5,
                overflow: 'hidden',
                resizeMode: 'contain',
                borderColor: 'black',
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 100,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignContent: 'flex-end',
              alignItems: 'center',
              marginTop: 200,
              borderRadius: 10,
            }}>
            <Text>Burcuna göre günlük bilgiler</Text>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
