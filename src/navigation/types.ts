import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteNames} from './route-names';

export type StackParamList = {
  [RouteNames.home]: undefined;
  [RouteNames.user]: undefined;
};

export type LoginStackParamList = {
  [RouteNames.signIn]: undefined;
  [RouteNames.signUp]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  StackParamList,
  RouteNames.home
>;

export type UserScreenProps = NativeStackScreenProps<
  StackParamList,
  RouteNames.user
>;

export type SignInScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  RouteNames.signIn
>;

export type SignUpScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  RouteNames.signUp
>;
