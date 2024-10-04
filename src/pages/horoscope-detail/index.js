import {Image, Platform, SafeAreaView, Text, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import React, {useEffect, useMemo, useState} from 'react';
import Container from '../../components/container';
import {windowHeight, windowWidth} from '../../utils/helpers';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import FastImage from 'react-native-fast-image';
import styles from './style';

const HEADER_HEIGHT = 250;

const HoroscopeDetail = ({navigation, route}) => {
  const [selectedHoroscope, setSelectedHoroscope] = useState(null);
  useEffect(() => {
    if (route.params.data) {
      setSelectedHoroscope(route?.params?.data);
    }
  }, [route.params?.data]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <FastImage
          source={{
            uri: selectedHoroscope?.image,
            priority: FastImage.priority.high,
          }}
          resizeMode="contain"
          style={{
            height: Platform.OS === 'ios' ? windowHeight / 8 : 80,
            width: Platform.OS === 'ios' ? windowWidth / 4 : 80,
          }}
        />
        <Text style={styles.selectedHoroscopeText}>
          {selectedHoroscope?.horoscope}
        </Text>
        <Text style={styles.selectedHoroscopeReplace}>
          {selectedHoroscope?.date.replace(/\n/g, '')}
        </Text>
      </View>
    );
  };

  const ScrollContainerItem = ({item}) => {
    const formattedItem = useMemo(() => {
      if (!item) return '';

      return item?.split('\\n').map((paragraph, index) => (
        <React.Fragment key={index}>
          <Text style={styles.describeText}>{paragraph}</Text>
          {index !== item?.split('\\n').length - 1 && <Text>{'\n\n'}</Text>}
        </React.Fragment>
      ));
    }, [item]);

    return (
      <View style={styles.tabContent}>
        <Text style={styles.text}>{formattedItem}</Text>
      </View>
    );
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomHeader
          containerStyle={styles.headerContainerStyle}
          titleStyle={styles.headerTitleStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Burç Yorumu'}
        />
        <Tabs.Container
          lazy
          cancelLazyFadeIn
          initialTabName="Haftalık"
          renderHeader={Header}
          headerHeight={HEADER_HEIGHT}
          pagerProps={{hitSlop: {left: -50}}}>
          <Tabs.Tab name="Günlük">
            <Tabs.ScrollView style={styles.tabScrollStyle}>
              <ScrollContainerItem item={selectedHoroscope?.status?.daily} />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="Haftalık">
            <Tabs.ScrollView style={styles.tabScrollStyle}>
              <ScrollContainerItem item={selectedHoroscope?.status?.weekly} />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="Aylık">
            <Tabs.ScrollView style={styles.tabScrollStyle}>
              <ScrollContainerItem item={selectedHoroscope?.status?.monthly} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </SafeAreaView>
    </Container>
  );
};

export default HoroscopeDetail;
