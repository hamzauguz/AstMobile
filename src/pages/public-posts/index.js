import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../components/container';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {windowHeight, windowWidth} from '../../utils/helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PublicPosts = () => {
  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            // backgroundColor: 'red',

            width: windowWidth - 50,
            height: Platform.OS === 'ios' ? 50 : 50,
            position: 'absolute',
            bottom: 20,
            zIndex: 9,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'purple',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <MaterialIcons name="add-box" color={'purple'} size={40} />
        </TouchableOpacity>
        <ScrollView>
          <Card style={styles.materialCardStyle}>
            <CardImage
              style={styles.materialCardImageStyle}
              source={{uri: 'http://placehold.it/480x270'}}
            />
            <CardTitle
              title="This is a title"
              subtitle="This is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfs"
              style={styles.materialCardTitleStyle}
              subtitleStyle={styles.materialSubtitleStyle}
            />
            {/* <CardContent
            style={styles.materialCardContent}
            text="Your device will reboot in few seconds once successful, be patient meanwhile"
          /> */}
            <CardAction
              style={styles.materialCardActionStyle}
              separator={true}
              inColumn={false}>
              <CardButton onPress={() => {}} title="Push" color="blue" />
              <CardButton onPress={() => {}} title="Later" color="blue" />
            </CardAction>
          </Card>
          <Card style={styles.materialCardStyle}>
            <CardImage
              style={styles.materialCardImageStyle}
              source={{uri: 'http://placehold.it/480x270'}}
            />
            <CardTitle
              title="This is a title"
              subtitle="This is subtitle dsfdfsdfsThis is is subsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is is subsThis is subtitle dsfdfsdfsThis is subtitle dsfdfsdfsThis is is subsThis is subtitle This is subtitle dsfdfsdfsThis is is subsThiThis is subtitle dsfdfsdfsThis is is subsThis is subtitle dsfdfsdfss is subtitle dsfdfsdfsdsfdfsdfs"
              style={styles.materialCardTitleStyle}
              subtitleStyle={styles.materialSubtitleStyle}
            />

            <CardAction
              style={styles.materialCardActionStyle}
              separator={true}
              inColumn={false}>
              <CardButton onPress={() => {}} title="Push" color="blue" />
              <CardButton onPress={() => {}} title="Later" color="blue" />
            </CardAction>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  materialCardStyle: {
    backgroundColor: 'red',
    display: 'flex',
    flex: Platform.OS === 'ios' ? 0.63 : 0.7,
  },
  materialCardImageStyle: {minHeight: 300, maxHeight: 300},
  materialCardContent: {backgroundColor: 'blue'},
  materialCardTitleStyle: {
    backgroundColor: 'blue',
    maxHeight: 200,
  },
  materialSubtitleStyle: {
    backgroundColor: 'purple',
  },
  materialCardActionStyle: {
    maxHeight: 40,
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'purple',
  },
});

export default PublicPosts;
