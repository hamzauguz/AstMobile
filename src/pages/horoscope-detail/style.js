import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: 'rgba(139, 93, 182, 0.4)'},
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
    height: 250,
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
});

export default styles;
