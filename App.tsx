import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Home} from './src/screens';
import {FlatListAnimation} from './src/animations';

const App = () => {
  return (
    <NavigationContainer>
      <FlatListAnimation />
    </NavigationContainer>
  );
};

export default App;
