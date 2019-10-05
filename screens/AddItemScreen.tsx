import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import DatePicker from '../components/DatePicker';
import Picker from '../components/Picker';

const CATEGORIES = [
  { label: 'Football', value: 'football' },
  { label: 'Baseball', value: 'baseball' },
  { label: 'Hockey', value: 'hockey' },
];

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState();
  const [category, setCategory] = useState();

  return (
    <View style={styles.container}>
      <Input value={name} onChangeText={setName} label="Name" />
      <Picker label="Category" value={category} onChange={setCategory} items={CATEGORIES} />
      <DatePicker label="Purchase date" value={purchaseDate} onChange={setPurchaseDate} maximumDate={new Date()} />
      <Input value={purchaseValue} onChangeText={setPurchaseValue} label="Purchase value" keyboardType="numeric" suffix="€" />
      <Input value={description} onChangeText={setDescription} label="Description (optional)" multiline />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
