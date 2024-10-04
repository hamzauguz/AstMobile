import React from 'react';
import {View, Text, Linking} from 'react-native';
import styles from './styles';

const PrivacyPolicyText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.linkText}>
        Uygulamayı kullanarak
        <Text
          style={styles.linkUnderline}
          onPress={() =>
            Linking.openURL(
              'https://github.com/hamzauguz/astromodern/blob/main/privacy-policy.md',
            )
          }>
          {' '}
          Gizlilik Sözleşmesi'ni{' '}
        </Text>
        kabul etmiş olursunuz.
      </Text>
    </View>
  );
};

export default PrivacyPolicyText;
