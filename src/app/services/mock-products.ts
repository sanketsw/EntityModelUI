import { Product } from '../model/product';

export const PRODUCTS: Product[] = [
    { id: '51', name: 'Product 1', planName: '', selected: '', description: 'Product 1 description', price: 1234  },
    { id: '52', name: 'Product 2', planName: '', selected: '', description: 'Product 1 description', price: 2345  },
    { id: '53', name: 'Product 3', planName: '', selected: '', description: 'Product 1 description', price: 3456  }
];

export const PRODUCTS_IN_PLAN: Product[] = [
    { id: '54', name: 'Cloud mini', planName: 'Cloud plan', selected: 'true',
        description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Cloud regular', planName: 'Cloud plan', selected: 'false',
        description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Cloud mega', planName: 'Cloud plan', selected: 'false',
        description: 'Product 1 description', price: 3500  },
    { id: '54', name: 'Mobile phone mini', planName: 'Mobile phone plan', selected: 'true',
        description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Mobile phone regular', planName: 'Mobile phone plan', selected: 'false',
        description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Mobile phone mega', planName: 'Mobile phone plan', selected: 'false',
        description: 'Product 1 description', price: 3500  },
    { id: '54', name: 'Wireless mini', planName: 'Wireless plan', selected: 'true',
        description: 'Product 1 description', price: 567  },
    { id: '55', name: 'Wireless regular', planName: 'Wireless plan', selected: 'false',
        description: 'Product 1 description', price: 2000  },
    { id: '56', name: 'Wireless mega', planName: 'Wireless plan', selected: 'false',
        description: 'Product 1 description', price: 3500  }
];
