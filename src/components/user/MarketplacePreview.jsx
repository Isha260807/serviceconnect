import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { PRODUCT_CATEGORIES_SIDEBAR } from '../../data/marketplaceData';

// 9 unique product cards in 3 groups of 3
const CARD_GROUPS = [
  {
    browsing: {
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₹3,467.25'
    },
    lookingFor1: {
      title: 'Decorative Stickers',
      items: [
        { image: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹8.83' },
        { image: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹14.72' },
        { image: 'https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹11.77' },
        { image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹14.72' },
      ]
    },
    lookingFor2: {
      title: 'On-Ear & Over-Ear Headphones',
      items: [
        { image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹191.27' },
        { image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹194.25' },
        { image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹107.90' },
        { image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹381.55' },
      ]
    }
  },
  {
    browsing: {
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₹12,499.00'
    },
    lookingFor1: {
      title: 'Sneakers & Shoes',
      items: [
        { image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹2,999.00' },
        { image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹1,849.50' },
        { image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹4,599.00' },
        { image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹899.99' },
      ]
    },
    lookingFor2: {
      title: 'Bags & Wallets',
      items: [
        { image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹2,499.00' },
        { image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹1,799.00' },
        { image: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹3,299.00' },
        { image: 'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹749.00' },
      ]
    }
  },
  {
    browsing: {
      image: 'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₹5,999.00'
    },
    lookingFor1: {
      title: 'Jewelry & Accessories',
      items: [
        { image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹450.00' },
        { image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹1,250.00' },
        { image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹780.00' },
        { image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹2,100.00' },
      ]
    },
    lookingFor2: {
      title: 'Cameras & Photography',
      items: [
        { image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹15,990.00' },
        { image: 'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹8,499.00' },
        { image: 'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹3,200.00' },
        { image: 'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=300', price: '₹22,500.00' },
      ]
    }
  }
];

const MarketplacePreview = () => {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const banners = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: <>SAVE 30% ON ALL<br />PREMIUM SERVICES</>,
      subtitle: 'Exclusive yearly offer',
      buttonText: 'CLAIM NOW',
      bgClass: 'bg-primary-900',
      textColor: 'text-white',
      btnClass: 'bg-white text-primary-900',
      showTag: true,
      overlay: true,
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: <>HOT PICKS</>,
      subtitle: 'Top rated gadgets & tech',
      buttonText: 'View more',
      bgClass: 'bg-[#b8d4f2]',
      textColor: 'text-[#061936]',
      btnClass: 'bg-[#061936] text-white',
      showTag: false,
      overlay: false,
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: <>FASHION<br />WEEKEND SALE</>,
      subtitle: 'Trending apparel up to 50% off',
      buttonText: 'Shop Now',
      bgClass: 'bg-orange-900',
      textColor: 'text-white',
      btnClass: 'bg-white text-orange-900',
      showTag: false,
      overlay: true,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const group = CARD_GROUPS[currentPage];

  const goNext = () => setCurrentPage((prev) => (prev + 1) % CARD_GROUPS.length);
  const goPrev = () => setCurrentPage((prev) => (prev - 1 + CARD_GROUPS.length) % CARD_GROUPS.length);

  return (
    <section
      onClick={() => navigate('/marketplace')}
      className="max-w-[1400px] mx-auto px-4 md:px-6 mb-6 md:mb-10 cursor-pointer"
    >
      <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 lg:overflow-x-visible pb-2 md:pb-0">
        
        {/* Sidebar - Categories (Further Shortened) */}
        <div className="col-span-2 lg:col-span-1 flex flex-col w-full lg:w-[260px] bg-slate-50/80 rounded-2xl border border-slate-100 overflow-hidden shrink-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto custom-scrollbar no-scrollbar p-2 lg:p-2.5 gap-1.5 lg:gap-0 lg:space-y-0.5 max-h-none lg:max-h-[260px]">
            {PRODUCT_CATEGORIES_SIDEBAR.map((cat) => (
              <div key={cat.id} className="flex items-center gap-2 lg:gap-2.5 p-1.5 lg:p-1.5 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group shrink-0 lg:shrink lg:justify-between bg-white lg:bg-transparent shadow-sm lg:shadow-none border border-slate-100 lg:border-transparent">
                <div className="flex items-center gap-2 lg:gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 lg:bg-white flex items-center justify-center text-slate-400 group-hover:text-primary-600 transition-colors shadow-sm">
                    <cat.icon size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900 whitespace-nowrap">{cat.name}</span>
                </div>
                <ChevronRight size={10} className="text-slate-300 group-hover:text-primary-400 hidden lg:block" />
              </div>
            ))}
          </div>
          <div className="hidden lg:block p-2.5 bg-slate-50/50 border-t border-slate-100">
            <button className="text-[9px] font-black text-primary-600 hover:underline uppercase tracking-widest w-full text-center">
              All Categories
            </button>
          </div>
        </div>

        {/* Cards Carousel Container with Arrows */}
        <div className="col-span-2 lg:col-span-1 lg:flex-[3] relative group/cards">
          {/* Left Arrow */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute left-0 lg:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-200 hover:shadow-xl active:scale-90 transition-all opacity-0 group-hover/cards:opacity-100 duration-300"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute right-0 lg:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-200 hover:shadow-xl active:scale-90 transition-all opacity-0 group-hover/cards:opacity-100 duration-300"
          >
            <ChevronRight size={16} />
          </button>

          {/* 3 Cards */}
          <div className="flex lg:grid lg:grid-cols-3 gap-3 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-2 lg:pb-0 transition-all duration-300">
            {/* Card 1: Browsing History */}
            <div className="w-[48%] lg:w-full bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow snap-start shrink-0 lg:shrink">
              <h3 className="text-[11px] font-black text-slate-900 px-1">Browsing history</h3>
              <div className="relative flex-1 aspect-square rounded-xl overflow-hidden group">
                <img 
                  src={group.browsing.image} 
                  alt="History" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-[8px] font-black text-slate-900">{group.browsing.price}</span>
                </div>
                <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                  <Heart size={10} />
                </button>
              </div>
            </div>

            {/* Card 2: Keep looking for (Category 1) */}
            <div className="w-[48%] lg:w-full bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow snap-start shrink-0 lg:shrink">
              <div className="px-1">
                <h3 className="text-[11px] font-black text-slate-900 leading-tight">Keep looking for</h3>
                <p className="text-[7px] font-bold text-slate-400">{group.lookingFor1.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 flex-1">
                {group.lookingFor1.items.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-0.5">
                      <img src={item.image} alt="item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="bg-slate-50 rounded px-1 py-0.5 w-fit border border-slate-100">
                      <span className="text-[7px] font-black text-slate-900">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Keep looking for (Category 2) */}
            <div className="w-[48%] lg:w-full bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow snap-start shrink-0 lg:shrink">
              <div className="px-1">
                <h3 className="text-[11px] font-black text-slate-900 leading-tight">Keep looking for</h3>
                <p className="text-[7px] font-bold text-slate-400">{group.lookingFor2.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-1 flex-1">
                {group.lookingFor2.items.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-0.5">
                      <img src={item.image} alt="item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="bg-slate-50 rounded px-1 py-0.5 w-fit border border-slate-100">
                      <span className="text-[7px] font-black text-slate-900">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page Dots */}
          <div className="flex justify-center gap-1.5 mt-2 lg:mt-3">
            {CARD_GROUPS.map((_, idx) => (
              <button
                key={idx}
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPage(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentPage ? "bg-primary-600 w-4" : "bg-slate-200 w-1.5 hover:bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Promotional Banner Slider */}
        <div
          className="col-span-2 lg:col-span-1 w-full lg:w-[340px] rounded-2xl overflow-hidden shrink-0 lg:flex-[1.4] relative shadow-sm hover:shadow-md transition-shadow bg-slate-100 min-h-[160px]"
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0",
                banner.bgClass
              )}
            >
              <img 
                src={banner.image} 
                alt="Promotion" 
                className={cn(
                  "w-full h-full object-cover transition-transform duration-[4000ms] ease-linear",
                  index === activeBanner ? "scale-105" : "scale-100",
                  banner.overlay ? "opacity-20 mix-blend-overlay" : "opacity-40 mix-blend-multiply"
                )} 
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div className={cn("space-y-1.5", banner.showTag ? "" : "pt-4")}>
                  {banner.showTag && (
                    <div className="flex items-center gap-1">
                      <div className="bg-white px-1.5 py-0.5 rounded-[4px] text-[7px] font-black text-primary-900">Nexora</div>
                      <span className="text-white/40 text-[9px]">×</span>
                      <span className="text-white font-black text-[8px] tracking-widest">PREMIUM</span>
                    </div>
                  )}
                  <h3 className={cn("text-lg md:text-xl font-black leading-[1.1]", banner.textColor)}>
                    {banner.title}
                  </h3>
                  <p className={cn("text-[8px] font-bold", banner.textColor, "opacity-80")}>{banner.subtitle}</p>
                </div>
                
                <div className="space-y-2 mb-2">
                  <button className={cn("w-full font-black py-2 rounded-xl text-[10px] transition-all active:scale-95 shadow-xl uppercase tracking-widest", banner.btnClass)}>
                    {banner.buttonText}
                  </button>
                </div>
              </div>
              {banner.overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              )}
            </div>
          ))}
          
          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-20">
            {banners.map((_, idx) => (
              <button 
                key={idx} 
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveBanner(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300", 
                  idx === activeBanner ? "bg-[rgba(255,255,255,0.9)] w-4" : "bg-[rgba(255,255,255,0.4)] w-1.5 hover:bg-[rgba(255,255,255,0.6)]"
                )} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketplacePreview;
