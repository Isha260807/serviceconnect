import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, ChevronsUpDown, Bell, LayoutGrid, UserCog, Navigation, ArrowRight, Menu, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import UserLayout from '../../layouts/UserLayout';
import LeadFormModal from '../../components/common/LeadFormModal';
import ServicesOverlay from '../../components/user/ServicesOverlay';
import AnimatedCategoriesOverlay from '../../components/user/AnimatedCategoriesOverlay';
import FeaturedVendors from '../../components/user/FeaturedVendors';
import SocialDiscovery from '../../components/user/SocialDiscovery';
import MarketplacePreview from '../../components/user/MarketplacePreview';

// Centralized Data Imports
import { CATEGORIES, SERVICES_CATEGORIES, HOME_SERVICES, TOP_DEALS, FULL_PRODUCT_LIST, TOP_RANKED_CATEGORIES } from '../../data/marketplaceData';
import { ALL_CITIES } from '../../data/cities';

const SEARCH_SUGGESTIONS = [
  { name: 'Plumbers', category: 'Category' },
  { name: 'Electricians', category: 'Category' },
  { name: 'Carpenters', category: 'Category' },
  { name: 'AC Repair', category: 'Category' },
  { name: 'Cleaning Services', category: 'Category' },
  { name: 'Painters', category: 'Category' },
  { name: 'Pest Control', category: 'Category' },
];

