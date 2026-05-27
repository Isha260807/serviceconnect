import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  ChevronRight, 
  Calendar, 
  ChevronDown, 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Zap, 
  ThumbsUp, 
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { CATEGORIES_DATA } from '../../data/categoriesData';

const CategoryResults = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null); // 'sort', 'ratings', 'verified', 'open'
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [checkIn, setCheckIn] = useState('22-04-2026');
  const [checkOut, setCheckOut] = useState('23-04-2026');

  // Normalize category name for data lookup
  const normalizedCategory = categoryName?.toLowerCase();
  const results = CATEGORIES_DATA[normalizedCategory] || CATEGORIES_DATA.default;
  const displayTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Services';

  const SORT_OPTIONS = ['Relevance', 'Rating', 'Popular', 'Distance'];
  const BUDGET_OPTIONS = ['Low', 'Medium', 'High'];

  return (
    <UserLayout>
      {/* Lead Form Modal */}
      <AnimatePresence>
        {isLeadModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsLeadModalOpen(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-8"
             >
                <button 
                  onClick={() => setIsLeadModalOpen(false)}
                  className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={22} />
                </button>

                <h2 className="text-xl font-bold text-slate-900 mb-6 font-display">
                  Get the List of Top <span className="text-[#0076d7]">{displayTitle}</span>
                </h2>

                <div className="space-y-5 mb-5 max-w-lg">
                   <div className="relative group">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 group-focus-within:text-[#0076d7] transition-colors">Name*</label>
                      <input 
                        type="text" 
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] focus:border-[#0076d7] focus:ring-1 focus:ring-[#0076d7] outline-none transition-all"
                      />
                   </div>
                   <div className="relative group">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 group-focus-within:text-[#0076d7] transition-colors">Mobile Number*</label>
                      <input 
                        type="text" 
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] focus:border-[#0076d7] focus:ring-1 focus:ring-[#0076d7] outline-none transition-all"
                      />
                   </div>
                </div>

                <p className="text-[10px] text-slate-400 mb-5">* Indicates mandatory fields</p>

                <button 
                  className="w-full max-w-md bg-[#0076d7] text-white font-extrabold py-3.5 rounded-xl text-[18px] hover:bg-blue-700 transition shadow-xl shadow-blue-500/20 mb-6 uppercase tracking-widest"
                >
                  GET BEST DEAL
                </button>

                <div className="flex items-center gap-2 mb-6">
                   <input type="checkbox" className="w-4 h-4 text-[#0076d7] rounded focus:ring-[#0076d7]" defaultChecked />
                   <p className="text-[13px] text-slate-600 font-medium">
                     I Agree to <span className="text-slate-900 border-b border-slate-900">Terms and Conditions</span>
                   </p>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* All Filters Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">All Filters</h2>
                <button onClick={() => setIsFilterModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Sort Section */}
                <section>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Sort By</h3>
                  <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 transition-all">
                        {opt}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Main Filter Chips */}
                <section>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Service Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Ratings', 'Verified', 'Open Now', 'Near Me', 'Popular'].map(opt => (
                      <button key={opt} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 transition-all">
                        {opt}
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full bg-[#0076d7] text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Filter Modal (Mobile Bottom Sheet) */}
      <AnimatePresence>
        {activeQuickFilter && (
          <div className="fixed inset-0 z-[130] flex items-end justify-center md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickFilter(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="relative w-[calc(100%-32px)] mx-4 mb-6 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 capitalize">Select {activeQuickFilter}</h3>
                <button onClick={() => setActiveQuickFilter(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={22} />
                </button>
              </div>
              <div className="p-2 space-y-1 bg-white">
                {(activeQuickFilter === 'sort' ? SORT_OPTIONS : 
                  activeQuickFilter === 'ratings' ? ['4.5+', '4.0+', '3.5+', 'Any'] : 
                  activeQuickFilter === 'verified' ? ['Yes', 'No'] :
                  ['Yes', 'No']).map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setActiveQuickFilter(null)}
                    className="w-full text-left px-5 py-4 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-50 last:border-0 hover:text-primary-600 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="p-5 bg-white">
                <button 
                  onClick={() => setActiveQuickFilter(null)}
                  className="w-full py-4 text-emerald-700 font-extrabold border border-emerald-100 rounded-xl bg-emerald-50/30 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 pt-[6.5rem] md:pt-28 pb-32 md:pb-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0">
          <span className="hover:text-primary-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={10} />
          <span className="hover:text-primary-600 cursor-pointer" onClick={() => navigate('/categories')}>Categories</span>
          <ChevronRight size={10} />
          <span className="text-slate-400 truncate">{displayTitle} in Mumbai</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 md:mb-0 mb-1 font-display">Popular {displayTitle} in Mumbai</h1>

        {/* Filters Bar - Unified horizontal scroll for all filters */}
        <div className="sticky top-[53px] md:relative bg-white/95 backdrop-blur-md z-40 -mx-6 px-6 py-3 md:pt-0 md:pb-2 border-b border-slate-100 md:border-none md:mb-16 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 scroll-smooth">
            {/* All Filters Trigger */}
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 border border-slate-900 rounded-lg text-sm bg-white font-bold hover:bg-slate-50 transition-all shrink-0 h-[38px]"
            >
              <div className="flex flex-col gap-0.5 items-end">
                <div className="w-3.5 h-0.5 bg-slate-900"></div>
                <div className="w-2.5 h-0.5 bg-slate-900"></div>
                <div className="w-3.5 h-0.5 bg-slate-900"></div>
              </div>
              All Filters
            </button>

            {/* Main Quick Filter Chips */}
            <div className="relative shrink-0">
              <div 
                onClick={() => {
                  if (window.innerWidth < 768) setActiveQuickFilter('sort');
                  else setActiveDropdown(activeDropdown === 'sort' ? null : 'sort');
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all font-bold cursor-pointer h-[38px] whitespace-nowrap",
                  activeDropdown === 'sort' || activeQuickFilter === 'sort' ? "border-[#0076d7] bg-white text-[#0076d7]" : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                )}
              >
                Sort by
                <ChevronDown size={14} className={cn("text-slate-400 transition-transform", activeDropdown === 'sort' && "rotate-180")} />
              </div>
              
              {/* Desktop Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'sort' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-2 z-50 origin-top hidden md:block"
                  >
                    <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45" />
                    <div className="relative space-y-1">
                      {SORT_OPTIONS.map(opt => (
                        <button 
                          key={opt} 
                          onClick={() => setActiveDropdown(null)} 
                          className="w-full text-left px-4 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0076d7] rounded-lg transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {['Ratings', 'Verified', 'Open Now', 'Near Me'].map((filter) => (
              <div 
                key={filter} 
                onClick={() => { 
                  if (window.innerWidth < 768) {
                    setActiveQuickFilter(filter.toLowerCase().replace(' ', ''));
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white cursor-pointer hover:bg-slate-50 transition-all font-bold text-slate-700 shrink-0 h-[38px] whitespace-nowrap",
                  activeQuickFilter === filter.toLowerCase().replace(' ', '') ? "border-[#0076d7] text-[#0076d7]" : ""
                )}
              >
                {filter}
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:mt-10">
          {/* Main Listings */}
          <div className="lg:col-span-3">
            {/* Desktop View: Vertical List */}
            <div className="hidden md:flex flex-col space-y-6">
              {results.map(item => (
                <Card 
                  key={item.id} 
                  className="p-4 flex flex-row gap-6 hover:shadow-xl transition-all duration-300 group border-slate-100 cursor-pointer"
                  onClick={() => navigate(`/category/${normalizedCategory}/${item.id}`)}
                >
                  <div className="w-full md:w-80 h-44 md:h-64 relative rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary" className="shadow-lg backdrop-blur-md bg-white/20 border-white/20 text-white">{item.rating} ★</Badge>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0076d7] transition-colors">{item.name}</h3>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-600 text-white px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
                            {item.rating} <Star size={12} fill="currentColor" />
                          </div>
                          <span className="text-slate-400 text-sm font-medium">{item.reviewsCount} Ratings</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 mt-2">
                      <MapPin size={16} className="text-slate-400" />
                      {item.location}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <button className="bg-[#008a00] text-white hover:bg-green-800 rounded-lg font-bold flex items-center gap-2 px-6 py-2 transition-all active:scale-95 text-sm">
                        <Phone size={16} fill="currentColor" /> Call Now
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLeadModalOpen(true);
                        }}
                        className="bg-[#0076d7] hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-all active:scale-95 text-sm shadow-md"
                      >
                        <Zap size={16} fill="currentColor" /> Get Best Deal
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mobile View: Dynamic Rows of 10 */}
            <div className="md:hidden flex flex-col space-y-4">
              {Array.from({ length: Math.ceil(results.length / 10) }, (_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 space-x-4 pb-4">
                    {results.slice(i * 10, (i + 1) * 10).map(item => (
                      <Card 
                        key={item.id} 
                        className="min-w-[85vw] snap-start p-3 flex flex-col gap-4 border-slate-100 shadow-sm"
                        onClick={() => navigate(`/category/${normalizedCategory}/${item.id}`)}
                      >
                        <div className="w-full h-40 relative rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                             {item.rating} ★
                           </div>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[16px] font-bold text-slate-900 mb-1 leading-tight">{item.name}</h3>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-4 line-clamp-1">
                             <MapPin size={12} className="text-slate-400" />
                             {item.location}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="bg-[#008a00] text-white rounded-lg font-bold flex items-center justify-center gap-1 py-1.5 text-[11px]">
                              <Phone size={12} fill="currentColor" /> Call
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsLeadModalOpen(true);
                              }}
                              className="bg-[#0076d7] text-white rounded-lg font-bold py-2 text-[11px] shadow-md"
                            >
                              Best Deal
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add WhatsApp logic if needed
                              }}
                              className="col-span-2 border border-slate-200 text-[#25d366] rounded-lg font-bold flex items-center justify-center gap-1 py-1.5 text-[11px] mt-1"
                            >
                              <MessageSquare size={12} fill="currentColor" /> WhatsApp
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <Card className="p-5 md:h-[288px] flex flex-col justify-between sticky top-24 border-slate-200 shadow-xl shadow-slate-200/50">
               <div>
                 <h4 className="text-base font-bold text-slate-900 mb-1 leading-tight">
                   Get Top <span className="text-primary-600">{displayTitle}</span> Deals
                 </h4>
                 <p className="text-[11px] text-slate-400">Sent to you in seconds for free</p>
               </div>
 
               <div className="space-y-3.5 mt-4">
                  <input type="text" placeholder="Your Name" className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] outline-none focus:border-primary-500 transition-all" />
                  <input type="text" placeholder="Mobile Number" className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] outline-none focus:border-primary-500 transition-all" />
                  <button className="w-full bg-[#0076d7] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 group transition-all active:scale-[0.98] text-[15px]">
                    Enquire Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CategoryResults;
