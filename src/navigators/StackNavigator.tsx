import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FlatListAnimation} from '../animations';
import {Home} from '../screens';
import {ROUTES} from '../constants';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen
        name={ROUTES.FLAT_LIST_ANIMATIONS}
        component={FlatListAnimation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
