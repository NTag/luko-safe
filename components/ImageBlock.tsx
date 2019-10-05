import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 128,
    width: 128,
    borderRadius: 28,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});

export default ({ uri, onPress, style } : { uri: string, onPress?: () => void, style?: object }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri }} style={[styles.image, style]} />
    </TouchableOpacity>
  );
};
