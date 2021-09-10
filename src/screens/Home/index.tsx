import React from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

import styles from './styles';

export const Home = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <Button title="Carousel Movie Animation" onPress={() => {}} />
      </SafeAreaView>
    </ScrollView>
  );
};
