import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Zap, Star, Truck, Package, ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../../utils/cn';
import UserLayout from '../../layouts/UserLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { ALL_PRODUCTS, RECOMMENDATIONS, KEY_ATTRIBUTES, DUMMY_REVIEWS } from '../../data/marketplaceData';
import productVideo from '../../assets/20260508-1214-47.6450010.mp4';
import { storage } from '../../utils/storage';
import EnquiryModal from '../../components/common/EnquiryModal';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = ALL_PRODUCTS.find(p => p.id === id) || null;

  const [activeMedia, setActiveMedia] = useState('photo');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [videoSlideIndex, setVideoSlideIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [activePdpTab, setActivePdpTab] = useState('Attributes');
  
  // Toast notifications state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Inquiry modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleBookNow = (e) => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      // User is not logged in: save intent and redirect
      localStorage.setItem('sc_redirect_after_login', window.location.pathname);
      localStorage.setItem('sc_pending_booking', JSON.stringify({
        productId: product.id,
        size: selectedSize,
        variation: selectedVarIndex
      }));
      navigate('/login');
    } else {
      // Find coordinates of target cart icon
      const cartIcon = document.getElementById('navbar-cart-btn') || document.querySelector('.lucide-shopping-cart');
      const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 100, top: 40 };

      // Find start coordinates (product main image or button)
      let startRect = null;
      const mainImg = document.querySelector('.group\\/main img') || document.querySelector('.group\\/main video');
      if (mainImg) {
        startRect = mainImg.getBoundingClientRect();
      } else if (e) {
        startRect = e.currentTarget.getBoundingClientRect();
      } else {
        startRect = { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 100, height: 100 };
      }

      // Create flyer DOM element
      const flyer = document.createElement('div');
      flyer.style.position = 'fixed';
      flyer.style.left = '0';
      flyer.style.top = '0';
      flyer.style.width = `${startRect.width}px`;
      flyer.style.height = `${startRect.height}px`;
      flyer.style.backgroundImage = `url(${product.image})`;
      flyer.style.backgroundSize = 'cover';
      flyer.style.backgroundPosition = 'center';
      flyer.style.borderRadius = '16px';
      flyer.style.zIndex = '99999';
      flyer.style.pointerEvents = 'none';
      flyer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      
      const animId = `flyToCart-${Date.now()}`;
      const styleEl = document.createElement('style');
      styleEl.id = `style-${animId}`;
      
      // Calculate centering offset translations
      const targetX = cartRect.left + (cartRect.width / 2) - (startRect.width / 2);
      const targetY = cartRect.top + (cartRect.height / 2) - (startRect.height / 2);
      
      // Calculate a beautiful peak for the parabolic arc
      const peakY = Math.min(startRect.top, targetY) - 100;
      const safePeakY = Math.max(peakY, -30); // Prevent flying too far offscreen
      const midX = startRect.left + (targetX - startRect.left) * 0.45;
      
      styleEl.innerHTML = `
        @keyframes ${animId} {
          0% {
            transform: translate3d(${startRect.left}px, ${startRect.top}px, 0) scale(1) rotate(0deg);
            opacity: 1;
            border-radius: 16px;
          }
          40% {
            transform: translate3d(${midX}px, ${safePeakY}px, 0) scale(0.6) rotate(240deg);
            opacity: 0.95;
            border-radius: 35%;
          }
          85% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(${targetX}px, ${targetY}px, 0) scale(0.08) rotate(720deg);
            opacity: 0.05;
            border-radius: 50%;
          }
        }
      `;
      document.head.appendChild(styleEl);
      
      flyer.style.animation = `${animId} 0.85s cubic-bezier(0.2, 0.4, 0.25, 1) forwards`;
      document.body.appendChild(flyer);


      // User is logged in: execute booking directly
      const cartStr = localStorage.getItem('sc_local_cart');
      const cart = cartStr ? JSON.parse(cartStr) : [];
      const newCartItem = {
        id: `CRT-${Date.now()}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: getProductSizes()[selectedSize] || 'Standard',
        variation: getOptionLabel().value,
        quantity: 1
      };
      cart.push(newCartItem);
      localStorage.setItem('sc_local_cart', JSON.stringify(cart));
      
      // Save confirmed Booking
      storage.saveBooking({
        itemName: product.name,
        itemLocation: 'Online Shop',
        itemImage: product.image,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        type: 'shopping'
      });

      // Cleanup and trigger updates after fly animation completes
      setTimeout(() => {
        if (flyer.parentNode) {
          flyer.parentNode.removeChild(flyer);
        }
        const stEl = document.getElementById(`style-${animId}`);
        if (stEl && stEl.parentNode) {
          stEl.parentNode.removeChild(stEl);
        }

        window.dispatchEvent(new Event('cartChange'));
        window.dispatchEvent(new Event('authChange'));

        const cartBtn = document.getElementById('navbar-cart-btn') || document.querySelector('.lucide-shopping-cart')?.closest('button');
        if (cartBtn) {
          cartBtn.classList.add('cart-bounce');
          setTimeout(() => cartBtn.classList.remove('cart-bounce'), 450);
        }

        setToastMessage('Product Booked & Added to Cart!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }, 850);
    }
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(clean) || 0;
  };
  
  const basePrice = parsePrice(product?.price);
  const formatPrice = (num) => {
    return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getOptionLabel = () => {
    if (!product) return { prefix: 'Color', value: '' };
    const nameLower = product.name.toLowerCase();
    const isSoap = nameLower.includes('soap');
    const isSaree = nameLower.includes('saree');
    const isPerfume = nameLower.includes('perfume');
    const isMask = nameLower.includes('mask');
    const isDress = nameLower.includes('dress');
    const isSuit = nameLower.includes('suit');

    const options = isSoap 
      ? ['Lavender', 'Oatmeal & Honey', 'Rose Petal', 'Charcoal', 'Tea Tree']
      : isSaree
      ? ['Navy Blue', 'Crimson Red', 'Emerald Green', 'Royal Purple', 'Golden Yellow']
      : isPerfume
      ? ['Luxury Rose', 'Ocean Breeze', 'Amber Wood', 'Jasmine Bloom', 'Vanilla Musk']
      : isMask
      ? ['Vitamin C', 'Hyaluronic Acid', 'Retinol Repair', 'Salicylic Clear', 'Collaglow']
      : isDress
      ? ['Blue', 'Aqua', 'Pink', 'Red', 'Sky Blue']
      : isSuit
      ? ['Charcoal Grey', 'Classic Black', 'Navy Blue', 'Royal Blue', 'Deep Burgundy']
      : ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

    const labelPrefix = isSoap ? 'Scent' : isPerfume ? 'Fragrance' : isMask ? 'Formula' : 'Color';
    const selectedOption = options[selectedVarIndex] || options[0];
    return { prefix: labelPrefix, value: selectedOption };
  };

  const getProductSizes = () => {
    if (!product) return [];
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('dress') || nameLower.includes('suit')) {
      return ['4', '6', '8', '10', '12', '14', '16'];
    }
    if (nameLower.includes('saree')) {
      return ['Free Size'];
    }
    if (nameLower.includes('perfume')) {
      return ['30ml', '50ml', '100ml', '150ml'];
    }
    if (nameLower.includes('soap')) {
      return ['100g', '150g', '200g'];
    }
    if (nameLower.includes('mask')) {
      return ['50ml', '100ml'];
    }
    return ['Standard', 'Pack of 2', 'Pack of 5'];
  };

  const productImages = product
    ? product.images && product.images.length > 0
      ? product.images
      : [
          product.image,
          product.image,
          product.image,
        ]
    : [];

  const isFallback = product && (!product.images || product.images.length === 0);

  const getImageClassName = (index) => {
    if (!isFallback) return "w-full h-full object-cover transition-all duration-500 ease-out";
    if (index === 1) return "w-full h-full object-cover scale-[1.65] origin-center transition-all duration-500 ease-out";
    if (index === 2) return "w-full h-full object-cover scale-[2.0] origin-top-right transition-all duration-500 ease-out";
    return "w-full h-full object-cover transition-all duration-500 ease-out";
  };

  useEffect(() => {
    let interval;
    if (activeMedia === 'video' && productImages.length > 0) {
      interval = setInterval(() => {
        setVideoSlideIndex(prev => (prev + 1) % productImages.length);
      }, 3000);
    } else {
      setVideoSlideIndex(0);
    }
    return () => clearInterval(interval);
  }, [activeMedia, productImages]);

  if (!product) {
    return (
      <UserLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-400 font-medium">Product not found.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* Sticky Header (Mobile Only) */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-slate-100">
            <ArrowLeft size={20} />
          </button>
          <div className="hidden md:block">
            <h2 className="text-sm font-normal text-slate-900 line-clamp-1">{product.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Store:</span>
              <span className="text-[10px] font-normal text-primary-600">Verified Manufacturer</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all"><Heart size={20} /></button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all"><Send size={18} /></button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 md:pt-24 pb-36 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-6 flex flex-col md:flex-row-reverse gap-3 md:sticky md:top-28 h-fit">
            <div className="flex-1 aspect-square md:aspect-auto md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative group/main">
              {activeMedia === 'photo' ? (
                <img key={activeImgIndex} src={productImages[activeImgIndex]} className={getImageClassName(activeImgIndex)} />
              ) : (
                <div className="w-full h-full relative overflow-hidden bg-slate-900 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={videoSlideIndex}
                      src={productImages[videoSlideIndex]}
                      initial={
                        isFallback
                          ? videoSlideIndex === 1
                            ? { scale: 1.8, x: 20, y: -10, opacity: 0 }
                            : videoSlideIndex === 2
                            ? { scale: 2.2, x: -30, y: 20, opacity: 0 }
                            : { scale: 1.15, x: 0, y: 0, opacity: 0 }
                          : { scale: 1.15, opacity: 0 }
                      }
                      animate={
                        isFallback
                          ? videoSlideIndex === 1
                            ? { scale: 1.6, x: 10, y: -5, opacity: 1 }
                            : videoSlideIndex === 2
                            ? { scale: 2.0, x: -20, y: 10, opacity: 1 }
                            : { scale: 1.0, x: 0, y: 0, opacity: 1 }
                          : { scale: 1.0, opacity: 1 }
                      }
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>
                  {/* Premium cinematic dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
                  
                  {/* Pulsing visualizer / watermark */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-semibold tracking-widest text-white uppercase">Product Showcase Video</span>
                  </div>

                  {/* Audio Equalizer animation to make it feel like a real video */}
                  <div className="absolute bottom-16 right-4 flex items-end gap-0.5 h-6">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        animate={{ height: ["4px", "24px", "4px"] }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-0.5 bg-emerald-400"
                      />
                    ))}
                  </div>

                  {/* Video details / caption overlays */}
                  <div className="absolute bottom-16 left-4 text-left space-y-1 pr-12">
                    <h4 className="text-white font-semibold text-sm tracking-tight drop-shadow-md">{product.name}</h4>
                    <p className="text-emerald-400 font-normal text-xs uppercase tracking-widest drop-shadow-md">MOQ: {product.moq} | Price: {product.price}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                      key={videoSlideIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.0, ease: "linear" }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              )}
              {activeMedia === 'photo' && (
                <>
                  <button onClick={() => setActiveImgIndex(prev => (prev - 1 + productImages.length) % productImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-xl opacity-0 group-hover/main:opacity-100 transition-all border border-slate-100 z-20"><ChevronLeft size={24} /></button>
                  <button onClick={() => setActiveImgIndex(prev => (prev + 1) % productImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-xl opacity-0 group-hover/main:opacity-100 transition-all border border-slate-100 z-20"><ChevronRight size={24} /></button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex bg-white/80 backdrop-blur-md p-1 rounded-full shadow-lg border border-white/50">
                <button onClick={() => setActiveMedia('photo')} className={cn('px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all', activeMedia === 'photo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400')}>Photos</button>
                <button onClick={() => setActiveMedia('video')} className={cn('px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all', activeMedia === 'video' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400')}>Video</button>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar py-4 md:py-0 h-auto md:h-[500px] lg:h-[600px] shrink-0">
              {productImages.map((img, i) => (
                <div key={i} onClick={() => { setActiveImgIndex(i); setActiveMedia('photo'); }} className={cn('w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0', activeImgIndex === i && activeMedia === 'photo' ? 'border-emerald-600 shadow-md' : 'border-slate-100 opacity-60 hover:opacity-100')}>
                  <img src={img} className={getImageClassName(i)} />
                </div>
              ))}
              <div onClick={() => setActiveMedia('video')} className={cn('w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 bg-slate-800 flex items-center justify-center', activeMedia === 'video' ? 'border-emerald-600' : 'border-slate-100 opacity-80')}>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Play size={10} fill="white" className="text-white ml-0.5" /></div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge className="bg-slate-900 text-white border-none rounded-md text-[9px] px-2 py-0.5">Stickers</Badge>
                <Badge variant="outline" className="text-[9px] font-normal px-2 py-0.5">Manufacturer</Badge>
              </div>
              <h1 className="text-lg md:text-xl font-semibold text-slate-900 leading-tight">{product.name} - Professional High-End Grade</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">{[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}</div>
                  <span className="text-xs font-normal text-slate-900">4.9</span>
                  <span className="text-[10px] text-slate-400 font-normal underline cursor-pointer">(1,428 reviews)</span>
                </div>
                <div className="h-3 w-[1px] bg-slate-200"></div>
                <span className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">189 Sold</span>
              </div>
            </div>

            {/* Wholesale Pricing Tiers */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div>
                <div className="text-slate-500 text-xs font-normal mb-1">50 - 99 pieces</div>
                <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{formatPrice(basePrice)}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs font-normal mb-1">100 - 4,999 pieces</div>
                <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{formatPrice(basePrice * 0.943)}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs font-normal mb-1">≥ 5,000 pieces</div>
                <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{formatPrice(basePrice * 0.876)}</div>
              </div>
            </div>

            <div className="h-[1px] bg-slate-200/60 my-2.5"></div>

            {/* Variations */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900">Variations</span>
                <button className="text-xs font-normal text-slate-900 hover:underline">Select now</button>
              </div>
              <div className="text-xs text-slate-900">
                <span className="font-bold">{getOptionLabel().prefix}: </span>
                <span className="font-normal text-slate-650">{getOptionLabel().value}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => {
                  const img = productImages[i % productImages.length];
                  return (
                    <div 
                      key={i} 
                      onClick={() => { setSelectedVarIndex(i); setActiveImgIndex(i % productImages.length); setActiveMedia('photo'); }}
                      className={cn(
                        'w-12 h-12 rounded-lg cursor-pointer transition-all flex items-center justify-center border', 
                        selectedVarIndex === i 
                          ? 'border-black p-[2px] bg-white' 
                          : 'border-transparent opacity-80 hover:opacity-100'
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover rounded-md" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Size</h3>
              <div className="flex flex-wrap gap-2">
                {getProductSizes().map((s, i) => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(i)}
                    className={cn(
                      'min-w-10 h-10 px-3 flex items-center justify-center rounded-lg text-xs font-semibold transition-all border', 
                      selectedSize === i 
                        ? 'bg-white border-black text-slate-900' 
                        : 'bg-[#F2F4F7] border-transparent text-slate-700 hover:bg-slate-200'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Supplier's customization ability */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-slate-900">Supplier's customization ability</span>
                <span className="text-[#0252C9] font-bold inline-flex items-center text-sm">
                  <svg className="w-4.5 h-4.5 text-[#0252C9] mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  erified
                </span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1 font-medium">
                <li>Minor customization</li>
                <li>Drawing-based customization</li>
                <li>Sample-based customization</li>
                <li>Full customization</li>
              </ul>
            </div>

            <div className="h-[1px] bg-slate-200/60 my-2.5"></div>

            {/* Shipping */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Shipping</h3>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Shipping fee and delivery date to be negotiated. Chat with supplier now for more details.
              </p>
            </div>

            <div className="h-[1px] bg-slate-200/60 my-2.5"></div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:block space-y-3 pt-1">
              <button 
                onClick={(e) => handleBookNow(e)}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs transition-all shadow-lg active:scale-[0.99]"
              >
                Book now
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="flex-1 py-3.5 bg-[#D1410C] hover:bg-[#B7370A] text-white font-bold rounded-full text-xs transition-all shadow-md active:scale-[0.98]"
                >
                  Send inquiry
                </button>
                <button className="flex-1 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-full text-xs transition-all">
                  Chat now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Other recommendations for your business</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RECOMMENDATIONS.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/marketplace/product/${item.id}`)}>
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 mb-3 relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><Heart size={16} /></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[11px] font-normal text-slate-600 line-clamp-2 leading-relaxed">{item.name}</h3>
                  <div className="text-lg font-semibold text-slate-900">{item.price}</div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-normal">MOQ: {item.moq}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Delivery by {item.delivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 bg-white rounded-3xl overflow-hidden">
          <div className="flex border-b border-slate-100 px-2 md:px-0 gap-8 overflow-x-auto no-scrollbar">
            {['Attributes','Reviews','Supplier','Description'].map((tab) => (
              <button key={tab} onClick={() => setActivePdpTab(tab)} className={cn('py-5 px-4 text-sm font-semibold relative transition-all whitespace-nowrap', activePdpTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600')}>
                {tab}
                {activePdpTab === tab && <motion.div layoutId="pdpTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />}
              </button>
            ))}
          </div>
          <div className="py-8 space-y-8">
            {activePdpTab === 'Attributes' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Key attributes</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {KEY_ATTRIBUTES.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-50 last:border-none">
                          <td className="py-2.5 px-3 bg-slate-50/50 w-1/4 text-[10px] md:text-[11px] font-normal text-slate-500 leading-tight align-top">{row.label}</td>
                          <td className="py-2.5 px-3 w-1/4 text-[10px] md:text-[11px] font-semibold text-slate-900 leading-tight align-top">{row.value}</td>
                          <td className="py-2.5 px-3 bg-slate-50/50 w-1/4 text-[10px] md:text-[11px] font-normal text-slate-500 border-l border-slate-50 leading-tight align-top">{row.label2}</td>
                          <td className="py-2.5 px-3 w-1/4 text-[10px] md:text-[11px] font-semibold text-slate-900 leading-tight align-top">{row.value2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activePdpTab === 'Reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Customer Reviews (1,428)</h3>
                  <div className="flex items-center gap-1.5"><div className="flex text-amber-400">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}</div><span className="text-sm font-semibold text-slate-900">4.9 / 5.0</span></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DUMMY_REVIEWS.map((review) => (
                    <div key={review.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/30 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-xs">{review.avatar}</div><div><p className="text-xs font-semibold text-slate-900">{review.user}</p><p className="text-[10px] text-slate-400 font-normal">{review.date}</p></div></div>
                        <div className="flex text-amber-400">{[...Array(review.rating)].map((_,i) => <Star key={i} size={10} fill="currentColor" />)}</div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{review.comment}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full py-4 rounded-2xl text-xs font-semibold border-slate-200">View All Reviews</Button>
              </div>
            )}
            {activePdpTab === 'Supplier' && (
              <div className="space-y-6">
                <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-semibold text-3xl">NS</div>
                      <div className="space-y-1"><h3 className="text-xl font-semibold">Nexora Solutions Co., Ltd.</h3><div className="flex items-center gap-2"><Badge className="bg-emerald-500 text-white border-none text-[9px] font-semibold px-2">Verified</Badge><span className="text-xs font-normal text-emerald-200">12 Years Manufacturer</span></div></div>
                    </div>
                    <div className="flex gap-3"><Button className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 rounded-xl font-semibold text-xs">Follow</Button><Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold text-xs">Visit Store</Button></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[{label:'Response Time',value:'≤ 3h',sub:'Fast Response'},{label:'On-time Delivery',value:'98.5%',sub:'Highly Reliable'},{label:'Store Rating',value:'4.8/5',sub:'Excellent Quality'},{label:'Followers',value:'124K+',sub:'Trusted Choice'}].map((stat,i) => (
                    <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white space-y-2"><p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">{stat.label}</p><p className="text-xl font-semibold text-slate-900">{stat.value}</p><p className="text-[10px] font-semibold text-emerald-600">{stat.sub}</p></div>
                  ))}
                </div>
              </div>
            )}
            {activePdpTab === 'Description' && (
              <div className="space-y-8">
                <div className="space-y-4"><h3 className="text-lg font-semibold text-slate-900">Product Overview</h3><p className="text-sm text-slate-600 leading-loose font-medium">Our Professional High-End Grade {product.name} are engineered for durability and visual impact. Using state-of-the-art UV varnishing technology and premium adhesive vinyl, we ensure each piece maintains its color vibrance and structural integrity even in harsh conditions.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4"><h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Key Features</h4><ul className="space-y-3">{['Waterproof and Weather-resistant','Premium UV Varnishing for high-gloss finish','Custom Die-cut shapes as per requirement','Industrial grade adhesive for long-lasting stick','Eco-friendly non-toxic materials'].map((f,i) => (<li key={i} className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5"><Zap size={10} fill="currentColor" /></div><span className="text-xs font-normal text-slate-600">{f}</span></li>))}</ul></div>
                  <div className="rounded-2xl overflow-hidden border border-slate-100"><img src={product.image} className="w-full h-48 object-cover" /><div className="p-4 bg-slate-50"><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Quality Assurance</p><p className="text-xs font-normal text-slate-600 mt-1">Certified for industrial and promotional use under ISO 9001 standards.</p></div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-4 z-50 flex flex-col gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-6">
        <button 
          onClick={(e) => handleBookNow(e)}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs transition-all shadow-md active:scale-[0.98]"
        >
          Book now
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setIsInquiryOpen(true)}
            className="flex-1 py-3 bg-[#D1410C] hover:bg-[#B7370A] text-white font-bold rounded-full text-xs transition-all shadow-sm active:scale-[0.98]"
          >
            Send inquiry
          </button>
          <button className="flex-1 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-full text-xs transition-all">
            Chat now
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[200] font-bold text-sm flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <EnquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        itemName={product?.name || 'this product'}
        type="product"
      />
    </UserLayout>
  );
};

export default ProductDetail;

