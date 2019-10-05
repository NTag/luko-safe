import React from 'react';
import { TextField } from 'react-native-material-textfield';
import Colors from '../constants/Colors';

const textStyle = { fontFamily: 'Avenir' };

export default (props) => {
  return (
    <TextField
      tintColor={Colors.primary}
      labelTextStyle={textStyle}
      titleTextStyle={textStyle}
      baseColor={Colors.label}
      {...props}
    />
  );
};
