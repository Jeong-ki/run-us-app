import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {LoginStackParamList} from './types';
import {SignInScreen, SignUpScreen} from '@/screens';
import {RouteNames} from './route-names';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.signIn}
        component={SignInScreen as React.ComponentType}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name={RouteNames.signUp}
        component={SignUpScreen as React.ComponentType}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
}
