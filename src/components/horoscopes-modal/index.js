import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {getHoroscopesCollection} from '../../utils/utils';
import RNPickerSelect from 'react-native-picker-select';

const HoroscopesModal = ({
  visible,
  onClose,
  onSelectHoroscope,
  onOpen,
  horoscopeValue,
}) => {
  const [horoscopesData, setHoroscopesData] = useState(null);
  useEffect(() => {
    getHoroscopesCollection().then(res => setHoroscopesData(res));
  }, []);
  const handleCitySelect = horoscope => {
    onSelectHoroscope(horoscope);
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };
  if (horoscopesData) {
    return (
      <RNPickerSelect
        style={{
          inputIOS: {
            color: 'white',
            height: 50,
            fontSize: 16,
            fontFamily: 'EBGaramond-SemiBold',
          },
          inputAndroid: {
            color: 'white',
            height: 50,
            fontSize: 16,
            right: 10,
            fontFamily: 'EBGaramond-SemiBold',
          },
        }}
        onOpen={onOpen}
        onClose={handleModalClose}
        onValueChange={value => handleCitySelect(value)}
        items={horoscopesData.map(item => ({
          label: item.horoscope,
          value: item.horoscope,
        }))}
        value={horoscopeValue}
      />
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: 8,

    flex: 1,
  },
});

export default HoroscopesModal;
