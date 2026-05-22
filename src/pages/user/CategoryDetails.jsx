import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import Card from '../../components/common/Card';
import { 
  Plus,
  ChevronDown,
  X,
  ThumbsUp,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Phone,
  MessageSquare,
  Share2,
  Bookmark,
  Camera,
  Star,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { storage } from '../../utils/storage';
import BookingModal from '../../components/user/BookingModal';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import EnquiryModal from '../../components/common/EnquiryModal';
import hotelVideo from '../../assets/hotel.mp4';

const CategoryDetails = () => {
  const { categoryName, id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isBestDealModalOpen, setIsBestDealModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState('booking'); // 'booking' or 'shopping'
  const [direction, setDirection] = useState(0);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState('All');
  
  const [isScrolled, setIsScrolled] = useState(false);
  
  const tabsRef = useRef(null);
  const scrollRef = useRef(null);
  const mobileContainerRef = useRef(null);

  // Data fetching logic
  const normalizedCategory = categoryName?.toLowerCase();
  const categoryList = CATEGORIES_DATA[normalizedCategory] || CATEGORIES_DATA.default;
  const rawItem = categoryList.find(x => x.id === id) || categoryList[0];
  
  const item = {
    ...rawItem,
    images: rawItem.images?.map((img, i) => {
      if (typeof img === 'string') {
        const cats = ['Exterior', 'Interior', 'By User'];
        return { url: img, category: cats[i % cats.length] };
      }
      return img;
    }) || [{ url: rawItem.image, category: 'All' }]
  };

  useEffect(() => {
    if (localStorage.getItem('sc_open_booking_modal') === 'true') {
      localStorage.removeItem('sc_open_booking_modal');
      if (item.actionType === 'shopping') {
        setBookingType('shopping');
        setIsBookingModalOpen(true);
      }
    }
  }, [item]);

  const handleBookNow = () => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      localStorage.setItem('sc_redirect_after_login', window.location.pathname);
      localStorage.setItem('sc_open_booking_modal', 'true');
      navigate('/login');
    } else {
      setBookingType(item.actionType || 'booking');
      setIsBookingModalOpen(true);
    }
  };

  // Refs for each section for the mobile continuous scroll
  const sectionRefs = {
    'Overview': useRef(null),
    'Services': useRef(null),
    'Quick Info': useRef(null),
    'Photos': useRef(null),
    'Reviews': useRef(null),
    'Direction': useRef(null),
    'Explore': useRef(null)
  };
  
  const displayCategory = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Service';
  const tabs = ['Overview', 'Services', 'Quick Info', 'Photos', 'Reviews', 'Direction', 'Explore'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Sync active tab with scroll position on mobile
  useEffect(() => {
    const container = mobileContainerRef.current;
    if (!container || window.innerWidth >= 768) return;

    const handleMobileScroll = () => {
      const scrollPos = container.scrollTop;
      setIsScrolled(scrollPos > 150);

      const detectionPos = scrollPos + 100; // Offset for detection
      for (const tab of tabs) {
        const element = sectionRefs[tab].current;
        if (element) {
          const { offsetTop } = element;
          if (detectionPos >= offsetTop) {
            setActiveTab(tab);
          }
        }
      }
    };

    container.addEventListener('scroll', handleMobileScroll);
    return () => container.removeEventListener('scroll', handleMobileScroll);
  }, []);

  const handleTabChange = (tab) => {
    const newIndex = tabs.indexOf(tab);
    const oldIndex = tabs.indexOf(activeTab);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveTab(tab);

    if (window.innerWidth < 768) {
      const element = sectionRefs[tab].current;
      const container = mobileContainerRef.current;
      if (element && container) {
        // Special case for Overview - scroll to very top
        if (tab === 'Overview') {
          container.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveTab('Overview');
          return;
        }

        const yOffset = element.offsetTop - 95; // 95px = 49px(tabs) + 46px(sticky header)
        container.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    } else {
      if (tabsRef.current) {
        const yOffset = tabsRef.current.offsetTop - 53;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    }
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * index;
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '5%' : '-5%',
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? '5%' : '-5%',
      opacity: 0
    })
  };

  if (!item) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <UserLayout>
      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-white py-4 border-b border-slate-100 z-10">
                <h2 className="text-2xl font-bold text-slate-900">Photos of {item.name}</h2>
                <button onClick={() => setIsGalleryOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                 {item.images?.map((img, i) => (
                    <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-md">
                       {i === 0 ? (
                         <video 
                           src={hotelVideo} 
                           autoPlay 
                           muted 
                           loop 
                           playsInline
                           poster={img.url}
                           className="w-full h-auto hover:scale-105 transition-transform duration-700" 
                         />
                       ) : (
                         <img 
                           src={img.url} 
                           alt={`Gallery ${i}`} 
                           className="w-full h-auto hover:scale-105 transition-transform duration-700" 
                           onError={(e) => {
                             const fallbacks = [
                               'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
                               'https://images.unsplash.com/photo-1571011270518-20f9ce900af1',
                               'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                               'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
                             ];
                             e.target.src = fallbacks[i % fallbacks.length] + '?auto=format&fit=crop&q=80&w=800';
                           }}
                         />
                       )}
                    </div>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div 
        ref={mobileContainerRef}
        className="h-screen md:h-auto overflow-y-auto md:overflow-visible overflow-x-hidden md:max-w-[1400px] md:mx-auto md:px-6 pt-0 md:pt-20 pb-24 md:pb-4 scroll-smooth no-scrollbar"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />

        {/* Global Content Padding for Mobile */}
        <div className="px-4 md:px-0">
          
          {/* Gallery Section */}
          <div className="md:mt-0 mt-0">
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[360px] rounded-2xl overflow-hidden shadow-sm mb-8">
              <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <video 
                  src={hotelVideo} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster={item.images?.[0]?.url}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={item.images?.[1]?.url || item.images?.[0]?.url} alt="G1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={item.images?.[2]?.url || item.images?.[0]?.url} alt="G2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                 <img src={item.images?.[3]?.url || item.images?.[0]?.url} alt="G3" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white backdrop-blur-[2px]">
                    <span className="text-xl font-bold">+{Math.max(0, (item.images?.length || 0) - 3)}</span>
                 </div>
              </div>
              <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                 <img src={item.images?.[1]?.url} alt="G4" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                    <Camera size={18} />
                 </div>
              </div>
            </div>

            <div className="md:hidden -mx-4 relative rounded-b-[32px] overflow-hidden shadow-2xl shadow-slate-200">
              {/* Floating Actions for Mobile Gallery */}
              <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-2.5 text-white bg-black/30 rounded-2xl backdrop-blur-md active:scale-95 transition-all duration-300 pointer-events-auto"
                >
                  <ArrowLeft size={24} />
                </button>
                
                <div className="bg-white px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border border-white/50 pointer-events-auto">
                   <Star size={14} fill="#f59e0b" className="text-amber-500" />
                   <span className="text-[13px] font-black text-slate-900">{item.rating}</span>
                </div>
              </div>

              <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[350px]">
                {item.images?.map((img, i) => (
                  <div key={i} className="min-w-full snap-center relative h-full" onClick={() => setIsGalleryOpen(true)}>
                    {i === 0 ? (
                      <video 
                        src={hotelVideo} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        poster={img.url}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <img 
                        src={img.url || 'https://images.unsplash.com/photo-1571902953202-b5e1b2f7f917?auto=format&fit=crop&q=80&w=1200'} 
                        alt={`G${i}`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const fallbacks = [
                            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
                            'https://images.unsplash.com/photo-1571011270518-20f9ce900af1',
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
                            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
                          ];
                          e.target.src = fallbacks[i % fallbacks.length] + '?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Info Overlay over Banner */}
              <div className="absolute bottom-10 left-6 right-6 z-10 text-white">
                 <h1 className="text-[28px] font-black leading-tight mb-1 font-display tracking-tight text-white drop-shadow-sm">{item.name}</h1>
                 <div className="flex items-center gap-2 opacity-90 mb-6 text-white">
                    <MapPin size={14} />
                    <span className="text-[13px] font-medium">{item.location}</span>
                 </div>

                 {/* Mini Thumbnails Overlay (Click to Change Banner) */}
                 <div className="flex gap-2">
                    {item.images?.slice(0, 3).map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => scrollToImage(i)}
                          className="w-14 h-14 rounded-xl border-2 border-white/40 overflow-hidden shadow-lg transform active:scale-90 transition-all cursor-pointer"
                        >
                           {i === 0 ? (
                             <video src={hotelVideo} autoPlay muted loop playsInline poster={img.url} className="w-full h-full object-cover" />
                           ) : (
                             <img 
                               src={img.url || 'https://images.unsplash.com/photo-1571011270518-20f9ce900af1?auto=format&fit=crop&q=80&w=800'} 
                               className="w-full h-full object-cover" 
                               alt="" 
                               onError={(e) => {
                                 const fallbacks = [
                                   'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
                                   'https://images.unsplash.com/photo-1571011270518-20f9ce900af1',
                                   'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                                   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
                                 ];
                                 e.target.src = fallbacks[i % fallbacks.length] + '?auto=format&fit=crop&q=80&w=800';
                               }}
                             />
                           )}
                        </div>
                    ))}
                 </div>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
                {item.images?.slice(0, 6).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Amenities Bar (Compact) */}
          <div className="md:hidden flex items-center gap-3 overflow-x-auto no-scrollbar py-4 -mx-4 px-4">
             {['Free WiFi', 'Parking', 'AC', 'Certified'].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow-sm border border-slate-100 flex-shrink-0">
                   <div className="w-7 h-7 rounded bg-[#20594e]/5 flex items-center justify-center text-[#20594e] overflow-hidden">
                      {i === 0 ? (
                        <img src="https://cdn-icons-gif.flaticon.com/9284/9284465.gif" className="w-full h-full object-contain" alt="WiFi" />
                      ) : i === 1 ? (
                        <img src="https://cdn-icons-gif.flaticon.com/10606/10606386.gif" className="w-full h-full object-contain" alt="Parking" />
                      ) : i === 2 ? (
                        <img src="https://cdn-icons-gif.flaticon.com/10398/10398549.gif" className="w-full h-full object-contain" alt="AC" />
                      ) : (
                        <img src="https://cdn-icons-gif.flaticon.com/16441/16441482.gif" className="w-full h-full object-contain" alt="Certified" />
                      )}
                   </div>
                   <span className="text-[12px] font-black text-slate-700 whitespace-nowrap">{amenity}</span>
                </div>
             ))}
          </div>

          <div className="hidden md:block">
            {/* Business Info Header (Desktop Only) */}
            <div className="mt-6 md:mt-0 mb-0 md:flex flex-col md:flex-row md:items-start justify-between gap-6 md:mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="hidden md:flex bg-slate-900 text-white rounded-md p-1.5"><Star size={20} fill="currentColor" /></div>
                  <h1 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-tight">{item.name}</h1>
                  
                  {item.verified && (
                    <div className="md:hidden flex items-center gap-1 text-[#20594e] bg-[#20594e]/10 px-2 py-0.5 rounded-full font-bold text-[12px] shrink-0">
                      <CheckCircle2 size={14} fill="currentColor" /> Verified
                    </div>
                  )}

                  <button className="hidden md:block p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                    <Bookmark size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                  <div className="hidden md:flex bg-[#008a00] text-white px-1.5 py-0.5 rounded text-[13px] font-bold items-center gap-1">{item.rating} ★</div>
                  <span className="hidden md:block text-slate-400 font-medium">{item.reviewsCount} Ratings</span>
                  {item.verified && (
                    <div className="hidden md:flex items-center gap-1 text-[#20594e] bg-[#20594e]/10 px-2 py-0.5 rounded-full font-bold text-[12px]">
                      <CheckCircle2 size={14} fill="currentColor" /> Verified
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-slate-500 font-medium">• {item.yearsInBusiness || 5} Years Exp</div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex flex-wrap items-center gap-3 mb-4 md:mb-0">
                  <button className="bg-[#008a00] text-white px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px] shadow-lg shadow-green-500/10 active:scale-95 transition-all">
                    <Phone size={18} fill="currentColor" /> {item.phone}
                  </button>
                  {item.actionType === 'shopping' && (
                    <button 
                      onClick={handleBookNow} 
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px] shadow-lg shadow-amber-500/10 active:scale-95 transition-all"
                    >
                      <Zap size={18} fill="currentColor" /> Shop Now
                    </button>
                  )}
                  <button onClick={() => setIsBestDealModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px] shadow-lg active:scale-95 transition-all">
                    Enquire Now
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px]">
                    <div className="text-[#25d366]"><MessageSquare size={20} fill="currentColor" /></div> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Tab Bar */}
          <div ref={tabsRef} className="sticky top-[49px] md:relative bg-[#f0fdfa]/95 md:bg-transparent z-[90] -mx-4 px-4 md:mx-0 md:px-0 border-b border-slate-100 flex gap-6 md:gap-10 md:mb-14 mb-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button key={tab} onClick={() => handleTabChange(tab)} className={cn("py-3.5 font-bold text-[14px] relative transition-colors whitespace-nowrap", activeTab === tab ? "text-[#20594e]" : "text-slate-500")}>
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#20594e] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:mt-10 md:pb-20">
            <div className="lg:col-span-2">
              
              {/* CONTENT SECTIONS - Tabbed Content for both Desktop and Mobile */}
              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div 
                    key={activeTab} 
                    custom={direction} 
                    variants={variants} 
                    initial="enter" 
                    animate="center" 
                    exit="exit" 
                    transition={{ duration: 0.2 }} 
                    className="relative"
                  >
                    {renderSectionContent(activeTab)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <Card className="p-8 sticky top-24 border-slate-200 shadow-xl shadow-slate-900/5 bg-white/50 backdrop-blur-md">
                 {item.actionType === 'shopping' && (
                   <>
                     <button 
                        onClick={handleBookNow}
                        className="w-full text-white font-extrabold py-4 rounded-xl active:scale-95 transition-all text-sm uppercase shadow-lg mb-6 bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                     >
                        Shop Now
                     </button>
                     <div className="h-[1px] bg-slate-200/60 mb-6"></div>
                   </>
                 )}
                 <h4 className="text-xl font-bold text-slate-900 mb-6 font-display">Get Fast Quotes</h4>
                 <div className="space-y-6">
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-[#20594e] transition-all" />
                    <input type="text" placeholder="Mobile Number" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-[#20594e] transition-all" />
                    <button onClick={() => setIsBestDealModalOpen(true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 rounded-xl shadow-lg active:scale-95 transition-all text-sm uppercase">Submit Inquiry</button>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Redesigned matching Image) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[150] flex items-center gap-2">
          <button className="flex-1 bg-white border-2 border-slate-100 text-slate-900 py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl shadow-slate-200">
             Call Now
          </button>
          {item.actionType === 'shopping' && (
            <button 
              onClick={handleBookNow} 
              className="flex-1 text-white py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl bg-amber-500 shadow-amber-500/20"
            >
               Shop Now
            </button>
          )}
          <button onClick={() => setIsBestDealModalOpen(true)} className="flex-1 bg-slate-900 text-white py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl shadow-slate-900/20">
             Enquire Now
          </button>
      </div>

       <BookingModal 
         isOpen={isBookingModalOpen} 
         onClose={() => setIsBookingModalOpen(false)} 
         item={item} 
         type={bookingType}
       />
       <EnquiryModal
         isOpen={isBestDealModalOpen}
         onClose={() => setIsBestDealModalOpen(false)}
         itemName={item?.name || 'this service'}
         type="service"
       />
    </UserLayout>
  );

  // Componentizes the content for cleaner switching
  function renderSectionContent(tab) {
    switch(tab) {
      case 'Overview':
        return (
          <div className="space-y-3">
            <Card className="p-4 bg-transparent md:bg-white border-none md:border-slate-100 shadow-none md:shadow-premium -mx-4 md:mx-0 rounded-xl">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-slate-900 border-b-2 border-[#20594e] pb-1">Description</h3>
                  <button className="text-[12px] font-bold text-[#20594e]">Read More</button>
               </div>
               <p className="text-slate-500 leading-relaxed font-medium text-[12px] md:text-sm">
                  {item.name} is a leading provider in {item.location} with {item.yearsInBusiness || 5} years of expertise. {item.highlight}. Experience the best in class service with our dedicated team.
               </p>
            </Card>

            {/* Review Summary Card (Compact) */}
            <Card className="p-4 bg-slate-50/50 border-slate-100 shadow-sm md:shadow-premium -mx-4 md:mx-0 rounded-xl flex items-center justify-between">
               <div>
                  <div className="flex gap-1 mb-2">
                     {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#f59e0b" className="text-amber-500" />)}
                  </div>
                  <p className="text-sm font-black text-slate-900">{item.reviewsCount} Reviews</p>
               </div>
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                     </div>
                  ))}
               </div>
            </Card>
            {item.facilities && (
              <Card className="p-6 bg-transparent md:bg-white border-none md:border-slate-100 shadow-none md:shadow-premium -mx-4 md:mx-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1.5"><Sparkles size={14} /> Features</h4>
                    <div className="space-y-1.5 text-slate-700 font-bold text-sm">
                      {item.facilities?.slice(0, 3).map(f => <div key={f}>• {f}</div>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1.5"><CheckCircle2 size={14} /> Perks</h4>
                    <div className="space-y-1.5 text-slate-700 font-bold text-sm">
                      {item.amenities?.slice(0, 3).map(a => <div key={a}>• {a}</div>)}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );
      case 'Services':
        return (
          <Card className="p-6 bg-transparent md:bg-white border-none md:border-slate-100 shadow-none md:shadow-premium -mx-4 md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Core Facilities</h4>
                  <div className="space-y-3">
                    {(item.facilities || ['WiFi', 'Parking', 'AC']).map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden">
                           <img 
                             src={
                               f === 'WiFi' ? 'https://cdn-icons-gif.flaticon.com/9284/9284465.gif' :
                               f === 'Parking' || f === 'Valet Parking' ? 'https://cdn-icons-gif.flaticon.com/10606/10606386.gif' :
                               f === 'AC' ? 'https://cdn-icons-gif.flaticon.com/10398/10398549.gif' :
                               f === 'Elevator' ? 'https://cdn-icons-gif.flaticon.com/9284/9284490.gif' :
                               f === 'Smoking Area' ? 'https://cdn-icons-gif.flaticon.com/11324/11324190.gif' :
                               f === 'Wheelchair Accessible' ? 'https://cdn-icons-gif.flaticon.com/16678/16678533.gif' :
                               'https://cdn-icons-gif.flaticon.com/9284/9284458.gif'
                             } 
                             className="w-full h-full object-contain" 
                             alt="" 
                           />
                         </div>
                         {f}
                      </div>
                    ))}
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Special Expertise</h4>
                  <div className="space-y-3">
                    {(item.services || ['Expert Team', 'Quality Check']).map(s => (
                      <div key={s} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-[#20594e]/10 flex items-center justify-center overflow-hidden">
                           <img 
                             src={
                               s === 'Home Delivery' ? 'https://cdn-icons-gif.flaticon.com/9820/9820038.gif' :
                               'https://cdn-icons-gif.flaticon.com/9284/9284458.gif'
                             } 
                             className="w-full h-full object-contain" 
                             alt="" 
                           />
                         </div>
                         {s}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </Card>
        );
      case 'Quick Info':
        return (
          <Card className="p-6 bg-transparent md:bg-white border-none md:border-slate-100 shadow-none md:shadow-premium -mx-4 md:mx-0">
             <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {[
                  { l: 'Founded', v: `${2024 - (item.yearsInBusiness || 5)}` },
                  { l: 'GSTIN', v: item.gstin || 'AVAILABLE' },
                  { l: 'Work Hours', v: 'Open 24/7' },
                  { l: 'Accepted', v: 'UPI, Cash' },
                  { l: 'Experience', v: `${item.yearsInBusiness || 5} Years` },
                  { l: 'Certified', v: 'Yes' }
                ].map(q => (
                  <div key={q.l}>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{q.l}</p>
                    <p className="text-[13px] font-extrabold text-slate-900">{q.v}</p>
                  </div>
                ))}
             </div>
          </Card>
        );
      case 'Photos':
        const photoCats = [
          { label: 'All', count: item.images.length, img: item.images[0].url },
          { label: 'Exterior', count: item.images.filter(x => x.category === 'Exterior').length, img: item.images.find(x => x.category === 'Exterior')?.url },
          { label: 'Interior', count: item.images.filter(x => x.category === 'Interior').length, img: item.images.find(x => x.category === 'Interior')?.url },
          { label: 'By User', count: item.images.filter(x => x.category === 'By User').length, img: item.images.find(x => x.category === 'By User')?.url }
        ];

        return (
          <div className="space-y-4">
             {/* Photo Filter Bar */}
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-2 bg-[#f0fdfa]/50 md:bg-transparent">
              {photoCats.filter(c => c.count > 0 || c.label === 'All').map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedPhotoCategory(cat.label)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-2 px-1.5 py-1 border rounded-lg bg-white shadow-sm pr-3 transition-all active:scale-95",
                    selectedPhotoCategory === cat.label ? "border-[#20594e] ring-1 ring-[#20594e]" : "border-slate-100"
                  )}
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-slate-100 italic">
                    {cat.label === 'All' ? (
                      <video src={hotelVideo} muted className="w-full h-full object-cover" />
                    ) : (
                      <img src={cat.img} className="w-full h-full object-cover" alt="" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className={cn("text-[10px] font-bold leading-none mb-0.5", selectedPhotoCategory === cat.label ? "text-[#20594e]" : "text-slate-800")}>{cat.label}</p>
                    <p className="text-[8px] font-bold text-slate-400">{cat.count}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {item.images
                ?.filter(img => selectedPhotoCategory === 'All' || img.category === selectedPhotoCategory)
                .map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  {i === 0 && selectedPhotoCategory === 'All' ? (
                    <video 
                      src={hotelVideo} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      poster={img.url}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <img 
                      src={img.url} 
                      alt="" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                      onError={(e) => {
                        const fallbacks = [
                          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
                          'https://images.unsplash.com/photo-1571011270518-20f9ce900af1',
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
                        ];
                        e.target.src = fallbacks[i % fallbacks.length] + '?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'Reviews':
        return (
          <Card className="p-6 border-none md:border-slate-100 shadow-none -mx-4 md:mx-0">
            <div className="space-y-8">
              {(item.userReviews?.length > 0 ? item.userReviews : [
                { name: 'Sameer K.', rating: 5, date: 'Apr 2026', text: 'Highly satisfied!' },
                { name: 'Ritu S.', rating: 4, date: 'Mar 2026', text: 'Prompt service.' }
              ]).map((rev, i) => (
                <div key={i} className="pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-900 text-sm">{rev.name}</p>
                    <div className="bg-[#008a00] text-white px-2 py-0.5 rounded text-[10px] font-bold">{rev.rating} ★</div>
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed italic">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'Direction':
        return (
          <div className="aspect-[16/9] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center relative group">
             <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="" />
             <div className="absolute bg-white/90 backdrop-blur px-5 py-2 rounded-full font-bold shadow-xl border border-white text-[#20594e]">Open Map Location</div>
          </div>
        );
      case 'Explore':
        return (
          <div className="grid grid-cols-1 gap-4">
             {categoryList.slice(0, 4).filter(x => x.id !== item.id).map(sib => (
                <div key={sib.id} className="p-3 bg-white border border-slate-50 rounded-xl flex gap-3 shadow-sm" onClick={() => navigate(`/category/${normalizedCategory}/${sib.id}`)}>
                   <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0"><img src={sib.image} className="w-full h-full object-cover" alt="" /></div>
                   <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-xs mb-1">{sib.name}</h4>
                      <div className="bg-[#008a00] text-white px-1.5 py-0.5 rounded text-[9px] font-bold w-fit mb-1">{sib.rating} ★</div>
                      <span className="text-[#20594e] text-[10px] font-bold">View Detail</span>
                   </div>
                </div>
             ))}
          </div>
        );
      default: return null;
    }
  }
};

export default CategoryDetails;
