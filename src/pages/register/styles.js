const {StyleSheet, Platform} = require('react-native');

const styles = StyleSheet.create({
  customInputStyle: {
    marginTop: 20,
  },
  customHeaderStyle: {
    top: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  headerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
  },
  safeAreaContainer: {flex: 1, alignItems: 'center'},
  keyboardContentContainer: {flexGrow: 1},
  keyboardContainer: {width: '100%', flexGrow: 1},
  keyboardViewContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
  },
  formView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.75,
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    top: Platform.OS === 'ios' ? 0 : 20,
  },
  appIcon: {height: 150, width: 150},
  inputWithLabelContainer: {width: '100%'},
  registerContainer: {flexDirection: 'row'},
  haventAccountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  nowRegisterStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
  },
  nowRegisterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linearGradientContainer: {
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  registerButonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EBGaramond-ExtraBold',
  },
});

export default styles;
