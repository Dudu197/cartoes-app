export interface CreditCard {
  bank_name: string;
  card_name: string;
  card_brand: string;
  card_type: string | null;
  annual_fee: number | null;
  annual_fee_exemption_expenses: number | null;
  annual_fee_exemption_investments: number | null;
  minimum_income: number | null;
  minimum_investment: number | null;
  transaction_cashback: number | null;
  points_per_brl: number | null;
  points_per_usd: number | null;
  vip_lounge: string | null;
  vip_lounge_gru: boolean;
} 