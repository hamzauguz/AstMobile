const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, alignItems: 'center'},
  customButton: {
    width: '90%',
    backgroundColor: 'black',
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'purple',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'white',
    marginTop: 5,
  },
  customHeaderStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  linearGradientSaveInfo: {
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  stepButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
  backButtonStyle: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  nextButtonStyle: {
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'purple',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
