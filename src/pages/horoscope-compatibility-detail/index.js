import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Tabs} from 'react-native-collapsible-tab-view';
import {windowHeight, windowWidth} from '../../utils/helpers';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

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
          <Image
            width={Platform.OS === 'ios' ? windowWidth / 4 : 80}
            height={Platform.OS === 'ios' ? windowHeight / 8 : 80}
            source={{uri: horoscopesCompatibility?.horoscope1?.image}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 28,
              marginTop: 10,
              color: 'white',
              fontFamily: 'EBGaramond-ExtraBold',
            }}>
            {horoscopesCompatibility?.horoscope1?.horoscope}
          </Text>
          <Text
            style={{
              top: 10,
              color: 'white',
              fontFamily: 'EBGaramond-Medium',
              fontSize: 16,
            }}>
            {horoscopesCompatibility?.horoscope1?.date.replace(/\n/g, '')}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            width={Platform.OS === 'ios' ? windowWidth / 4 : 80}
            height={Platform.OS === 'ios' ? windowHeight / 8 : 80}
            source={{uri: horoscopesCompatibility?.horoscope2?.image}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 28,
              marginTop: 10,
              color: 'white',
              fontFamily: 'EBGaramond-ExtraBold',
            }}>
            {horoscopesCompatibility?.horoscope2?.horoscope}
          </Text>
          <Text
            style={{
              top: 10,
              color: 'white',
              fontFamily: 'EBGaramond-Medium',
              fontSize: 16,
            }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    backgroundColor: 'rgba(139, 93, 182, 0.4)',
  },
  messageContainer: {padding: 10, marginVertical: 5},
  messageText: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontFamily: 'EBGaramond-Medium',
  },
  inputContainer: {flexDirection: 'row', alignItems: 'center', padding: 10},
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#B7C9F2',
    borderRadius: 10,
    height: 50,
  },
  micIcon: {
    padding: 10,
    backgroundColor: '#B7C9F2',
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  headerContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },

  headerTitleStyle: {
    marginRight: -50,
  },

  customHeaderStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
  tabScrollStyle: {flexGrow: 1},
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#6768B3',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    display: 'flex',
  },
});
