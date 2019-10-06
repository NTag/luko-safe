import React from 'react';
import { Themed } from 'react-navigation';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Avenir',
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
});

const ItemScreen = ({ navigation }) => {
  const item = navigation.getParam('item');

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'data:image/jpeg;base64,' + item.image }} style={styles.image} />
      <View style={styles.closeButton}>
        <Button icon="close-circle" onPress={() => navigation.goBack()} size={28} color="dark" style={{ opacity: 0.2 }} />
      </View>
    </View>
  );
};

ItemScreen.navigationOptions = {
  header: null,
};

export default ItemScreen;
