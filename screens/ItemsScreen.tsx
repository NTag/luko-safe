import React from 'react';
import { SafeAreaView, Themed } from 'react-navigation';
import { StatusBar, StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';

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

const ItemsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onAdd={() => navigation.navigate('AddItem') } />
      <Themed.Text style={styles.text}>List of items</Themed.Text>
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
});

ItemsScreen.navigationOptions = {
  header: null,
};

export default ItemsScreen;
