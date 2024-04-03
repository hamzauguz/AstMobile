import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import {getHoroscopesCollection, getUserInfoByEmail} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import {
  analyticsButtonLog,
  windowHeight,
  windowWidth,
} from '../../utils/helpers';
import HoroscopeSkenetonCard from '../../components/skeneton-cards/horoscope-skeneton-card';
import ColorfulCard from 'react-native-colorful-card';
import ImagePicker from 'react-native-image-crop-picker';

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
            <View
              style={{
                flex: 0.9,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? 0 : 30,
              }}>
              <ColorfulCard
                title="🌟 Alahçın Hatun ile"
                value="Ruya yorumu"
                valueTextStyle={{bottom: 10}}
                footerTextStyle={{fontSize: 15}}
                footerValue="Geçici süreliğine bedava, Tıkla"
                iconImageSource={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fms-alahcin.jpg?alt=media&token=b049a4db-b4e6-4e6e-80cd-8d7000f0454c',
                }}
                iconImageStyle={{height: 50, width: 50}}
                style={{
                  backgroundColor: '#7954ff',
                  height: 150,
                  width: windowWidth - 20,
                }}
                onPress={async () => {
                  await analyticsButtonLog('NavigateDreamComment', {
                    id: 3,
                    item: {
                      name: 'Alahçın Hatun',
                      task: 'Dream comment with GoogleAI',
                    },
                    description: [
                      'current Screen=Home, navigateScreen=DreamComment',
                    ],
                  });
                  navigation.navigate('DreamComment');
                }}
              />
              <ColorfulCard
                title="🌟 Umay Ana'ya"
                value="Soru sor"
                footerTextStyle={{fontSize: 15}}
                footerValue="Geçici süreliğine bedava, Tıkla"
                iconImageSource={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/ast-app-9656b.appspot.com/o/astrology-images%2Fms-umay.jpg?alt=media&token=5c4a9f7a-1019-439b-905e-9c659d418787',
                }}
                iconImageStyle={{height: 50, width: 50}}
                style={{
                  backgroundColor: '#7954ff',
                  height: 150,
                  width: windowWidth - 20,
                  marginTop: 20,
                }}
                onPress={async () => {
                  await analyticsButtonLog('NavigateAskQuestion', {
                    id: 2,
                    item: {
                      name: 'Umay Ana',
                      task: 'Ask Question with GoogleAI',
                    },
                    description: [
                      'current Screen=Home, navigateScreen=AskQuestion',
                    ],
                  });
                  navigation.navigate('AskQuestion');
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                  console.log(image);
                });
              }}
              style={{backgroundColor: 'red'}}>
              <Text>Deneme</Text>
            </TouchableOpacity>
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
                ref={ref => (carouselRef.current = ref)}
                data={horoscopesData}
                onSnapToItem={index => setActiveItem(index)}
                itemWidth={ITEM_WIDTH}
                getItemLayout={getCarouselItemLayout}
                containerCustomStyle={styles.containerCustomStyle}
                disableIntervalMomentum={true}
                loop={true}
                enableSnap={true}
                enableMomentum={false}
                useScrollView={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate={0.5}
                snapToAlignment={'start'}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={async () => {
                      if (activeItem + 3 === index) {
                        navigation.navigate('HoroscopeDetail', {data: item});
                        await analyticsButtonLog('NavigateHoroscopeDetail', {
                          id: 1,
                          item: item,
                          description: [
                            'current Screen=Home, navigateScreen=HoroscopeDetail',
                          ],
                        });
                      } else if (index === 2) {
                        carouselRef.current.snapToItem(
                          horoscopesData.length - 1,
                        );
                      } else {
                        carouselRef.current.snapToItem(index - 3);
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
