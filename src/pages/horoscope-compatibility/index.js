import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import {useSelector} from 'react-redux';
import {getHoroscopesCollection} from '../../utils/utils';
import {windowHeight, windowWidth} from '../../utils/helpers';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import * as GoogleGenerativeAI from '@google/generative-ai';
import HoroscopeSkenetonCard from '../../components/skeneton-cards/horoscope-skeneton-card';
import SkenetonButton from '../../components/skeneton-cards/skeneton-button';

const HoroscopeCompatibility = () => {
  const navigation = useNavigation();
  const carouselFirstRef = useRef(null);
  const carouselSecondRef = useRef(null);
  const {user, userLoading} = useSelector(state => state.user);
  const [firstActiveItem, setFirstActiveItem] = useState(0);
  const [SecondActiveItem, setSecondActiveItem] = useState(0);
  const [horoscopesData, setHoroscopesData] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = 'AIzaSyCxRL8FVFdHx2ZPrgheB-RLc-OSpMj1Gcw';

  useEffect(() => {
    getHoroscopesCollection().then(res => setHoroscopesData(res));
  }, [user]);

  const ITEM_WIDTH = 200;

  const getCarouselItemLayout = (_, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = {
      text: `${horoscopesData[firstActiveItem]?.horoscope} burcu ile ${horoscopesData[SecondActiveItem]?.horoscope} burcu arasındaki burç uyumluluğu nedir?`,
      user: true,
    };
    setMessages([...messages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log('messages: ', messages);
    setMessages([...messages, {text, user: false}]);
    setLoading(false);
    navigation.navigate('HoroscopeCompatibilityDetail', {
      data: {
        text,
        horoscope1: horoscopesData[firstActiveItem],
        horoscope2: horoscopesData[SecondActiveItem],
      },
    });
  };

  return (
    <Container>
      <SafeAreaView>
        {horoscopesData === null ? (
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width:
                  Platform.OS === 'ios' ? windowWidth + 120 : windowWidth + 140,
                alignItems: 'center',
                right: Platform.OS === 'ios' ? 80 : 90,
                marginTop: Platform.OS === 'ios' ? 20 : 30,
              }}>
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.firstSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width:
                  Platform.OS === 'ios' ? windowWidth + 120 : windowWidth + 140,
                alignItems: 'center',
                right: Platform.OS === 'ios' ? 80 : 90,
                marginTop: Platform.OS === 'ios' ? 20 : 30,
              }}>
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.firstSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}>
            <View style={{flex: 0.7}}>
              <Carousel
                disableIntervalMomentum={true}
                ref={ref => (carouselFirstRef.current = ref)}
                loop={true}
                data={horoscopesData}
                onSnapToItem={index => setFirstActiveItem(index)}
                itemWidth={ITEM_WIDTH}
                getItemLayout={getCarouselItemLayout}
                containerCustomStyle={styles.containerCustomStyle}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      carouselFirstRef.current.snapToItem(index - 3);
                    }}
                    style={styles.toucableCardStyle}>
                    <View style={styles.toucableCardImage}>
                      <Image
                        width={Platform.OS === 'ios' ? windowWidth / 5 : 80}
                        height={Platform.OS === 'ios' ? windowHeight / 10 : 80}
                        source={{uri: item.image}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.toucableTextContainer}>
                      <Text style={styles.toucableText}>{item.horoscope}</Text>
                      <Text style={styles.toucableTextDate}>{item.date}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                sliderWidth={windowWidth}
              />
              <Carousel
                disableIntervalMomentum={true}
                ref={ref => (carouselSecondRef.current = ref)}
                loop={true}
                data={horoscopesData}
                onSnapToItem={index => setSecondActiveItem(index)}
                itemWidth={ITEM_WIDTH}
                getItemLayout={getCarouselItemLayout}
                containerCustomStyle={[styles.containerCustomStyle]}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      carouselSecondRef.current.snapToItem(index - 3);
                    }}
                    style={styles.toucableCardStyle}>
                    <View style={styles.toucableCardImage}>
                      <Image
                        width={Platform.OS === 'ios' ? windowWidth / 5 : 80}
                        height={Platform.OS === 'ios' ? windowHeight / 10 : 80}
                        source={{uri: item.image}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.toucableTextContainer}>
                      <Text style={styles.toucableText}>{item.horoscope}</Text>
                      <Text style={styles.toucableTextDate}>{item.date}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                sliderWidth={windowWidth}
              />
            </View>

            <View
              style={{
                flex: 0.25,
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                alignItems: 'center',
              }}>
              {horoscopesData !== null ? (
                <SkenetonButton />
              ) : (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => {
                    sendMessage();
                  }}
                  style={{
                    width: '95%',
                    backgroundColor: loading ? 'gray' : 'purple',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: '600'}}>
                    {loading ? 'YÜKLENİYOR...' : 'UYUMLULUĞU GÖSTER'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    </Container>
  );
};

export default HoroscopeCompatibility;
