
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type User = {
  username: string;
  isAdmin: boolean;
};

type Store = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Authentication actions
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => boolean;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      currentUser: null,
      isAuthenticated: false,
      
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          const updatedCart = cart.map(cartItem => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
          
          set((state) => ({ 
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price
          }));
        } else {
          set((state) => ({ 
            cart: [...state.cart, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price
          }));
        }
      },
      
      removeFromCart: (itemId) => {
        const { cart } = get();
        const itemToRemove = cart.find(item => item.id === itemId);
        
        if (itemToRemove) {
          set((state) => ({ 
            cart: state.cart.filter(item => item.id !== itemId),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
          }));
        }
      },
      
      updateQuantity: (itemId, quantity) => {
        const { cart } = get();
        const item = cart.find(cartItem => cartItem.id === itemId);
        
        if (item) {
          const quantityDiff = quantity - item.quantity;
          const updatedCart = cart.map(cartItem => 
            cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
          );
          
          set((state) => ({ 
            cart: updatedCart,
            totalItems: state.totalItems + quantityDiff,
            totalPrice: state.totalPrice + (item.price * quantityDiff)
          }));
        }
      },
      
      clearCart: () => {
        set({ cart: [], totalItems: 0, totalPrice: 0 });
      },
      
      login: (username, password) => {
        // For now, we'll use a simple authentication
        // In a real application, this would make an API call
        if (password === "123$%&") {
          set({
            currentUser: { username, isAdmin: true },
            isAuthenticated: true,
          });
          return true;
        } else {
          // Simulate a successful login for any other password
          set({
            currentUser: { username, isAdmin: false },
            isAuthenticated: true,
          });
          return true;
        }
        
        // In a real app, we would check with the server first
        // return false;
      },
      
      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
        });
      },
      
      register: (username, email, password) => {
        // This would normally make an API call to register
        // For now, automatically log them in
        set({
          currentUser: { username, isAdmin: false },
          isAuthenticated: true,
        });
        return true;
      }
    }),
    {
      name: 'e-commerce-store',
    }
  )
);
