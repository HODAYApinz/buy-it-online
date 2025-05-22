
import { useStore, CartItem } from '@/store';
import { Link } from 'react-router-dom';
import { Trash, X } from 'lucide-react';

type MiniCartProps = {
  onClose: () => void;
};

export const MiniCart = ({ onClose }: MiniCartProps) => {
  const { cart, totalPrice, totalItems, removeFromCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-fade-in max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Your Cart ({totalItems} items)</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-10 w-10 object-cover rounded mr-3" 
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to="/cart" 
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded text-center text-sm font-medium hover:bg-gray-200"
            onClick={onClose}
          >
            View Cart
          </Link>
          <Link 
            to="/checkout" 
            className="flex-1 bg-brand-600 text-white py-2 px-4 rounded text-center text-sm font-medium hover:bg-brand-700"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
