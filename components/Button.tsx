import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    <TouchableOpacity onPress={disabled ? null : onPress}>
      <View style={style}>
        <View style={{ padding: 20, margin: -20 }}>
          {icon && (
            <Ionicons name={`${Platform.OS}-${icon}`} color={contentColor} size={size} />
          )}
          {title && (
            <Text style={{ color: contentColor, fontSize: size, fontFamily: 'Avenir' }}>{title}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
};
