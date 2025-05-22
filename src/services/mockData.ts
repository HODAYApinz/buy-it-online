
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

// Mock categories
export const categories: Category[] = [
  { 
    id: 1, 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2301&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    name: 'Clothing', 
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2940&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'Books', 
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2940&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'Home & Garden', 
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2874&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    name: 'Sports', 
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2940&auto=format&fit=crop' 
  }
];

// Mock products
export const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features and high-quality camera.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115d8c?q=80&w=2787&auto=format&fit=crop',
    categoryId: 1
  },
  {
    id: 2,
    name: 'Laptop Pro',
    description: 'Powerful laptop for professional work and gaming.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop',
    categoryId: 1
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    description: 'High-quality sound with noise-cancellation technology.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2865&auto=format&fit=crop',
    categoryId: 1
  },
  {
    id: 4,
    name: 'Men\'s T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2940&auto=format&fit=crop',
    categoryId: 2
  },
  {
    id: 5,
    name: 'Women\'s Jeans',
    description: 'Stylish and comfortable jeans for women.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2940&auto=format&fit=crop',
    categoryId: 2
  },
  {
    id: 6,
    name: 'Sneakers',
    description: 'Comfortable sneakers for everyday activities.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop',
    categoryId: 2
  },
  {
    id: 7,
    name: 'The Art of Programming',
    description: 'A comprehensive guide to programming fundamentals.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop',
    categoryId: 3
  },
  {
    id: 8,
    name: 'History of Ancient Civilizations',
    description: 'Explore the fascinating history of ancient civilizations.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2942&auto=format&fit=crop',
    categoryId: 3
  },
  {
    id: 9,
    name: 'Garden Chair Set',
    description: 'Comfortable chairs for your garden or patio.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop',
    categoryId: 4
  },
  {
    id: 10,
    name: 'Basketball',
    description: 'Professional basketball for indoor and outdoor play.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2890&auto=format&fit=crop',
    categoryId: 5
  }
];

// Mock service functions
export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 300);
  });
};

export const getProducts = (categoryId?: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId) {
        resolve(products.filter(product => product.categoryId === categoryId));
      } else {
        resolve(products);
      }
    }, 300);
  });
};

export const getProductById = (productId: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(product => product.id === productId));
    }, 300);
  });
};

export const searchProducts = (query: string, categoryId?: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = products;
      
      if (categoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
      }
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
        );
      }
      
      resolve(filteredProducts);
    }, 300);
  });
};
