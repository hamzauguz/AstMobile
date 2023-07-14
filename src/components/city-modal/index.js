import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {cities} from '../../utils/cities';

const CityModal = ({visible, onClose, onSelectCity}) => {
  const handleCitySelect = city => {
    onSelectCity(city);
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleModalClose}>
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.modalContainer}>
          <View
            style={{
              width: '100%',
              height: '60%',
              alignItems: 'center',
            }}>
            <ScrollView style={styles.modalContent}>
              {cities.map(city => (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    height: 40,
                    justifyContent: 'center',
                    borderColor: 'white',
                    borderBottomWidth: 1,
                  }}
                  key={city}
                  onPress={() => handleCitySelect(city)}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '500',
                      left: 5,
                    }}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
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

export default CityModal;
