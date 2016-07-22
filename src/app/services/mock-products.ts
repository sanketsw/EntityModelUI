import { Product } from '../model/product';

export const PRODUCTS: Product[] = [
  { id: '51', name: 'Product 1', description: 'Product 1 description', price: 6000 },
  { id: '52', name: 'Product 2', description: 'Product 2 description', price: 19500 },
  { id: '53', name: 'Product 3', description: 'Product 3 description', price: 25000 },
  { id: '54', name: 'Product 4', description: 'Product 4 description', price: 40500 }
];

export const PRODUCTS_IN_PLAN: Product[] = [
  { id: '51', name: 'Product 1', description: 'Product 1 description', price: 5670 },
  { id: '52', name: 'Product 2', description: 'Product 1 description', price: 20000 },
  { id: '53', name: 'Product 3', description: 'Product 1 description', price: 35000 }
];

export const PRODUCTS_IN_NEW_PLAN: Product[] = [
  { id: '51', name: 'Product 1', description: 'Product 1 description', price: 6000 },
  { id: '52', name: 'Product 2', description: 'Product 2 description', price: 19500 },
  { id: '53', name: 'Product 3', description: 'Product 3 description', price: 25000 },
  { id: '54', name: 'Product 4', description: 'Product 4 description', price: 40500, status: 'new' }
];
