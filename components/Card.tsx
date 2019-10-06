import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Title from './Title';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 260,
    borderRadius: 14,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowColor: "#000",
    marginTop: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  imageContainer: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  label: {
    color: Colors.label,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    fontWeight: 'normal',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
});

export default ({ image, title, description, onPress } : { image: string, title: string, description: string, onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <Title size="h2" style={{ fontWeight: '500' }}>{title}</Title>
        </View>
        <Title size="h3" style={styles.label}>{description}</Title>
      </View>
    </TouchableOpacity>
  );
};
