import {Dimensions} from 'react-native';
import analytics from '@react-native-firebase/analytics';

const getBirthdateToHoroscopeDate = (day, month) => {
  if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) {
    return 'Kova';
  } else if ((month == 2 && day >= 20) || (month == 3 && day <= 20)) {
    return 'Balık';
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return 'Koç';
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 21)) {
    return 'Boğa';
  } else if ((month == 5 && day >= 22) || (month == 6 && day <= 21)) {
    return 'İkizler';
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return 'Yengeç';
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    return 'Aslan';
  } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    return 'Başak';
  } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
    return 'Terazi';
  } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
    return 'Akrep';
  } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    return 'Yay';
  } else {
    return 'Oğlak';
  }
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const convertToISOTime = timeString => {
  const now = new Date();
  const [hour, minute] = timeString.split(':').map(Number);
  now.setHours(hour);
  now.setMinutes(minute);
  // now.setSeconds(second);
  return now;
};

const analyticsButtonLog = (name, params) => {
  analytics().logEvent(name, params);
};

const formatWithoutSecondTime = time => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

export {
  getBirthdateToHoroscopeDate,
  windowHeight,
  windowWidth,
  convertToISOTime,
  analyticsButtonLog,
  formatWithoutSecondTime,
};
