import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  materialCardStyle: {
    display: 'flex',
    flex: Platform.OS === 'ios' ? 0.63 : 0.7,
  },
  materialCardImageStyle: {minHeight: 300, maxHeight: 300},
  materialCardContent: {backgroundColor: 'blue'},
  materialCardTitleStyle: {
    maxHeight: 200,
  },

  materialCardActionStyle: {
    maxHeight: 40,
    alignItems: 'center',
    display: 'flex',
  },
  headerContainerStyle: {
    marginTop: 50,
    left: 10,
  },
});

export default styles;
