import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  username: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
  id: number | null;
}

const initialState = {
  username: null,
  email: null,
  password: null,
  token: null,
  id: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.username = null;
      state.email = null;
      state.password = null;
      state.token = null;
      state.id = null;
    },
  }
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;