import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '@/components/elements';
import {removeRefreshToken} from '@/utils';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@/slices/user';
import type {UserScreenProps} from '@/navigation/types';
import type {RootState} from '@/store/reducer';

const UserScreen = ({}: UserScreenProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async () => {
    dispatch(logout());
    removeRefreshToken();
  };

  return (
    <>
      <View>
        <Text>User</Text>
      </View>
      <View>
        <Text>email: {user?.email}</Text>
      </View>
      <Button onClick={handleLogout} isLoading={false} disabled={false}>
        로그아웃
      </Button>
    </>
  );
};

export default UserScreen;
