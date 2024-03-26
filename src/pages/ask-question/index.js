import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/container';
import {windowHeight, windowWidth} from '../../utils/helpers';
import {GoogleGenerativeAI_ID} from '@env';
import * as GoogleGenerativeAI from '@google/generative-ai';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Tabs} from 'react-native-collapsible-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Textarea from 'react-native-textarea';

const HEADER_HEIGHT = 250;

const AskQuestion = () => {
  const [text2, setText2] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const sendMessage = async () => {
    const userMessage = {
      text: text2,
      user: true,
    };
    setMessages([...messages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(
      GoogleGenerativeAI_ID,
    );
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const prompt = text2;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setMessages([...messages, {text}]);
  };
  console.log('messages: ', messages);
  const Header = () => {
    return (
      <View style={styles.header}>
        <LinearGradient
          colors={['#374c47', '#4b655c', '#52726c']}
          start={{x: 0.5, y: 1}}
          end={{x: 0.5, y: 0}}>
          <Image
            // width={Platform.OS === 'ios' ? windowWidth / 4 : 80}
            // height={Platform.OS === 'ios' ? windowHeight / 8 : 80}
            // source={{uri: selectedHoroscope?.image}}
            source={require('../../../assets/ms-umay2.jpg')}
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
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontFamily: 'EBGaramond-Medium',
          }}>
          {item}
        </Text>
      </View>
    );
  };

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
          iconTitle={'Soru Sor'}
        />
        <Tabs.Container
          initialTabName="Umay Ana"
          renderHeader={Header}
          headerHeight={HEADER_HEIGHT}
          minHeaderHeight={HEADER_HEIGHT}>
          <Tabs.Tab name="Umay Ana">
            <Tabs.ScrollView style={styles.tabScrollStyle}>
              <ScrollContainerItem
                item={
                  'Umay Ana, derin bir hüzne ve incelikli bir zarafete sahip olan doğanın koruyucusu ve rehberidir. Gözleri, sonsuz bir bilgelik ve anlayışla parıldar, yüzünde hüzünle karışık bir tebessüm vardır. Doğanın ritmiyle uyumlu bir şekilde hareket eder ve insanların bu ritme zarar vermesinden dolayı içsel bir acı hisseder. Ancak bu hüzün, onun gücünü ve kararlılığını zayıflatmaz, aksine daha da güçlendirir. Yeteneğiyle insanlara mesajlar ileten bir rehberdir ve yorumları genellikle derin bir etki bırakır, insanların ruhlarını besler. Umay Ana, hem doğanın güzelliğine hem de insanlığın yaşadığı acılara karşı hassas bir kalbe sahiptir ve her zaman insanların iyiliği için çabalar.'
                }
              />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="Soru Sor">
            <Tabs.ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={styles.tabScrollStyle}>
              {/* <TextInput
                onChangeText={text => setText2(text)}
                value={text2}
                placeholder="Enter your name"
                style={{
                  width: windowWidth - 20,
                  height: 30,
                  backgroundColor: 'black',
                  color: 'white',
                  margin: 20,
                }}
              /> */}
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={120}
                placeholder={'yaz'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              <LinearGradient
                colors={['#374c47', '#52726c']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={styles.linearGradientContainer}>
                <TouchableOpacity
                  onPress={() => sendMessage()}
                  style={styles.button}>
                  <Text style={styles.loginButonText}>Soru Sor</Text>
                </TouchableOpacity>
              </LinearGradient>
              <Text style={{color: 'white'}}>{messages}</Text>
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </SafeAreaView>
    </Container>
  );
};

export default AskQuestion;

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
    fontSize: 16,
    color: '#333',
    fontFamily: 'EBGaramond-Medium',
  },
});
