import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  role: '',
  franchiseId: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.franchiseId = action.payload?.franchiseId;
    },
    addFranchise(state, action) {
      state.franchiseId = action.payload.franchiseId;
    },
    removeUser(state) {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.franchiseId = null;
    },
  }
});

export const { setUser, addFranchise, removeUser } = UserSlice.actions;
export default UserSlice.reducer;