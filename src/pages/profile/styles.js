import {Platform, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../utils/helpers';

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
    height: Platform.OS === 'ios' ? windowHeight / 3.35 : 200,
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
  garamondFontStyle: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 17,
    padding: 3,
  },
  avatarView: {
    flex: 1,
    alignItems: 'center',
  },
  avatarImageStyle: {
    width: windowWidth > 400 ? 120 : 100,
    height: windowWidth > 400 ? 120 : 100,
    backgroundColor: 'gray',
    borderRadius: windowWidth > 400 ? 60 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    overflow: 'hidden',
    resizeMode: 'contain',
    borderColor: 'purple',
    borderWidth: 5,
  },
  profileContainer: {
    flex: 2,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    top: windowHeight / 13.34,
  },
  randomInfoContainer: {
    flex: 1,
    width: '90%',
    height: 100,
    backgroundColor: '#BFBAFC',
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'center',
    marginTop: 200,
    borderRadius: 10,
    bottom: 20,
    padding: 10,
  },
});

export default styles;
