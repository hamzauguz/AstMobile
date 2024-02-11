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
import {getCitiesCollection, getHoroscopesCollection} from '../../utils/utils';

const CityModal = ({visible, onClose, onSelectCity}) => {
  const [citiesData, setCitiesData] = useState(null);
  useEffect(() => {
    getCitiesCollection().then(res => setCitiesData(res));
  }, []);
  const handleCitySelect = city => {
    onSelectCity(city);
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  const sortedCities = citiesData?.sort((a, b) => {
    // Önemli şehirlerin listesini aşağıdaki gibi belirleyebilirsiniz.
    const importantCities = [
      'İstanbul',
      'Ankara',
      'İzmir' /* Diğer önemli şehirler */,
    ];

    // Eğer a veya b listedeki önemli şehirlerden biriyse, o şehirlerden biri olanı öne al.
    if (
      importantCities.includes(a.cityName) &&
      importantCities.includes(b.cityName)
    ) {
      return a.cityName.localeCompare(b.cityName); // Alfabetik sıralama
    } else if (importantCities.includes(a.cityName)) {
      return -1; // a'yı öne al
    } else if (importantCities.includes(b.cityName)) {
      return 1; // b'yi öne al
    } else {
      return a.cityName.localeCompare(b.cityName); // Diğer durumlar için alfabetik sıralama
    }
  });

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
              {sortedCities?.map(item => (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    height: 40,
                    justifyContent: 'center',
                    borderColor: 'white',
                    borderBottomWidth: 1,
                  }}
                  key={item}
                  onPress={() => handleCitySelect(item.cityName)}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '500',
                      left: 5,
                    }}>
                    {item.cityName}
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
