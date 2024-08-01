import React from 'react';
import type {StackParamList} from './types';
import {HomeScreen, UserScreen} from '@/screens';
import {RouteNames} from './route-names';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<StackParamList>();

export default function AppStack() {
  return (
    <Tab.Navigator initialRouteName={RouteNames.home}>
      <Tab.Screen
        name={RouteNames.home}
        component={HomeScreen as React.ComponentType}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={RouteNames.user}
        component={UserScreen as React.ComponentType}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
