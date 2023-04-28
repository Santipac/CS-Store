export interface Option {
  value: string;
  description: string;
}

export interface ProductForm {
  name: string;
  type: string;
  tradelock: string;
  description?: string;
  price: number;
  inStock: number;
  float?: number;
  statTrak?: string;
  wear?: string;
}
