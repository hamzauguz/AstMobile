const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    backgroundColor: 'rgba(139, 93, 182, 0.4)',
  },
  messageContainer: {padding: 10, marginVertical: 5},
  messageText: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontFamily: 'EBGaramond-Medium',
  },
  inputContainer: {flexDirection: 'row', alignItems: 'center', padding: 10},
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#B7C9F2',
    borderRadius: 10,
    height: 50,
  },
  micIcon: {
    padding: 10,
    backgroundColor: '#B7C9F2',
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  headerContainerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    backgroundColor: 'rgba(139, 93, 182, 0.4)',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },

  headerTitleStyle: {
    marginRight: -50,
  },

  customHeaderStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    zIndex: 999,
  },
  tabScrollStyle: {flexGrow: 1},
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#6768B3',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    display: 'flex',
  },
  horoscopeOneTextStyle: {
    fontSize: 28,
    marginTop: 10,
    color: 'white',
    fontFamily: 'EBGaramond-ExtraBold',
  },
  horoscopeOneTextReplaceStyle: {
    top: 10,
    color: 'white',
    fontFamily: 'EBGaramond-Medium',
    fontSize: 16,
  },
});

export default styles;
