import userSlice from '@/slices/user';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
