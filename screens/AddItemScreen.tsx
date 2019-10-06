import React, { useState, useEffect, useRef } from 'react';
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
import { createItem } from '../services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddItemScreen = ({ navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const onSave = useRef(() => {});

  onSave.current = async () => {
    const data = { name, description, purchaseValue, purchaseDate, category, image };
    const newItem = await createItem(data);
    const { routeName, key } = navigation.getParam('returnToRoute');
    navigation.navigate({ routeName, key, params: { newItem } });
  };

  const dataIsValid = name && purchaseValue && purchaseDate && category && image;

  useEffect(() => {
    if (dataIsValid) {
      navigation.setParams({ onSave });
    } else {
      navigation.setParams({ onSave: null });
    }
  }, [dataIsValid]);

  const onAddPhoto = async () => {
    const photo = await pickPhoto({ showActionSheetWithOptions });
    setImage(photo.base64);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          image ?
            (<ImageBlock uri={'data:image/jpeg;base64,' + image} style={{ alignSelf: 'center' }} onPress={onAddPhoto} />) :
            (<ButtonBlock label="Add photo" icon="camera" style={{ alignSelf: 'center' }} onPress={onAddPhoto} />)
          }
        <Input value={name} onChangeText={setName} label="Name" />
        <CategoryPicker label="Category" value={category} onChange={setCategory} />
        <DatePicker label="Purchase date" value={purchaseDate} onChange={setPurchaseDate} maximumDate={new Date()} />
        <Input value={purchaseValue} onChangeText={setPurchaseValue} label="Purchase value" keyboardType="numeric" suffix="€" />
        <Input value={description} onChangeText={setDescription} label="Description (optional)" multiline />
      </ScrollView>
    </KeyboardAwareScrollView>
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

AddItemScreen.navigationOptions = ({ navigation }) => {
  const onSave = navigation.getParam('onSave');

  return {
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
        disabled={!onSave}
        onPress={() => onSave.current()}
      />
    ),
  };
};

export default AddItemScreen;
