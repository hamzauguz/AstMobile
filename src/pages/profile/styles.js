import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  topContainer: {
    backgroundColor: '#BFBAFC',
    position: 'absolute',
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.9,
  },
  headerStyle: {
    zIndex: 999,
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  centerView: {
    backgroundColor: '#BFBAFC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },
});

export default styles;
