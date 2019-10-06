import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  containerFilled: {
    padding: 10,
    borderRadius: 4,
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

type buttonProps = {
  title?: string,
  icon?: string,
  onPress: () => void,
  disabled?: boolean,
  size?: number,
  style?: object,
  color?: 'primary' | 'dark',
  filled?: boolean,
};

export default ({ title, icon, onPress, disabled = false, size, style, color = 'primary', filled = false } : buttonProps) => {
  const contentColor = disabled ? Colors.disabled : (filled ? 'white' : Colors[color]);

  return (
    <TouchableOpacity onPress={disabled ? null : onPress} activeOpacity={disabled ? 1 : 0.2}>
      <View style={[filled && styles.containerFilled, style, filled && { backgroundColor: Colors[color] }]}>
        <View style={{ padding: 20, margin: -20 }}>
          {icon && (
            <Icon name={icon} color={contentColor} size={size} />
          )}
          {title && (
            <Text style={[{ color: contentColor, fontSize: size }, styles.text]}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
