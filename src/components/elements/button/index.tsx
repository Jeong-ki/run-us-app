import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import type {IButtonProps} from './types';

export const Button = ({
  children,
  onClick,
  disabled,
  isLoading,
  width = 100,
}: IButtonProps) => {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      style={[styles.button, {width}, disabled && styles.disabled]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{children}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#42a5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    // width: 90,
    height: 40,
  },
  disabled: {backgroundColor: 'gray'},
  buttonText: {color: '#fff', fontSize: 16},
});
