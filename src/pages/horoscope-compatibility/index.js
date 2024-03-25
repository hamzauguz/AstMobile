import {
  Button,
  Image,
  Platform,
  SafeAreaView,
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
import LottieLoading from '../../components/lottie-loading';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';

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
  const HCPassedAdMob =
    Platform.OS === 'ios'
      ? 'ca-app-pub-9650548064732377/9274546092'
      : 'ca-app-pub-9650548064732377/3366763237';
  const {isLoaded, isClosed, load, show} = useInterstitialAd(HCPassedAdMob);

  useEffect(() => {
    load();

    const unsubscribe = navigation.addListener('focus', () => {
      load();
    });

    return unsubscribe;
  }, [load, navigation]);

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
    if (isLoaded) {
      show();
    }
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
        {loading && (
          <LottieLoading
            bgColor={'purple'}
            lottieSource={require('../../../assets/lotties/loading-lottie.json')}
          />
        )}
        {horoscopesData === null ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',

                width:
                  Platform.OS === 'ios' ? windowWidth + 130 : windowWidth + 180,
                alignItems: 'center',
                right: Platform.OS === 'ios' ? 35 : 25,
                marginTop: Platform.OS === 'ios' ? 20 : 30,
              }}>
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.firstSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonRightCard}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width:
                  Platform.OS === 'ios' ? windowWidth + 130 : windowWidth + 180,
                alignItems: 'center',
                right: Platform.OS === 'ios' ? 35 : 25,
                marginTop: Platform.OS === 'ios' ? 20 : 30,
              }}>
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.firstSkenetonCard}
              />
              <HoroscopeSkenetonCard
                viewContainerStyle={styles.secondSkenetonRightCard}
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
              {horoscopesData === null ? (
                <SkenetonButton />
              ) : (
                <TouchableOpacity
                  disabled={loading && isLoaded}
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
                    style={{
                      fontSize: Platform.OS === 'ios' ? 24 : 20,
                      color: 'white',
                      fontFamily: 'EBGaramond-ExtraBold',
                    }}>
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
