import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const HOTEL_DATA = [
  {
    id: 'v1',
    name: 'Vink Lodge',
    rating: 3.5,
    reviews: 479,
    location: '90 Feet Road Dharavi, Mumbai',
    tags: ['24 Hour Concierge/Help Desk', 'Room Service', 'Laundry Service'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    verified: false,
    responsive: false,
    highlight: 'High call pick up rate',
    phone: '09845258527'
  },
  {
    id: 'v2',
    name: 'Astha Home',
    rating: 4.5,
    reviews: 189,
    location: 'Thakur Village Kandivali East, Mumbai',
    tags: ['WiFi', 'AC'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: true,
    highlight: 'High call pick up rate',
    proximity: '3 minutes walk to Sai Dham Temple',
    phone: '09845258527'
  },
  {
    id: 'v3',
    name: 'Marine Bay Resort',
    rating: 4.2,
    reviews: 1205,
    location: 'Marine Drive, Mumbai',
    tags: ['Sea Facing', 'WiFi', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: true,
    highlight: 'High call pick up rate',
    phone: '09845258527'
  },
  {
    id: 'v4',
    name: 'Sunshine Inn',
    rating: 3.8,
    reviews: 312,
    location: 'Andheri West, Mumbai',
    tags: ['Budget', '24 Hour Concierge', 'Laundry Service'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600',
    verified: false,
    responsive: true,
    highlight: 'Instant response',
    phone: '09845258527'
  },
  {
    id: 'v5',
    name: 'The Grand Palace',
    rating: 4.9,
    reviews: 2500,
    location: 'Colaba, Mumbai',
    tags: ['Luxury', 'Sea Facing', 'AC', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: true,
    highlight: 'High call pick up rate',
    phone: '09845258527'
  },
  {
    id: 'v6',
    name: 'Green View Residency',
    rating: 4.0,
    reviews: 560,
    location: 'Powai, Mumbai',
    tags: ['Mountain View', 'WiFi', 'AC'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: false,
    highlight: 'Peaceful location',
    phone: '09845258527'
  },
  {
    id: 'v7',
    name: 'Blue Lagoon Resort',
    rating: 4.4,
    reviews: 890,
    location: 'Juhu, Mumbai',
    tags: ['Pool', 'WiFi', 'Beach Front'],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: true,
    highlight: 'Highly Recommended',
    phone: '09845258527'
  },
  {
    id: 'v8',
    name: 'Skyline Suites',
    rating: 4.1,
    reviews: 420,
    location: 'Worli, Mumbai',
    tags: ['Sea View', 'Gym', 'Business Hub'],
    image: 'https://images.unsplash.com/photo-1551882547-ff43c61fef4e?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: true,
    highlight: 'Trusted by Corporate',
    phone: '09845258527'
  },
  {
    id: 'v9',
    name: 'Royal Heritage Hotel',
    rating: 4.7,
    reviews: 1560,
    location: 'Fort, Mumbai',
    tags: ['Vintage', 'WiFi', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600',
    verified: true,
    responsive: false,
    highlight: 'Classic Stay',
    phone: '09845258527'
  },
  {
    id: 'v10',
    name: 'Harbor View Stay',
    rating: 3.9,
    reviews: 280,
    location: 'Apollo Bunder, Mumbai',
    tags: ['Harbor View', 'AC', 'Breakfast Included'],
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=600',
    verified: false,
    responsive: true,
    highlight: 'Near Gateway of India',
    phone: '09845258527'
  },
  {
    id: 'v11',
    name: 'Palm Grove Residency',
    rating: 4.3,
    reviews: 730,
    location: 'Malad West, Mumbai',
    tags: ['Garden View', 'WiFi', 'Laundry'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'High call pick up rate',
    phone: '09845258527'
  },
  {
    id: 'v12',
    name: 'City Light Inn',
    rating: 3.6,
    reviews: 150,
    location: 'Dadar, Mumbai',
    tags: ['Budget', 'AC', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    verified: false,
    responsive: true,
    highlight: 'Central Location',
    phone: '09845258527'
  },
  {
    id: 'v13',
    name: 'The Orchid Boutique',
    rating: 4.6,
    reviews: 1120,
    location: 'Vile Parle, Mumbai',
    tags: ['Boutique', 'Organic Food', 'Spa'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'Award Winning',
    phone: '09845258527'
  },
  {
    id: 'v14',
    name: 'Majestic Towers',
    rating: 4.8,
    reviews: 2100,
    location: 'Bandra Kurla Complex, Mumbai',
    tags: ['Luxury Suites', 'Infinity Pool', 'AC'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'Premium Experience',
    phone: '09845258527'
  },
  {
    id: 'v15',
    name: 'Coastal Breeze Inn',
    rating: 4.2,
    reviews: 640,
    location: 'Versova, Mumbai',
    tags: ['Sea Breeze', 'WiFi', 'Kitchenette'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'Near Beach',
    phone: '09845258527'
  },
  {
    id: 'v16',
    name: 'Corporate Hub Hotel',
    rating: 4.0,
    reviews: 820,
    location: 'Lower Parel, Mumbai',
    tags: ['Business Desk', 'WiFi', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'Trusted for Business',
    phone: '09845258527'
  },
  {
    id: 'v17',
    name: 'Mountain Peak Hotel',
    rating: 4.4,
    reviews: 340,
    location: 'Goregaon East, Mumbai',
    tags: ['National Park View', 'WiFi', 'AC'],
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: false,
    highlight: 'Quiet Environment',
    phone: '09845258527'
  },
  {
    id: 'v18',
    name: 'The Pearl Residency',
    rating: 3.7,
    reviews: 210,
    location: 'Sion, Mumbai',
    tags: ['WiFi', 'AC', 'Budget'],
    image: 'https://images.unsplash.com/photo-1521783988139-89397d700ed8?auto=format&fit=crop&q=80&w=800',
    verified: false,
    responsive: true,
    highlight: 'Easy Commute',
    phone: '09845258527'
  },
  {
    id: 'v19',
    name: 'Azure Bay Hotel',
    rating: 4.5,
    reviews: 1280,
    location: 'Nariman Point, Mumbai',
    tags: ['Sea View', 'WiFi', 'Bar'],
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982ad91?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'Premium View',
    phone: '09845258527'
  },
  {
    id: 'v20',
    name: 'Urban Oasis Inn',
    rating: 4.1,
    reviews: 590,
    location: 'Chembur, Mumbai',
    tags: ['WiFi', 'Pool', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800',
    verified: true,
    responsive: true,
    highlight: 'High call pick up rate',
    phone: '09845258527'
  }
];

const HotelResults = () => {
  const navigate = useNavigate();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null); // 'sort', 'star', 'budget'
  const [activeDropdown, setActiveDropdown] = useState(null); // 'sort', 'star', etc.
  const [checkIn, setCheckIn] = useState('22-04-2026');
  const [checkOut, setCheckOut] = useState('23-04-2026');

  const SORT_OPTIONS = ['Relevance', 'Rating', 'Popular', 'Distance', 'Highest Price', 'Lowest Price'];
  const STAR_OPTIONS = ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'];
  const BUDGET_OPTIONS = ['Rs 501 to Rs 1000', 'Rs 1001 to Rs 2000', 'Rs 2001 to Rs 3000', 'Rs 3001 to Rs 4000', 'Rs 4001 to Rs 5000', 'Rs 5001 to Rs 6000', 'Rs 6001 to Rs 7000', 'Rs 7001 to Rs 8000'];
  const VIEW_OPTIONS = ['Sea Facing', 'Mountain View', 'Lakeside View', 'Quiet Street View', 'City View', 'Beach Access'];

  return (
    <UserLayout>
      {/* Date Picker Modal */}
      <AnimatePresence>
        {isDatePickerOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsDatePickerOpen(false)}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
             />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
              >
                <div className="flex justify-between items-center mb-4">
                   <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 transition-colors">
                     <ArrowLeft size={18} />
                   </button>
                   
                    <div className="flex-1 flex justify-center px-4">
                       <h3 className="text-lg font-bold text-slate-800">April 2026</h3>
                    </div>

                   <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 transition-colors">
                     <ArrowRight size={18} />
                   </button>
                </div>

                 <div className="flex justify-center">
                    {/* Single Month Calendar (April) */}
                    <div className="w-full">
                       <div className="grid grid-cols-7 border-l border-t border-slate-100">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                             <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-3 border-r border-b border-slate-100 uppercase">{d}</div>
                          ))}
                          {/* Empty days for Wed start */}
                          <div className="p-2 border-r border-b border-slate-100 bg-slate-50/10"></div>
                          <div className="p-2 border-r border-b border-slate-100 bg-slate-50/10"></div>
                          <div className="p-2 border-r border-b border-slate-100 bg-slate-50/10"></div>
                          {[...Array(30)].map((_, i) => {
                             const day = i + 1;
                             const isSelected = day === 22;
                             return (
                                <div 
                                  key={i} 
                                  onClick={() => setIsDatePickerOpen(false)}
                                  className={cn(
                                    "text-center p-3 text-xs font-bold cursor-pointer transition-all border-r border-b border-slate-100 aspect-square flex items-center justify-center",
                                    day > 0 && day < 22 && "text-slate-300",
                                    day >= 23 && "text-slate-800",
                                    isSelected ? "bg-primary-600 text-white border-primary-600" : "hover:bg-slate-50"
                                  )}
                                >
                                  {day}
                                </div>
                             );
                          })}
                          {/* Fill remaining cells to maintain grid integrity */}
                          {[...Array(2)].map((_, i) => (
                             <div key={i} className="p-2 border-r border-b border-slate-100 bg-slate-50/10"></div>
                          ))}
                       </div>
                    </div>
                 </div>


             </motion.div>
          </div>
        )}
      </AnimatePresence>

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

                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Get the List of Top <span className="text-[#7c3aed]">Hotels</span>
                </h2>

                <div className="space-y-5 mb-5 max-w-lg">
                   <div className="relative group">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 group-focus-within:text-[#7c3aed] transition-colors">Name*</label>
                      <input 
                        type="text" 
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all"
                      />
                   </div>
                   <div className="relative group">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 group-focus-within:text-[#7c3aed] transition-colors">Mobile Number*</label>
                      <input 
                        type="text" 
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] outline-none transition-all"
                      />
                   </div>
                </div>

                <p className="text-[10px] text-slate-400 mb-5">* Indicates mandatory fields</p>

                <div className="mb-6">
                   <p className="text-[14px] font-bold text-slate-900 mb-3">What type of Hotel are you looking for?</p>
                   <div className="flex items-center gap-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="modalHotelType" className="w-5 h-5 text-[#7c3aed] focus:ring-[#7c3aed]" defaultChecked />
                        <span className="text-[14px] font-medium text-slate-700">Budget</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="modalHotelType" className="w-5 h-5 text-[#7c3aed] focus:ring-[#7c3aed]" />
                        <span className="text-[14px] font-medium text-slate-700">Luxury</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="modalHotelType" className="w-5 h-5 text-[#7c3aed] focus:ring-[#7c3aed]" />
                        <span className="text-[14px] font-medium text-slate-700">Others</span>
                      </label>
                   </div>
                </div>

                <button 
                  className="w-full max-w-md bg-primary-600 text-white font-extrabold py-3.5 rounded-xl text-[18px] hover:bg-primary-700 transition shadow-xl shadow-primary-500/20 mb-6 uppercase tracking-widest"
                >
                  GET BEST DEAL
                </button>

                <div className="flex items-center gap-2 mb-6">
                   <input type="checkbox" className="w-4 h-4 text-[#7c3aed] rounded focus:ring-[#7c3aed]" defaultChecked />
                   <p className="text-[13px] text-slate-600 font-medium">
                     I Agree to <span className="text-slate-900 border-b border-slate-900">Terms and Conditions</span> <span className="text-slate-400 ml-1 underline transition-colors cursor-pointer hover:text-[#7c3aed]">T&C's Privacy Policy</span>
                   </p>
                </div>

                <ul className="space-y-2">
                   {[
                     'Your requirement is sent to the selected relevant businesses',
                     'Businesses compete with each other to get you the Best Deal',
                     'You choose whichever suits you best',
                     'Contact info sent to you by SMS/Email'
                   ].map((item, idx) => (
                     <li key={idx} className="flex gap-3 text-[12px] text-slate-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        {item}
                     </li>
                   ))}
                </ul>
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

                {/* Rating Section */}
                <section>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Star Rating</h3>
                  <div className="flex flex-wrap gap-2">
                    {STAR_OPTIONS.map(opt => (
                      <button key={opt} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 transition-all">
                        {opt}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Categories */}
                {['Hotel View', 'Amenities', 'Pets Essential', 'User Ratings'].map(cat => (
                  <section key={cat}>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">{cat}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(cat === 'Hotel View' ? VIEW_OPTIONS : ['Option 1', 'Option 2', 'Option 3']).map(opt => (
                        <button key={opt} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 transition-all">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all"
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
              onClick={() => setActiveQuickQuickFilter(null)}
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
                  STAR_OPTIONS).map(opt => (
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

      <div className="max-w-[1400px] mx-auto px-6 pt-[4.4rem] md:pt-20 pb-32 md:pb-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-0">
          <span className="hover:text-primary-600 cursor-pointer">Mumbai</span>
          <ChevronRight size={10} />
          <span className="hover:text-primary-600 cursor-pointer">Hotels in Mumbai</span>
          <ChevronRight size={10} />
          <span className="text-slate-400">14443+ Listings</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mt-0 mb-0 md:my-0 font-display">Popular Hotels in Mumbai</h1>

        {/* Filters Bar - Fixed in one scrollable line */}
        <div className="sticky top-[53px] md:relative bg-transparent backdrop-blur-md z-40 -mx-6 px-6 py-0 md:py-0 border-b border-slate-100 md:border-none flex items-center gap-2 overflow-x-auto no-scrollbar md:mb-16 mb-8 -mt-3 md:-mt-6">
          {/* Check-in */}
          <div 
            onClick={() => setIsDatePickerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-[12px] md:text-sm bg-white cursor-pointer hover:border-primary-500 transition-colors shadow-sm shrink-0"
          >
            <span className="font-bold text-slate-800">{checkIn}</span>
            <Calendar size={14} className="text-slate-400" />
          </div>

          {/* Check-out */}
          <div 
            onClick={() => setIsDatePickerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-[12px] md:text-sm bg-white cursor-pointer hover:border-primary-500 transition-colors shadow-sm shrink-0"
          >
            <span className="font-bold text-slate-800">{checkOut}</span>
            <Calendar size={14} className="text-slate-400" />
          </div>

          {/* All Filters Button */}
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-slate-900 rounded-lg text-[12px] md:text-sm bg-white font-bold hover:bg-slate-50 transition-all shrink-0"
          >
             <div className="flex flex-col gap-0.5 items-end">
                <div className="w-3.5 h-0.5 bg-slate-900"></div>
                <div className="w-2.5 h-0.5 bg-slate-900"></div>
                <div className="w-3.5 h-0.5 bg-slate-900"></div>
             </div>
             All Filters
          </button>

          {/* Sort By Dropdown */}
          <div className="relative shrink-0">
            <div 
              onClick={() => {
                if (window.innerWidth < 768) setActiveQuickFilter('sort');
                else setActiveDropdown(activeDropdown === 'sort' ? null : 'sort');
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all font-bold cursor-pointer",
                activeDropdown === 'sort' ? "border-primary-500 bg-white" : "border-slate-200 bg-slate-100/50 hover:bg-white hover:border-primary-500 text-slate-700"
              )}
            >
              Sort by
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform", activeDropdown === 'sort' && "rotate-180")} />
            </div>
            
            <AnimatePresence>
              {activeDropdown === 'sort' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-2 z-50 origin-top"
                >
                  <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45" />
                  <div className="relative space-y-1">
                    {SORT_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-4 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary-600 rounded-lg transition-colors border-b border-slate-50 last:border-0"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Star Rating Dropdown */}
          <div className="relative shrink-0">
            <div 
              onClick={() => {
                if (window.innerWidth < 768) setActiveQuickFilter('star');
                else setActiveDropdown(activeDropdown === 'star' ? null : 'star');
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all font-bold cursor-pointer",
                activeDropdown === 'star' ? "border-primary-500 bg-white" : "border-slate-200 bg-slate-100/50 hover:bg-white hover:border-primary-500 text-slate-700"
              )}
            >
              Star Rating
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform", activeDropdown === 'star' && "rotate-180")} />
            </div>
            
            <AnimatePresence>
              {activeDropdown === 'star' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-3 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-2 z-50 origin-top"
                >
                  <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45" />
                  <div className="relative space-y-1">
                    {STAR_OPTIONS.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-4 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary-600 rounded-lg transition-colors border-b border-slate-50 last:border-0"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Only Extensions */}
          <div className="hidden lg:flex items-center gap-2">
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'view' ? null : 'view')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all font-bold cursor-pointer shrink-0",
                activeDropdown === 'view' ? "border-primary-500 bg-white" : "border-slate-200 bg-slate-100/50 hover:bg-white hover:border-primary-500 text-slate-700"
              )}
            >
              Hotel View
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform", activeDropdown === 'view' && "rotate-180")} />
            </div>
            
            {['Pets Essential', 'User Ratings', 'Amenities'].map(filter => (
              <div key={filter} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-100/50 cursor-pointer hover:bg-white hover:border-primary-500 transition-all font-bold text-slate-700 shrink-0">
                {filter}
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:mt-10 pb-32 md:pb-0">
          {/* Main Listings */}
          <div className="lg:col-span-3">
            {/* Desktop View: Vertical Feed */}
            <div className="hidden md:flex flex-col space-y-6">
              {HOTEL_DATA.map(hotel => (
                <Card key={hotel.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-300 group border-slate-100">
                  <div 
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="w-full md:w-80 h-44 md:h-64 relative rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => {e.stopPropagation();}} className="bg-black/30 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black/50"><ChevronLeft size={18} /></button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => {e.stopPropagation();}} className="bg-black/30 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black/50"><ChevronRight size={18} /></button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="space-y-1">
                        <div 
                          className="flex items-center gap-2 cursor-pointer group/title"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          <div className="bg-slate-900 text-white p-1 rounded-full"><Star size={10} fill="white" /></div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover/title:text-[#7c3aed] transition-colors">{hotel.name}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-600 text-white px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
                            {hotel.rating} <Star size={12} fill="currentColor" />
                          </div>
                          <span className="text-slate-400 text-sm font-medium">{hotel.reviews} Ratings</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 mt-2">
                      <MapPin size={16} className="text-slate-400" />
                      {hotel.location}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.tags.map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <button className="flex-1 md:flex-none bg-[#008a00] text-white hover:bg-green-800 rounded-lg font-bold flex items-center gap-2 px-6 py-2 transition-all active:scale-95 text-sm">
                        <Phone size={16} fill="currentColor" />
                        {hotel.phone || '09845258527'}
                      </button>
                      <button className="flex-1 md:flex-none bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-bold flex items-center gap-2 px-6 py-2 transition-all active:scale-95 text-sm">
                        <div className="text-[#25d366]"><MessageSquare size={18} fill="currentColor" /></div>
                        WhatsApp
                      </button>
                      <button 
                        onClick={() => setIsLeadModalOpen(true)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-all active:scale-95 text-sm shadow-md"
                      >
                        <Zap size={16} fill="currentColor" />
                        Get Best Deal
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mobile View: Dynamic Rows of 10 */}
            <div className="md:hidden flex flex-col space-y-4">
              {Array.from({ length: Math.ceil(HOTEL_DATA.length / 10) }, (_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 space-x-4 pb-4">
                    {HOTEL_DATA.slice(i * 10, (i + 1) * 10).map(hotel => (
                      <Card key={hotel.id} className="min-w-[85vw] snap-start p-3 flex flex-col gap-4 border-slate-100 shadow-sm">
                        <div 
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                          className="w-full h-40 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-100"
                        >
                          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                           <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                             {hotel.rating} ★
                           </div>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[16px] font-bold text-slate-900 mb-1 leading-tight">{hotel.name}</h3>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-4 line-clamp-1">
                             <MapPin size={12} className="text-slate-400" />
                             {hotel.location}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="bg-[#008a00] text-white rounded-lg font-bold flex items-center justify-center gap-1 py-1.5 text-[11px]">
                              <Phone size={12} fill="currentColor" /> Call
                            </button>
                            <button className="border border-slate-200 text-[#25d366] rounded-lg font-bold flex items-center justify-center gap-1 py-1.5 text-[11px]">
                              <MessageSquare size={12} fill="currentColor" /> WhatsApp
                            </button>
                            <button 
                              onClick={() => setIsLeadModalOpen(true)}
                              className="col-span-2 bg-primary-600 text-white rounded-lg font-bold py-2 text-[11px] mt-1 shadow-md"
                            >
                              Get Best Deal
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
            <Card className="p-6 sticky top-24 border-slate-200 shadow-xl shadow-slate-200/50">
               <h4 className="text-base font-bold text-slate-900 mb-1 leading-tight">
                 Get the List of Top <span className="text-primary-600">Hotels</span>
               </h4>
               <p className="text-[11px] text-slate-400 mb-8">We'll send you contact details in seconds for free</p>

               <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-4">What type of Hotel are you looking for?</p>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="hotelType" className="w-5 h-5 text-primary-600 focus:ring-primary-500 border-slate-300 transition-all" defaultChecked />
                        <span className="text-[13px] font-bold text-slate-700 group-hover:text-primary-600">Budget</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="hotelType" className="w-5 h-5 text-primary-600 focus:ring-primary-500 border-slate-300 transition-all" />
                        <span className="text-[13px] font-bold text-slate-700 group-hover:text-primary-600">Luxury</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="hotelType" className="w-5 h-5 text-primary-600 focus:ring-primary-500 border-slate-300 transition-all" />
                        <span className="text-[13px] font-bold text-slate-700 group-hover:text-primary-600">Others</span>
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <CheckCircle size={18} className="text-slate-900" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-[15px] font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-slate-900" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Mobile Number"
                      className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-[15px] font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="relative flex items-center pt-0.5">
                      <input type="checkbox" className="w-5 h-5 border-slate-300 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" defaultChecked />
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      I Agree to <a href="#" className="text-primary-600 underline font-bold">T&C's Privacy Policy</a>
                    </span>
                  </div>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 group shadow-xl shadow-primary-500/10 transition-all active:scale-[0.98] text-[15px]">
                    Get Best Deal
                    <div className="flex -space-x-1 ml-1 overflow-hidden">
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform opacity-60" />
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform opacity-30" />
                    </div>
                  </button>
               </div>
            </Card>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HotelResults;
