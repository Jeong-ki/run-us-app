import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUser {
  name: string;
  email: string;
  accessToken: string;
}

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const {setUser, logout} = userSlice.actions;
export default userSlice;
