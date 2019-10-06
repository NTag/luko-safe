import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddItemScreen = ({ navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [receipt, setReceipt] = useState();
  const [photos, setPhotos] = useState([]);
  const onSave = useRef(() => {});

  onSave.current = async () => {
    navigation.setParams({ loading: true });
    const data = { name, description, purchaseValue, purchaseDate, category, image, receipt, photos };
    const newItem = await createItem(data);
    const { routeName, key } = navigation.getParam('returnToRoute');
    navigation.navigate({ routeName, key, params: { newItem } });
  };

  const dataIsValid = name && purchaseValue && purchaseDate && category && image && receipt;

  useEffect(() => {
    if (dataIsValid) {
      navigation.setParams({ onSave });
    } else {
      navigation.setParams({ onSave: null });
    }
  }, [dataIsValid]);

  const onAddImage = async () => {
    const photo = await pickPhoto({ showActionSheetWithOptions });
    setImage(photo.base64);
  };
  const onAddReceipt = async () => {
    const receipt = await pickPhoto({ showActionSheetWithOptions });
    setReceipt(receipt.base64);
  };
  const onAddPhoto = async () => {
    const photo = await pickPhoto({ showActionSheetWithOptions });
    setPhotos([ ...photos, photo.base64 ]);
  };
  const deletePhoto = (i: number) => {
    Alert.alert(
      'Delete photo?',
      'Do you want to delete this photo?',
      [
        {
          text: 'Yes, delete it',
          onPress: () => {
            const newPhotos = [...photos];
            newPhotos.splice(i, 1);
            setPhotos(newPhotos);
          },
        },
        {
          text: 'No, cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          image ?
            (<ImageBlock uri={'data:image/jpeg;base64,' + image} style={{ alignSelf: 'center' }} onPress={onAddImage} />) :
            (<ButtonBlock label="Add photo" icon="camera" style={{ alignSelf: 'center' }} onPress={onAddImage} />)
        }
        <Input value={name} onChangeText={setName} label="Name" />
        <CategoryPicker label="Category" value={category} onChange={setCategory} />
        <DatePicker label="Purchase date" value={purchaseDate} onChange={setPurchaseDate} maximumDate={new Date()} />
        <Input value={purchaseValue} onChangeText={setPurchaseValue} label="Purchase value" keyboardType="numeric" suffix="€" />
        <Input value={description} onChangeText={setDescription} label="Description (optional)" multiline />
        <View style={styles.documents}>
          {
            receipt ?
              (<ImageBlock uri={'data:image/jpeg;base64,' + receipt} onPress={onAddReceipt} style={styles.document} />) :
              (<ButtonBlock label="Add receipt" icon="paper" onPress={onAddReceipt} style={styles.document} />)
          }
          {photos.map((photo, i) => {
            return (<ImageBlock key={i} uri={'data:image/jpeg;base64,' + photo} style={styles.document} onPress={() => deletePhoto(i)} />);
          })}
          <ButtonBlock label="Add photo" icon="camera" style={styles.document} onPress={onAddPhoto} />
        </View>
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
  documents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  document: {
    marginTop: 20,
    marginRight: 20,
  },
});

AddItemScreen.navigationOptions = ({ navigation }) => {
  const onSave = navigation.getParam('onSave');
  const loading = navigation.getParam('loading');

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
    headerRight: loading ? (<ActivityIndicator style={{ marginRight: 20 }} />) : (
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
