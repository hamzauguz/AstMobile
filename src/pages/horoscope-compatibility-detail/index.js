import {Image, Platform, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Tabs} from 'react-native-collapsible-tab-view';
import {windowHeight, windowWidth} from '../../utils/helpers';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const HEADER_HEIGHT = 250;

const HoroscopeCompatibilityDetail = ({route}) => {
  const navigation = useNavigation();

  const [horoscopesCompatibility, setHoroscopesCompatilibility] = useState('');

  useEffect(() => {
    if (route.params.data) {
      setHoroscopesCompatilibility(route?.params?.data);
    }
  }, [route.params?.data]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={{
              uri: horoscopesCompatibility?.horoscope1?.image,
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{
              height: Platform.OS === 'ios' ? windowHeight / 8 : 80,
              width: Platform.OS === 'ios' ? windowWidth / 4 : 80,
            }}
          />
          <Text style={styles.horoscopeOneTextStyle}>
            {horoscopesCompatibility?.horoscope1?.horoscope}
          </Text>
          <Text style={styles.horoscopeOneTextReplaceStyle}>
            {horoscopesCompatibility?.horoscope1?.date.replace(/\n/g, '')}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={{
              uri: horoscopesCompatibility?.horoscope2?.image,
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{
              height: Platform.OS === 'ios' ? windowHeight / 8 : 80,
              width: Platform.OS === 'ios' ? windowWidth / 4 : 80,
            }}
          />
          <Text style={styles.horoscopeOneTextStyle}>
            {horoscopesCompatibility?.horoscope2?.horoscope}
          </Text>
          <Text style={styles.horoscopeOneTextReplaceStyle}>
            {horoscopesCompatibility?.horoscope2?.date.replace(/\n/g, '')}
          </Text>
        </View>
      </View>
    );
  };

  const RenderMessage = ({item}) => (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item?.text?.includes('**') ? (
          <Text style={{color: 'white'}}>
            {item?.text?.replace(/\*\*/g, '')}
          </Text>
        ) : (
          item?.text
        )}
      </Text>
    </View>
  );

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <CustomHeader
          containerStyle={styles.headerContainerStyle}
          titleStyle={styles.headerTitleStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Burç Uyumu'}
        />

        <Tabs.Container renderHeader={Header} headerHeight={HEADER_HEIGHT}>
          <Tabs.Tab label={'BURÇ UYUMLULUĞU'} name="horoscopes">
            <Tabs.ScrollView style={styles.tabScrollStyle}>
              <RenderMessage item={horoscopesCompatibility} />
            </Tabs.ScrollView>
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={
                Platform.OS === 'ios'
                  ? 'ca-app-pub-9650548064732377/7517761239'
                  : 'ca-app-pub-9650548064732377/3262019124'
              }
            />
          </Tabs.Tab>
        </Tabs.Container>
      </SafeAreaView>
    </Container>
  );
};

export default HoroscopeCompatibilityDetail;
