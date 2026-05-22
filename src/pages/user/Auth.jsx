import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  LockKeyhole,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import UserLayout from '../../layouts/UserLayout';
import Button from '../../components/common/Button';
import { cn } from '../../utils/cn';
import { storage } from '../../utils/storage';
import { ALL_PRODUCTS } from '../../data/marketplaceData';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200",
    title: "Define Your Signature Style",
    subtitle: "A curated collection of elegant dresses, designer frocks, and premium wear."
  },
  {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
    title: "Expert Local Services",
    subtitle: "Book verified professionals for home maintenance, salon, cleaning, and repairs."
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    title: "Discover Premium Local Shops",
    subtitle: "Explore high-end local boutiques, retail showrooms, and nearby marketplaces."
  },
  {
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200",
    title: "Captivating Luxury Fragrances",
    subtitle: "Exquisite signature perfumes blended to linger and leave a lasting impression."
  },
  {
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=1200",
    title: "Premium Cosmetics & Beauty",
    subtitle: "Indulge in vibrant lipsticks, organic cosmetics, and luxury skincare essentials."
  }
];

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSignup = pathname === '/signup';

  const [activeSlide, setActiveSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      const user = {
        name: isSignup ? formData.name : (formData.email.split('@')[0] || 'User'),
        email: formData.email,
        phone: formData.phone || '',
        initials: (isSignup ? formData.name : formData.email.split('@')[0]).substring(0, 2).toUpperCase(),
        loggedIn: true
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.dispatchEvent(new Event('authChange'));

      // Process any pending product booking
      const pendingStr = localStorage.getItem('sc_pending_booking');
      if (pendingStr) {
        try {
          const pending = JSON.parse(pendingStr);
          const product = ALL_PRODUCTS.find(p => p.id === pending.productId);
          if (product) {
            const cartStr = localStorage.getItem('sc_local_cart');
            const cart = cartStr ? JSON.parse(cartStr) : [];
            
            const getOptionValue = (varIndex) => {
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
              return options[varIndex] || options[0];
            };

            const getSizes = () => {
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

            const newCartItem = {
              id: `CRT-${Date.now()}`,
              productId: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              size: getSizes()[pending.size] || 'Standard',
              variation: getOptionValue(pending.variation),
              quantity: 1
            };
            cart.push(newCartItem);
            localStorage.setItem('sc_local_cart', JSON.stringify(cart));
            
            // Save verified booking record
            storage.saveBooking({
              itemName: product.name,
              itemLocation: 'Online Shop',
              itemImage: product.image,
              date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
              type: 'shopping'
            });

            window.dispatchEvent(new Event('cartChange'));
          }
        } catch (e) {
          console.error("Error auto-booking pending product:", e);
        }
        localStorage.removeItem('sc_pending_booking');
      }

      // Check if redirect path is saved, else fallback to marketplace
      const redirectPath = localStorage.getItem('sc_redirect_after_login') || '/marketplace';
      localStorage.removeItem('sc_redirect_after_login');

      setTimeout(() => {
        setIsSuccess(false);
        navigate(redirectPath);
      }, 1800);
    }, 1500);
  };

  return (
    <UserLayout>
      <main className="min-h-screen bg-white grid lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Column: Visual Carousel Showcase (Desktop Only) */}
        <section className="relative hidden lg:block overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-primary-950/30 h-screen sticky top-0">
          <AnimatePresence>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${SLIDES[activeSlide].image})` }}
            />
          </AnimatePresence>
          
          {/* Elegant dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          
          {/* Carousel Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            {/* Back to shop button */}
            <button 
              onClick={() => navigate('/marketplace')}
              className="group flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full w-fit border border-white/10 hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </button>

            {/* Tagline / Slides Details */}
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2 bg-primary-500/20 border border-primary-400/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit text-primary-300 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles size={12} className="text-primary-300" />
                E-Commerce Premium
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2.5"
                >
                  <h1 className="text-3xl font-display font-bold leading-tight tracking-tight text-white">
                    {SLIDES[activeSlide].title}
                  </h1>
                  <p className="text-xs text-white/90 leading-relaxed font-medium">
                    {SLIDES[activeSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex gap-1.5 pt-4">
                {SLIDES.map((_, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={cn(
                      "h-1 rounded-full cursor-pointer transition-all duration-300",
                      activeSlide === idx ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-3 rounded-2xl text-[11px] text-white/80 font-medium">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              Safe Checkout | Easy Returns | 100% Quality Assured
            </div>
          </div>
        </section>

        {/* Right Column: Interaction Form */}
        <section className="flex flex-col justify-center min-h-screen p-6 sm:p-10 xl:p-12 relative bg-white">
            
            {/* Interactive Loading / Success Screens */}
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin" />
                  <p className="text-slate-600 font-bold text-sm">Verifying credentials...</p>
                </motion.div>
              )}

              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.15, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle2 size={56} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {isSignup ? 'Account Created!' : 'Welcome Back!'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium -mt-2">Redirecting to marketplace...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-md mx-auto space-y-4">
              
              {/* Header / Intro */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                  {isSignup ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {isSignup 
                    ? 'Join us today to shop fine soaps, organic cosmetics, and designer apparel.' 
                    : 'Sign in to access your orders, wishlist, and personalized recommendations.'}
                </p>
              </div>

              {/* Login / Signup Toggle Tab */}
              <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 relative z-10">
                <Link
                  to="/login"
                  className={cn(
                    'relative py-2 text-center text-xs font-bold transition-all rounded-lg',
                    !isSignup ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={cn(
                    'relative py-2 text-center text-xs font-bold transition-all rounded-lg',
                    isSignup ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Create Account
                </Link>
              </div>

              {/* Main Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                
                {isSignup && (
                  <AuthInputField 
                    icon={User} 
                    label="Full Name" 
                    name="name"
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                )}

                <AuthInputField 
                  icon={Mail} 
                  label="Email Address" 
                  name="email"
                  type="email" 
                  placeholder="name@domain.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {isSignup && (
                  <AuthInputField 
                    icon={Phone} 
                    label="Phone Number" 
                    name="phone"
                    type="tel"
                    placeholder="+91 98765-43210" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                )}

                <AuthInputField 
                  icon={LockKeyhole} 
                  label="Password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder={isSignup ? "Create secure password" : "Enter your password"}
                  value={formData.password}
                  onChange={handleChange}
                  trailingIcon={showPassword ? EyeOff : Eye}
                  onTrailingClick={() => setShowPassword(!showPassword)}
                  required
                />

                {isSignup && (
                  <AuthInputField 
                    icon={LockKeyhole} 
                    label="Confirm Password" 
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm secure password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    trailingIcon={showConfirmPassword ? EyeOff : Eye}
                    onTrailingClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    required
                  />
                )}

                {/* Extras checkbox */}
                <div className="flex items-center justify-between gap-4 text-xs font-medium pt-0.5">
                  {isSignup ? (
                    <label className="flex items-start gap-2.5 text-slate-500 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" 
                        required
                      />
                      <span>I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> & <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a></span>
                    </label>
                  ) : (
                    <>
                      <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        Remember me
                      </label>
                      <button type="button" className="font-semibold text-primary-600 hover:underline">Forgot password?</button>
                    </>
                  )}
                </div>

                {/* Primary CTA Submit */}
                <button
                  type="submit"
                  className="w-full mt-1.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-full text-xs transition-all shadow-md active:scale-[0.98]"
                >
                  {isSignup ? 'Register Now' : 'Sign In'}
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="relative py-1.5 flex items-center justify-center">
                <div className="absolute inset-x-0 h-[1px] bg-slate-200" />
                <span className="relative z-10 px-3 bg-white text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Or continue with
                </span>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-full text-xs transition-all">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3.09-2.92 4.14v3.44h4.72c2.76-2.54 4.25-6.28 4.25-10.43z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.72-3.44c-1.33.9-3.03 1.4-4.96 1.4-3.82 0-7.06-2.58-8.22-6.08H1.23v3.58C3.21 21.02 7.39 24 12 24z" />
                    <path fill="#FBBC05" d="M3.78 12.97c-.3-.9-.47-1.87-.47-2.87s.17-1.97.47-2.87V2.65H1.23C.44 4.22 0 5.97 0 7.82s.44 3.6 1.23 5.18l3.78-3.03z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.21 2.98 1.23 7.82l3.78 3.03c1.16-3.5 4.4-6.1 8.22-6.1z" />
                  </svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-full text-xs transition-all">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.73-1.2 1.87-1.05 2.98 1.1.09 2.24-.59 2.98-1.42z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Bottom Nav Helper */}
              <p className="text-center text-xs text-slate-400 font-medium">
                {isSignup ? 'Already have an account?' : 'New to our shop?'}{' '}
                <Link to={isSignup ? '/login' : '/signup'} className="font-bold text-primary-600 hover:underline">
                  {isSignup ? 'Sign in' : 'Create an account'}
                </Link>
              </p>

            </div>
          </section>

      </main>
    </UserLayout>
  );
};

const AuthInputField = ({ 
  icon: Icon, 
  trailingIcon: TrailingIcon, 
  onTrailingClick, 
  label, 
  required,
  ...props 
}) => (
  <label className="block space-y-0.5">
    <span className="block text-xs font-bold text-slate-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </span>
    <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 transition-all focus-within:border-slate-800 focus-within:ring-4 focus-within:ring-slate-100">
      <Icon size={16} className="text-slate-400 shrink-0" />
      <input
        {...props}
        className="min-w-0 flex-1 border-none bg-transparent p-0 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0 font-medium"
      />
      {TrailingIcon && (
        <button 
          type="button" 
          onClick={onTrailingClick}
          className="text-slate-450 hover:text-slate-650 transition-colors shrink-0"
        >
          <TrailingIcon size={16} />
        </button>
      )}
    </span>
  </label>
);

export default Auth;
