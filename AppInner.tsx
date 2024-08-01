import React, {useEffect} from 'react';
import AppStack from '@/navigation/app-stack';
import LoginStack from '@/navigation/login-stack';
import {loadRefreshToken, removeRefreshToken, saveRefreshToken} from '@/utils';
import {refreshUser} from '@/api/auth';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store/reducer';
import {logout, setUser} from '@/slices/user';

export default function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.user);

  useEffect(() => {
    const rememberMe = async () => {
      try {
        const refreshToken = await loadRefreshToken();
        if (!refreshToken) {
          // SplashScreen.hide(); TODO: SplashScreen 구현 필요
          return;
        }
        const response = await refreshUser(refreshToken);
        const {
          name,
          email,
          newAccessToken: accessToken,
          newRefreshToken,
        } = response;
        await saveRefreshToken(newRefreshToken);
        setUser({name, email, accessToken});
      } catch (error) {
        console.error('Fail RememberMe: ', error);
        await removeRefreshToken();
        logout();
      } finally {
        // SplashScreen.hide(); TODO: SplashScreen 구현 필요
      }
    };
    rememberMe();
  }, [isLoggedIn]);

  return isLoggedIn ? <AppStack /> : <LoginStack />;
}
