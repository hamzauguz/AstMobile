import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/container';
import {windowHeight, windowWidth} from '../../utils/helpers';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HEADER_HEIGHT = 250;

const HoroscopeDetail = ({navigation, route}) => {
  const [selectedHoroscope, setSelectedHoroscope] = useState(null);
  useEffect(() => {
    if (route.params.data) {
      setSelectedHoroscope(route?.params?.data);
      console.log(
        'selected: ',
        route?.params?.data?.status?.daily.split('\\n'),
      );
    }
  }, [route.params?.data]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <Image
          width={Platform.OS === 'ios' ? windowWidth / 4 : 80}
          height={Platform.OS === 'ios' ? windowHeight / 8 : 80}
          source={{uri: selectedHoroscope?.image}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 30,
            marginTop: 10,
            color: 'white',
            fontFamily: 'EBGaramond-ExtraBold',
          }}>
          {selectedHoroscope?.horoscope}
        </Text>
        <Text
          style={{
            top: 10,
            color: 'white',
            fontFamily: 'EBGaramond-Bold',
            fontSize: 16,
          }}>
          {selectedHoroscope?.date.replace(/\n/g, '')}
        </Text>
      </View>
    );
  };

  const ScrollContainerItem = ({item}) => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.text}>
          {item?.split('\\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              <Text style={styles.describeText}>{paragraph}</Text>
              {index !== item?.split('\\n').length - 1 && <Text>{'\n\n'}</Text>}
            </React.Fragment>
          ))}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'rgba(139, 93, 182, 0.4)'}}>
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
          initialTabName="Haftalık"
          renderHeader={Header}
          headerHeight={HEADER_HEIGHT}>
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

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#6768B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexGrow: 1,
    padding: 10,
    display: 'flex',
  },
  text: {
    letterSpacing: 1,
    fontSize: 18,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontFamily: 'EBGaramond-Medium',
    color: 'white',
  },
  tabScrollStyle: {flexGrow: 1},
  describeText: {
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
  },
  headerContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },

  headerTitleStyle: {
    marginRight: Platform.OS === 'ios' ? -30 : -40,
  },

  customHeaderStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
});
