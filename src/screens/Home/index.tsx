import React from 'react';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import {ROUTES} from '../../constants';

import {NativeModules} from 'react-native';

const {RNShare} = NativeModules;

import styles from './styles';

export const Home = ({navigation}) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <Button
          title="Carousel Movie Animation"
          onPress={() => navigation.navigate(ROUTES.FLAT_LIST_ANIMATIONS)}
        />
        <Button
          title="Native Module Open Dialogue"
          onPress={() => RNShare.open({message: 'Native One'})}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
