import React from 'react';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {ICloseIcon} from './types';

export const CloseIcon = ({onPress, color}: ICloseIcon) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons color={color} disabled name="close" size={32} />
    </Pressable>
  );
};
