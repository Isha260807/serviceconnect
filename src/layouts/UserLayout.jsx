import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Home, LayoutGrid, Camera, UserCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === '/';
  const isDetailPage = pathname.includes('/hotel/') || pathname.match(/\/category\/[^/]+\/[^/]+/) || pathname.includes('/marketplace/product/');
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  const bottomNavItems = [
    { icon: Home, label: 'Home', path: '/', active: pathname === '/' },
    { icon: LayoutGrid, label: 'Categories', path: '/categories', active: pathname === '/categories' },
    { icon: Camera, label: 'Social', path: '/services', active: pathname === '/services', badge: 'New' },
    { icon: UserCircle, label: 'Profile', path: '/profile', active: pathname === '/profile' },
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* Hide standard Navbar on mobile for detail pages where we have custom headers, and hide completely on auth pages */}
      {!isAuthPage && (
        <div className={cn(!isDetailPage ? "block" : "hidden md:block")}>
          <Navbar />
        </div>
      )}
      <main className={cn((!isDetailPage && !isAuthPage) ? "pb-20 md:pb-0" : "pb-0")}>
        {children}
      </main>

      {/* Mobile Bottom Navigation - Hidden on Detail and Auth Pages */}
      {!isDetailPage && !isAuthPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FFFDF0] border-t border-yellow-200/60 px-2 py-2 flex items-center justify-around z-[100] shadow-[0_-4px_20px_rgba(212,172,26,0.08)]">
          {bottomNavItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[70px] relative transition-all duration-300",
                item.active ? "text-slate-900 scale-110" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-[#FFE37D] text-slate-900 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight",
                item.active ? "text-slate-900" : "text-slate-500"
              )}>
                {item.label}
              </span>
              {item.active && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-1 bg-[#FFE37D] rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Premium Footer - Only on Home Page */}
      {pathname === '/' && (
        <footer className="bg-slate-900 text-white pt-10 md:pt-20 pb-10 mt-0 md:mt-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#FFE37D] rounded-xl flex items-center justify-center text-slate-900">
                <span className="text-xl font-bold">S</span>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                Service<span className="text-[#FFE37D]">Connect</span>
              </span>
            </div>
            <p className="text-white/70 leading-relaxed">
              The ultimate marketplace to find the best local services and service providers near you. Verified, trusted, and fast.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-white/90">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Home Services</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Automotive</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Health & Wellness</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Professional Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-white/90">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Register as Vendor</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Get App</h4>
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-slate-900 text-xs font-bold font-mono">App</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Download on</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-slate-900 text-xs font-bold">Play</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">© 2026 ServiceConnect Platform. All rights reserved.</p>
          <div className="flex gap-8 text-white/50 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default UserLayout;
