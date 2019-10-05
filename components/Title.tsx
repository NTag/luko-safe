import React from 'react';
import { StyleSheet } from 'react-native';
import { Themed } from 'react-navigation';
import Colors from '../constants/Colors';

const sizes = {
  h1: 34,
  h2: 26,
  h3: 20,
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: Colors.dark,
  }
});

export default ({ children, size, style } : { children?: any, size: 'h1' | 'h2' | 'h3', style?: object }) => {
  return (
    <Themed.Text style={[ styles.text, { fontSize: sizes[size] }, style]}>{children}</Themed.Text>
  )
};
