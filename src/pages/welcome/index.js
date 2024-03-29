import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Container from '../../components/container';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <Image
            source={require('../../../assets/astrology3.jpg')}
            style={styles.appIconStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.linearGradientStyle}>
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
            style={styles.linearGradientStyle}>
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
