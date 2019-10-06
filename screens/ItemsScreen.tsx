import React, { useState, useEffect } from 'react';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import { getItems } from '../services/api';
import Colors from '../constants/Colors';
import Card from '../components/Card';

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

  useEffect(() => {
    getItems().then(setItems);
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onAdd={() => navigation.navigate('AddItem') } />
      <ScrollView contentContainerStyle={styles.items}>
        {items.map((item, i) => {
          return (
            <Card key={i} image={item.thumbnail} title={item.name} description={`${item.purchaseValue} €`} />
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
