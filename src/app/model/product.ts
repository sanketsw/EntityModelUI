export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  categoryId?: string;
  count?: number;
  originalPrice?: number;
  defaultPrice?: number;
}


export class CustomerProductMap {
  customer: string;
  products: Product[];
  selectedPromotions: number[];
}
