import {Platform, StyleSheet} from 'react-native';
import {windowWidth} from '../../utils/helpers';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  materialCardStyle: {
    display: 'flex',
    flex: Platform.OS === 'ios' ? 0.63 : 0.7,
  },
  materialCardImageStyle: {
    minHeight: 300,
    maxHeight: 300,
    width: windowWidth,
  },
  materialCardContent: {backgroundColor: 'blue'},
  materialCardTitleStyle: {
    maxHeight: 200,
  },

  materialCardActionStyle: {
    maxHeight: 40,
    alignItems: 'center',
    display: 'flex',
  },
  addPostTransitionStyle: {
    width: windowWidth - 50,
    height: Platform.OS === 'ios' ? 50 : 50,
    position: 'absolute',
    bottom: 20,
    zIndex: 9,
    backgroundColor: '#b717d2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  currentLikeStyle: {color: 'purple', fontSize: 18, fontWeight: 'bold'},
});

export default styles;
