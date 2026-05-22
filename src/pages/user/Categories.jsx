import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Search, Mic, MapPin, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

import { GROUPED_CATEGORIES } from '../../data/groupedCategories';


const CategoriesPage = ({ isOverlay, onOverlayClose, initialTab = 'daily' }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (isOverlay && onOverlayClose) {
      onOverlayClose();
    } else {
      navigate(-1);
    }
  };
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [expandedGroups, setExpandedGroups] = React.useState({});
  const tabContainerRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };


  // Sync tab scroll
  React.useEffect(() => {
    if (tabContainerRef.current) {
      const activeEl = tabContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent pb-24">
      {/* Sticky Top Section */}
      <div className="sticky top-0 z-[100] bg-white shadow-sm overflow-x-hidden">
        {/* Header (Navbar Row) */}
        <div className="bg-[#fdf9da] px-4 pt-3 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={handleBack} className="p-2 -ml-2 rounded-xl hover:bg-white/40 transition-colors">
               <ArrowLeft size={20} className="text-slate-800" />
             </button>
             <span onClick={() => navigate('/')} className="text-lg font-display font-bold tracking-tight text-primary-600 cursor-pointer">
                Service<span className="text-slate-900">Connect</span>
             </span>
          </div>
          <Bell size={20} className="text-slate-400" />
        </div>

        {/* Search Bar & Tabs Container (White Background) */}
        <div className="px-4 pt-3 pb-2">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 rounded-2xl p-1 flex items-center gap-2 focus-within:border-primary-500/30 transition-all mb-3">
            <Search className="text-slate-400 ml-2" size={16} />
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-1.5 bg-transparent focus:outline-none text-slate-800 font-semibold placeholder:text-slate-500 text-xs"
            />
            <Mic size={16} className="text-[#FF5722] mr-2" />
          </form>

          {/* Horizontal Navigation Tabs */}
          <div ref={tabContainerRef} className="flex overflow-x-auto gap-0.5 pb-1 no-scrollbar scroll-smooth">
            {GROUPED_CATEGORIES.map((group) => (
              <button
                key={group.id}
                onClick={() => handleTabClick(group.id)}
                data-active={activeTab === group.id}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 text-[13px] font-bold transition-all duration-300 relative shrink-0",
                  activeTab === group.id 
                    ? "text-primary-600" 
                    : "text-slate-500"
                )}
              >
                {group.title}
                {activeTab === group.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="px-4 mt-6">
        <AnimatePresence mode="wait">
          {GROUPED_CATEGORIES.filter(group => group.id === activeTab).map((group) => (
            <motion.div 
              key={group.id} 
              id={group.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-base font-bold text-slate-900 mb-5 px-1">{group.title}</h2>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-y-6 gap-x-2 justify-items-start px-1">
                {(() => {
                  const isExpanded = expandedGroups[group.id];
                  const itemsToShow = isExpanded || group.items.length <= 16 
                    ? group.items 
                    : group.items.slice(0, 15);
                  const showMore = !isExpanded && group.items.length > 16;
                  const showLess = isExpanded && group.items.length > 16;

                  return (
                    <>
                      {itemsToShow.map((item) => (
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          key={item.id}
                          className="flex flex-col items-start gap-1 active:scale-90 transition-transform cursor-pointer"
                          onClick={() => {
                            const name = item.name.toLowerCase();
                            const route = name.includes('hotels') ? '/hotels' : `/category/${name.replace(/ /g, '-')}`;
                            navigate(route);
                          }}
                        >
                          <div className="w-16 h-14 flex items-center justify-start">
                            <img src={item.icon} alt={item.name} className="w-13 h-13 object-contain" />
                          </div>
                          <span 
                            className="text-[12px] font-bold text-slate-800 text-left leading-tight h-8 flex items-start justify-start px-0.5"
                          >
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                      
                      {showMore && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-start gap-1 active:scale-90 transition-transform cursor-pointer"
                          onClick={() => setExpandedGroups(prev => ({ ...prev, [group.id]: true }))}
                        >
                          <div className="w-16 h-14 flex items-center justify-start">
                            <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                              <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                              </div>
                            </div>
                          </div>
                          <span 
                            className="text-[12px] font-bold text-slate-800 text-left leading-tight h-8 flex items-start justify-start"
                          >
                            More
                          </span>
                        </motion.div>
                      )}

                      {showLess && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-start gap-1 active:scale-90 transition-transform cursor-pointer"
                          onClick={() => setExpandedGroups(prev => ({ ...prev, [group.id]: false }))}
                        >
                          <div className="w-16 h-14 flex items-center justify-start">
                            <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                               <ChevronDown size={20} className="rotate-180" />
                            </div>
                          </div>
                          <span 
                            className="text-[12px] font-bold text-slate-800 text-left leading-tight h-8 flex items-start justify-start"
                          >
                            Less
                          </span>
                        </motion.div>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoriesPage;
