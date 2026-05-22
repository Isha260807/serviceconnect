import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowLeft, CheckCircle2, Sparkles, MapPin, User, Phone, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import UserLayout from '../../layouts/UserLayout';
import { storage } from '../../utils/storage';
import Button from '../../components/common/Button';

// Particle system helper classes for the fireworks canvas
class Rocket {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * (canvasWidth - 100) + 50;
    this.y = canvasHeight;
    this.targetY = Math.random() * (canvasHeight * 0.5) + canvasHeight * 0.1;
    this.speed = Math.random() * 4 + 6;
    this.angle = -Math.PI / 2 + (Math.random() * 0.2 - 0.1); // Slightly tilted upwards
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.trail = [];
    this.isDead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 8) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;

    // Explode if it reaches target height or goes offscreen
    if (this.vy >= 0 || this.y <= this.targetY) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    if (this.trail.length > 0) {
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.stroke();
    }
  }
}

class Spark {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 6 + 2;
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity;
    this.gravity = 0.15;
    this.friction = 0.98;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.015;
    this.color = color;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class Confetti {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * -canvasHeight;
    this.size = Math.random() * 6 + 4;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 4 - 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

const Cart = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [error, setError] = useState('');
  const [successOrderId, setSuccessOrderId] = useState('');

  // Form states
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // Load user and cart from local storage
  const loadCartAndUser = () => {
    const cartData = localStorage.getItem('sc_local_cart');
    setCart(cartData ? JSON.parse(cartData) : []);

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
      setBillingInfo(prev => ({
        ...prev,
        name: parsedUser.name || prev.name,
        phone: parsedUser.phone || prev.phone
      }));
    }
  };

  useEffect(() => {
    loadCartAndUser();
    window.addEventListener('cartChange', loadCartAndUser);
    return () => window.removeEventListener('cartChange', loadCartAndUser);
  }, []);

