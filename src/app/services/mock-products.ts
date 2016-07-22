import { Product } from '../model/product';

export const PRODUCTS: Product[] = [
    { id: '51', name: 'Product 1', categoryId: '', count: 0, description: 'Product 1 description', price: 1234  },
    { id: '52', name: 'Product 2', categoryId: '', count: 0, description: 'Product 1 description', price: 2345  },
    { id: '53', name: 'Product 3', categoryId: '', count: 0, description: 'Product 1 description', price: 3456  }
];

export const PRODUCTS_IN_PLAN: Product[] = [
    { id: '54', name: 'Cloud mini', categoryId: '71', count: 1, description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Cloud regular', categoryId: '71', count: 0, description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Cloud mega', categoryId: '71', count: 0, description: 'Product 1 description', price: 3500  },
    { id: '54', name: 'Mobile phone mini', categoryId: '72', count: 1, description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Mobile phone regular', categoryId: '72', count: 0, description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Mobile phone mega', categoryId: '72', count: 0, description: 'Product 1 description', price: 3500  },
    { id: '54', name: 'Wireless mini', categoryId: '73', count: 1, description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Wireless regular', categoryId: '73', count: 0, description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Wireless mega', categoryId: '73', count: 0, description: 'Product 1 description', price: 3500  }
];
