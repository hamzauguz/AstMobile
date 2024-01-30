import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../components/custom-header';

const Profile = () => {
  return (
    <Container>
      <SafeAreaView
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <CustomHeader
          containerStyle={styles.headerStyle}
          iconRight={
            <TouchableOpacity>
              <AntDesignIcon name="setting" size={30} color="black" />
            </TouchableOpacity>
          }
        />
        <View
          style={{
            backgroundColor: '#BFBAFC',
            position: 'absolute',
            width: '100%',
            height: 200,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            opacity: 0.9,
          }}
        />
        <View
          style={{
            flex: 1,

            alignItems: 'center',
          }}>
          <View
            style={{
              top: Platform.OS === 'ios' ? 30 : 50,
            }}>
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
                overflow: 'hidden',
                resizeMode: 'contain',
                borderColor: 'black',
                borderWidth: 5,
              }}
            />
          </View>
          <View style={{flex: 2}}></View>
          <View
            style={{
              flex: 1,

              width: '90%',
              height: 100,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignContent: 'flex-end',
              alignItems: 'center',
              marginTop: 200,
              borderRadius: 10,
              bottom: 20,
            }}>
            <Text>Burcuna göre günlük bilgiler</Text>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerStyle: {
    zIndex: 999,
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
