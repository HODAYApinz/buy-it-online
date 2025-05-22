
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useStore } from '@/store';
import { MiniCart } from './MiniCart';
import { useState } from 'react';

export const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();
  const [showMiniCart, setShowMiniCart] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-700">
          ShopEase
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-brand-600 transition-colors">
            Categories
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-brand-600 transition-colors">
            Products
          </Link>
          {isAuthenticated && currentUser?.isAdmin && (
            <>
              <Link to="/admin/products" className="text-gray-600 hover:text-brand-600 transition-colors">
                Manage Products
              </Link>
              <Link to="/admin/orders" className="text-gray-600 hover:text-brand-600 transition-colors">
                Orders
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button 
              className="text-gray-600 hover:text-brand-600 transition-colors" 
              onClick={() => setShowMiniCart(!showMiniCart)}
            >
              <ShoppingCart className="h-6 w-6" />
            </button>
            {showMiniCart && (
              <div className="absolute right-0 mt-2 w-80">
                <MiniCart onClose={() => setShowMiniCart(false)} />
              </div>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">
                Hello, {currentUser?.username}
                {currentUser?.isAdmin && <span className="ml-1 text-brand-600">(Admin)</span>}
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-brand-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-brand-600 transition-colors"
              >
                <User className="h-6 w-6" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
