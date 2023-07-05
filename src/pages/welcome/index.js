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
            source={require('../../../assets/astrology.png')}
            style={{height: 300, width: 300}}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.fontStyle}>GİRİŞ YAP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.fontStyle}>KAYIT OL</Text>
          </TouchableOpacity>
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
    width: '80%',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 100,
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f307dd',
    borderRadius: 10,
    opacity: 1,
  },
  fontStyle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Dorian-Gray',
  },
});
