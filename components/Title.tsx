import React from 'react';
import { StyleSheet } from 'react-native';
import { Themed } from 'react-navigation';
import Colors from '../constants/Colors';

const sizes = {
  h1: 34,
  h2: 22,
  h3: 19,
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: Colors.dark,
  }
});

export default ({ children, size, style, ...props } : { children?: any, size: 'h1' | 'h2' | 'h3', style?: object }) => {
  return (
    <Themed.Text style={[ styles.text, { fontSize: sizes[size] }, style]} {...props}>{children}</Themed.Text>
  )
};
