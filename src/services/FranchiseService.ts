import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFranchise } from '../models/IFranchise';

const baseUrl = ''; // add url

export const franchiseAPI = createApi({
  reducerPath: 'franchiseAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchAllFranchises: build.query<IFranchise[], string>({
      query: () => ({
        url: '/',
        // params: {
        //   _limit: resourceLimits,
        // }
      })
    })
  })
});