import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {flexGrow: 1},
  containerCustomStyle: {
    right: Platform.OS === 'ios' ? 30 : 50,
    flexGrow: 0.1,
    top: 30,
  },
  toucableCardStyle: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#6768B3',
    borderRadius: 10,
  },
  toucableCardImage: {
    width: Platform.OS === 'ios' ? 140 : 120,
    height: Platform.OS === 'ios' ? 140 : 120,
    backgroundColor: '#141848',
    borderRadius: Platform.OS === 'ios' ? 70 : 60,
    resizeMode: 'center',
  },
  toucableTextContainer: {alignItems: 'center', marginTop: 5},
  toucableText: {color: 'white', fontSize: 22},
  toucableTextDate: {
    color: 'white',
    width: 'auto',
    textAlign: 'left',
    alignItems: 'center',
  },
});

export default styles;
