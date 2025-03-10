const {StyleSheet, Platform} = require('react-native');

const styles = StyleSheet.create({
  customInputStyle: {
    marginTop: 20,
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
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },
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
  topContainer: {width: '100%', alignItems: 'center'},
  appIcon: {height: 200, width: 200},
  inputWithLabelContainer: {width: '100%'},
  registerContainer: {flexDirection: 'row'},
  haventAccountText: {
    color: 'white',
    // fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    fontFamily: 'EBGaramond-Bold',
    padding: 10,
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
  loginButonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EBGaramond-ExtraBold',
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'EBGaramond-Bold',
    padding: 10,
    color: 'white',
  },
  linkUnderline: {
    color: 'cyan',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default styles;
