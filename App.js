import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/modules/store';
import FormMain from './src/containers/FormMain';
const App = () => {
  return (
    <View>
      <Provider store={store}>
        <FormMain />
      </Provider>
    </View>
  );
};

export default App;