  // Canvas fireworks animation loop
  useEffect(() => {
    if (!checkoutSuccess) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let rockets = [];
    let sparks = [];
    let confettis = [];

    // Initialize confetti
    for (let i = 0; i < 150; i++) {
      confettis.push(new Confetti(canvas.width, canvas.height));
    }

    const animate = () => {
      // Clear with dark blue translucent overlay for rocket trail fading
      ctx.fillStyle = 'rgba(11, 15, 26, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Periodically spawn rockets
      if (Math.random() < 0.05 && rockets.length < 5) {
        rockets.push(new Rocket(canvas.width, canvas.height));
      }

      // Update and draw rockets
      rockets.forEach((rocket, index) => {
        rocket.update();
        rocket.draw(ctx);
        if (rocket.isDead) {
          // Explode: create sparks
          for (let i = 0; i < 60; i++) {
            sparks.push(new Spark(rocket.x, rocket.y, rocket.color));
          }
          rockets.splice(index, 1);
        }
      });

      // Update and draw sparks
      sparks.forEach((spark, index) => {
        spark.update();
        spark.draw(ctx);
        if (spark.alpha <= 0) {
          sparks.splice(index, 1);
        }
      });

      // Update and draw confetti
      confettis.forEach((conf, index) => {
        conf.update();
        conf.draw(ctx);
        // Reset confetti position if it goes off bottom
        if (conf.y > canvas.height) {
          confettis[index] = new Confetti(canvas.width, canvas.height);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [checkoutSuccess]);

  // Quantity controls
  const handleUpdateQuantity = (itemId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + change;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('sc_local_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartChange'));
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('sc_local_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartChange'));
  };

  // Form input checkers
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  // Totals calculations
  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^\d.]/g, '')) || 0) * item.quantity, 0);
  const gst = subtotal * 0.18;
  const delivery = subtotal > 1500 ? 0 : 99;
  const total = subtotal + gst + delivery;

  // Checkout submit handler
  const handleCheckout = (e) => {
    e.preventDefault();
    setError('');

    // Check user session
    if (!currentUser) {
      localStorage.setItem('sc_redirect_after_login', '/cart');
      navigate('/login');
      return;
    }

    // Form validation
    if (!billingInfo.name.trim() || !billingInfo.phone.trim() || !billingInfo.address.trim() || !billingInfo.pincode.trim()) {
      setError('Please fill in all billing and shipping information fields.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setError('Please complete all card details.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        setError('Please enter your UPI Address (e.g. user@okhdfcbank).');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate API authorization and loading
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      
      // Save items into local purchases storage using storage.saveOrder
      cart.forEach(item => {
        storage.saveOrder({
          itemName: `${item.name} (${item.size} / ${item.variation}) x${item.quantity}`,
          itemImage: item.image,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          type: 'shopping',
          status: 'Confirmed'
        });
      });

      // Reset cart
      localStorage.removeItem('sc_local_cart');
      setCart([]);
      
      // Dispatch cart updates
      window.dispatchEvent(new Event('cartChange'));
      window.dispatchEvent(new Event('authChange'));

      setSuccessOrderId(orderId);
      setIsProcessing(false);
      setCheckoutSuccess(true);
    }, 2000);
  };

  const formattedAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#fdf9da] to-white pt-6 md:pt-20 pb-20 relative px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/marketplace')}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-sm border border-slate-100 transition-all shrink-0 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Your Shopping Cart</h1>
              <p className="text-slate-500 font-bold text-[11px] uppercase tracking-wider mt-1.5">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} ready for checkout
              </p>
            </div>
          </div>

          {cart.length === 0 && !checkoutSuccess ? (
            /* Empty Cart View */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-cyan-100 shadow-xl shadow-cyan-900/5 max-w-lg mx-auto mt-12 space-y-6"
            >
              <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mx-auto text-primary-500 shadow-inner">
                <ShoppingBag size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800">Your cart is feeling light</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Looks like you haven't added any designer wear, organic essentials, or premium services to your cart yet.
                </p>
              </div>
              <Button onClick={() => navigate('/marketplace')} className="w-full rounded-2xl py-4 font-black shadow-lg shadow-primary-500/20">
                Explore Marketplace
              </Button>
            </motion.div>
          ) : !checkoutSuccess ? (
            /* Dual Column Checkout Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-7 space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-2xl p-4 flex gap-4 border border-cyan-50 shadow-sm relative hover:shadow-md transition-shadow group"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm bg-slate-50 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-black text-slate-900 text-sm md:text-base leading-snug truncate">{item.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded">
                            Size: {item.size}
                          </span>
                          <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded">
                            Var: {item.variation}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors text-slate-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-black text-slate-800 min-w-4 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors text-slate-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-slate-900">
                            {formattedAmount((parseFloat(item.price.replace(/[^\d.]/g, '')) || 0) * item.quantity)}
                          </span>
                          <p className="text-[10px] text-slate-400 font-bold">{item.price} each</p>
                        </div>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-4 right-4 p-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Billing and Checkout Form */}
              <div className="lg:col-span-5">
                <form onSubmit={handleCheckout} className="bg-white rounded-3xl p-6 md:p-8 border border-cyan-100 shadow-xl shadow-cyan-900/5 space-y-6">
                  <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Sparkles className="text-primary-500" size={18} /> Checkout & Billing
                  </h3>

                  {/* Errors block */}
                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold leading-relaxed">
                      {error}
                    </div>
                  )}

                  {/* Billing form section */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">1. Shipping Details</h4>
                    
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={billingInfo.name}
                          onChange={handleBillingChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Mobile Number"
                          value={billingInfo.phone}
                          onChange={handleBillingChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                          required
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-slate-400" size={16} />
                        <textarea
                          name="address"
                          placeholder="Full Address"
                          rows="2"
                          value={billingInfo.address}
                          onChange={handleBillingChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all resize-none"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Pincode / Postal Code"
                          maxLength="6"
                          value={billingInfo.pincode}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">2. Payment Method</h4>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'upi', label: 'UPI ID', icon: '⚡' },
                        { id: 'card', label: 'Card', icon: '💳' },
                        { id: 'cod', label: 'C.O.D', icon: '📦' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "py-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95",
                            paymentMethod === method.id 
                              ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10" 
                              : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-slate-200"
                          )}
                        >
                          <span className="text-lg">{method.icon}</span>
                          <span className="text-[10px] font-black uppercase">{method.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Method Details inputs */}
                    <AnimatePresence mode="wait">
                      {paymentMethod === 'upi' && (
                        <motion.div
                          key="upi-input"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-2"
                        >
                          <input
                            type="text"
                            placeholder="Enter UPI ID (e.g. user@paytm)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                          />
                          <p className="text-[10px] text-slate-400 font-bold ml-1">You will receive a payment request on your UPI app.</p>
                        </motion.div>
                      )}

                      {paymentMethod === 'card' && (
                        <motion.div
                          key="card-input"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            maxLength="19"
                            value={cardDetails.number}
                            onChange={handleCardChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              maxLength="5"
                              value={cardDetails.expiry}
                              onChange={handleCardChange}
                              className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                            />
                            <input
                              type="password"
                              name="cvv"
                              placeholder="CVV"
                              maxLength="3"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:bg-white outline-none placeholder:text-slate-400 font-medium transition-all"
                            />
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === 'cod' && (
                        <motion.div
                          key="cod-input"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl"
                        >
                          <p className="text-[11px] font-bold text-emerald-700 leading-relaxed flex items-start gap-2">
                            <Check size={14} className="shrink-0 mt-0.5" />
                            Pay by cash or card upon delivery. Extra verification may be requested at the time of delivery.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Summary Totals */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Subtotal</span>
                      <span>{formattedAmount(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>GST (18%)</span>
                      <span>{formattedAmount(gst)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Delivery Fee</span>
                      <span>{delivery === 0 ? 'FREE' : formattedAmount(delivery)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-base font-black text-slate-900 pt-2 border-t border-dashed border-slate-100">
                      <span>Grand Total</span>
                      <span className="text-lg text-primary-600">{formattedAmount(total)}</span>
                    </div>
                  </div>

                  {/* Place Order Action */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all relative overflow-hidden"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>{currentUser ? 'Confirm & Pay' : 'Login to Confirm'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          ) : (
            /* Checkout Success overlay & Modal */
            <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center p-4">
              {/* Confetti canvas */}
              <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/95 backdrop-blur-md max-w-md w-full rounded-[32px] p-8 text-center border border-white/20 shadow-2xl relative z-10 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={44} className="animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">Booking Confirmed!</h2>
                  <p className="text-slate-500 font-semibold text-sm">
                    Thank you, your purchase was completed successfully.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs font-bold text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order ID:</span>
                    <span className="text-slate-800 font-mono font-black">{successOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-slate-800">{new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ship To:</span>
                    <span className="text-slate-800 truncate max-w-[200px]">{billingInfo.name}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/60 pt-2 text-sm font-black">
                    <span className="text-slate-800">Paid Amount:</span>
                    <span className="text-primary-600">{formattedAmount(total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      navigate('/profile');
                    }}
                    className="w-full rounded-2xl py-3.5 shadow-xl shadow-primary-500/20"
                  >
                    View in My Purchases
                  </Button>
                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      navigate('/marketplace');
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-black text-sm active:scale-95 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </UserLayout>
  );
};

export default Cart;
