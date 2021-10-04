import React from 'react';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import {ROUTES} from '../../constants';

import {NativeModules} from 'react-native';

console.log('NativeModules', NativeModules.RNShare);

import styles from './styles';

export const Home = ({navigation}) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <Button
          title="Carousel Movie Animation"
          onPress={() => navigation.navigate(ROUTES.FLAT_LIST_ANIMATIONS)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
