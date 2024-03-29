import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/container';
import {windowWidth} from '../../utils/helpers';
import {GoogleGenerativeAI_ID} from '@env';
import * as GoogleGenerativeAI from '@google/generative-ai';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Tabs, useAnimatedTabIndex} from 'react-native-collapsible-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Textarea from 'react-native-textarea';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import LottieLoading from '../../components/lottie-loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {useTabsContext} from 'react-native-collapsible-tab-view/lib/typescript/src/hooks';

const HEADER_HEIGHT = 250;

const DreamComment = () => {
  const tabViewRef = useRef(null);
  const [textAreaInput, setTextAreaInput] = useState('');
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const HCPassedAdMob =
    Platform.OS === 'ios'
      ? 'ca-app-pub-9650548064732377/3261594097'
      : 'ca-app-pub-9650548064732377/8378189400';
  const {isLoaded, isClosed, load, show} = useInterstitialAd(HCPassedAdMob);

  const scrollToTab = () => {
    tabViewRef.current && tabViewRef.current.jumpToTab('Ruya Yorumu');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollToTab();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {},
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    load();

    const unsubscribe = navigation.addListener('focus', () => {
      load();
    });

    return unsubscribe;
  }, [load, navigation, messages]);

  console.log('isLoaded: ', isLoaded);

  const sendMessage = async () => {
    setLoading(true);
    if (isLoaded) {
      show();
    }
    const userMessage = {
      text: `( ${textAreaInput} ) parantez içerisindeki bir ruya. Mitolojik karakter olan Alahçın Hatun duyguları ve yetenekleri ile birlikte bu ruyayı nasıl yorumlar?`,
      user: true,
    };

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(
      GoogleGenerativeAI_ID,
    );
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setMessages(text);
    setLoading(false);
  };
  const Header = () => {
    return (
      <View style={styles.header}>
        <LinearGradient
          colors={['#150a09', '#272b31', '#546377']}
          start={{x: 0.5, y: 1}}
          end={{x: 0.5, y: 0}}>
          <Image
            source={require('../../../assets/ms-alahcin2.jpg')}
            style={{
              height: 250,
              width: windowWidth,
            }}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
    );
  };

  const ScrollContainerItem = ({item}) => {
    return (
      <View style={styles.tabContent}>
        <Text style={[styles.messageText, {color: 'white'}]}>{item}</Text>
      </View>
    );
  };

  const CustomText = ({children}) => {
    const renderText = text => {
      const parts = text?.split(/\*\*/);
      return parts?.map((part, index) => {
        if (index % 2 === 0) {
          return <View>{renderParagraph(part)}</View>;
        } else {
          return renderTitle(part);
        }
      });
    };

    const renderTitle = title => {
      return (
        <Text
          key={title}
          style={{
            fontSize: Platform.OS === 'ios' ? 24 : 23,
            fontFamily: 'EBGaramond-ExtraBold',
            color: '#c68c55',
          }}>
          {title}
        </Text>
      );
    };
    const renderParagraph = paragraph => {
      const parts = paragraph.split(/\*/);
      return parts?.map((part, index) => {
        return (
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontFamily: 'EBGaramond-Medium',
            }}
            key={index}>
            {part}
          </Text>
        );
      });
    };

    return <View style={styles.messageContainer}>{renderText(children)}</View>;
  };

  console.log('tabViewRef: ', tabViewRef);
  return (
    <Container>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(139, 93, 182, 0.4)',
        }}>
        <CustomHeader
          containerStyle={styles.headerContainerStyle}
          titleStyle={styles.headerTitleStyle}
          iconLeft={
            <HeaderButton
              onPress={() => navigation.goBack()}
              children={<Icon size={24} name="chevron-left" color={'white'} />}
            />
          }
          iconTitle={'Ruya Yorumu'}
        />
        {loading && (
          <LottieLoading
            bgColor={'purple'}
            lottieSource={require('../../../assets/lotties/loading-lottie.json')}
          />
        )}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Tabs.Container
            ref={tabViewRef}
            initialTabName="Ruya Yorumu"
            renderHeader={Header}
            allowHeaderOverscroll
            headerHeight={HEADER_HEIGHT}>
            <Tabs.Tab name="Alahçin Hatun">
              <Tabs.ScrollView
                automaticallyAdjustKeyboardInsets
                style={styles.tabScrollStyle}>
                <ScrollContainerItem
                  item={
                    "Alahçın Hatun, Yakut Türklerinin efsanelerinde Aan Alahçın ve Aan Darhan Hatun'un birleşimini temsil eder. O, orta dünyanın sahibesi olarak kabul edilir ve doğaya zarar verildiğinde içsel bir üzüntüyle dolup gözyaşı döker. İhtişamlı bir görünüme sahiptir; ışıklı bir yüzü ve beyaz saçları, yaşlı bir bilgelikle dolu kadın tasviriyle anlatılır. Soyunun kutsal ağaçlarında yaşar, bu ağaçlar onun kutsallığını yansıtan bir sembol olarak kabul edilir. \n \n Alahçın Hatun, doğanın sırlarını anlama ve insanların rüyalarını yorumlama yeteneğiyle bilinir. Rüyalar, insanların zihinlerindeki derinliklere iner ve bilinçaltının kapılarını aralar. Alahçın Hatun, bu rüyaların gizemli dilini çözer ve insanlara kılavuzluk eder. Onun rehberliği, rüyaların ardındaki derin anlamları ortaya çıkarırken, insanlara aydınlanma ve içsel bir keşif fırsatı sunar."
                  }
                />
              </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="Ruya Yorumu">
              <Tabs.ScrollView
                keyboardDismissMode="interactive"
                contentContainerStyle={{alignItems: 'center'}}
                style={styles.tabScrollStyle}>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={text => setTextAreaInput(text)}
                  defaultValue={textAreaInput}
                  maxLength={120}
                  placeholder={'Haydi durma, yaz...'}
                  placeholderTextColor={'#c7c7c7'}
                />
                <RNBounceable onPress={sendMessage}>
                  <LinearGradient
                    colors={['#150a09', '#4c1709', '#546377']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={styles.linearGradientContainer}>
                    <Text style={styles.loginButonText}>
                      {loading ? 'Yükleniyor...' : 'Ruyamı Yorumla'}
                    </Text>
                  </LinearGradient>
                </RNBounceable>
                <CustomText children={messages} />
              </Tabs.ScrollView>
            </Tabs.Tab>
          </Tabs.Container>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default DreamComment;

const styles = StyleSheet.create({
  headerContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  headerTitleStyle: {
    marginRight: Platform.OS === 'ios' ? -30 : -40,
  },
  tabScrollStyle: {flexGrow: 1},
  header: {
    height: 250,
    width: '100%',
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHoroscopeText: {
    fontSize: 30,
    marginTop: 10,
    color: 'white',
    fontFamily: 'EBGaramond-ExtraBold',
  },
  selectedHoroscopeReplace: {
    top: 10,
    color: 'white',
    fontFamily: 'EBGaramond-Bold',
    fontSize: 16,
  },
  tabContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexGrow: 1,
    padding: 10,
    display: 'flex',
    fontSize: 16,
  },
  loginButonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EBGaramond-ExtraBold',
  },
  linearGradientContainer: {
    borderRadius: 5,
    width: windowWidth - 20,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    backgroundColor: '#F5FCFF',
    width: windowWidth - 25,
    marginTop: 20,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 18,
    color: '#333',
    fontFamily: 'EBGaramond-Medium',
  },
  messageContainer: {padding: 10, marginVertical: 5},
  messageText: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontFamily: 'EBGaramond-Medium',
  },
});
