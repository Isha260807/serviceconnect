import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import indianWedding from '../../assets/indian_wedding.png';
import moversImg from '../../assets/services/movers.png';
import cleaningImg from '../../assets/services/cleaning.png';
import carDetailingImg from '../../assets/services/car_detailing.png';
import gymImg from '../../assets/services/gym.png';
import dentalImg from '../../assets/services/dental.png';
import interiorImg from '../../assets/services/interiors.png';

const FEED_ITEMS = [
  {
    id: 1,
    vendor: 'Elegant Interiors',
    avatar: 'EI',
    image: interiorImg,
    caption: 'Modern luxury living room transformation in Bandra. We used warm tones and minimal furniture to create space. ✨ #interiordesign #mumbaihomes',
    likes: '1.2k',
    comments: '88',
    time: '2 hours ago',
    verified: true
  },
  {
    id: 2,
    vendor: 'Pro Auto Detailing',
    avatar: 'PA',
    image: carDetailingImg,
    caption: 'Ceramic coating session for this beauty! Total protection from dust and UV. Book your slot today for 20% off. #carcare #detailing #mumbai',
    likes: '850',
    comments: '42',
    time: '4 hours ago',
    verified: true
  },
  {
    id: 3,
    vendor: 'Green Roots Landscaping',
    avatar: 'GR',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    caption: 'Vertical garden installation for a compact balcony in Powai. Nature meets city living. 🌿 #verticalgarden #powai #greenliving',
    likes: '420',
    comments: '15',
    time: '1 day ago',
    verified: false
  },
  {
    id: 4,
    vendor: 'Spark Cleaners',
    avatar: 'SC',
    image: cleaningImg,
    caption: 'A deep cleaning session can breathe new life into your home. Say goodbye to dust and allergens! 🧼 #deepcleaning #mumbai #homecare',
    likes: '640',
    comments: '24',
    time: '6 hours ago',
    verified: true
  },
  {
    id: 5,
    vendor: 'Luxe Salon',
    avatar: 'LS',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    caption: 'Ready for the wedding season? Our bridal package includes everything from hair to makeup. Book now! 💄 #bridalmakeup #mumbaiweddings #salon',
    likes: '1.5k',
    comments: '112',
    time: '8 hours ago',
    verified: true
  },
  {
    id: 6,
    vendor: 'Pet Paradise',
    avatar: 'PP',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    caption: 'Meet Bruno! He just had his summer grooming session and looks absolutely adorable. 🐾 #petgrooming #dogs #mumbaipets',
    likes: '980',
    comments: '56',
    time: '12 hours ago',
    verified: false
  },
  {
    id: 7,
    vendor: 'Inner Peace Yoga',
    avatar: 'IY',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    caption: 'Morning sun salutations to start your day with energy and calm. Join our weekend batches! 🧘‍♀️ #yoga #wellness #mumbailife',
    likes: '310',
    comments: '12',
    time: '1 day ago',
    verified: true
  },
  {
    id: 8,
    vendor: 'Gourmet Kitchen',
    avatar: 'GK',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    caption: 'Behind the scenes at Gourmet Kitchen. Our chefs are crafting magic for tonight\'s special event! 🥘 #catering #foodies #mumbaifood',
    likes: '2.1k',
    comments: '156',
    time: '3 hours ago',
    verified: true
  },
  {
    id: 9,
    vendor: 'Apex Car Detailing',
    avatar: 'AD',
    image: carDetailingImg,
    caption: 'Water beads like magic with our premium wax coating. Protect your investment from the monsoon! 🚗 #carwax #mumbaimonsoon',
    likes: '720',
    comments: '34',
    time: '5 hours ago',
    verified: false
  },
  {
    id: 10,
    vendor: 'Modern Interiors',
    avatar: 'MI',
    image: interiorImg,
    caption: 'Redefining modular kitchens with sleek finishes and smart storage. Efficiency meets style. 🍳 #modularkitchen #homedecor',
    likes: '1.8k',
    comments: '92',
    time: '7 hours ago',
    verified: true
  },
  {
    id: 11,
    vendor: 'FitForge Gym',
    avatar: 'FG',
    image: gymImg,
    caption: 'Never miss a Monday! Our community is crushing their fitness goals today. Join the movement. 💪 #gymlife #fitnessmotivation #indore',
    likes: '540',
    comments: '28',
    time: '9 hours ago',
    verified: true
  },
  {
    id: 12,
    vendor: 'Sunny Smiles Dental',
    avatar: 'SD',
    image: dentalImg,
    caption: 'A bright smile is your best accessory. Teeth whitening sessions now available at special rates. 😁 #dentalcare #whiteteeth',
    likes: '230',
    comments: '9',
    time: '15 hours ago',
    verified: false
  },
  {
    id: 13,
    vendor: 'Royal Weddings',
    avatar: 'RW',
    image: indianWedding,
    caption: 'Floral decor that feels like a fairytale. Let us plan your big day with perfection. 🌸 #weddingplanner #floraldecor #mumbai',
    likes: '3.4k',
    comments: '210',
    time: '1 day ago',
    verified: true
  },
  {
    id: 14,
    vendor: 'SafeHands Hospitals',
    avatar: 'SH',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    caption: 'Health is wealth. Regular checkups are the first step to preventive care. Book your health package today. 🏥 #healthcare #hospital',
    likes: '450',
    comments: '12',
    time: '1 day ago',
    verified: true
  },
  {
    id: 15,
    vendor: 'Green Acres PG',
    avatar: 'GA',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    caption: 'Fully furnished rooms with all amenities for students and professionals. Your home away from home. 🏠 #PG #hostellife #mumbai',
    likes: '180',
    comments: '25',
    time: '2 days ago',
    verified: false
  },
  {
    id: 16,
    vendor: 'Swift Movers',
    avatar: 'SM',
    image: moversImg,
    caption: 'Moving can be stress-free! Our team handles everything from packing to unloading with care. 📦 #packersandmovers #movingday',
    likes: '320',
    comments: '18',
    time: '2 days ago',
    verified: true
  },
  {
    id: 17,
    vendor: 'TechFix Solutions',
    avatar: 'TF',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800',
    caption: 'Cracked screen? Slow laptop? Our experts are here to fix all your tech troubles. 💻 #laptoprepair #techsupport',
    likes: '290',
    comments: '14',
    time: '3 days ago',
    verified: true
  },
  {
    id: 18,
    vendor: 'Artisan Bakes',
    avatar: 'AB',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    caption: 'Freshly baked sourdough straight from the oven. The smell is absolutely heavenly! 🥖 #bakery #freshbread #artisan',
    likes: '1.1k',
    comments: '45',
    time: '3 days ago',
    verified: false
  },
  {
    id: 19,
    vendor: 'City Pest Control',
    avatar: 'CP',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    caption: 'Don\'t let pests ruin your peace. Secure your home with our eco-friendly pest control treatments. 🐜 #pestcontrol #hygiene',
    likes: '150',
    comments: '7',
    time: '4 days ago',
    verified: true
  },
  {
    id: 20,
    vendor: 'Skyline Real Estate',
    avatar: 'SR',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    caption: 'Finding your dream home just got easier. Browse our latest listings of premium apartments. 🏢 #realestate #dreamhome',
    likes: '890',
    comments: '56',
    time: '4 days ago',
    verified: true
  },
  {
    id: 21,
    vendor: 'Pulse Pharmacy',
    avatar: 'PP',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    caption: 'Essential medicines and wellness products delivered to your doorstep. Stay safe, stay healthy. 💊 #pharmacy #delivery',
    likes: '210',
    comments: '5',
    time: '5 days ago',
    verified: false
  },
  {
    id: 22,
    vendor: 'Bright Horizon Tutorials',
    avatar: 'BH',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    caption: 'Quality education for a brighter future. Enrollment open for our upcoming summer crash courses. 📚 #education #tutoring',
    likes: '430',
    comments: '32',
    time: '5 days ago',
    verified: true
  },
  {
    id: 23,
    vendor: 'Velvet Threads',
    avatar: 'VT',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    caption: 'Bespoke tailoring that fits your style. Experience the luxury of custom-made clothing. 👔 #tailoring #fashion #suits',
    likes: '760',
    comments: '24',
    time: '6 days ago',
    verified: true
  },
  {
    id: 24,
    vendor: 'AquaLife Aquariums',
    avatar: 'AA',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
    caption: 'Bring the ocean home with our custom aquarium setups and exotic fish collection. 🐠 #aquarium #pets #interiordetails',
    likes: '510',
    comments: '38',
    time: '6 days ago',
    verified: false
  },
  {
    id: 25,
    vendor: 'Silver Line Motors',
    avatar: 'SL',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    caption: 'Quality pre-owned luxury cars at unbeatable prices. Drive home your dream car today! 🏎️ #usedcars #luxurycars #mumbai',
    likes: '1.3k',
    comments: '72',
    time: '1 week ago',
    verified: true
  }
];

