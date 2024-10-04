const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  viewContainer: {flex: 0.5, justifyContent: 'flex-end'},
  bottomContainer: {
    width: '90%',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    opacity: 1,
    width: '100%',
  },
  fontStyle: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'EBGaramond-Bold',
  },
  appIconStyle: {height: 300, width: 300},
  linearGradientStyle: {
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default styles;
