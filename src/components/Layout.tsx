
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <footer className="bg-white py-6 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} ShopEase. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-brand-600">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
