import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { storage } from '../../utils/storage';

// ---- Confetti Canvas ----
const ConfettiCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#3b82f6', '#f97316', '#a855f7'];
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 80,
      w: 6 + Math.random() * 8,
      h: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      opacity: 1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05; // gravity
        if (p.y > canvas.height) { p.opacity -= 0.05; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (particles.some(p => p.opacity > 0)) {
        animId = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ---- Main Modal ----
const EnquiryModal = ({ isOpen, onClose, itemName = 'this item', type = 'service' }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ name: '', phone: '', email: '', message: '' });
        setErrors({});
        setSubmitted(false);
        setSubmitting(false);
      }, 400);
    }
  }, [isOpen]);

  // Auto-close after thank you
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(t);
    }
  }, [submitted, onClose]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    storage.saveEnquiry({
      vendorName: itemName,
      type,
      ...form,
      status: 'Sent',
    });
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const title = type === 'product'
    ? `Send Inquiry for ${itemName}`
    : `Send Enquiry for ${itemName}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative w-full max-w-[480px] bg-white rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                /* ---- FORM VIEW ---- */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Header */}
                  <div className="px-7 pt-7 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {type === 'product' ? 'Product Inquiry' : 'Service Enquiry'}
                      </span>
                    </div>
                    <h2 className="text-[18px] font-black text-slate-900 leading-snug pr-8">
                      {title}
                    </h2>
                  </div>

                  {/* Fields */}
                  <div className="px-7 pt-5 pb-3 space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <div className={cn(
                        'flex items-center gap-3 border rounded-xl px-4 py-3 bg-slate-50 transition-all',
                        errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 focus-within:border-slate-900 focus-within:bg-white'
                      )}>
                        <User size={16} className="text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(e2 => ({ ...e2, name: '' })); }}
                          className="flex-1 text-sm font-medium text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-500 font-bold pl-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className={cn(
                        'flex items-center gap-3 border rounded-xl px-4 py-3 bg-slate-50 transition-all',
                        errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 focus-within:border-slate-900 focus-within:bg-white'
                      )}>
                        <Phone size={16} className="text-slate-400 shrink-0" />
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(e2 => ({ ...e2, phone: '' })); }}
                          className="flex-1 text-sm font-medium text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold pl-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Email <span className="text-slate-300 font-normal">(optional)</span>
                      </label>
                      <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus-within:border-slate-900 focus-within:bg-white transition-all">
                        <Mail size={16} className="text-slate-400 shrink-0" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="flex-1 text-sm font-medium text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Message <span className="text-slate-300 font-normal">(optional)</span>
                      </label>
                      <div className="flex items-start gap-3 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus-within:border-slate-900 focus-within:bg-white transition-all">
                        <MessageSquare size={16} className="text-slate-400 shrink-0 mt-0.5" />
                        <textarea
                          rows={3}
                          placeholder="Describe your requirements..."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          className="flex-1 text-sm font-medium text-slate-900 bg-transparent outline-none resize-none placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-7 pb-7 pt-3">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className={cn(
                        'w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg',
                        submitting
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.98] shadow-slate-900/20'
                      )}
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <><Send size={15} /> Send Enquiry</>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-medium mt-3">
                      🔒 Your details are safe with us
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* ---- THANK YOU VIEW ---- */
                <motion.div
                  key="thankyou"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative min-h-[420px] flex flex-col items-center justify-center px-8 py-12 text-center overflow-hidden"
                >
                  <ConfettiCanvas />

                  {/* Animated Check */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.35, type: 'spring', stiffness: 400 }}
                    >
                      <CheckCircle size={44} className="text-emerald-500" fill="currentColor" style={{ color: '#10b981' }} />
                    </motion.div>
                  </motion.div>

                  {/* Floating emojis */}
                  {['🎉', '✨', '🥳', '💫', '🎊'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 0, x: (i - 2) * 28 }}
                      animate={{ opacity: [0, 1, 1, 0], y: -80 + (i % 2) * -20 }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 1.6, ease: 'easeOut' }}
                      className="absolute text-2xl select-none pointer-events-none"
                      style={{ top: '38%', left: `${18 + i * 16}%` }}
                    >
                      {emoji}
                    </motion.span>
                  ))}

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="relative z-10 space-y-2 mb-8"
                  >
                    <h3 className="text-2xl font-black text-slate-900">Thank You! 🙏</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">
                      Your enquiry has been sent successfully.<br />
                      Our team will reach out to you shortly.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    onClick={onClose}
                    className="relative z-10 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl text-sm uppercase tracking-wider transition-all active:scale-[0.97] shadow-lg"
                  >
                    Done
                  </motion.button>

                  {/* Auto-close hint */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative z-10 text-[10px] text-slate-300 font-medium mt-3"
                  >
                    Closing automatically in a few seconds...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
