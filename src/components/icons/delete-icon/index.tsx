import React from 'react';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {IDeleteIconProps} from './types';

export const DeleteIcon = ({onPress}: IDeleteIconProps) => {
  return (
    <Pressable testID="basket-delete-icon" onPress={onPress}>
      <MaterialCommunityIcons
        color={'darkslateblue'}
        disabled
        name="trash-can-outline"
        size={32}
      />
    </Pressable>
  );
};