const Home = () => {
  const navigate = useNavigate();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCategoriesOverlayOpen, setIsCategoriesOverlayOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Products');
  const [lookingFor, setLookingFor] = useState('Products');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const moreButtonRef = useRef(null);
  const locationRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState('Indore');
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = ALL_CITIES.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );
  
  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (val) => {
    if (val.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(val.trim())}`);
    } else {
      navigate('/marketplace');
    }
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (cat) => {
    if (cat.isMenu) {
      setIsCategoriesOverlayOpen(true);
      return;
    }

    if (lookingFor === 'Products') {
      const name = cat.name.toLowerCase();
      let targetTab = 'All';
      if (name.includes('electronics')) targetTab = 'Electronics & Gadgets';
      else if (name.includes('food') || name.includes('beverage') || name.includes('agriculture')) targetTab = 'Food & Beverage';
      else if (name.includes('industrial') || name.includes('chemical') || name.includes('manufacturer') || name.includes('automotive')) targetTab = 'All';
      else if (name.includes('decor') || name.includes('retail') || name.includes('home')) targetTab = 'Home & Kitchen';
      else if (name.includes('textile') || name.includes('apparel')) targetTab = 'Fashion & Apparel';
      else if (name.includes('beauty')) targetTab = 'Beauty & Personal Care';
      
      navigate('/marketplace', { state: { category: targetTab } });
      return;
    }

    const route = cat.name.toLowerCase() === 'hotels' ? '/hotels' : `/category/${cat.name.toLowerCase()}`;
    navigate(route);
  };

  const handleEnquiry = (vendor) => {
    setSelectedVendor(vendor);
    setIsEnquiryOpen(true);
  };

  return (
    <UserLayout>
      {/* Mobile-Only Home View (Sleek Modern) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        className="md:hidden bg-white"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Header Row / Navbar (Yellow Background) */}
          <div className="bg-[#fdf9da] px-4 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3" onClick={() => setIsLocationOpen(true)}>
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm border border-primary-50">
                <MapPin size={22} fill="currentColor" fillOpacity={0.2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your location</span>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-slate-800">{selectedCity}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-gray-100">
              <Bell size={20} />
            </div>
          </div>

          {/* Mobile Tab Bar and Search (White Background) */}
          <div className="px-4 pt-4 pb-2 bg-white">
            {/* Mobile Tab Bar */}
            <div className="flex items-center justify-between gap-4 mb-4 overflow-x-auto no-scrollbar pb-1">
              {['Products', 'Services', 'Businesses', 'Trade Fairs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === 'Products' || tab === 'Services') {
                      setLookingFor(tab);
                    }
                  }}
                  className={cn(
                    "text-sm font-medium whitespace-nowrap pb-2 px-1 transition-all relative",
                    activeTab === tab ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTabMobile" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Integrated Mobile Search */}
            <div className="bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-primary-50 p-1 flex items-center mb-2 relative z-50">
              <div 
                className="flex items-center gap-2 pl-4 pr-3 border-r border-slate-100 shrink-0 cursor-pointer"
                ref={locationRef}
                onClick={() => setIsLocationOpen(!isLocationOpen)}
              >
                <MapPin size={16} className="text-primary-500" />
                <span className="text-[13px] font-bold text-slate-800">{selectedCity}</span>
                
                <AnimatePresence>
                  {isLocationOpen && (
                    <motion.div 
                      initial={{opacity:0, y:10, scale: 0.95}} 
                      animate={{opacity:1, y:0, scale: 1}} 
                      exit={{opacity:0, y:10, scale: 0.95}} 
                      className="absolute top-full left-0 mt-3 w-[280px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[60]"
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
                              {filteredCities.map((l, i) => (
                                <button 
                                  key={i} 
                                  type="button"
                                  onClick={() => { setSelectedCity(l); setIsLocationOpen(false); setCitySearch(''); }} 
                                  className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all",
                                    selectedCity === l ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                                  )}
                                >
                                  {l}
                                </button>
                              ))}
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 min-w-0 relative">
                <div className="flex items-center gap-2 px-3 flex-1 relative" ref={suggestionRef}>
                  <input
                    type="text"
                    placeholder="Search products, suppliers..."
                    className="w-full py-2.5 text-[13px] font-medium focus:outline-none placeholder:text-slate-300 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="absolute top-full left-[-100px] right-0 mt-3 w-[calc(100%+100px)] bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[60]">
                        <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trending Searches</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {filteredSuggestions.map((s, i) => (
                            <button 
                              key={i} 
                              type="button"
                              onClick={() => { setSearchQuery(s.name); handleSearch(s.name); }} 
                              className="w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 text-left group border-b border-slate-50 last:border-none"
                            >
                              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                <Search size={14} className="fill-current" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700 group-hover:text-primary-600">{s.name}</span>
                                <span className="text-[11px] text-slate-400">{s.category}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button type="submit" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-600/20 active:scale-90 transition-transform relative z-20 shrink-0">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Page Content (White Background) */}
        <div className="bg-white px-4 pt-6 pb-6 min-h-[220px]">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 leading-tight">Browse by Category</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Explore top business categories across all major industries</p>
          </div>

          {/* Looking for Toggle */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold text-slate-700">I am looking for:</span>
            <div className="bg-slate-50 p-1 rounded-xl flex items-center gap-1 border border-slate-100">
              <button
                onClick={() => setLookingFor('Products')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  lookingFor === 'Products' ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" : "text-slate-500"
                )}
              >
                <LayoutGrid size={14} /> Products
              </button>
              <button
                onClick={() => setLookingFor('Services')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  lookingFor === 'Services' ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" : "text-slate-500"
                )}
              >
                <UserCog size={14} /> Services
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Categories Grid */}
        <div className="bg-white px-4 pb-6 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={lookingFor}
              initial={{ opacity: 0, x: lookingFor === 'Products' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lookingFor === 'Products' ? 20 : -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-3 gap-y-5 gap-x-3"
            >
              {(lookingFor === 'Products' ? CATEGORIES : SERVICES_CATEGORIES).slice(0, 9).map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 bg-slate-50 transition-shadow">
                    <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-slate-800 text-center leading-tight line-clamp-1">
                      {cat.name}
                    </span>
                    <span className="text-[9px] font-bold text-primary-500">{cat.count}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            className="w-full mt-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-primary-600 flex items-center justify-center gap-2"
            onClick={() => setIsCategoriesOverlayOpen(true)}
          >
            See All Categories <ArrowRight size={16} />
          </button>
        </div>

        {/* Restore Products Preview for Mobile */}
        {lookingFor === 'Products' && <MarketplacePreview />}
      </motion.div>

      {/* Desktop Hero Section */}
      <section className="hidden md:flex flex-col bg-white pt-28 pb-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full px-6 flex flex-col items-center">
          {/* Tabs */}
          <div className="flex items-center gap-10 mb-6">
            {['Products', 'Services', 'Businesses', 'Trade Fairs'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Products' || tab === 'Services') {
                    setLookingFor(tab);
                  }
                }}
                className={cn(
                  "text-xl font-medium transition-all relative pb-2",
                  activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTabDesktop" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Unified Search Pill */}
          <div
            id="hero-search-bar"
            className="w-full max-w-4xl bg-white rounded-full shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-primary-200 p-1 flex items-center gap-2 mb-20 relative group transition-all hover:shadow-[0_20px_60px_rgba(13,77,71,0.1)]"
          >
            <div
              ref={locationRef}
              className="flex items-center gap-3 px-6 border-r border-slate-100 min-w-[150px] relative cursor-pointer group/loc"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <MapPin size={18} className="text-primary-500" />
              <span className="text-[14px] font-bold text-slate-600 group-hover/loc:text-primary-600 transition-colors">{selectedCity}</span>
              <div className="flex items-center ml-auto pl-3">
                <ChevronsUpDown size={16} className="text-slate-300 group-hover/loc:text-primary-400 transition-colors" />
              </div>

              {/* City Dropdown */}
              <AnimatePresence>
                {isLocationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 z-50 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-slate-50">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          autoFocus
                          className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary-500/20 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      <div className="p-1.5">
                        <span className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actions</span>
                        <button type="button" className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-primary-50 text-primary-600 transition-colors group">
                          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-white transition-colors">
                            <Navigation size={14} />
                          </div>
                          <span className="text-sm font-bold">Detect my city</span>
                        </button>
                      </div>

                      <div className="p-1.5">
                        <span className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Cities</span>
                        <div className="space-y-0.5">
                          {filteredCities.map((city) => (
                            <button
                              key={city}
                              type="button"
                              className={cn(
                                "w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                selectedCity === city ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                              )}
                              onClick={() => {
                                setSelectedCity(city);
                                setIsLocationOpen(false);
                                setCitySearch('');
                              }}
                            >
                               {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 gap-4 px-6">
              <input
                type="text"
                placeholder={
                  activeTab === 'Products' ? "Search products, suppliers, brands..." :
                    activeTab === 'Services' ? "Search services, suppliers, brands..." :
                      activeTab === 'Businesses' ? "Search businesses, suppliers, brands..." :
                        "Search trade fairs, suppliers, brands..."
                }
                className="w-full py-2.5 text-[16px] font-medium border-none focus:ring-0 focus:outline-none placeholder:text-slate-400 text-slate-700 bg-transparent flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-7 py-2.5 flex items-center gap-2 shadow-lg shadow-primary-600/20 transition-all active:scale-95 group shrink-0">
                <Search size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[14px]">Search</span>
              </button>
            </form>
          </div>

          {/* Browse by Category Header */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Browse by Category</h2>
              <p className="text-sm text-slate-500 font-medium">Explore top business categories across all major industries</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700">I am looking for:</span>
              <div className="bg-slate-50 p-1 rounded-xl flex items-center gap-1 border border-slate-100">
                <button
                  onClick={() => setLookingFor('Products')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    lookingFor === 'Products' ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <LayoutGrid size={14} /> Products
                </button>
                <button
                  onClick={() => setLookingFor('Services')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    lookingFor === 'Services' ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <UserCog size={14} /> Services
                </button>
              </div>
            </div>
          </div>

          {/* Category Grid */}
          <div className="w-full min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={lookingFor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-10 w-full"
              >
                {(lookingFor === 'Products' ? CATEGORIES : SERVICES_CATEGORIES)
                  .slice(0, 12)
                  .map((cat) => (
                    <div
                      key={cat.id}
                      className="flex flex-col items-center group cursor-pointer"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      <div className={cn(
                        "w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-3 overflow-hidden shadow-sm border-2 border-transparent transition-all duration-300 group-hover:shadow-md group-hover:border-primary-500 bg-slate-50 relative",
                        cat.isMenu ? "bg-primary-600 border-primary-600" : ""
                      )}>
                        {typeof cat.icon === 'string' ? (
                          <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <cat.icon size={24} className={!cat.isMenu ? "text-slate-400 group-hover:text-primary-600" : ""} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-700 text-center leading-tight transition-colors group-hover:text-primary-600 mb-0.5 line-clamp-1">
                          {cat.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 group-hover:text-primary-500/70">{cat.count}</span>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className={cn(
              "mt-6 text-sm font-bold text-primary-600 hover:underline flex items-center gap-1 transition-all",
              lookingFor === 'Services' ? "mb-1 md:mb-2" : "mb-12"
            )}
            onClick={() => {
              if (lookingFor === 'Products') {
                navigate('/marketplace');
                return;
              }
              setIsCategoriesOverlayOpen(true);
            }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {/* Restore Products Preview for Desktop */}
        {lookingFor === 'Products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MarketplacePreview />
          </motion.div>
        )}
      </section>

      {/* Top Deals Section */}
      {lookingFor === 'Products' && (
      <>
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-8 md:mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-1">Top Deals</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Score the lowest prices on ServiceConnect</p>
          </div>
          <button 
            onClick={() => navigate('/marketplace')}
            className="text-sm font-bold text-slate-600 hover:text-primary-600 flex items-center gap-0.5 transition-colors mb-1"
          >
            View more <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {[...TOP_DEALS, ...FULL_PRODUCT_LIST].slice(0, 12).map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/marketplace/product/${item.id || '1'}`)}
              className="group cursor-pointer bg-white rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col p-1.5 md:p-2 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] md:aspect-square rounded-lg md:rounded-xl overflow-hidden bg-[#F7F8FA] mb-1.5 md:mb-2 relative group-hover:bg-slate-100 transition-colors">
                <img src={item.image} alt="deal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Search size={14} />
                </div>
              </div>
              
              <div className="flex flex-col flex-1 px-0.5">
                <h3 className="text-[11px] md:text-[13px] font-medium text-slate-800 line-clamp-2 leading-snug mb-0.5 md:mb-1">
                  {item.name || 'Premium Quality Product for Industrial and Commercial use'}
                </h3>
                
                <div className="flex items-center gap-1 text-[#FF4747] mb-1 md:mb-1.5 mt-auto">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mt-px md:w-2.5 md:h-2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  <span className="text-[9px] md:text-[11px] font-bold tracking-tight leading-none">Lower priced than similar</span>
                </div>
                
                <span className="text-base md:text-xl font-black text-slate-900 tracking-tight leading-none mb-0.5 md:mb-1">{item.price}</span>
                
                <div className="flex items-center gap-1.5 text-[9px] md:text-[11px] text-slate-600 mb-0.5">
                  <span>MOQ: {item.moq || '1'} {item.moq === '1' ? 'pc' : 'pcs'}</span>
                  <span className="text-slate-400">{item.sold || (15 + idx * 3)} sold</span>
                </div>
                <span className="text-[8px] md:text-[10px] text-slate-400">1 yr · CN</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top-Ranked Categories Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Top-Ranked Categories For You</h2>
          <button 
            onClick={() => navigate('/marketplace')}
            className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View all
          </button>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 pb-4 no-scrollbar">
          {TOP_RANKED_CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="flex-none w-[140px] md:w-[200px] bg-white rounded-2xl p-2 md:p-3 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer snap-start"
              onClick={() => navigate('/marketplace')}
            >
              <div className="aspect-square rounded-xl bg-[#F7F8FA] mb-3 overflow-hidden relative group">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center text-[12px] md:text-sm font-bold text-slate-800 line-clamp-1">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>
      </>
      )}

      {lookingFor === 'Services' && (
      <>
      {/* Home Services Quick Links */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 mb-4 mt-0 md:mt-0 md:mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Home services</h2>
          <ChevronDown size={24} className="-rotate-90 text-slate-400" />
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 px-1 pb-4 no-scrollbar">
          {HOME_SERVICES.slice(0, 6).map((s) => {
            const hexColor = s.color ? s.color.replace('from-[', '').replace(']', '') : '#000000';
            return (
              <div
                key={s.id}
                className="relative flex-none w-[140px] md:w-auto md:flex-1 aspect-[0.75/1] rounded-xl overflow-hidden group cursor-pointer active:scale-95 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 duration-300 snap-start"
                onClick={() => navigate('/categories')}
              >
                <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div 
                  className="absolute inset-x-0 bottom-0 h-[60%] flex flex-col justify-end"
                  style={{ background: `linear-gradient(to top, ${hexColor}F2 0%, ${hexColor}B3 40%, transparent 100%)` }}
                ></div>
                <div className="absolute inset-x-0 bottom-0 p-3 z-10 text-center">
                  <span className="text-white text-[12px] md:text-[14px] font-black uppercase leading-[1.2] tracking-wide block">
                    {s.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Vendors Component */}
      <FeaturedVendors onEnquiry={handleEnquiry} />

      {/* Social Discovery Component */}
      <SocialDiscovery />
      </>
      )}

      {/* Enquiry Form Modal */}
      <LeadFormModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        vendorName={selectedVendor?.name || "Expert"}
      />

      {/* Services Full Screen Overlay */}
      <ServicesOverlay
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
      />

      {/* Premium Animated Categories Overlay */}
      <AnimatedCategoriesOverlay
        isOpen={isCategoriesOverlayOpen}
        onClose={() => setIsCategoriesOverlayOpen(false)}
        triggerRef={moreButtonRef}
      />
    </UserLayout>
  );
};

export default Home;
