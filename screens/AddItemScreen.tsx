import React from 'react';
import { Themed } from 'react-navigation';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/Colors';

const AddItemScreen = () => {
  return (
    <View style={styles.container}>
      <Themed.Text style={styles.text}>Add item screen</Themed.Text>
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

AddItemScreen.navigationOptions = ({ navigation }) => ({
  title: 'New Object',
  headerTitleStyle: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: Colors.dark,
  },
  headerLeft: (
    <Button
      icon="close"
      onPress={() => navigation.goBack()}
      size={28}
      style={{ marginLeft: 20 }}
      color="dark"
    />
  ),
  headerRight: (
    <Button
      title="Save"
      style={{ marginRight: 20 }}
    />
  ),
});

export default AddItemScreen;
