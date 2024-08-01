import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import type {IDismissKeyboardViewProps} from './types';

const DismissKeyboardHOC: (
  Comp: typeof KeyboardAwareScrollView,
) => React.FC<IDismissKeyboardViewProps> = (
  Comp: typeof KeyboardAwareScrollView,
) => {
  return ({
    children,
    ...props
  }: IDismissKeyboardViewProps): React.JSX.Element => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props} style={props.style}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView: React.FC<IDismissKeyboardViewProps> =
  DismissKeyboardHOC(KeyboardAwareScrollView);

export default DismissKeyboardView;
