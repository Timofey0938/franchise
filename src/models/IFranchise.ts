export interface IFranchise {
  id: number;
  name: string;
  description: string;
  investment: number;
  profit: number;
  payback_time: number;
  start_year: number;
  num_open: number;
  franchise_image: string;
  lump_sum_payment: number;
  royalty: number;
  create_ts: number;
  last_update_date: number;
  presentation: string;
  finplan: string;
  rating: number;
  min_status: string;
  company_id: number;
}