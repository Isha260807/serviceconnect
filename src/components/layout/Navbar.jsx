import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Menu, X, Bell, LayoutGrid, Zap, Sparkles, ChevronDown, Bookmark, Share2, ChevronsUpDown, Navigation, ShoppingCart } from 'lucide-react';
import { ALL_CITIES } from '../../data/cities';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const SEARCH_SUGGESTIONS = [
  { name: 'Plumbers', category: 'Category' },
  { name: 'Electricians', category: 'Category' },
  { name: 'Carpenters', category: 'Category' },
  { name: 'AC Repair', category: 'Category' },
  { name: 'Cleaning Services', category: 'Category' },
  { name: 'Painters', category: 'Category' },
  { name: 'Pest Control', category: 'Category' },
];

const Navbar = ({ onSearch }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const checkUser = () => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const checkCart = () => {
    const stored = localStorage.getItem('sc_local_cart');
    if (stored) {
      try {
        const cart = JSON.parse(stored);
        setCartCount(cart.length);
      } catch (e) {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    checkUser();
    checkCart();
    window.addEventListener('authChange', checkUser);
    window.addEventListener('cartChange', checkCart);
    return () => {
      window.removeEventListener('authChange', checkUser);
      window.removeEventListener('cartChange', checkCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocSuggestions, setShowLocSuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Indore');
  const [citySearch, setCitySearch] = useState('');
  
  const suggestionRef = useRef(null);
  const locRef = useRef(null);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLocations = ALL_CITIES.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        const heroSearch = document.getElementById('hero-search-bar');
        if (heroSearch) {
          const rect = heroSearch.getBoundingClientRect();
          // Trigger when the BOTTOM of hero search bar hits the navbar (approx 80px)
          setIsScrolled(rect.bottom <= 80);
        }
      } else {
        setIsScrolled(window.scrollY > 20);
      }
    };
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) setShowSuggestions(false);
      if (locRef.current && !locRef.current.contains(event.target)) setShowLocSuggestions(false);
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock scroll when dropdowns or mobile menu are open
  useEffect(() => {
    if (showSuggestions || showLocSuggestions || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSuggestions, showLocSuggestions, isMobileMenuOpen]);

  const routeLocation = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(routeLocation.search);
    const q = searchParams.get('q') || '';
    if (routeLocation.pathname === '/marketplace') {
      setQuery(q);
    } else {
      setQuery('');
    }
  }, [routeLocation.pathname, routeLocation.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/marketplace');
    }
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (s) => {
    setQuery(s.name);
    setShowSuggestions(false);
    navigate(`/marketplace?q=${encodeURIComponent(s.name)}`);
  };

  const handleSelectLocation = (l) => {
    setLocation(l);
    setShowLocSuggestions(false);
  };

  const showGlassyNav = true; // Always show glassy for consistency across swapped sections

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b',
      showGlassyNav ? 'bg-[#FFF9D6]/90 backdrop-blur-xl border-yellow-200/60 pt-8 pb-3 md:py-2 shadow-md shadow-yellow-900/5' : 'bg-transparent border-transparent py-3',
      (pathname === '/' || pathname === '/services' || pathname === '/profile') ? 'md:block hidden' : 'block'
    )}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Logo (Desktop) / Location (Mobile) */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFE37D] rounded-xl flex items-center justify-center text-slate-900 group-hover:rotate-12 transition-transform shadow-lg shadow-yellow-400/30">
              <LayoutGrid size={20} className="md:w-6 md:h-6" />
            </div>
            <span className={cn(
              "text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-300",
              showGlassyNav ? "text-slate-900" : "text-white"
            )}>
              Service<span className="text-yellow-600">Connect</span>
            </span>
          </div>

          {/* Mobile Location Removed as requested */}
        </div>

        {/* Desktop Search Bar - Conditional on Home Page */}
        <form onSubmit={handleSearchSubmit} className={cn(
          "hidden md:flex flex-1 max-w-2xl bg-white border border-slate-200 shadow-xl rounded-2xl p-1 items-center transition-all duration-300",
          (!isHomePage || isScrolled) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <div 
            className="flex items-center gap-3 px-4 border-r border-slate-100 min-w-[140px] relative cursor-pointer group/loc" 
            ref={locRef}
            onClick={() => setShowLocSuggestions(!showLocSuggestions)}
          >
            <MapPin size={18} className="text-primary-500" />
            <span className="text-[14px] font-bold text-slate-700 group-hover/loc:text-primary-600 transition-colors">{selectedCity}</span>
            <div className="flex items-center ml-auto pl-2">
                <ChevronsUpDown size={14} className="text-slate-300 group-hover/loc:text-primary-400 transition-colors" />
            </div>

            {/* City Dropdown - Matched with Home page */}
            <AnimatePresence>
              {showLocSuggestions && (
                <motion.div 
                  initial={{opacity:0, y:10, scale: 0.95}} 
                  animate={{opacity:1, y:0, scale: 1}} 
                  exit={{opacity:0, y:10, scale: 0.95}} 
                  className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="text" 
                          placeholder="Search city..." 
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          autoFocus
                          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-xs focus:ring-1 focus:ring-primary-500/20 outline-none placeholder:text-slate-400 font-medium"
                        />
                    </div>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div className="p-1.5">
                        <span className="px-2.5 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Quick Actions</span>
                        <button type="button" className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-primary-50 text-primary-600 transition-colors group">
                          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-white transition-colors">
                            <Navigation size={14} />
                          </div>
                          <span className="text-xs font-bold">Detect my city</span>
                        </button>
                    </div>

                    <div className="p-1.5">
                        <span className="px-2.5 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Popular Cities</span>
                        <div className="space-y-0.5">
                          {filteredLocations.map((l, i) => (
                            <button 
                              key={i} 
                              type="button"
                              onClick={() => { setSelectedCity(l); setShowLocSuggestions(false); setCitySearch(''); }} 
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all",
                                selectedCity === l ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                              )}
                            >
                              {l}
                            </button>
                          ))}
                          {filteredLocations.length === 0 && (
                            <div className="px-4 py-8 text-center">
                              <p className="text-xs text-slate-400">No cities found</p>
                            </div>
                          )}
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center flex-1 gap-2 px-3 relative" ref={suggestionRef}>
            <Search size={18} className="text-yellow-600" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products, services, businesses..." 
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-slate-400 font-medium"
            />
            {/* Search Dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trending Searches</span>
                  </div>
                  {filteredSuggestions.map((s, i) => (
                    <button key={i} type="button" onClick={() => handleSelectSuggestion(s)} className="w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 text-left group">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                        <Zap size={14} className="fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 group-hover:text-primary-600">{s.name}</span>
                        <span className="text-[11px] text-slate-400">{s.category}</span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button type="submit" size="sm" className="rounded-xl px-6 flex items-center gap-2 !bg-[#FFE37D] !text-slate-900 hover:!bg-[#F5D555] shadow-md shadow-yellow-400/30 font-bold">
            <Search size={16} />
            Search
          </Button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className={cn(
            "rounded-full transition-all relative flex items-center justify-center md:hidden",
            showGlassyNav ? "w-10 h-10 bg-white text-slate-700 shadow-sm border border-gray-100" : "p-2 rounded-xl text-white hover:bg-white/10"
          )}>
            <Share2 size={20} />
          </button>

          <button className={cn(
            "rounded-full transition-all relative flex items-center justify-center md:hidden",
            showGlassyNav ? "w-10 h-10 bg-white text-slate-700 shadow-sm border border-gray-100" : "p-2 rounded-xl text-white hover:bg-white/10"
          )}>
            <Bookmark size={20} />
          </button>
          
          <button 
            id="navbar-cart-btn"
            onClick={() => navigate('/cart')}
            className={cn(
              "rounded-full transition-all relative flex items-center justify-center",
              showGlassyNav ? "w-10 h-10 bg-white text-slate-700 shadow-sm border border-gray-100" : "p-2 rounded-xl text-white hover:bg-white/10"
            )}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={cn(
                "absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white",
                showGlassyNav ? "bg-slate-900" : "bg-accent-500"
              )}>
                {cartCount}
              </span>
            )}
          </button>
          
          <button className={cn(
            "rounded-full transition-all relative flex items-center justify-center",
            showGlassyNav ? "w-10 h-10 bg-white text-slate-700 shadow-sm border border-gray-100" : "p-2 rounded-xl text-white hover:bg-white/10"
          )}>
            <Bell size={20} />
            <span className={cn(
              "absolute w-2 h-2 rounded-full border-2 border-white",
              showGlassyNav ? "top-2 right-2 bg-cyan-400" : "top-1.5 right-1.5 bg-accent-500"
            )}></span>
          </button>
          
          <div className={cn(
            "hidden sm:flex items-center gap-2 pl-2 border-l",
            showGlassyNav ? "border-slate-200" : "border-white/20"
          )}>
            <Button 
               onClick={() => setIsMobileMenuOpen(true)}
               variant="ghost" 
               className={cn(
                  "flex items-center gap-2 font-bold px-4",
                  showGlassyNav ? "text-slate-600" : "text-white hover:bg-white/10"
               )}
            >
               <Menu size={20} />
               Menu
            </Button>
            {user ? (
              <Link to="/profile" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-200 text-white flex items-center justify-center font-bold text-sm hover:bg-slate-800 transition-all shadow-md">
                  {user.initials || 'U'}
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="rounded-xl px-5 ml-2">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Menu Drawer (Slides from Right) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[350px] bg-white z-[210] shadow-2xl flex flex-col pt-10"
            >
               <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 left-6 p-2 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
               >
                  <X size={24} />
               </button>

               <div className="px-8 mt-10 space-y-10">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user ? (user.initials || 'U') : 'G'}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-slate-900">{user ? user.name : 'Guest User'}</h3>
                        <p className="text-sm text-slate-400 font-medium">{user ? user.email : 'guest@serviceconnect.com'}</p>
                     </div>
                  </div>

                  <nav className="space-y-2">
                     {[
                        { label: 'Home', path: '/' },
                        { label: 'All Categories', path: '/categories' },
                        { label: 'Social', path: '/services' },
                        { label: 'My Profile', path: '/profile' },
                        { label: 'Help & FAQ', path: '#' }
                     ].map((link, idx) => (
                        <button 
                           key={idx}
                           onClick={() => { window.location.href = link.path; setIsMobileMenuOpen(false); }}
                           className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-primary-50 text-slate-700 hover:text-primary-600 font-bold transition-all group"
                        >
                           {link.label}
                           <ChevronDown size={18} className="-rotate-90 text-slate-300 group-hover:text-primary-400 transition-transform" />
                        </button>
                     ))}
                  </nav>

                  <div className="pt-10 border-t border-slate-100">
                     {user ? (
                       <Button onClick={handleLogout} className="w-full rounded-2xl py-4 shadow-xl shadow-red-500/10 bg-[#E13B3B] hover:bg-red-600 text-white">Sign Out</Button>
                     ) : (
                       <Button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full rounded-2xl py-4 shadow-xl shadow-primary-500/20">Sign In</Button>
                     )}
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
