import React from 'react';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import {ROUTES} from '../../constants';

import {NativeModules} from 'react-native';

const {RNShare} = NativeModules;

import styles from './styles';

export const Home = ({navigation}) => {
  const buttons = [
    {
      title: 'Carousel Movie Animation',
      onPress: () => navigation.navigate(ROUTES.FLAT_LIST_ANIMATIONS),
    },
    {
      title: 'Native Module Open Dialogue',
      onPress: () => RNShare.open({message: 'Native One'}),
    },
    {
      title: 'React Query Posts List',
      onPress: () => navigation.navigate(ROUTES.REACT_QUERY_POSTS),
    },
  ];
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        {buttons.map(({title, onPress}) => (
          <Button key={title} title={title} onPress={onPress} />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};
