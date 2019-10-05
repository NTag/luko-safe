import React from 'react';
import { Themed } from 'react-navigation';
import { StyleSheet, View } from 'react-native';

const ItemScreen = () => {
  return (
    <View style={styles.container}>
      <Themed.Text style={styles.text}>Precise item screen</Themed.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Avenir',
  },
});

ItemScreen.navigationOptions = {
  headerTitle: null,
};

export default ItemScreen;
