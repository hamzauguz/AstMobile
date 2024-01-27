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
import {SignOut, getUserInfoByEmail} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {horoscopes} from '../../utils/horoscopes';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const carouselRef = useRef(null);
  const [activeItem, setActiveItem] = useState();
  useEffect(() => {
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
  console.log('carousel ref2: ', carouselRef.current);
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
            <Carousel
              disableIntervalMomentum={true}
              ref={ref => (carouselRef.current = ref)}
              loop={true}
              data={horoscopes}
              onSnapToItem={index => setActiveItem(index)}
              itemWidth={ITEM_WIDTH}
              getItemLayout={getCarouselItemLayout}
              containerCustomStyle={styles.containerCustomStyle}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    carouselRef.current.snapToItem(index - 3);
                    if (activeItem + 3 === index) {
                      navigation.navigate('HoroscopeDetail');
                    }
                  }}
                  style={styles.toucableCardStyle}>
                  <Image
                    style={styles.toucableCardImage}
                    source={{uri: item.image}}
                  />
                  <View style={styles.toucableTextContainer}>
                    <Text style={styles.toucableText}>{item.horoscope}</Text>
                    <Text style={styles.toucableTextDate}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              )}
              sliderWidth={500}
            />
          </View>
        )}
      </SafeAreaView>
    </Container>
  );
};

export default Home;
