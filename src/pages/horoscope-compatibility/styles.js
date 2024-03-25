import {Dimensions, Platform, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../utils/helpers';

const styles = StyleSheet.create({
  safeAreaContainer: {flexGrow: 1},
  containerCustomStyle: {
    flexGrow: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 30,
  },
  toucableCardStyle: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#6768B3',
    borderRadius: 10,
    marginBottom: 10,
  },
  toucableCardImage: {
    width: Platform.OS === 'ios' ? windowWidth / 2.8 : 120,
    height: Platform.OS === 'ios' ? windowHeight / 6 : 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141848',
    borderRadius: Platform.OS === 'ios' ? windowWidth / 5.4 : 60,

    resizeMode: 'center',
  },
  toucableTextContainer: {alignItems: 'center', marginTop: 5},
  toucableText: {color: 'white', fontSize: 26, fontFamily: 'EBGaramond-Bold'},
  toucableTextDate: {
    color: 'white',
    width: 'auto',
    textAlign: 'left',
    alignItems: 'center',
    fontFamily: 'EBGaramond-Medium',
    fontSize: 14,
  },
  container: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  avatar: {height: 40, width: 40, borderRadius: 0},
  textContainer: {flex: 1, marginLeft: 16},
  title: {width: '90%', height: 14, borderRadius: 7, marginBottom: 5},
  subtitle: {width: '70%', height: 14, borderRadius: 7},
  icon: {height: 16, width: 16, borderRadius: 4},
  secondSkenetonCard: {
    width: 100,
    height: Platform.OS === 'ios' ? 200 : windowHeight / 4.7,
    marginLeft: -20,
  },
  firstSkenetonCard: {
    width: Platform.OS === 'ios' ? 200 : 180,
    height: Platform.OS === 'ios' ? 220 : windowHeight / 4,
  },
  secondSkenetonRightCard: {
    width: Platform.OS === 'ios' ? 100 : 180,
    height: Platform.OS === 'ios' ? 200 : windowHeight / 4.7,
    marginRight: 80,
  },
});

export default styles;
