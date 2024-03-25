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
  itemwithLabel: {width: '100%', alignItems: 'center', marginTop: 10},
  labelStyle: {color: 'white', fontSize: 18, width: '90%'},
  dateSelectStyle: {
    color: 'white',
    fontSize: 16,
  },
  citySelectTextStyle: {color: 'white', fontSize: 16, fontWeight: '500'},
  linearGradientSaveInfo: {
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  saveInfoTextStyle: {color: 'white', fontWeight: '600', fontSize: 18},
});

export default styles;
