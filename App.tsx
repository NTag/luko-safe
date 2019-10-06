import React, { useState } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import ItemsScreen from './screens/ItemsScreen';
import AddItemScreen from './screens/AddItemScreen';
import ItemScreen from './screens/ItemScreen';

const AppNavigator = createStackNavigator(
  {
    Items: {
      screen: ItemsScreen,
    },
    Item: {
      screen: ItemScreen,
    },
    AddItem: {
      screen: AddItemScreen,
    },
  },
  {
    initialRouteName: 'Items',
    mode: 'modal',
  }
);

const App = createAppContainer(AppNavigator);

const _loadResourcesAsync = async () => {
  return Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
      'Avenir': require('./assets/fonts/Avenir-Roman-12.ttf'),
    }),
  ]);
};

const _handleLoadingError = (error) => {
  console.warn(error);
};

export default () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const _handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <ActionSheetProvider>
      <App />
    </ActionSheetProvider>
    );
  }
};
