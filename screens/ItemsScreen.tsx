import React, { useState, useEffect } from 'react';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import { getItems } from '../services/api';
import Colors from '../constants/Colors';

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

      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {items.map((item, i) => {
          const item2 = { ...item };
          delete item2.image;
          console.log(item2);
          return (
            <View key={i} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={{ width: 150, height: 150, resizeMode: 'cover' }} />
              <View style={{ flex: 1, padding: 10 }}>
                <Title size="h2">{item.name}</Title>
              </View>
              <Title size="h3" style={{ color: Colors.label, margin: 10, fontWeight: 'normal' }}>{item.purchaseValue} €</Title>
            </View>
          );
        })}
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
  itemContainer: {
    width: 150,
    height: 260,
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowColor: "#000",
    marginTop: 20,
    backgroundColor: 'white',
  },
});

ItemsScreen.navigationOptions = {
  header: null,
};

export default withNavigationFocus(ItemsScreen);
