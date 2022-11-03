import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFranchise } from '../../models/IFranchise';

export interface FranchiseState {
  franchises: IFranchise[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  franchises: [
    {
      id: 0,
      name: 'Булочная',
      description: 'Огромная булочная, поражающая воображение',
      investment: 500000,
      profit: 100000,
      payback_time: 16,
      start_year: 2018,
      num_open: 4,
      franchise_image: 'image',
      lump_sum_payment: 25000,
      royalty: 2,
      create_ts: 0,
      last_update_date: 1000000,
      presentation: 'presentation',
      finplan: 'finplan',
      rating: 4.8,
      min_status: 'none',
      company_id: 0,
    },
    {
      id: 1,
      name: 'Магазин морепродуктов',
      description: 'Классный магазин, много морепродуктов',
      investment: 800000,
      profit: 170000,
      payback_time: 18,
      start_year: 2012,
      num_open: 3,
      franchise_image: 'image',
      lump_sum_payment: 50000,
      royalty: 1,
      create_ts: 100000,
      last_update_date: 2000000,
      presentation: 'presentation',
      finplan: 'finplan',
      rating: 4.9,
      min_status: 'educated',
      company_id: 1,
    }
  ],
  isLoading: false,
  error: '',
}

export const FranchisesSlice = createSlice({
  name: 'franchises',
  initialState,
  reducers: {
    
  }
});

export default FranchisesSlice.reducer;