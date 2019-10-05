import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    height: 128,
    width: 128,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.light,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Avenir',
    color: Colors.dark,
    marginTop: 12,
  },
});

export default ({ icon, label, onPress, style } : { icon: string, label: string, onPress: () => void, style?: object }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Icon name={icon} color={Colors.primary} size={32} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
