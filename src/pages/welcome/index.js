import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/container';
import LinearGradient from 'react-native-linear-gradient';

const Welcome = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();
  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 0.5,

            justifyContent: 'flex-end',
          }}>
          <Image
            source={require('../../../assets/astrology3.png')}
            style={{height: 300, width: 300}}
          />
        </View>
        <View style={styles.bottomContainer}>
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              borderRadius: 5,
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.button}>
              <Text style={styles.fontStyle}>GİRİŞ YAP</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              borderRadius: 5,
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.button}>
              <Text style={styles.fontStyle}>KAYIT OL</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  bottomContainer: {
    width: '90%',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 100,
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    opacity: 1,
    width: '100%',
  },
  fontStyle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Dorian-Gray',
  },
});
