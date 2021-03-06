import React, { useState, useEffect } from 'react';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import { getItems } from '../services/api';
import { navigateItemScreen } from '../services/navigation';
import Card from '../components/Card';
import MessageModal from '../components/MessageModal';
import Colors from '../constants/Colors';
import { formatPrice } from '../services/numbers';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const Header = ({ onAdd }) => {
  return (
    <SafeAreaView style={headerStyles.container}>
      <View style={headerStyles.row}>
        <Title size="h1">Inventory</Title>
        <Button icon="add-circle" size={28} onPress={onAdd} />
      </View>
    </SafeAreaView>
  )
};

const ItemsScreen = ({ navigation, isFocused }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const newItem = navigation.getParam('newItem');

  const loadData = async () => {
    setLoading(true);
    await getItems().then(setItems);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onAdd={() => navigation.navigate('AddItem', { returnToRoute: navigation.state }) } />
      {newItem && (
        <MessageModal
          title="Object successfully added"
          icon="checkmark-circle-outline"
          buttonLabel="Great!"
          onDismiss={() => navigation.setParams({ newItem: null })}
        >
          <Text style={[styles.text, { color: Colors.label }]}>
            The estimated value of your {newItem.name} is <Text style={{ fontWeight: 'bold' }}>{formatPrice(newItem.estimatedValue[0])}</Text>.
            If something ever happens to it, it will be covered and refunded.
          </Text>
        </MessageModal>
      )}
      <ScrollView
        contentContainerStyle={styles.items}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
      >
        {items.map((item, i) => {
          return (
            <Card
              key={item.id}
              image={item.thumbnail}
              title={item.name}
              description={formatPrice(item.purchaseValue)}
              onPress={() => navigateItemScreen({ navigation, id: item.id })}
            />
          );
        })}
        <View style={{ width: 150, height: 260 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(239, 242, 249)',
    flex: 1,
  },
  text: {
    fontFamily: 'Avenir',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
});

ItemsScreen.navigationOptions = {
  header: null,
};

export default withNavigationFocus(ItemsScreen);
