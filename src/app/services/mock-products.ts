import { Product, CustomerProductMap } from '../model/product';


export const CUST_PROD_MAP: CustomerProductMap[] = [
  {
    customer: 'Herald Sun',
    products: [
      { id: '51', count: 0, status: 'new' },
      { id: '52', count: 15, status: 'new' },
      { id: '53', count: 20, status: 'new' },
      { id: '54', count: 100, status: 'new' },
      { id: '55', count: 50, status: 'new' },
      { id: '56', count: 90, status: 'new' },
      { id: '57', count: 5, status: 'new' },
      { id: '58', count: 10, status: 'new' },
      { id: '59', count: 2, status: 'new' }
    ],
    selectedPromotions: null
  }, {
    customer: 'Narco Stores',
    products: [
      { id: '51', count: 40, status: 'new' },
      { id: '52', count: 0, status: 'new' },
      { id: '53', count: 0, status: 'new' },
      { id: '54', count: 300, status: 'new' },
      { id: '55', count: 0, status: 'new' },
      { id: '56', count: 0, status: 'new' },
      { id: '57', count: 35, status: 'new' },
      { id: '58', count: 0, status: 'new' },
      { id: '59', count: 0, status: 'new' }
    ],
    selectedPromotions: null
  }, {
    customer: 'Bombasto Traders',
    products: [
      { id: '51', count: 50, status: 'new' },
      { id: '52', count: 15, status: 'new' },
      { id: '53', count: 20, status: 'new' },
      { id: '54', count: 100, status: 'new' },
      { id: '55', count: 50, status: 'new' },
      { id: '56', count: 90, status: 'new' },
      { id: '57', count: 15, status: 'new' },
      { id: '58', count: 10, status: 'new' },
      { id: '59', count: 22, status: 'new' }
    ],
    selectedPromotions: null
  }, {
    customer: 'Rhumbas',
    products: [
      { id: '51', count: 12, status: 'new' },
      { id: '52', count: 10, status: 'new' },
      { id: '53', count: 15, status: 'new' },
      { id: '54', count: 54, status: 'new' },
      { id: '55', count: 55, status: 'new' },
      { id: '56', count: 100, status: 'new' },
      { id: '57', count: 17, status: 'new' },
      { id: '58', count: 19, status: 'new' },
      { id: '59', count: 2, status: 'new' }
    ],
    selectedPromotions: null
  }
];

export const NEW_CUST_PROD_MAP: CustomerProductMap[] = [
  {
    customer: 'Narco Stores',
    products: [
      { id: '51', count: 20, status: 'new' },
      { id: '52', count: 20, status: 'new' },
      { id: '53', count: 5, status: 'new' },
      { id: '54', count: 250, status: 'new' },
      { id: '55', count: 50, status: 'new' },
      { id: '56', count: 5, status: 'new' },
      { id: '57', count: 20, status: 'new' },
      { id: '58', count: 15, status: 'new' },
      { id: '59', count: 3, status: 'new' }
    ],
    selectedPromotions: null
  }, {
    customer: 'Bombasto Traders',
    products: [
      { id: '51', count: 0, status: 'new' },
      { id: '52', count: 35, status: 'new' },
      { id: '53', count: 40, status: 'new' },
      { id: '54', count: 0, status: 'new' },
      { id: '55', count: 80, status: 'new' },
      { id: '56', count: 150, status: 'new' },
      { id: '57', count: 0, status: 'new' },
      { id: '58', count: 25, status: 'new' },
      { id: '59', count: 32, status: 'new' }
    ],
    selectedPromotions: [2]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '51', name: 'Cloud basic', categoryId: '71', count: 0,
    description: 'Public Cloud hosting limited offering', price: 598, status: 'new'
  },
  {
    id: '52', name: 'Cloud professional', categoryId: '71', count: 0,
    description: 'Public Cloud hosting professional offering', price: 855, status: 'new'
  },
  {
    id: '53', name: 'Cloud enterprise', categoryId: '71', count: 0,
    description: 'Public Cloud hosting enterprise offering', price: 1311, status: 'new'
  },
  {
    id: '54', name: 'Mobile phone mini', categoryId: '72', count: 0,
    description: 'Mobile and data package minimum for less than 10 users', price: 855, status: 'new'
  },
  {
    id: '55', name: 'Mobile phone regular', categoryId: '72', count: 0,
    description: 'Mobile and data package for small professional groups', price: 969, status: 'new'
  },
  {
    id: '56', name: 'Mobile phone mega', categoryId: '72', count: 0,
    description: 'Mobile and data package for enterprise groups', price: 1083, status: 'new'
  },
  {
    id: '57', name: 'Wireless Perfect', categoryId: '73', count: 0,
    description: 'Wireless network for a small estblishment', price: 3135, status: 'new'
  },
  {
    id: '58', name: 'Wireless HiSpeed', categoryId: '73', count: 0,
    description: 'Wireless broadband professional with 24Mbps', price: 4132, status: 'new'
  },
  {
    id: '59', name: 'Wireless Secure', categoryId: '73', count: 0,
    description: 'Wireless broadband professional with extra security and premium bandwidth', price: 4987, status: 'new'
  }
];
