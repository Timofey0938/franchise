import { createSlice } from '@reduxjs/toolkit';
// import { franchises } from '../../initialStates';

const initialState = [];

export const UserSlice = createSlice({
  name: 'franchises',
  initialState,
  reducers: {
    // addFranchise(state, action) {},
  }
});

// export const { addFranchise } = UserSlice.actions;
export default UserSlice.reducer;