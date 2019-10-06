import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/Colors';
import Title from './Title';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  message: {
    margin: 10,
    borderRadius: 14,
    backgroundColor: 'white',
    padding: 20,
  },
  content: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default ({ icon, title, children, buttonLabel, onDismiss }) => {
  return (
    <Modal visible animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.message}>
          <Icon name={icon} size={100} color={Colors.primary} style={{ alignSelf: 'center' }} />
          <Title size="h2" style={{ alignSelf: 'center' }}>{title}</Title>
          <View style={styles.content}>
            {children}
          </View>
          <Button title={buttonLabel} filled onPress={onDismiss} />
        </View>
      </View>
    </Modal>
  );
};
