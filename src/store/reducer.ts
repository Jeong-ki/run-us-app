import {authApi} from '@/slices/api/auth';
import {productApi} from '@/slices/api/product';
import testSlice from '@/slices/test';
import userSlice from '@/slices/user';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  test: testSlice.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
