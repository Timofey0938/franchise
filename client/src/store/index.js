import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import FranchisesReducer from './slices/FranchisesSlice';

const store = configureStore({
  reducer: {
    userReducer,
    FranchisesReducer,
  },
});

export default store;