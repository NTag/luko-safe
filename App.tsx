import React from 'react';

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

export default () => (
  <ActionSheetProvider>
    <App />
  </ActionSheetProvider>
);
