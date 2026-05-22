import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Lazy load pages for better performance
import Home from './pages/user/Home';
import Categories from './pages/user/Categories';
import Marketplace from './pages/user/Marketplace';
import ProductDetail from './pages/user/ProductDetail';

// Lazy load remaining pages
const HotelResults = lazy(() => import('./pages/user/HotelResults'));
const HotelDetails = lazy(() => import('./pages/user/HotelDetails'));
const SocialFeed = lazy(() => import('./pages/user/SocialFeed'));
const VendorDashboard = lazy(() => import('./pages/vendor/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const CategoryResults = lazy(() => import('./pages/user/CategoryResults'));
const CategoryDetails = lazy(() => import('./pages/user/CategoryDetails'));
const Profile = lazy(() => import('./pages/user/Profile'));
const Auth = lazy(() => import('./pages/user/Auth'));
const Cart = lazy(() => import('./pages/user/Cart'));

const AppContent = () => {
  const location = useLocation();

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-semibold animate-pulse text-sm">Perfecting your experience...</p>
        </div>
      </div>
    }>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/product/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryResults />} />
          <Route path="/category/:categoryName/:id" element={<CategoryDetails />} />
          <Route path="/hotels" element={<HotelResults />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/vendor/:id" element={<div className="p-20 text-center">Vendor Details Page Coming Soon</div>} />
          <Route path="/services" element={<SocialFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:activeTab" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-requests" element={<div className="p-20 text-center">My Requests Page Coming Soon</div>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />

          {/* Vendor/Admin Routes */}
          <Route path="/vendor-panel" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
