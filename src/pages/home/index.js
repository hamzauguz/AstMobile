import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import {
  SignOut,
  getHoroscopesCollection,
  getUserInfoByEmail,
} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import {windowHeight, windowWidth} from '../../utils/helpers';
import HoroscopeSkenetonCard from '../../components/skeneton-cards/horoscope-skeneton-card';

const Home = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const carouselRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);
  const [horoscopesData, setHoroscopesData] = useState(null);
  useEffect(() => {
    getHoroscopesCollection().then(res => setHoroscopesData(res));
    const userInfoControl = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        if (res === null) {
          navigation.navigate('UserInfo');
        }
      });
    };
    userInfoControl();
  }, [user]);

  const ITEM_WIDTH = 200;

  const getCarouselItemLayout = (_, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        {userLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <View style={{flex: 1}}>
            <View style={{flex: 0.9}}>
              <TouchableOpacity
                style={{marginTop: 50}}
                onPress={() => SignOut()}>
                <Text style={{backgroundColor: 'red'}}>UserInfo</Text>
              </TouchableOpacity>
            </View>
            {horoscopesData === null ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width:
                    Platform.OS === 'ios'
                      ? windowWidth + 120
                      : windowWidth + 140,
                  alignItems: 'center',
                  right: Platform.OS === 'ios' ? 50 : 95,
                  top: 25,
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
            ) : (
              <Carousel
                disableIntervalMomentum={true}
                ref={ref => (carouselRef.current = ref)}
                loop={true}
                data={horoscopesData}
                onSnapToItem={index => setActiveItem(index)}
                itemWidth={ITEM_WIDTH}
                getItemLayout={getCarouselItemLayout}
                containerCustomStyle={styles.containerCustomStyle}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      carouselRef.current.snapToItem(index - 3);
                      if (activeItem + 3 === index) {
                        navigation.navigate('HoroscopeDetail', {data: item});
                      }
                    }}
                    style={styles.toucableCardStyle}>
                    <View style={styles.toucableCardImage}>
                      <Image
                        width={Platform.OS === 'ios' ? windowWidth / 4 : 80}
                        height={Platform.OS === 'ios' ? windowHeight / 8 : 80}
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
            )}
          </View>
        )}
      </SafeAreaView>
    </Container>
  );
};

export default Home;
