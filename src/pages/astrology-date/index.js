import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getImportantDates} from '../../utils/utils';
import CalendarSkeneton from '../../components/skeneton-cards/calendar-skeneton';

const AstrologyDate = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const {user, userLoading} = useSelector(state => state.user);
  const [importantDates, setImportantDates] = useState([]);

  useEffect(() => {
    getImportantDates().then(res => {
      const momentDates = res.map(item => ({
        date: moment.unix(item.date.seconds),
        description: item.description,
      }));
      setImportantDates(momentDates);
    });
  }, [user]);

  const findDateToDescription = importantDates.find(item =>
    item.date.isSame(selectedDate, 'day'),
  );

  const selectedDateDescription = findDateToDescription
    ? findDateToDescription.description
    : '';

  const customDatesStyles = date => {
    const dateString = date.toISOString().split('T')[0];
    if (
      importantDates.some(
        importantDate =>
          importantDate.date.toISOString().split('T')[0] === dateString,
      )
    ) {
      return {
        textStyle: styles.importantTextStyle,
        style: styles.importantDateStyle,
      };
    }
    return {};
  };

  const onDateChange = date => {
    setSelectedDate(date);
  };

  const ImportantDateInfo = ({
    title,
    importantDateButtonStyle,
    importantDateButtonTextStyle,
  }) => {
    return (
      <View style={styles.importantDateContainer}>
        <View style={[styles.importantDateButton, importantDateButtonStyle]}>
          <Text style={[importantDateButtonTextStyle]}>X</Text>
        </View>
        <Text style={{color: 'white', opacity: 0.8, fontWeight: '600'}}>
          {' '}
          : {title}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#BFBAFC'}}>
          {importantDates.length > 0 ? (
            <CalendarPicker
              startFromMonday={true}
              selectedDayTextColor={'white'}
              selectedDayStyle={{backgroundColor: 'purple'}}
              todayBackgroundColor={'black'}
              selectedDayTextStyle={{color: '#fff'}}
              onDateChange={onDateChange}
              customDatesStyles={customDatesStyles}
              dayShape={{borderRadius: 0}}
              textStyle={styles.textStyle}
              selectMonthTitle="Aylar "
              selectYearTitle="Yıl"
              weekdays={['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']}
              months={[
                'Ocak',
                'Şubat',
                'Mart',
                'Nisan',
                'Mayıs',
                'Haziran',
                'Temmuz',
                'Ağustos',
                'Eylül',
                'Ekim',
                'Kasım',
                'Aralık',
              ]}
              previousTitle="Önceki"
              nextTitle="Sonraki"
            />
          ) : (
            <CalendarSkeneton />
          )}
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              display: 'flex',
              flexWrap: 'wrap',
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: 'white',
              padding: 5,
            }}>
            <ImportantDateInfo
              importantDateButtonTextStyle={{
                color: 'black',
                fontWeight: 'bold',
              }}
              importantDateButtonStyle={{
                borderWidth: 2,
                borderColor: 'purple',
              }}
              title={'Önemli Gün'}
            />
            <ImportantDateInfo
              importantDateButtonTextStyle={{
                color: 'white',
                fontWeight: '600',
              }}
              importantDateButtonStyle={{
                backgroundColor: 'purple',
              }}
              title={'Seçilen Gün'}
            />

            <ImportantDateInfo
              importantDateButtonTextStyle={{color: 'white', fontWeight: '600'}}
              importantDateButtonStyle={{
                backgroundColor: 'black',
              }}
              title={'Bugün'}
            />
          </View>

          <ScrollView style={{flexGrow: 1}}>
            <View
              style={{
                padding: 10,
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>
                {selectedDateDescription}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default AstrologyDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 50,
    backgroundColor: '#6768B3',
  },
  selectedDayStyle: {
    backgroundColor: 'red',
  },
  importantDateStyle: {
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 50,
  },
  importantTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  importantDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  importantDateButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
