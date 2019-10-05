import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ({ name, ...props }) => {
  return (
    <Ionicons name={`${Platform.OS}-${name}`} {...props} />
  );
};
