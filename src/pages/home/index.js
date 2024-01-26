import {
  ActivityIndicator,
  FlatList,
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
import {SignOut, getUserInfoByEmail} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {horoscopes} from '../../utils/horoscopes';
import Carousel from 'react-native-snap-carousel';

const Home = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const carouselRef = useRef(null);

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

  return (
    <Container>
      <SafeAreaView style={{flexGrow: 1}}>
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
              <Text style={{color: 'red'}}>hey</Text>
            </View>
            <Carousel
              disableIntervalMomentum={true}
              ref={ref => (carouselRef.current = ref)}
              loop={true}
              data={horoscopes}
              itemWidth={ITEM_WIDTH}
              getItemLayout={getCarouselItemLayout}
              containerCustomStyle={{
                right: Platform.OS === 'ios' ? 30 : 50,
                flexGrow: 0.1,
                top: 30,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    carouselRef.current.snapToItem(index - 3);
                  }}
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'center',
                    display: 'flex',
                    backgroundColor: '#6768B3',
                    borderRadius: 10,
                  }}>
                  <Image
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: '#141848',
                      borderRadius: 70,
                      resizeMode: 'center',
                    }}
                    source={{uri: item.image}}
                  />
                  <View style={{alignItems: 'center', marginTop: 5}}>
                    <Text style={{color: 'white', fontSize: 22}}>
                      {item.horoscope}
                    </Text>
                    <Text style={{color: 'white', width: 75}}>{item.date}</Text>
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

const styles = StyleSheet.create({});
