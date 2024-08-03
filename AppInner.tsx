import React, {useEffect} from 'react';
import AppStack from '@/navigation/app-stack';
import LoginStack from '@/navigation/login-stack';
import {loadRefreshToken, removeRefreshToken, saveRefreshToken} from '@/utils';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '@/store/reducer';
import {logout, setUser} from '@/slices/user';
import {useRefreshUserMutation} from '@/slices/api/auth';

export default function AppInner() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.user);
  const [refreshUser] = useRefreshUserMutation();

  useEffect(() => {
    const rememberMe = async () => {
      try {
        const refreshToken = await loadRefreshToken();
        if (!refreshToken) {
          // SplashScreen.hide(); TODO: SplashScreen 구현 필요
          return;
        }
        const response = await refreshUser(refreshToken).unwrap();
        const {
          name,
          email,
          newAccessToken: accessToken,
          newRefreshToken,
        } = response;
        await saveRefreshToken(newRefreshToken);
        dispatch(setUser({name, email, accessToken}));
      } catch (error) {
        console.error('Fail RememberMe: ', error);
        await removeRefreshToken();
        dispatch(logout());
      } finally {
        // SplashScreen.hide(); TODO: SplashScreen 구현 필요
      }
    };
    rememberMe();
  }, [dispatch, isLoggedIn, refreshUser]);

  return isLoggedIn ? <AppStack /> : <LoginStack />;
}
