import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserLayout from '../../layouts/UserLayout';
import Card from '../../components/common/Card';
import { 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Share2, 
  Zap, 
  CheckCircle2, 
  Bookmark,
  Camera,
  Plus,
  ChevronDown,
  X,
  ThumbsUp,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { storage } from '../../utils/storage';
import BookingModal from '../../components/user/BookingModal';
import EnquiryModal from '../../components/common/EnquiryModal';
import hotelVideo from '../../assets/hotel.mp4';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isBestDealModalOpen, setIsBestDealModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState('booking'); 
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState('All');
  
  const scrollRef = useRef(null);
  const tabsRef = useRef(null);
  const mobileContainerRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('sc_open_booking_modal') === 'true') {
      localStorage.removeItem('sc_open_booking_modal');
      setBookingType('booking');
      setIsBookingModalOpen(true);
    }
  }, []);

  const handleBookNow = () => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      localStorage.setItem('sc_redirect_after_login', window.location.pathname);
      localStorage.setItem('sc_open_booking_modal', 'true');
      navigate('/login');
    } else {
      setBookingType('booking');
      setIsBookingModalOpen(true);
    }
  };

  const tabs = ['Overview', 'Services', 'Quick Info', 'Photos', 'Explore', 'Reviews'];

  // Refs for each section for the mobile continuous scroll
  const sectionRefs = {
    'Overview': useRef(null),
    'Services': useRef(null),
    'Quick Info': useRef(null),
    'Photos': useRef(null),
    'Explore': useRef(null),
    'Reviews': useRef(null)
  };

  const handleTabChange = (tab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = tabs.indexOf(tab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
    
    if (window.innerWidth < 768) {
      const container = mobileContainerRef.current;
      const sectionElement = sectionRefs[tab].current;
      if (container && sectionElement) {
        if (tab === 'Overview') {
          container.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const yOffset = sectionElement.offsetTop - 95; // 95px calculation (49 + 46)
        container.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    } else {
      if (tabsRef.current) {
        const offset = tabsRef.current.offsetTop - 53;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };

  // Sync active tab with scroll position on mobile
  useEffect(() => {
    const container = mobileContainerRef.current;
    if (!container || window.innerWidth >= 768) return;

    const handleMobileScroll = () => {
      const scrollPos = container.scrollTop + 100; // Activation threshold

      for (const tab of tabs) {
        const element = sectionRefs[tab].current;
        if (element) {
          const { offsetTop } = element;
          if (scrollPos >= offsetTop) {
            setActiveTab(tab);
          }
        }
      }
    };

    container.addEventListener('scroll', handleMobileScroll);
    return () => container.removeEventListener('scroll', handleMobileScroll);
  }, []);

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

  // Slider Index Sync
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const handleScroll = () => {
      const index = Math.round(scrollContainer.scrollLeft / scrollContainer.offsetWidth);
      setActiveSlide(index);
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const hotel = {
    name: 'Vink Lodge',
    rating: 3.5,
    reviewsCount: 479,
    location: 'Dharavi, Mumbai',
    yearsInBusiness: 33,
    verified: true,
    phone: '09845258527',
    images: [
      { url: hotelVideo, type: 'video', category: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1571011270518-20f9ce900af1?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Interior' },
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Room' },
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Room' },
    ]
  };

  return (
    <UserLayout>
      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-white py-4 border-b border-slate-100 z-10">
                <h2 className="text-2xl font-bold text-slate-900">Photos of {hotel.name}</h2>
                <button onClick={() => setIsGalleryOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                 {hotel.images.map((img, i) => (
                    <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-md">
                       {img.type === 'video' ? (
                         <video 
                           src={img.url} 
                           autoPlay 
                           muted 
                           loop 
                           playsInline
                           poster={hotel.images.find(x => x.type === 'image')?.url}
                           className="w-full h-auto" 
                         />
                       ) : (
                         <img 
                           src={img.url} 
                           alt={`Gallery ${i}`} 
                           className="w-full h-auto" 
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

      <div 
        ref={mobileContainerRef}
        className="h-screen md:h-auto overflow-y-auto md:overflow-visible overflow-x-hidden md:max-w-[1400px] md:mx-auto md:px-6 pt-0 md:pt-24 pb-24 md:pb-4 scroll-smooth no-scrollbar"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />

        <div className="px-4 md:px-0">
          {/* Gallery Section */}
          <div className="md:mt-0 mt-0">
             <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[360px] rounded-2xl overflow-hidden shadow-sm mb-8">
                <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                 {hotel.images[0].type === 'video' ? (
                   <video 
                     src={hotel.images[0].url} 
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                     poster={hotel.images.find(x => x.type === 'image')?.url}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                 ) : (
                   <img src={hotel.images[0].url} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 )}
                </div>
               <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                 <img src={hotel.images.filter(img => img.type !== 'video')[1]?.url || hotel.images[1].url} alt="G1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                 <img src={hotel.images.filter(img => img.type !== 'video')[2]?.url || hotel.images[2].url} alt="G2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img src={hotel.images.filter(img => img.type !== 'video')[3]?.url || hotel.images[3].url} alt="G3" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                     <span className="text-2xl font-bold">+{hotel.images.length - 4}</span>
                  </div>
               </div>
               <div className="col-span-1 row-span-1 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img src={hotel.images.filter(img => img.type !== 'video')[4]?.url || hotel.images[4].url} alt="G4" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                     <Camera size={24} />
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
                    <span className="text-[13px] font-black text-slate-900">{hotel.rating}</span>
                  </div>
                </div>

                <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[350px]">
                   {hotel.images.map((img, i) => (
                    <div key={i} className="min-w-full snap-center relative h-full" onClick={() => setIsGalleryOpen(true)}>
                      {img.type === 'video' ? (
                        <video src={img.url} className="w-full h-full object-cover" autoPlay muted loop playsInline poster={hotel.images.find(x => x.type === 'image')?.url} />
                      ) : (
                        <img 
                          src={img.url} 
                          alt={`G${i}`} 
                          className="w-full h-full object-cover" 
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Info Overlay over Banner */}
                <div className="absolute bottom-10 left-6 right-6 z-10 text-white">
                  <h1 className="text-[28px] font-black leading-tight mb-1 font-display tracking-tight text-white drop-shadow-sm">{hotel.name}</h1>
                  <div className="flex items-center gap-2 opacity-90 mb-6 text-white">
                      <MapPin size={14} />
                      <span className="text-[13px] font-medium">{hotel.location}</span>
                  </div>

                  {/* Mini Thumbnails Overlay (Click to Change Banner) */}
                   <div className="flex gap-2">
                       {hotel.images.slice(0, 3).map((img, i) => (
                         <div 
                           key={i} 
                           onClick={() => scrollToImage(i)}
                           className="w-14 h-14 rounded-xl border-2 border-white/40 overflow-hidden shadow-lg transform active:scale-90 transition-all cursor-pointer relative"
                         >
                             {img.type === 'video' ? (
                               <video src={img.url} autoPlay muted loop playsInline poster={hotel.images.find(x => x.type === 'image')?.url} className="w-full h-full object-cover" />
                             ) : (
                               <img 
                                 src={img.url} 
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
            {/* Hotel Header (Desktop) */}
            <div className="mb-0 md:flex flex-col md:flex-row md:items-start justify-between gap-6 md:mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="hidden md:flex bg-slate-900 text-white rounded-md p-1.5"><Star size={20} fill="currentColor" /></div>
                  <h1 className="text-2xl md:text-[32px] font-bold text-slate-900 leading-tight">{hotel.name}</h1>
                  <Bookmark size={20} className="hidden md:block text-slate-400 ml-2" />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                  <div className="hidden md:flex bg-[#008a00] text-white px-1.5 py-0.5 rounded text-[13px] font-bold items-center gap-1">3.5 ★</div>
                  <span className="hidden md:block text-slate-400 font-medium">{hotel.reviewsCount} Ratings</span>
                  {hotel.verified && (
                    <div className="hidden md:flex items-center gap-1 text-[#20594e] bg-[#20594e]/10 px-2 py-0.5 rounded-full font-bold text-[12px]">
                      <CheckCircle2 size={14} fill="currentColor" /> Verified
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-slate-500 font-medium"><MapPin size={14} />{hotel.location}</div>
                  <div className="text-slate-500 font-medium">• {hotel.yearsInBusiness} Years Exp</div>
                </div>
                {/* Desktop Action Buttons */}
                <div className="hidden md:flex flex-wrap items-center gap-3 mb-4 md:mb-0">
                  <button className="bg-[#008a00] text-white px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px] shadow-lg shadow-green-500/10 active:scale-95 transition-all">
                    <Phone size={18} fill="currentColor" /> {hotel.phone}
                  </button>
                  <button onClick={handleBookNow} className="bg-[#20594e] hover:bg-[#1b4b41] text-white px-6 py-2.5 rounded-lg flex items-center gap-3 font-bold text-[14px] shadow-lg shadow-[#20594e]/10 active:scale-95 transition-all">
                    <Zap size={18} fill="currentColor" /> Book Now
                  </button>
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
          <div ref={tabsRef} className="sticky top-[49px] md:relative bg-[#f0fdfa]/95 md:bg-transparent z-[90] -mx-4 px-4 md:mx-0 md:px-0 border-b border-slate-100 flex gap-6 md:gap-10 md:mb-12 mb-0 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button key={tab} onClick={() => handleTabChange(tab)} className={cn("py-3.5 font-bold text-[14px] relative transition-colors whitespace-nowrap", activeTab === tab ? "text-[#20594e]" : "text-slate-500")}>
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline-hotel" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#20594e] rounded-full" />}
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
              <Card className="p-8 sticky top-24 border-slate-200 shadow-xl bg-white/50 backdrop-blur-md">
                 <button 
                    onClick={handleBookNow}
                    className="w-full bg-[#20594e] hover:bg-[#1b4b41] text-white font-extrabold py-4 rounded-xl active:scale-95 transition-all text-sm uppercase shadow-lg shadow-[#20594e]/20 mb-6"
                 >
                    Book Now
                 </button>
                 <div className="h-[1px] bg-slate-200/60 mb-6"></div>
                 <h4 className="text-xl font-bold text-slate-900 mb-6 font-display">Inquiry Now</h4>
                 <div className="space-y-6">
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-[#20594e]" />
                    <input type="text" placeholder="Mobile Number" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-[#20594e]" />
                    <button onClick={() => setIsBestDealModalOpen(true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 rounded-xl active:scale-95 transition-all text-sm uppercase">Submit Inquiry</button>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Redesigned) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[150] flex items-center gap-2">
          <button className="flex-1 bg-white border-2 border-slate-100 text-slate-900 py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl shadow-slate-200">
             Call Now
          </button>
          <button 
            onClick={handleBookNow} 
            className="flex-1 bg-[#20594e] text-white py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl shadow-[#20594e]/20"
          >
             Book Now
          </button>
          <button onClick={() => setIsBestDealModalOpen(true)} className="flex-1 bg-slate-900 text-white py-3.5 rounded-[20px] font-black text-[12px] active:scale-95 transition-all shadow-xl shadow-slate-900/20">
             Enquire Now
          </button>
      </div>

       <BookingModal 
         isOpen={isBookingModalOpen} 
         onClose={() => setIsBookingModalOpen(false)} 
         item={hotel} 
         type={bookingType}
       />
       <EnquiryModal
         isOpen={isBestDealModalOpen}
         onClose={() => setIsBestDealModalOpen(false)}
         itemName={hotel?.name || 'this service'}
         type="service"
       />
    </UserLayout>
  );

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
                  {hotel.name} is a premier lodging destination located in {hotel.location}. Established in 1993, we provide professional hospitality services with {hotel.yearsInBusiness} years of excellence. Experience the best stay in the heart of Mumbai.
               </p>
            </Card>

            {/* Review Summary Card (Compact) */}
            <Card className="p-4 bg-slate-50/50 border-slate-100 shadow-sm md:shadow-premium -mx-4 md:mx-0 rounded-xl flex items-center justify-between">
               <div>
                  <div className="flex gap-1 mb-2">
                     {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#f59e0b" className="text-amber-500" />)}
                  </div>
                  <p className="text-sm font-black text-slate-900">{hotel.reviewsCount} Reviews</p>
               </div>
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="" />
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="p-4 bg-transparent md:bg-white border-none md:border-slate-100 shadow-none md:shadow-premium -mx-4 md:mx-0 rounded-xl">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3"><Sparkles size={14} className="inline mr-1" /> Check-in</h4>
                    <p className="text-sm font-bold text-slate-900">12:00 PM</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3"><Sparkles size={14} className="inline mr-1" /> Check-out</h4>
                    <p className="text-sm font-bold text-slate-900">11:00 AM</p>
                  </div>
               </div>
            </Card>
          </div>
        );
      case 'Services':
        return (
          <Card className="p-6 border-none md:border-slate-100 shadow-none -mx-4 md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Key Facilities</h4>
                  <div className="space-y-3">
                    {['No Smoking Zone', '24 Hour Reception', 'Elevator'].map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden">
                           <img 
                             src={
                               f === 'No Smoking Zone' ? 'https://cdn-icons-gif.flaticon.com/11324/11324190.gif' :
                               f === '24 Hour Reception' ? 'https://cdn-icons-gif.flaticon.com/9284/9284458.gif' :
                               f === 'Elevator' ? 'https://cdn-icons-gif.flaticon.com/9284/9284490.gif' :
                               f === 'Wheelchair Accessible' ? 'https://cdn-icons-gif.flaticon.com/16678/16678533.gif' :
                               f === 'Valet Parking' ? 'https://cdn-icons-gif.flaticon.com/10606/10606386.gif' :
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
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4">Room Amenities</h4>
                  <div className="space-y-3">
                    {['Fan', 'Linens Provided', 'CCTV'].map(a => (
                      <div key={a} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-[#20594e]/10 flex items-center justify-center overflow-hidden">
                           <img 
                             src={
                               a === 'Fan' ? 'https://cdn-icons-gif.flaticon.com/10872/10872238.gif' :
                               a === 'CCTV' ? 'https://cdn-icons-gif.flaticon.com/11512/11512521.gif' :
                               'https://cdn-icons-gif.flaticon.com/9284/9284458.gif'
                             } 
                             className="w-full h-full object-contain" 
                             alt="" 
                           />
                         </div>
                         {a}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </Card>
        );
      case 'Quick Info':
        return (
          <Card className="p-6 border-none md:border-slate-100 shadow-none -mx-4 md:mx-0">
             <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {[
                  { l: 'Founded', v: '1993' },
                  { l: 'Reg No.', v: 'MH-400017-H' },
                  { l: 'Status', v: 'Open Now', g: true },
                  { l: 'Accepted', v: 'UPI, Cash' },
                  { l: 'Exp.', v: '33 Years' },
                  { l: 'Type', v: 'Budget Hotel' }
                ].map(q => (
                  <div key={q.l}>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{q.l}</p>
                    <p className={cn("text-[13px] font-extrabold text-slate-900", q.g && "text-emerald-600")}>{q.v}</p>
                  </div>
                ))}
             </div>
          </Card>
        );
      case 'Photos':
        const photoCats = [
          { label: 'All', count: hotel.images.length, img: hotel.images[1].url },
          { label: 'Videos', count: hotel.images.filter(x => x.type === 'video').length, img: hotel.images[0].url, isVideo: true },
          { label: 'Room', count: hotel.images.filter(x => x.category === 'Room').length, img: hotel.images.find(x => x.category === 'Room')?.url },
          { label: 'Exterior', count: hotel.images.filter(x => x.category === 'Exterior').length, img: hotel.images.find(x => x.category === 'Exterior')?.url },
          { label: 'Interior', count: hotel.images.filter(x => x.category === 'Interior').length, img: hotel.images.find(x => x.category === 'Interior')?.url }
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
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-slate-100 relative">
                    <img src={cat.img} className="w-full h-full object-cover" alt="" />
                    {cat.isVideo && <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white"><Plus size={12} className="rotate-45" /></div>}
                  </div>
                  <div className="text-left">
                    <p className={cn("text-[10px] font-bold leading-none mb-0.5", selectedPhotoCategory === cat.label ? "text-[#20594e]" : "text-slate-800")}>{cat.label}</p>
                    <p className="text-[8px] font-bold text-slate-400">{cat.count}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hotel.images
                .filter(img => {
                  if (selectedPhotoCategory === 'All') return true;
                  if (selectedPhotoCategory === 'Videos') return img.type === 'video';
                  return img.category === selectedPhotoCategory;
                })
                .map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer relative" onClick={() => setIsGalleryOpen(true)}>
                  {img.type === 'video' ? (
                    <video src={img.url} className="w-full h-full object-cover" autoPlay muted loop playsInline poster={hotel.images.find(x => x.type === 'image')?.url} />
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
      case 'Explore':
        return (
          <div className="grid grid-cols-1 gap-4">
             {[
               { name: 'Hotel Theresa', rating: 4.1, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
               { name: 'Food Lees', rating: 4.3, img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400' }
             ].map((sib, i) => (
                <div key={i} className="p-3 bg-white border border-slate-50 rounded-xl flex gap-3 shadow-sm">
                   <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0"><img src={sib.img} className="w-full h-full object-cover" alt="" /></div>
                   <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-xs mb-1">{sib.name}</h4>
                      <div className="bg-[#008a00] text-white px-1.5 py-0.5 rounded text-[9px] font-bold w-fit mb-1">{sib.rating} ★</div>
                      <span className="text-[#20594e] text-[10px] font-bold font-display">View Detail</span>
                   </div>
                </div>
             ))}
          </div>
        );
      case 'Reviews':
        return (
          <Card className="p-6 border-none md:border-slate-100 shadow-none -mx-4 md:mx-0">
            <div className="space-y-8">
              {[
                { name: 'Rohan M.', rating: 5, date: 'May 2026', text: 'Peaceful stay and great staff.' },
                { name: 'Suhani S.', rating: 4, date: 'Apr 2026', text: 'Clean rooms and easy check-in.' }
              ].map((rev, i) => (
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
      default: return null;
    }
  }
};

export default HotelDetails;