const VENDOR_STORIES = [
  { name: 'Luxe Salon', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=150' },
  { name: 'Apex Car Detailing', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=150' },
  { name: 'Pet Paradise', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=150' },
  { name: 'Gourmet Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=150' },
  { name: 'Inner Peace Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=150' },
  { name: 'Spark Cleaners', image: 'https://images.unsplash.com/photo-1581578731518-da989149ce00?auto=format&fit=crop&q=80&w=150' },
  { name: 'Modern Interiors', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=150' }
];

const SocialFeed = () => {
  return (
    <UserLayout>
       {/* Mobile-Only Location Header */}
       <div className="md:hidden px-4 pt-6 pb-0 bg-gradient-to-b from-[#D4F4FA] to-[#F2FBFD]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-cyan-500 shadow-sm border border-cyan-50">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your location</span>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-slate-800">San Antione, Tx</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-sm border border-gray-100">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 md:px-6 pt-2 md:pt-28 pb-12 flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl mx-auto w-full space-y-4">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 tracking-tight">Social Discovery</h2>
              <div className="flex gap-2">
                <Badge variant="primary" className="text-[10px] px-2 py-0.5">Trending</Badge>
              </div>
            </div>

            {/* Stories/Vendor Shorts Row */}
            <div className="mb-6 -mx-4 md:mx-0 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-4 px-4 md:px-0">
               {VENDOR_STORIES.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0 w-20">
                     <div className="w-16 h-16 rounded-[2rem] p-[2px] bg-gradient-to-tr from-primary-600 via-primary-400 to-indigo-400 shadow-xl active:scale-95 transition-all duration-300 relative group-hover:shadow-primary-500/20 group-hover:-translate-y-1">
                        <div className="w-full h-full rounded-[1.8rem] bg-white p-0.5">
                           <div className="w-full h-full rounded-[1.6rem] bg-slate-100 overflow-hidden relative">
                              <img 
                                 src={v.name === 'Apex Car Detailing' ? carDetailingImg : v.name === 'Spark Cleaners' ? cleaningImg : v.name === 'Modern Interiors' ? interiorImg : v.image} 
                                 alt={v.name} 
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Glossy/Shine Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50"></div>
                              <div className="absolute top-[-100%] left-[-100%] w-[50%] h-[300%] bg-white/30 skew-x-[-25deg] animate-shine pointer-events-none"></div>
                           </div>
                        </div>
                        {/* Status ring */}
                        <div className="absolute -inset-[2px] rounded-[2.1rem] border-[2px] border-primary-500/20 group-hover:border-primary-500/50 transition-colors"></div>
                     </div>
                     <div className="h-6 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-slate-800 break-words text-center leading-none group-hover:text-primary-600 transition-colors line-clamp-1 px-1">
                          {v.name}
                        </span>
                     </div>
                  </div>
               ))}
            </div>

             {FEED_ITEMS.map((post) => (
                <Card key={post.id} className="overflow-hidden border-slate-100 shadow-sm md:shadow-md -mx-4 md:mx-0 rounded-none md:rounded-2xl mb-3 md:mb-4">
                   {/* Post Header */}
                   <div className="p-2 md:p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold text-[10px] md:text-xs border-2 border-white shadow-lg relative overflow-hidden group/avatar">
                            {post.avatar}
                            {/* Glossy Overlay for Avatar */}
                            <div className="absolute top-[-100%] left-[-100%] w-[50%] h-[300%] bg-white/20 skew-x-[-25deg] animate-shine pointer-events-none"></div>
                         </div>
                         <div>
                            <div className="flex items-center gap-1">
                               <span className="font-bold text-xs md:text-sm text-slate-900 leading-none">{post.vendor}</span>
                               {post.verified && <ShieldCheck size={12} className="text-primary-600" />}
                            </div>
                            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{post.time}</span>
                         </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                         <MoreHorizontal size={20} />
                      </button>
                   </div>

                   {/* Post Image */}
                   <div className="aspect-square bg-slate-50 overflow-hidden relative group">
                      <img 
                        src={post.image} 
                        alt={`${post.vendor} post - ${post.caption.substring(0, 30)}...`}
                        className="w-full h-full object-cover" 
                      />
                   </div>

                   {/* Post Actions */}
                   <div className="px-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-slate-700">
                               <Heart size={20} strokeWidth={2} />
                               <span className="text-[10px] font-bold">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-slate-700">
                               <MessageCircle size={20} strokeWidth={2} />
                               <span className="text-[10px] font-bold">{post.comments}</span>
                            </button>
                            <button className="text-slate-700">
                               <Send size={20} strokeWidth={2} />
                            </button>
                         </div>
                         <button className="text-slate-700">
                            <Bookmark size={20} strokeWidth={2} />
                         </button>
                      </div>
                      
                      <div className="space-y-1">
                         <p className="text-sm text-slate-700 leading-relaxed line-clamp-2 md:line-clamp-none">
                            <span className="font-bold mr-2 text-slate-900">{post.vendor}</span>
                            {post.caption}
                         </p>
                      </div>
                      
                      <button className="mt-3 w-full py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-bold uppercase tracking-widest text-slate-500 active:bg-primary-50 active:text-primary-600 transition-all font-display">
                         Visit Business Profile
                      </button>
                   </div>
                </Card>
             ))}
          </div>

          {/* Right Sidebar - Trending */}
          <div className="hidden lg:block w-80 space-y-8">
             <Card className="p-6">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <Sparkles size={18} className="text-primary-600" />
                   Featured Offers
                </h4>
                 <div className="space-y-4">
                    {[1, 2].map((i) => (
                       <div key={i} className="group cursor-pointer">
                          <div className="h-32 bg-slate-100 rounded-2xl mb-3 overflow-hidden relative">
                             <img 
                                src={i === 1 ? 'https://images.unsplash.com/photo-1581578731518-da989149ce00?auto=format&fit=crop&q=80&w=300' : 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300'} 
                                alt={i === 1 ? 'AC Servicing Offer' : 'Deep Cleaning Offer'}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                             />
                             <div className="absolute top-2 right-2 bg-accent-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                30% OFF
                             </div>
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                             {i === 1 ? 'Summer AC Servicing Pack' : 'Festive Home Deep Cleaning'}
                          </h5>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Valid for 2 days</p>
                       </div>
                    ))}
                 </div>
             </Card>

             <Card className="p-6 bg-primary-600 text-white overflow-hidden relative">
                <div className="relative z-10">
                   <Zap size={32} fill="currentColor" className="mb-4" />
                   <h4 className="text-xl font-bold mb-2">Grow Your Business</h4>
                   <p className="text-sm text-primary-100 mb-6">Promote your work samples in the social feed today.</p>
                   <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl text-sm shadow-xl">Promote Post</button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             </Card>
          </div>
       </div>
    </UserLayout>
  );
};

export default SocialFeed;
