import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/Colors';

type buttonProps = {
  title?: string,
  icon?: string,
  onPress: () => void,
  disabled?: boolean,
  size?: number,
  style?: object,
  color?: 'primary' | 'dark',
};

export default ({ title, icon, onPress, disabled = false, size, style, color = 'primary' } : buttonProps) => {
  const contentColor = disabled ? Colors.disabled : Colors[color];

  return (
    <TouchableOpacity onPress={disabled ? null : onPress} activeOpacity={disabled ? 1 : 0.2}>
      <View style={style}>
        <View style={{ padding: 20, margin: -20 }}>
          {icon && (
            <Icon name={icon} color={contentColor} size={size} />
          )}
          {title && (
            <Text style={{ color: contentColor, fontSize: size, fontFamily: 'Avenir', fontWeight: 'bold' }}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
