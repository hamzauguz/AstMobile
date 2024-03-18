import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import React from 'react';
import Container from '../../components/container';

const HEADER_HEIGHT = 250;

const HoroscopeDetail = () => {
  const renderItem = React.useCallback(({index}) => {
    return (
      <View
        style={[
          styles.box,
          index % 2 === 0 ? styles.boxB : styles.boxA,
          {backgroundColor: 'red'},
        ]}>
        <Text>hey</Text>
      </View>
    );
  }, []);

  const DATA = [0, 1, 2, 3, 4];
  const identity = v => v + '';

  const Header = () => {
    return <View style={styles.header} />;
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        <Tabs.Container renderHeader={Header} headerHeight={HEADER_HEIGHT}>
          <Tabs.Tab name="Günlük">
            <Tabs.FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={identity}
            />
            <View style={styles.tabContent}></View>
          </Tabs.Tab>
          <Tabs.Tab name="Haftalık">
            <Tabs.ScrollView>
              <View style={[styles.box, styles.boxA]} />
              <View style={[styles.box, styles.boxB]} />
            </Tabs.ScrollView>
          </Tabs.Tab>
          <Tabs.Tab name="Aylık">
            <Tabs.ScrollView>
              <View style={[styles.box, styles.boxA]} />
              <View style={[styles.box, styles.boxB]} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </SafeAreaView>
    </Container>
  );
};

export default HoroscopeDetail;

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'blue',
    color: 'yellow',
  },
});
