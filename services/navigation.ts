import { getItem } from './api';

export const navigateItemScreen = async ({ navigation, id }) => {
  const item = await getItem(id);
  navigation.navigate('Item', { item });
};
