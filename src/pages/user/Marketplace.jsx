import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Star, Clock, Heart, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import UserLayout from '../../layouts/UserLayout';
import { FULL_PRODUCT_LIST, PRODUCT_LIST_TABS } from '../../data/marketplaceData';
import { storage } from '../../utils/storage';

const Marketplace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [activeProductTab, setActiveProductTab] = useState(location.state?.category || 'All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishlist, setWishlist] = useState(() => storage.getWishlist().map(p => p.id));

  const handleClearSearch = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('q');
      return next;
    });
  };

  const filteredProducts = FULL_PRODUCT_LIST.filter(prod => {
    const matchesTab = activeProductTab === 'All' || prod.category === activeProductTab;
    const matchesSearch = !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sync wishlist state when changed externally
  useEffect(() => {
    const sync = () => setWishlist(storage.getWishlist().map(p => p.id));
    window.addEventListener('wishlistChange', sync);
    return () => window.removeEventListener('wishlistChange', sync);
  }, []);

  const handleToggleWishlist = (e, prod) => {
    e.stopPropagation();
    const added = storage.toggleWishlist(prod);
    setWishlist(storage.getWishlist().map(p => p.id));
    setToastMessage(added ? `❤️ Added to Wishlist!` : `Removed from Wishlist`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBookNow = (prod, e) => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      localStorage.setItem('sc_redirect_after_login', window.location.pathname);
      localStorage.setItem('sc_pending_booking', JSON.stringify({
        productId: prod.id,
        size: 0,
        variation: 0
      }));
      navigate('/login');
    } else {
      // Find coordinates of target cart icon
      const cartIcon = document.getElementById('navbar-cart-btn') || document.querySelector('.lucide-shopping-cart');
      const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 100, top: 40 };

      // Find start coordinates (clicked product card image or button)
      let startRect = null;
      if (e) {
        const cardEl = e.currentTarget.closest('.group');
        const imgEl = cardEl ? cardEl.querySelector('img') : null;
        startRect = imgEl ? imgEl.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
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
      flyer.style.backgroundImage = `url(${prod.image})`;
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


      const cartStr = localStorage.getItem('sc_local_cart');
      const cart = cartStr ? JSON.parse(cartStr) : [];
      
      const getProductSizes = (product) => {
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

      const getOptionLabel = (product) => {
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

        return options[0];
      };

      const newCartItem = {
        id: `CRT-${Date.now()}`,
        productId: prod.id,
        name: prod.name,
        image: prod.image,
        price: prod.price,
        size: getProductSizes(prod)[0] || 'Standard',
        variation: getOptionLabel(prod),
        quantity: 1
      };
      cart.push(newCartItem);
      localStorage.setItem('sc_local_cart', JSON.stringify(cart));
      
      storage.saveBooking({
        itemName: prod.name,
        itemLocation: 'Online Shop',
        itemImage: prod.image,
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

  return (
    <UserLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-white pt-28 md:pt-20"
      >
        <div className="max-w-[1400px] mx-auto px-6 pb-20">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4 md:mb-8">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-all shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center min-h-10 leading-snug">Products on ServiceConnect</h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-100 mb-4 md:mb-8 overflow-x-auto no-scrollbar scroll-smooth md:pl-6 lg:pl-8">
            {PRODUCT_LIST_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProductTab(tab)}
                className={cn(
                  'whitespace-nowrap pb-4 text-sm font-bold transition-all relative',
                  activeProductTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                {tab}
                {activeProductTab === tab && (
                  <motion.div layoutId="activeProdTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Search Result Pill */}
          {searchQuery && (
            <div className="flex items-center gap-2 mb-6 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl w-fit">
              <span className="text-xs font-medium text-slate-500">Showing results for:</span>
              <span className="text-xs font-bold text-slate-800 bg-[#FFE37D] px-2 py-0.5 rounded-lg">"{searchQuery}"</span>
              <button 
                onClick={handleClearSearch}
                className="ml-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-800 flex items-center justify-center text-[10px] transition-colors font-bold"
              >
                ✖
              </button>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4 w-full">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 text-slate-400">
                <Search size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-sm text-slate-500 max-w-sm mb-8 font-medium">
                We couldn't find any products matching "{searchQuery}" under "{activeProductTab}". Try checking spelling or search for another item.
              </p>
              <button 
                onClick={handleClearSearch}
                className="bg-[#FFE37D] hover:bg-[#F5D555] text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-[0.98] shadow-md shadow-yellow-400/20"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group cursor-pointer flex flex-col h-full"
                  onClick={() => navigate(`/marketplace/product/${prod.id}`)}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F7F8FA] mb-4 border border-slate-100 transition-all group-hover:shadow-xl group-hover:border-primary-100">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {/* Heart Button */}
                    <motion.button
                      onClick={(e) => handleToggleWishlist(e, prod)}
                      whileTap={{ scale: 0.75 }}
                      className={cn(
                        'absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all z-10',
                        wishlist.includes(prod.id)
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100'
                      )}
                    >
                      <Heart
                        size={15}
                        fill={wishlist.includes(prod.id) ? 'currentColor' : 'none'}
                        className="transition-all"
                      />
                    </motion.button>
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-[13px] font-medium text-slate-700 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">{prod.name}</h3>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-slate-900">{prod.price}</span>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">MOQ: {prod.moq}</span>
                        </div>
                        {prod.badge && (
                          <div className="flex items-center gap-1.5 text-[#E31E24]">
                            <Zap size={10} fill="currentColor" />
                            <span className="text-[10px] font-bold tracking-tight italic">{prod.badge}</span>
                          </div>
                        )}
                        {prod.rating && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={10} fill="currentColor" />
                            <span className="text-[10px] font-black text-slate-900">{prod.rating}</span>
                          </div>
                        )}
                        {prod.delivery && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Clock size={10} />
                            <span className="text-[10px] font-bold">{prod.delivery}</span>
                          </div>
                        )}
                        {prod.sold && (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{prod.sold}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(prod, e);
                      }}
                      className="w-full mt-auto py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
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
    </UserLayout>
  );
};

export default Marketplace;
