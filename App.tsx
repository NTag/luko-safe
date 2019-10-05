import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
    mode: 'modal',
  }
);

export default createAppContainer(AppNavigator);
