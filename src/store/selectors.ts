import { RootState } from './index';

export const selectFranchises = (state: RootState) => state.franchiseReducer.franchises;
export const selectUser = (state: RootState) => state.userReducer;