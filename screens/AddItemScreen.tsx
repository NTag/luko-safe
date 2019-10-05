import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import DatePicker from '../components/DatePicker';
import CategoryPicker from '../components/CategoryPicker';
import ButtonBlock from '../components/ButtonBlock';
import ImageBlock from '../components/ImageBlock';
import pickPhoto from '../services/pickPhoto';

const AddItemScreen = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  const onAddPhoto = async () => {
    const photo = await pickPhoto({ showActionSheetWithOptions });
    setImage('data:image/jpeg;base64,' + photo.base64);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          image ?
            (<ImageBlock uri={image} style={{ alignSelf: 'center' }} onPress={onAddPhoto} />) :
            (<ButtonBlock label="Add photo" icon="camera" style={{ alignSelf: 'center' }} onPress={onAddPhoto} />)
          }
        <Input value={name} onChangeText={setName} label="Name" />
        <CategoryPicker label="Category" value={category} onChange={setCategory} />
        <DatePicker label="Purchase date" value={purchaseDate} onChange={setPurchaseDate} maximumDate={new Date()} />
        <Input value={purchaseValue} onChangeText={setPurchaseValue} label="Purchase value" keyboardType="numeric" suffix="€" />
        <Input value={description} onChangeText={setDescription} label="Description (optional)" multiline />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
