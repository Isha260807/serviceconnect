import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import landingPagebanner from '../../assets/landingPagebanner.png';
import certService from '../../assets/cert_service.png';
import certAchievement from '../../assets/cert_achievement.png';
import certIso from '../../assets/cert_iso.png';
import handshake from '../../assets/handshake.png';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Award, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Download, 
  FileText, 
  Send, 
  Briefcase, 
  Calendar, 
  Heart, 
  Share2, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  MessageSquare,
  X
} from 'lucide-react';

const getSubCategoryProducts = (subName) => {
  const lower = subName.toLowerCase();
  if (lower.includes('fabric')) {
    return [
      { name: "Organic Premium Cotton Canvas", price: "₹180 / Meter", moq: "500 Meters", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400", desc: "100% certified organic cotton canvas fabric, 320 GSM, perfect for bags and home decor." },
      { name: "Pure Silk Satin Fabric", price: "₹450 / Meter", moq: "200 Meters", img: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=400", desc: "Glossy, smooth mulberry silk satin, ideal for high-end fashion garments and bridal wear." },
      { name: "Linen Viscose Slub Blend", price: "₹220 / Meter", moq: "300 Meters", img: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=400", desc: "Breathable linen blended with viscose for a soft drape, 180 GSM, suitable for summer shirts." },
      { name: "Heavy Duty Denim Fabric 14oz", price: "₹190 / Meter", moq: "1000 Meters", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400", desc: "Rugged and durable raw indigo denim, 100% cotton, perfect for premium jeans and jackets." },
      { name: "Premium Polyester Viscose Suiting", price: "₹260 / Meter", moq: "400 Meters", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400", desc: "Wrinkle-resistant suiting fabric, smooth drape and high durability for corporate wear." },
      { name: "Pure Khadi Handspun Cotton", price: "₹150 / Meter", moq: "100 Meters", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400", desc: "Authentic handspun and handwoven cotton, highly breathable, supporting rural artisans." },
      { name: "Stretchable Cotton Spandex Twill", price: "₹210 / Meter", moq: "500 Meters", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400", desc: "Comfortable stretch twill fabric, 240 GSM, excellent recovery, ideal for trousers." },
      { name: "Jacquard Brocade Banarasi Silk", price: "₹650 / Meter", moq: "150 Meters", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400", desc: "Traditional Banarasi weave with golden zari work, ideal for premium ethnic designer wear." }
    ];
  } else if (lower.includes('bath')) {
    return [
      { name: "Hotel Grade Cotton Towel Set", price: "₹350 / Set", moq: "100 Sets", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", desc: "600 GSM double loop combed cotton towels. Set includes bath towel, hand towel, and washcloth." },
      { name: "Luxury Waffle Weave Bathrobe", price: "₹850 / Piece", moq: "50 Pieces", img: "https://images.unsplash.com/photo-1563163447-107627b105e8?auto=format&fit=crop&q=80&w=400", desc: "Lightweight and absorbent unisex waffle bathrobe, made with 100% premium Turkish cotton." },
      { name: "Anti-Slip Microfiber Bath Mat", price: "₹180 / Piece", moq: "200 Pieces", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400", desc: "Ultra-soft absorbent microfiber mat with high-quality TPR backing to prevent slipping." },
      { name: "Organic Bamboo Bath Towels", price: "₹290 / Piece", moq: "150 Pieces", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400", desc: "Naturally hypoallergenic and antibacterial bamboo-cotton blend towel, 550 GSM." }
    ];
  } else if (lower.includes('home')) {
    return [
      { name: "Embroidered Cotton Cushion Cover", price: "₹120 / Piece", moq: "100 Pieces", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400", desc: "Hand-embroidered designer cushion covers in vibrant ethnic motifs, size 16x16 inches." },
      { name: "Linen Sheer Living Room Curtains", price: "₹650 / Pair", moq: "50 Pairs", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400", desc: "Elegant linen curtains that softly filter light while maintaining daytime privacy." },
      { name: "Hand-Tufted Wool Area Rug", price: "₹2,500 / Piece", moq: "10 Pieces", img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=400", desc: "Geometric pattern wool rug, handmade by skilled artisans, size 4x6 feet." },
      { name: "Jacquard Sofa Throw Blanket", price: "₹450 / Piece", moq: "50 Pieces", img: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&q=80&w=400", desc: "Soft woven throw with decorative fringes, ideal for living room styling and comfort." }
    ];
  } else if (lower.includes('kitchen')) {
    return [
      { name: "Premium Cotton Kitchen Apron", price: "₹95 / Piece", moq: "200 Pieces", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400", desc: "Adjustable neck strap apron with front pocket, heavy-duty twill fabric." },
      { name: "Checkered Cotton Tea Towels (Pack of 3)", price: "₹110 / Pack", moq: "150 Packs", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400", desc: "Highly absorbent waffle/flat weave towels, perfect for drying dishes and hands." },
      { name: "Silicone Heat Resistant Oven Mitts", price: "₹150 / Pair", moq: "100 Pairs", img: "https://images.unsplash.com/photo-1590794056226-79ef3a814c99?auto=format&fit=crop&q=80&w=400", desc: "Textured non-slip grip mitts with quilted cotton lining, heat protection up to 250°C." },
      { name: "Linen Dining Table Runner", price: "₹240 / Piece", moq: "80 Pieces", img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=400", desc: "Natural linen color table runner, 14x72 inches, perfect for rustic and modern dining setups." }
    ];
  } else if (lower.includes('bed')) {
    return [
      { name: "300 TC Satin Stripe Bed Sheets", price: "₹650 / Set", moq: "50 Sets", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=400", desc: "Luxury hotel linen double bed sheet with 2 matching pillow covers, mercerized finish." },
      { name: "All-Season Microfiber Comforter", price: "₹950 / Piece", moq: "30 Pieces", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400", desc: "Hypoallergenic down-alternative filling, box stitched to prevent shifting, reversible." },
      { name: "Quilted Cotton Mattress Protector", price: "₹450 / Piece", moq: "100 Pieces", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400", desc: "100% waterproof breathable membrane top layer, elastic fitted skirt style." },
      { name: "Orthopedic Memory Foam Pillow", price: "₹550 / Piece", moq: "50 Pieces", img: "https://images.unsplash.com/photo-1612152605347-f93296cb657d?auto=format&fit=crop&q=80&w=400", desc: "Ergonomic contour design for neck pain relief, premium washable bamboo fabric cover." }
    ];
  } else {
    return [
      { name: `Premium B2B ${subName} Solution 1`, price: "Contact for Quote", moq: "Bulk", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400", desc: `High-quality specialized solution tailored for business needs in ${subName} sector.` },
      { name: `Industrial Grade ${subName} Unit 2`, price: "Contact for Quote", moq: "Bulk", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400", desc: `Manufactured with premium quality materials conforming to international standards.` },
      { name: `Customized ${subName} Package 3`, price: "Contact for Quote", moq: "Bulk", img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400", desc: `Fully customizable configuration with professional training and deployment support.` }
    ];
  }
};

const CategoryDetails = () => {
  const { categoryName, id, subCategoryName } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [feedTab, setFeedTab] = useState('All');
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', time: '' });
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFeedPost, setSelectedFeedPost] = useState(null);

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackForm({ name: '', phone: '', time: '' });
      setShowCallbackModal(false);
    }, 2500);
  };

  // Retrieve current category data
  const normalizedCategory = pathname.includes('/hotel/') ? 'hotels' : (categoryName?.toLowerCase() || 'default');
  const categoryList = CATEGORIES_DATA[normalizedCategory] || CATEGORIES_DATA.default;
  const item = categoryList.find(x => x.id === id) || categoryList[0] || CATEGORIES_DATA.default[0];

  // Dynamically generate B2B details based on category context
  const getB2BData = () => {
    switch(normalizedCategory) {
      case 'gym':
        return {
          tagline: "Building Strength. Transforming Lives.",
          businessType: "Fitness & Wellness Centre",
          established: "2014",
          employees: "50 - 100",
          turnover: "INR 5 - 10 Crore",
          aboutText: `${item.name} is Mumbai's premier wellness and strength training network. We provide world-class equipment, custom diet coaching, and expert physical training programs designed to help individuals and corporations achieve their health goals. With a focus on hygiene, modern biomechanics, and holistic conditioning, we have become a trusted partner for fitness enthusiasts across Maharashtra.`,
          products: [
            { name: "Premium Cardio Zone", count: "25+ Stations", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400" },
            { name: "Free Weights & Strength", count: "10+ Tons Equipment", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400" },
            { name: "Zumba & Yoga Studios", count: "8 Daily Batches", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400" },
            { name: "Personal Training Lounge", count: "1-on-1 Sessions", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400" },
            { name: "Nutrition & Supplement Bar", count: "100% Organic Products", img: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=400" }
          ],
          services: [
            "Corporate Wellness Programs",
            "Certified Fitness Coaching",
            "Diet & Body Composition Analysis",
            "Functional Crossfit Training",
            "Locker & Shower Facilities"
          ],
          franchiseDetails: [
            "Low Franchise Fee & Entry Costs",
            "High Return on Investment (ROI)",
            "Marketing & Operational Support",
            "Exclusive Territorial Rights"
          ],
          futurePlans: [
            "Expanding to 5 new locations in Navi Mumbai",
            "Launching a dedicated mobile fitness app",
            "Hosting regional bodybuilding championships",
            "Collaborating with corporate healthcare providers"
          ]
        };
      case 'restaurants':
        return {
          tagline: "Crafting Flavours. Creating Memories.",
          businessType: "Premium Casual & Fine Dining Chain",
          established: "2001",
          employees: "100 - 150",
          turnover: "INR 15 - 25 Crore",
          aboutText: `${item.name} is celebrated for its gourmet creations and signature hospitality. Serving authentic cuisines curated by master chefs, we prioritize fresh ingredients, beautiful presentation, and a warm dining atmosphere. Over the last two decades, our branches have hosted thousands of family gatherings, corporate lunches, and culinary festivals.`,
          products: [
            { name: "Signature Pizza & Pasta", count: "30+ Varieties", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400" },
            { name: "Exotic Desserts", count: "15+ Chefs Special", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400" },
            { name: "Artisanal Mocktails", count: "20+ Mocktail options", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400" },
            { name: "Corporate Lunch Platters", count: "Customizable Menu", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" },
            { name: "Catering & Banquet Setup", count: "Up to 500 Guests", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400" }
          ],
          services: [
            "Chef-Curated Fine Dining",
            "Premium Catering Services",
            "Private Dining & Events Setup",
            "Express Home Delivery",
            "Gourmet Bakery Counters"
          ],
          franchiseDetails: [
            "Established Brand Equity",
            "Chef Training & Kitchen Systems",
            "Central Supply Chain Support",
            "Highly Profitable Unit Economics"
          ],
          futurePlans: [
            "Opening 3 new fine dining outlets",
            "Introducing vegan & organic food menus",
            "Launching cooking workshops with guest chefs",
            "Partnering with green packaging suppliers"
          ]
        };
      case 'beauty':
        return {
          tagline: "Enhancing Beauty. Elevating Confidence.",
          businessType: "Luxury Hair & Skincare Salon",
          established: "2018",
          employees: "30 - 50",
          turnover: "INR 3 - 5 Crore",
          aboutText: `${item.name} offers premium grooming, bridal, and therapeutic wellness solutions. With specialized aesthetic treatments and professional stylists, we bring you the latest global beauty trends in an environment designed for absolute relaxation. We use only premium, dermatologically tested, organic products to ensure your hair and skin shine with health.`,
          products: [
            { name: "Bridal Makeup Studio", count: "500+ Happy Brides", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400" },
            { name: "Hair Styling & Spa", count: "L'Oreal Certified", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400" },
            { name: "Advanced Skincare Facials", count: "Organic & Hydrafacials", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" },
            { name: "Luxury Manicure/Pedicure", count: "Relaxing Spa therapy", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400" },
            { name: "Organic Skin Essentials", count: "100% Vegan formulas", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400" }
          ],
          services: [
            "Professional Bridal Consultation",
            "Organic Skin Therapeutics",
            "Creative Hair Color & Cuts",
            "Rejuvenating Body Massages",
            "Nail Art & Extension Lounges"
          ],
          franchiseDetails: [
            "Fully Configured Salon Interiors",
            "Direct Sourcing of Premium Brands",
            "Comprehensive Stylist Bootcamps",
            "Fast Payback Period"
          ],
          futurePlans: [
            "Expanding beauty chain into Pune & Surat",
            "Launching our private organic skincare label",
            "Setting up a beauty training academy",
            "Partnering with leading celebrity designers"
          ]
        };
      case 'hotels':
        return {
          tagline: "Your Comfort. Our Priority.",
          businessType: "Luxury & Business Hotel Chain",
          established: "2010",
          employees: "80 - 120",
          turnover: "INR 12 - 20 Crore",
          aboutText: `${item.name} is a premier hospitality provider in Mumbai, committed to offering world-class accommodations, state-of-the-art business facilities, and unmatched personal care. From executive suites to grand banquets, we ensure your stay is comfortable and productive.`,
          products: [
            { name: "Executive Suite Rooms", count: "30+ Rooms", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400" },
            { name: "Premium Deluxe Rooms", count: "50+ Rooms", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400" },
            { name: "Conference & Banquets", count: "3 Hall Options", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400" },
            { name: "Roof-Top Restaurant", count: "Global Cuisine", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" },
            { name: "Wellness Spa & Gym", count: "24/7 Access", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400" }
          ],
          services: [
            "24-Hour Room Service",
            "Executive Business Lounge",
            "Valet Parking & Car Rental",
            "Express Laundry & Dry Cleaning",
            "Airport Pickup & Drop"
          ],
          franchiseDetails: [
            "Low Royalty Fees",
            "Central Booking & OTA Support",
            "Staff Training & SOP Systems",
            "Exclusivity in Location Zone"
          ],
          futurePlans: [
            "Opening 4 new business hotels in metro cities",
            "Introducing 100% eco-friendly zero-waste rooms",
            "Launching loyalty reward mobile app",
            "Expanding rooftop gourmet dining concepts"
          ]
        };
      default: // default/shopping
        return {
          tagline: "Delivering Quality. Connecting Worlds.",
          businessType: "Exporter & Manufacturer",
          established: "2012",
          employees: "51 - 100",
          turnover: "INR 25 - 50 Crore",
          aboutText: `${item.name} is a trusted name in premium textiles, home furnishings, and organic fabrics. With state-of-the-art manufacturing facilities, a skilled workforce, and a customer-first approach, we design and deliver superior quality products across the globe. We prioritize durability, soft textures, and sustainable dyeing techniques to offer products that feel premium.`,
          products: [
            { name: "Fabrics", count: "120+ Products", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" },
            { name: "Bath Products", count: "80+ Products", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" },
            { name: "Home Textiles", count: "150+ Products", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400" },
            { name: "Kitchen Textiles", count: "60+ Products", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400" },
            { name: "Bed Linen", count: "90+ Products", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=400" }
          ],
          services: [
            "Custom Textile OEM Manufacturing",
            "Bulk fabric dyeing & printing",
            "Home Decor stitching & design",
            "Global logistics & distribution",
            "Certified organic cotton sourcing"
          ],
          franchiseDetails: [
            "Low Franchise Fee & Entry Costs",
            "High Profit Margin Opportunities",
            "Marketing & Supply Chain Support",
            "Exclusive Territorial Rights"
          ],
          futurePlans: [
            "Expanding production capacity by 40%",
            "Opening 5 new distribution hubs in Europe",
            "Launching 100% biodegradable product range",
            "Partnering with leading global retail chains"
          ]
        };
    }
  };

  const b2b = getB2BData();

  const activeSubCategory = subCategoryName 
    ? b2b.products.find(p => p.name.toLowerCase() === decodeURIComponent(subCategoryName).toLowerCase())
    : null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryForm({ name: '', phone: '', email: '', message: '' });
      setShowInquiryModal(false);
    }, 2000);
  };

  return (
    <UserLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
        <style dangerouslySetInnerHTML={{ __html: `
          .b2b-theme-btn-red {
            background-color: #da3332 !important;
          }
          .b2b-theme-btn-red:hover {
            opacity: 0.9 !important;
          }
          section {
            scroll-margin-top: 96px;
          }
          .b2b-hero-banner {
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 55%, rgba(255, 255, 255, 0) 100%), url(${landingPagebanner}) !important;
            background-position: 70% center;
          }
          @media (min-width: 1024px) {
            .b2b-hero-banner {
              background-image: url(${landingPagebanner}) !important;
              background-position: center;
            }
          }
        ` }} />
        
        {/* HERO SECTION / BANNER */}
        <div className="max-w-[1500px] mx-auto px-0 sm:px-4 md:px-8 pt-14 sm:pt-20 md:pt-24 pb-2">
          <div 
            className="relative min-h-[480px] bg-cover flex items-center rounded-none sm:rounded-xl overflow-hidden shadow-sm border-x-0 sm:border border-slate-200 b2b-hero-banner"
          >
            <div className="w-full z-10 py-12 px-3 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content Overlay Block */}
              <div className="lg:col-span-8 text-slate-800 space-y-6">
                <h1 className="text-2xl md:text-5xl font-bold md:font-black tracking-tight leading-tight text-slate-900 font-display">
                  {b2b.tagline.split('.')[0]}. <br />
                  <span className="text-[#da3332] font-bold md:font-black">{b2b.tagline.split('.')[1] || ''}</span>
                </h1>
                
                <p className="text-slate-600 text-xs md:text-base font-normal md:font-medium max-w-xl leading-relaxed">
                  Welcome to <strong className="text-slate-900 font-semibold md:font-bold">{item.name}</strong>, a leading exporter and manufacturer of premium services.
                </p>

                {/* Badges Section */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-slate-700 text-[11px] md:text-xs font-medium md:font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Award className="text-slate-500 shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>ISO 9001:2015 Certified</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="text-slate-500 shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Verified Supplier <span className="text-[9px] text-white bg-emerald-600 px-1 rounded-full inline-flex items-center justify-center font-bold">✓</span></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="text-slate-500 shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{item.yearsInBusiness || 12}+ Years of Excellence</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="text-slate-500 shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Export to 50+ Countries</span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button 
                    onClick={() => setShowInquiryModal(true)}
                    className="bg-[#da3332] hover:bg-[#c22d2c] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-200 shadow-sm"
                  >
                    <Send size={15} /> Send Inquiry
                  </button>
                  <button 
                    onClick={() => alert("Downloading Profile Catalog...")}
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-6 py-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-200 shadow-sm"
                  >
                    <Download size={15} /> Download Profile
                  </button>
                  <a 
                    href={`https://wa.me/${item.phone || '919876543210'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-[#f0fdf4] text-[#25d366] border border-[#25d366] font-bold px-6 py-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.07 1.01 11.993 1.01c-5.462 0-9.902 4.437-9.907 9.871-.001 1.768.463 3.49 1.343 5.021l-.986 3.6 3.698-.971zm11.233-6.52c-.3-.15-1.771-.875-2.046-.975-.276-.102-.476-.152-.676.152-.2.301-.776.975-.951 1.176-.175.201-.35.226-.65.076-1.029-.514-1.738-.915-2.427-2.099-.18-.31.18-.287.515-.953.076-.15.038-.282-.019-.382-.056-.1-.476-1.143-.65-1.564-.17-.412-.34-.354-.476-.361-.125-.007-.27-.008-.413-.008a.792.792 0 00-.575.27c-.201.225-.765.748-.765 1.824 0 1.077.784 2.115.893 2.266.11.15 1.542 2.355 3.738 3.3.522.224.93.359 1.247.46.525.167.973.143 1.338.089.407-.061 1.772-.726 2.021-1.43.25-.704.25-1.306.175-1.43-.075-.124-.275-.2-.575-.35z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Stats Card at bottom right */}
            <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg border border-slate-100 p-4 md:p-6 hidden lg:flex items-center gap-8 z-20">
              <div className="text-center min-w-[100px]">
                <p className="text-2xl font-extrabold text-slate-900">{item.yearsInBusiness || 12}+</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">Years in Business</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center min-w-[100px]">
                <p className="text-2xl font-extrabold text-slate-900">{item.reviewsCount || 500}+</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">Happy Clients</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center min-w-[100px]">
                <p className="text-2xl font-extrabold text-slate-900">120+</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">Products</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center min-w-[100px]">
                <p className="text-2xl font-extrabold text-slate-900">50+</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">Countries Served</p>
              </div>
            </div>
          </div>
          
          {/* Mobile visible stats card to match tablet/mobile experiences */}
          <div className="mt-4 bg-white rounded-lg shadow-sm border border-slate-100 p-4 grid grid-cols-2 gap-4 lg:hidden">
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <p className="text-xl font-extrabold text-slate-900">{item.yearsInBusiness || 12}+</p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Years in Business</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <p className="text-xl font-extrabold text-slate-900">{item.reviewsCount || 500}+</p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Happy Clients</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <p className="text-xl font-extrabold text-slate-900">120+</p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Products</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <p className="text-xl font-extrabold text-slate-900">50+</p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Countries Served</p>
            </div>
          </div>
        </div>

        {/* DUAL COLUMN MAIN LAYOUT */}
        <div className="max-w-[1500px] mx-auto px-0 sm:px-4 md:px-8 pt-2 pb-10 md:pt-4 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* LEFT MAIN COLUMN */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ABOUT US */}
            <section id="about" className="bg-white p-4 md:p-6 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 mb-4 md:mb-6">
                {/* Left Text */}
                <div className="flex-1 space-y-2.5 md:space-y-3.5">
                  <div className="relative pb-1">
                    <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">About Us</h2>
                    <div className="absolute bottom-0 left-0 w-12 md:w-16 h-[3px] bg-[#da3332]" />
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {b2b.aboutText}
                  </p>
                  <div className="pt-0.5">
                    <button 
                      onClick={() => setShowReadMoreModal(true)}
                      className="text-[#da3332] hover:text-[#c22d2c] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Video Placeholder */}
                <div className="w-full md:w-[260px] shrink-0">
                  <div 
                    className="relative aspect-video rounded-lg overflow-hidden border border-slate-150 shadow-sm group cursor-pointer bg-slate-100"
                    onClick={() => setShowVideoModal(true)}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600" 
                      alt="Company Office"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-slate-900 ml-0.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-2.5 pt-5">
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider">Company Overview</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid of Business Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-slate-100 pt-6 mt-2">
                <div className="space-y-1.5 md:border-r border-slate-100 pr-2 last:border-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Building2 size={12} className="text-slate-400" /> Business Type
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{b2b.businessType}</p>
                </div>

                <div className="space-y-1.5 md:border-r border-slate-100 px-2 last:border-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" /> Year of Establishment
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{b2b.established}</p>
                </div>

                <div className="space-y-1.5 md:border-r border-slate-100 px-2 last:border-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Users size={12} className="text-slate-400" /> No. of Employees
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{b2b.employees}</p>
                </div>

                <div className="space-y-1.5 md:border-r border-slate-100 px-2 last:border-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <TrendingUp size={12} className="text-slate-400" /> Annual Turnover
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{b2b.turnover}</p>
                </div>

                <div className="space-y-1.5 px-2 last:border-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Award size={12} className="text-slate-400" /> GST Number
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{item.gstin || '27AAAPU3195L'}</p>
                </div>
              </div>
            </section>

            {/* OUR PRODUCTS */}
            <section id="products" className="bg-white p-4 sm:p-5 md:p-6 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                <h2 className="text-md font-bold text-slate-900">Our Products</h2>
                <span 
                  onClick={() => navigate(`/category/${categoryName}/${id}/${encodeURIComponent(b2b.products[0].name)}`)}
                  className="text-xs font-semibold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-1"
                >
                  View All Products <ArrowRight size={12} />
                </span>
              </div>

              {/* Horizontal Scroll on Mobile, Grid on Desktop */}
              <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-3 pb-2 md:pb-0 no-scrollbar snap-x snap-mandatory">
                {b2b.products.map((prod, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate(`/category/${categoryName}/${id}/${encodeURIComponent(prod.name)}`)}
                    className="w-[160px] min-w-[160px] md:w-auto md:min-w-0 h-[210px] bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group cursor-pointer snap-start shrink-0"
                  >
                    <div className="h-32 overflow-hidden relative rounded-md bg-white">
                      <img 
                        src={prod.img} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#da3332]/0 group-hover:bg-[#da3332]/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#da3332] text-[9px] font-black px-2.5 py-1 rounded-full shadow">View Products</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-tight">{prod.name}</h4>
                      <p className="text-[9px] text-slate-400 font-medium">{prod.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* THREE-COLUMN: SERVICES, FRANCHISE & FUTURE PLANS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Our Services */}
              <section 
                id="services" 
                onClick={() => navigate(`/category/${categoryName}/${id}/services`)}
                className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0076d7]/35 cursor-pointer group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <h2 className="text-sm font-extrabold text-slate-900 font-display">Our Services</h2>
                    <span 
                      onClick={(e) => { e.stopPropagation(); navigate(`/category/${categoryName}/${id}/services`); }}
                      className="text-[10px] font-bold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-0.5"
                    >
                      View All <ArrowRight size={10} />
                    </span>
                  </div>
                  <div className="space-y-3.5">
                    {[
                      { text: "Manufacturing Excellence", icon: (
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 20V8l-6-4-6 4-6-4v16h18z"/><path d="M14 20v-6h-4v6"/></svg>
                      )},
                      { text: "OEM & Private Label", icon: (
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      )},
                      { text: "Quality Control", icon: (
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
                      )},
                      { text: "Packaging & Labeling", icon: (
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      )},
                      { text: "Global Logistics Support", icon: (
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      )}
                    ].map((serv, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-slate-600 font-normal">
                        <div className="p-1.5 bg-blue-50 rounded-md shrink-0">
                          {serv.icon}
                        </div>
                        <span>{serv.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Card 2: Franchise Opportunity */}
              <section 
                id="franchise" 
                onClick={() => navigate(`/category/${categoryName}/${id}/franchise`)}
                className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 flex flex-col justify-between shadow-sm relative overflow-hidden hover:shadow-md hover:border-[#da3332]/35 cursor-pointer group transition-all"
              >
                <div className="space-y-3.5 z-10 relative">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h2 className="text-sm font-extrabold text-slate-900 font-display">Franchise Opportunity</h2>
                    <span 
                      onClick={(e) => { e.stopPropagation(); navigate(`/category/${categoryName}/${id}/franchise`); }}
                      className="text-[10px] font-bold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-0.5"
                    >
                      View Details <ArrowRight size={10} />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug font-normal">
                    Partner with us and grow your business with a trusted global brand.
                  </p>
                  
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-2 flex-1">
                      {[
                        "Low Investment",
                        "High Profit Potential",
                        "Marketing & Operational Support",
                        "Exclusive Territory Rights"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                          <div className="p-0.5 bg-rose-50 rounded-full shrink-0">
                            <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Circular Shake Hands Graphic Badge */}
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center shrink-0 self-center shadow-inner border border-rose-100 overflow-hidden">
                      <img 
                        src={handshake} 
                        alt="Handshake" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/category/${categoryName}/${id}/franchise`); }}
                    className="border border-[#da3332] hover:bg-rose-50 text-[#da3332] font-extrabold px-5 py-1.5 rounded-lg text-[10px] transition-all"
                  >
                    Apply for Franchise
                  </button>
                </div>
              </section>

              {/* Card 3: Our Future Plans */}
              <section 
                id="future-plans" 
                onClick={() => navigate(`/category/${categoryName}/${id}/future-plans`)}
                className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px] hover:shadow-md hover:border-[#0076d7]/35 cursor-pointer group transition-all"
              >
                <div className="space-y-3.5 z-10">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h2 className="text-sm font-extrabold text-slate-900 font-display">Our Future Plans</h2>
                    <span 
                      onClick={(e) => { e.stopPropagation(); navigate(`/category/${categoryName}/${id}/future-plans`); }}
                      className="text-[10px] font-bold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-0.5"
                    >
                      View Details <ArrowRight size={10} />
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Expanding production capacity",
                      "New product range launches",
                      "Strengthening global presence",
                      "Sustainable & eco-friendly initiatives"
                    ].map((plan, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 font-normal">
                        <div className="p-0.5 bg-blue-50 rounded-md shrink-0">
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          </svg>
                        </div>
                        <span className="leading-tight">{plan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graph Illustration bottom right */}
                <div className="absolute bottom-2 right-2 opacity-90 pointer-events-none z-0">
                  <svg className="w-20 h-16 opacity-90" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Smooth curved arrow */}
                    <path d="M 25 50 Q 55 45 76 22" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M 68 24 L 77 21 L 75 30" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    
                    {/* Bar chart bars */}
                    <rect x="35" y="68" width="6" height="12" rx="0.5" fill="#bfdbfe" stroke="none" />
                    <rect x="45" y="58" width="6" height="22" rx="0.5" fill="#93c5fd" stroke="none" />
                    <rect x="55" y="46" width="6" height="34" rx="0.5" fill="#60a5fa" stroke="none" />
                    <rect x="65" y="32" width="6" height="48" rx="0.5" fill="#3b82f6" stroke="none" />
                    <rect x="75" y="16" width="6" height="64" rx="0.5" fill="#1d4ed8" stroke="none" />
                  </svg>
                </div>
              </section>

            </div>

            {/* TRADE FEED (SOCIAL UPDATES) */}
            <section id="trade-feed" className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
                <h2 className="text-sm font-extrabold text-slate-900 font-display">Trade Feed</h2>
                <span className="text-[10px] font-bold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-0.5">
                  View All <ArrowRight size={10} />
                </span>
              </div>

              {/* Feed Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-100 pb-2 mb-4 overflow-x-auto no-scrollbar">
                {['All Updates', 'Company Updates', 'Product Updates', 'Exhibitions', 'Achievements'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setFeedTab(tab)}
                    className={`pb-1 text-xs font-bold transition-all relative whitespace-nowrap ${
                      (feedTab === tab || (feedTab === 'All' && tab === 'All Updates')) 
                        ? "text-[#da3332] border-b-2 border-[#da3332]" 
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Feed Content Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { 
                    title: "Participating in Heimtextil Frankfurt 2024", 
                    desc: "We are excited to showcase our latest collection.", 
                    date: "2d ago", 
                    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300", 
                    likes: 24, 
                    comments: 5,
                    category: "Exhibitions"
                  },
                  { 
                    title: "New Organic Cotton Collection Launched", 
                    desc: "Eco-friendly, sustainable & premium quality.", 
                    date: "5d ago", 
                    img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300", 
                    likes: 18, 
                    comments: 3,
                    category: "Product Updates"
                  },
                  { 
                    title: "Succesful Completion of Dubai Trade Show", 
                    desc: "Great response from global buyers.", 
                    date: "1w ago", 
                    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=300", 
                    likes: 32, 
                    comments: 7,
                    category: "Exhibitions"
                  },
                  { 
                    title: "New Shipment Dispatched to Germany", 
                    desc: "Ensuring on-time delivery with best quality.", 
                    date: "1w ago", 
                    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=300", 
                    likes: 20, 
                    comments: 2,
                    category: "Company Updates"
                  },
                  { 
                    title: "ISO 9001:2015 Certification Renewed", 
                    desc: "We continue to maintain the highest standards.", 
                    date: "2w ago", 
                    img: certIso, 
                    likes: 27, 
                    comments: 4,
                    category: "Achievements"
                  },
                  {
                    title: "Announcing Partnership with GreenTech Logistics",
                    desc: "Moving to 100% carbon-neutral shipping by end of 2026.",
                    date: "3d ago",
                    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300",
                    likes: 45,
                    comments: 12,
                    category: "Company Updates"
                  },
                  {
                    title: "Awarded 'Best Exporter of the Year' at Textile Awards",
                    desc: "Recognizing outstanding growth and high-grade quality exports.",
                    date: "3w ago",
                    img: certAchievement,
                    likes: 88,
                    comments: 21,
                    category: "Achievements"
                  },
                  {
                    title: "Upcoming Launch: Smart Temperature Regulating Fabric",
                    desc: "Introducing phase-change material fabric technology next month.",
                    date: "Just now",
                    img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=300",
                    likes: 54,
                    comments: 16,
                    category: "Product Updates"
                  }
                ].filter(post => {
                  if (feedTab === 'All' || feedTab === 'All Updates') return true;
                  return post.category === feedTab;
                }).map((post, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedFeedPost(post)}
                    className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow group min-h-[240px] cursor-pointer"
                  >
                    <div className="space-y-2.5">
                      <div className="h-28 overflow-hidden relative rounded-md bg-white">
                        <img 
                          src={post.img} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight min-h-[28px]">{post.title}</h4>
                        <p className="text-[9px] text-slate-500 font-normal line-clamp-2 leading-snug">{post.desc}</p>
                        <p className="text-[8px] font-semibold text-slate-400 mt-1">{post.date}</p>
                      </div>
                    </div>
                    
                    {/* Social Stats Footer */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-2 text-[9px] font-bold text-slate-500">
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500">
                        <svg className="w-3 h-3 text-slate-400 fill-current" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h12v2H6v-2zm0-8h12v2H6V5z"/></svg>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-0.5 hover:text-slate-800">
                        <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN (SIDEBAR) */}
          <div className="lg:col-span-3 space-y-4">
                       {/* GET IN TOUCH */}
            <section id="inquiryForm" className="bg-white p-4 sm:p-6 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 space-y-6">
              <div className="relative pb-2">
                <h3 className="text-md font-extrabold text-slate-900 font-display">Get in Touch</h3>
                <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#da3332]" />
              </div>

              {/* Contact List */}
              <div className="space-y-4 text-slate-700 text-xs font-semibold">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md text-slate-500 shrink-0">
                    <Phone size={13} />
                  </div>
                  <span className="truncate">{item.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md text-slate-500 shrink-0">
                    <Mail size={13} />
                  </div>
                  <span className="truncate">support@{item.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md text-slate-500 shrink-0">
                    <Globe size={13} />
                  </div>
                  <span className="truncate text-ellipsis overflow-hidden">www.{item.name.toLowerCase().replace(/\s+/g, '')}.bconnect.com</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md text-slate-500 shrink-0">
                    <MapPin size={13} />
                  </div>
                  <span className="leading-snug pt-0.5 text-slate-600 font-medium">{item.address || 'Mumbai, Maharashtra, India'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-3">
                <button 
                  onClick={() => setShowInquiryModal(true)}
                  className="bg-[#da3332] hover:bg-[#c22d2c] text-white font-bold py-2 rounded-lg text-[10px] md:text-[11px] tracking-wider transition-colors shadow-sm text-center"
                >
                  Send Inquiry
                </button>
                <button 
                  onClick={() => setShowCallbackModal(true)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2 rounded-lg text-[10px] md:text-[11px] tracking-wider transition-colors shadow-sm text-center"
                >
                  Request a call back
                </button>
              </div>

              {/* Follow Us */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Follow Us</p>
                <div className="flex items-center gap-2">
                  <a href="#" className="w-7 h-7 rounded-full bg-[#3b5998] hover:bg-[#3b5998]/90 flex items-center justify-center text-white transition-colors" title="Facebook">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="#" className="w-7 h-7 rounded-full bg-[#0077b5] hover:bg-[#0077b5]/90 flex items-center justify-center text-white transition-colors" title="LinkedIn">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                  </a>
                  <a href="#" className="w-7 h-7 rounded-full bg-[#d62976] hover:bg-[#d62976]/90 flex items-center justify-center text-white transition-colors" title="Instagram">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-7 h-7 rounded-full bg-[#ff0000] hover:bg-[#ff0000]/90 flex items-center justify-center text-white transition-colors" title="YouTube">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-slate-900">Certifications</h4>
                <span className="text-xs font-semibold text-[#0076d7] cursor-pointer hover:underline flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </span>
              </div>
              <div className="flex items-center justify-between gap-2.5">
                <div className="rounded-md overflow-hidden bg-slate-50 h-32 flex-1 relative shadow-sm border border-slate-100">
                  <img 
                    src={certService} 
                    alt="Certificate of Service"
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="rounded-md overflow-hidden bg-slate-50 h-32 flex-1 relative shadow-sm border border-slate-100">
                  <img 
                    src={certAchievement} 
                    alt="Certificate of Achievement"
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="rounded-md overflow-hidden bg-slate-50 h-32 flex-1 relative shadow-sm border border-slate-100">
                  <img 
                    src={certIso} 
                    alt="ISO Certified"
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#da3332]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              </div>
            </section>

            {/* BROCHURE & CATALOG */}
            <section className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 font-display">Brochure & Catalog</h4>
              <div className="space-y-3">
                <div 
                  onClick={() => alert("Downloading Company Profile...")}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 flex items-center justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded-md shrink-0 text-red-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 leading-tight">Company Profile</p>
                      <p className="text-[9px] font-semibold text-slate-400 mt-0.5">Download PDF</p>
                    </div>
                  </div>
                  <Download size={14} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>

                <div 
                  onClick={() => alert("Downloading Product Catalog...")}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 flex items-center justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded-md shrink-0 text-red-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 leading-tight">Product Catalog</p>
                      <p className="text-[9px] font-semibold text-slate-400 mt-0.5">Download PDF</p>
                    </div>
                  </div>
                  <Download size={14} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>
              </div>
            </section>

            {/* LOOKING FOR DISTRIBUTORS */}
            <section className="bg-white p-4 sm:p-5 rounded-none sm:rounded-lg border-x-0 sm:border border-slate-200 space-y-4 text-left">
              <h4 className="text-sm font-extrabold text-[#0076d7] font-display">Looking for Distributors</h4>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-normal text-slate-500 leading-relaxed max-w-[140px]">
                  Join our global network of successful partners.
                </p>
                {/* Light blue outline map graphic */}
                <div className="shrink-0 text-slate-200 opacity-80">
                  <svg className="w-16 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                  </svg>
                </div>
              </div>
              <button 
                onClick={() => alert("Thank you for your interest. We will contact you soon.")}
                className="bg-[#0076d7] hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-lg text-[10px] w-full text-center transition-colors shadow-sm"
              >
                Become a Distributor
              </button>
            </section>

          </div>
        </div>

        {/* BOTTOM STATS RIBBON */}
        <div className="max-w-[1500px] mx-auto px-0 sm:px-4 md:px-8 pb-10">
          <div className="bg-white border-x-0 sm:border border-slate-200 rounded-none sm:rounded-lg shadow-sm p-4 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-y-4">
            <div className="bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none flex flex-col md:flex-row items-center gap-2 md:gap-3.5 justify-center md:border-r border-slate-150 pr-2 text-center md:text-left">
              <div className="text-[#0076d7]">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-base md:text-lg font-black text-slate-800">50+</p>
                <p className="text-[10px] font-semibold text-slate-400">Countries Exported</p>
              </div>
            </div>

            <div className="bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none flex flex-col md:flex-row items-center gap-2 md:gap-3.5 justify-center md:border-r border-slate-150 pr-2 text-center md:text-left">
              <div className="text-[#0076d7]">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-base md:text-lg font-black text-slate-800">500+</p>
                <p className="text-[10px] font-semibold text-slate-400">Happy Clients</p>
              </div>
            </div>

            <div className="bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none flex flex-col md:flex-row items-center gap-2 md:gap-3.5 justify-center md:border-r border-slate-150 pr-2 text-center md:text-left">
              <div className="text-[#0076d7]">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-base md:text-lg font-black text-slate-800">120+</p>
                <p className="text-[10px] font-semibold text-slate-400">Products</p>
              </div>
            </div>

            <div className="bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none flex flex-col md:flex-row items-center gap-2 md:gap-3.5 justify-center md:border-r border-slate-150 pr-2 text-center md:text-left">
              <div className="text-[#0076d7]">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-base md:text-lg font-black text-slate-800">100%</p>
                <p className="text-[10px] font-semibold text-slate-400">Quality Assured</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none flex flex-col md:flex-row items-center gap-2 md:gap-3.5 justify-center text-center md:text-left">
              <div className="text-[#0076d7]">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-base md:text-lg font-black text-slate-800">24/7</p>
                <p className="text-[10px] font-semibold text-slate-400">Customer Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* INQUIRY MODAL */}
        <AnimatePresence>
          {showInquiryModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4"
              onClick={(e) => { if (e.target === e.currentTarget) { setShowInquiryModal(false); setSubmitted(false); } }}
            >
              <motion.div 
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
              >
                {/* Red accent top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#da3332] to-[#e85c5b]" />

                {/* Close button */}
                <button 
                  onClick={() => { setShowInquiryModal(false); setSubmitted(false); }}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10"
                >
                  <X size={18} />
                </button>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* SUCCESS STATE */
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                      className="p-10 flex flex-col items-center text-center space-y-4"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', damping: 15, stiffness: 300 }}
                        className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        </svg>
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Inquiry Sent!</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Thank you! We have received your inquiry and will get back to you within <strong>15 minutes</strong>.
                        </p>
                      </div>
                      <button 
                        onClick={() => { setShowInquiryModal(false); setSubmitted(false); }}
                        className="mt-2 bg-[#da3332] hover:bg-[#c22d2c] text-white font-black px-10 py-3 rounded-xl text-sm transition-all shadow-md"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    /* FORM STATE */
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 space-y-4"
                    >
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">Send Inquiry</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Specify your requirements and we will contact you shortly</p>
                      </div>

                      <form onSubmit={handleInquirySubmit} className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Your Name *</label>
                            <input 
                              type="text" 
                              required
                              placeholder="Full name"
                              value={inquiryForm.name}
                              onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10 outline-none transition-all font-medium placeholder:text-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Mobile *</label>
                            <input 
                              type="tel" 
                              required
                              placeholder="+91 XXXXX XXXXX"
                              value={inquiryForm.phone}
                              onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10 outline-none transition-all font-medium placeholder:text-slate-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="name@company.com"
                            value={inquiryForm.email}
                            onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10 outline-none transition-all font-medium placeholder:text-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Requirement Details</label>
                          <textarea 
                            rows="3" 
                            placeholder="I am interested in... (quantity, specifications, delivery timeline)"
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10 outline-none transition-all resize-none font-medium placeholder:text-slate-300"
                          />
                        </div>

                        {/* Quick info chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Bulk Order', 'Sample Request', 'Price Quote', 'Custom Order'].map(chip => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => setInquiryForm({...inquiryForm, message: inquiryForm.message + (inquiryForm.message ? ', ' : '') + chip})}
                              className="text-[9px] font-bold border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full hover:border-[#da3332] hover:text-[#da3332] transition-colors"
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>

                        <button 
                          type="submit"
                          disabled={!inquiryForm.name || !inquiryForm.phone}
                          className="w-full bg-[#da3332] hover:bg-[#c22d2c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <Send size={14} />
                          Send Inquiry Now
                        </button>

                        <p className="text-center text-[9px] text-slate-400">
                          By submitting, you agree to our privacy policy. We will respond within <strong>15 minutes</strong>.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CALLBACK MODAL */}
        <AnimatePresence>
          {showCallbackModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
              onClick={(e) => { if (e.target === e.currentTarget) { setShowCallbackModal(false); setCallbackSubmitted(false); } }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden"
              >
                {/* Blue accent top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#0076d7] to-[#3b9de8]" />

                {/* Close button */}
                <button
                  onClick={() => { setShowCallbackModal(false); setCallbackSubmitted(false); }}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10"
                >
                  <X size={18} />
                </button>

                <AnimatePresence mode="wait">
                  {callbackSubmitted ? (
                    /* SUCCESS STATE */
                    <motion.div
                      key="cb-success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                      className="p-10 flex flex-col items-center text-center space-y-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', damping: 12, stiffness: 280 }}
                        className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center"
                      >
                        <Phone size={36} className="text-[#0076d7]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Call Scheduled!</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          We will call you back within <strong>15 minutes</strong>. Please keep your phone nearby.
                        </p>
                      </div>
                      <button
                        onClick={() => { setShowCallbackModal(false); setCallbackSubmitted(false); }}
                        className="mt-2 bg-[#0076d7] hover:bg-blue-700 text-white font-black px-10 py-3 rounded-xl text-sm transition-all shadow-md"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    /* FORM STATE */
                    <motion.div
                      key="cb-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                          <Phone size={18} className="text-[#0076d7]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-900">Request a Call Back</h3>
                          <p className="text-xs text-slate-400 mt-0.5">We'll call you back within 15 minutes</p>
                        </div>
                      </div>

                      <form onSubmit={handleCallbackSubmit} className="space-y-3 pt-1">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={callbackForm.name}
                            onChange={(e) => setCallbackForm({...callbackForm, name: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#0076d7] focus:ring-2 focus:ring-[#0076d7]/10 outline-none transition-all font-medium placeholder:text-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={callbackForm.phone}
                            onChange={(e) => setCallbackForm({...callbackForm, phone: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#0076d7] focus:ring-2 focus:ring-[#0076d7]/10 outline-none transition-all font-medium placeholder:text-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Preferred Time</label>
                          <select
                            value={callbackForm.time}
                            onChange={(e) => setCallbackForm({...callbackForm, time: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-[#0076d7] focus:ring-2 focus:ring-[#0076d7]/10 outline-none transition-all font-medium text-slate-600 bg-white"
                          >
                            <option value="">Select preferred time</option>
                            <option>As soon as possible</option>
                            <option>Morning (9 AM – 12 PM)</option>
                            <option>Afternoon (12 PM – 4 PM)</option>
                            <option>Evening (4 PM – 7 PM)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={!callbackForm.name || !callbackForm.phone}
                          className="w-full bg-[#0076d7] hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <Phone size={14} />
                          Request Call Back
                        </button>

                        <p className="text-center text-[9px] text-slate-400">
                          Our team will call you within <strong>15 minutes</strong> during business hours.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* READ MORE MODAL */}
        <AnimatePresence>
          {showReadMoreModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowReadMoreModal(false); }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Red accent top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#da3332] to-[#e85c5b] shrink-0" />

                {/* Close button */}
                <button
                  onClick={() => setShowReadMoreModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10"
                >
                  <X size={18} />
                </button>

                {/* Scrollable content */}
                <div className="p-6 md:p-8 overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                      <Building2 size={26} className="text-[#da3332]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{b2b.businessType} &bull; Est. {b2b.established}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">✓ Verified Supplier</span>
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">ISO 9001:2015</span>
                      </div>
                    </div>
                  </div>

                  {/* Full about text */}
                  <div className="mb-6">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#da3332] rounded-full inline-block" />
                      Company Overview
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{b2b.aboutText}</p>
                  </div>

                  {/* Business stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Business Type', value: b2b.businessType, icon: <Building2 size={14} /> },
                      { label: 'Established', value: b2b.established, icon: <Calendar size={14} /> },
                      { label: 'Employees', value: b2b.employees, icon: <Users size={14} /> },
                      { label: 'Annual Turnover', value: b2b.turnover, icon: <TrendingUp size={14} /> },
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-1">{stat.icon} <span className="text-[9px] font-black uppercase tracking-wider">{stat.label}</span></div>
                        <p className="text-xs font-extrabold text-slate-800 leading-tight">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Core services */}
                  <div className="mb-6">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#da3332] rounded-full inline-block" />
                      Core Services
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {b2b.services.map((s, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex gap-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => { setShowReadMoreModal(false); setShowInquiryModal(true); }}
                      className="flex-1 bg-[#da3332] hover:bg-[#c22d2c] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Send size={13} /> Send Inquiry
                    </button>
                    <button
                      onClick={() => setShowReadMoreModal(false)}
                      className="px-6 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIDEO MODAL */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowVideoModal(false); }}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black"
              >
                {/* Close button */}
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Video label */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80 bg-black/50 px-3 py-1 rounded-full">Company Overview</span>
                </div>

                {/* 16:9 YouTube embed */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                    title="Company Overview Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRODUCT DETAIL MODAL - RIGHT SIDE DRAWER */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[200] flex"
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
            >
              {/* Left clickable area to close */}
              <div className="flex-1 h-full" onClick={() => setSelectedProduct(null)} />

              {/* RIGHT PANEL - slides in from right */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="relative bg-white w-full md:w-1/2 h-full flex flex-col shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Red accent top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#da3332] to-[#e85c5b] shrink-0" />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10"
                >
                  <X size={18} />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1">
                  {/* Hero image */}
                  <div className="h-64 md:h-[320px] w-full overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80 bg-black/40 px-3 py-1 rounded-full">{item.name}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Product header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{selectedProduct.name}</h3>
                        <p className="text-sm text-[#da3332] font-bold mt-0.5">{selectedProduct.count}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end shrink-0">
                        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">✓ In Stock</span>
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">MOQ Available</span>
                      </div>
                    </div>

                    {/* Product highlights */}
                    <div className="grid grid-cols-3 gap-2.5 mb-5">
                      {[
                        { label: 'Min. Order', value: 'Bulk Order' },
                        { label: 'Delivery', value: '7–10 Days' },
                        { label: 'Payment', value: 'Advance / LC' },
                      ].map((spec, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1">{spec.label}</p>
                          <p className="text-[11px] font-extrabold text-slate-800">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* More from vendor */}
                    <div className="mb-5">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3">
                        More from {item.name}
                      </p>
                      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                        {b2b.products.filter(p => p.name !== selectedProduct.name).map((p, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedProduct(p)}
                            className="shrink-0 w-24 cursor-pointer group"
                          >
                            <div className="h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-[#da3332]/50 transition-colors">
                              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <p className="text-[9px] font-bold text-slate-600 mt-1 line-clamp-1 leading-tight">{p.name}</p>
                            <p className="text-[8px] text-slate-400">{p.count}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => { setSelectedProduct(null); setShowInquiryModal(true); }}
                        className="flex-1 bg-[#da3332] hover:bg-[#c22d2c] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Send size={13} /> Send Inquiry
                      </button>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="px-6 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs uppercase hover:bg-slate-50 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUB-CATEGORY PRODUCTS FULL PAGE MODAL */}
        <AnimatePresence>
          {activeSubCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-white z-[250] flex flex-col"
              onClick={(e) => { if (e.target === e.currentTarget) navigate(`/category/${categoryName}/${id}`); }}
            >
              <motion.div
                initial={{ y: '100%', opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0.5 }}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                className="bg-white w-full h-full flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Red top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#da3332] to-[#e85c5b] shrink-0" />

                {/* Header */}
                <div className="px-3 py-4 md:p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center border border-rose-100 shrink-0">
                      <Briefcase size={20} className="text-[#da3332]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{activeSubCategory.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{activeSubCategory.count} from {item.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/category/${categoryName}/${id}`)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all border border-slate-200 shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-2.5 py-5 md:p-6 space-y-6">

                  {/* Products Grid */}
                  <div className="space-y-4">
                    <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider">Available Products</h5>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                      {getSubCategoryProducts(activeSubCategory.name).map((product, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 md:p-3 flex flex-col justify-between hover:shadow-md transition-all group">
                          <div className="space-y-2 md:space-y-3">
                            <div className="h-28 md:h-40 rounded-lg overflow-hidden relative bg-white border border-slate-100">
                              <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[7px] md:text-[8px] font-bold px-1.5 py-0.5 rounded-full">✓ MOQ: {product.moq}</span>
                              </div>
                            </div>
                            <div className="space-y-0.5 md:space-y-1">
                              <h6 className="text-[11px] md:text-xs font-bold text-slate-900 line-clamp-1 leading-tight">{product.name}</h6>
                              <p className="text-[9px] md:text-[10px] text-slate-500 line-clamp-2 leading-relaxed min-h-[26px] md:min-h-[30px]">{product.desc}</p>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-slate-200/60 flex items-center justify-between gap-1">
                            <div className="leading-tight">
                              <p className="text-[7px] md:text-[8px] font-black uppercase tracking-wider text-slate-400 leading-none">Est. Price</p>
                              <p className="text-[10px] md:text-[11px] font-black text-[#da3332] mt-0.5">{product.price}</p>
                            </div>
                            <button
                              onClick={() => {
                                setShowInquiryModal(true);
                                setInquiryForm(prev => ({
                                  ...prev,
                                  message: `Inquiry regarding: ${product.name} (${activeSubCategory.name} Category)`
                                }));
                              }}
                              className="bg-[#da3332] hover:bg-[#c22d2c] text-white font-black px-2 py-1.5 md:px-3.5 md:py-1.5 rounded-lg text-[8px] md:text-[9px] uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm shrink-0"
                            >
                              <Send size={8} /> Inquiry
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL PAGE SUB-PAGES MODAL (SERVICES, FRANCHISE, FUTURE PLANS) */}
        <AnimatePresence>
          {(subCategoryName === 'services' || subCategoryName === 'franchise' || subCategoryName === 'future-plans') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-white z-[250] flex flex-col"
              onClick={() => navigate(`/category/${categoryName}/${id}`)}
            >
              <motion.div
                initial={{ y: '100%', opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0.5 }}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                className="bg-white w-full h-full flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${subCategoryName === 'franchise' ? 'from-[#da3332] to-[#e85c5b]' : 'from-[#0076d7] to-[#3b9de8]'} shrink-0`} />

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${subCategoryName === 'franchise' ? 'bg-rose-50 border-rose-100 text-[#da3332]' : 'bg-blue-50 border-blue-100 text-[#0076d7]'} rounded-xl flex items-center justify-center border shrink-0`}>
                      {subCategoryName === 'services' && <Briefcase size={20} />}
                      {subCategoryName === 'franchise' && <Award size={20} />}
                      {subCategoryName === 'future-plans' && <TrendingUp size={20} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        {subCategoryName === 'services' && 'Our Core Services'}
                        {subCategoryName === 'franchise' && 'Franchise Partnership'}
                        {subCategoryName === 'future-plans' && 'Future Roadmap & Vision'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.name} &bull; Official Portal</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/category/${categoryName}/${id}`)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all border border-slate-200 shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl w-full mx-auto space-y-8">
                  {subCategoryName === 'services' && (
                    /* SERVICES VIEW */
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {b2b.services.map((service, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0076d7] flex items-center justify-center shrink-0 border border-blue-100">
                              <CheckCircle2 size={18} />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-sm font-bold text-slate-900">{service}</h5>
                              <p className="text-xs text-slate-500 leading-relaxed">High efficiency execution of {service.toLowerCase()} operations with custom tailored project workflows and dedicated QA parameters.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {subCategoryName === 'franchise' && (
                    /* FRANCHISE VIEW */
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { title: "Low Capital Entry", val: "Minimal franchise fee, maximum support" },
                          { title: "High Projections", val: "Expected break-even within 12-18 months" },
                          { title: "Territorial Rights", val: "Complete exclusivity in your designated region" }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center space-y-1">
                            <p className="text-xs font-black text-slate-900 uppercase tracking-wider">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Application Form */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">Franchise Application Form</h4>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Franchise application submitted successfully! Our expansion manager will contact you soon."); navigate(`/category/${categoryName}/${id}`); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Full Name *</label>
                            <input required type="text" placeholder="John Doe" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Mobile Number *</label>
                            <input required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Proposed Investment (INR) *</label>
                            <select required className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none bg-white">
                              <option>10 - 20 Lakhs</option>
                              <option>20 - 50 Lakhs</option>
                              <option>50 Lakhs - 1 Crore</option>
                              <option>1 Crore+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">Preferred Territory / City *</label>
                            <input required type="text" placeholder="E.g., Pune, Mumbai" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#da3332] focus:ring-2 focus:ring-[#da3332]/10" />
                          </div>
                          <button type="submit" className="md:col-span-2 bg-[#da3332] hover:bg-[#c22d2c] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md">
                            Submit Franchise Proposal
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {subCategoryName === 'future-plans' && (
                    /* FUTURE PLANS ROADMAP VIEW */
                    <div className="space-y-6">
                      {/* Interactive Roadmap Timeline */}
                      <div className="relative pl-6 border-l border-slate-200 space-y-8 py-4">
                        {b2b.futurePlans.map((plan, idx) => (
                          <div key={idx} className="relative space-y-1">
                            <span className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-blue-50 border-4 border-[#0076d7] flex items-center justify-center" />
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">Phase 0{idx + 1}</h5>
                            <h4 className="text-sm font-extrabold text-slate-800">{plan}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Executing systematic deployment plans, training operational workforces, and verifying deliverables to support the successful completion of Phase 0{idx+1}.</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRADE FEED DETAIL MODAL */}
        <AnimatePresence>
          {selectedFeedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[250] p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedFeedPost(null); }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent top bar based on category */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${selectedFeedPost.category === 'Achievements' ? 'from-amber-500 to-yellow-400' : 'from-[#da3332] to-[#e85c5b]'} shrink-0`} />

                {/* Close button */}
                <button
                  onClick={() => setSelectedFeedPost(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors z-10 bg-white/80 backdrop-blur-sm border border-slate-200"
                >
                  <X size={16} />
                </button>

                {/* Cover Image */}
                <div className="h-60 w-full overflow-hidden bg-slate-100 relative shrink-0">
                  <img src={selectedFeedPost.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white bg-[#da3332] px-3 py-1 rounded-full">{selectedFeedPost.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400">{selectedFeedPost.date} &bull; Trade Feed Update</p>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{selectedFeedPost.title}</h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedFeedPost.desc} In our continuous endeavor to maintain highest quality, transparency, and operational excellence, we are sharing this verified update with all our B2B trade partners and supply chain stakeholders. Contact our operations team for detailed queries.
                  </p>

                  {/* Social Stats Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2 text-[10px] font-bold text-slate-500">
                    <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                      <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      <span>{selectedFeedPost.likes} Likes</span>
                    </button>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <svg className="w-3.5 h-3.5 text-slate-400 fill-current" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h12v2H6v-2zm0-8h12v2H6V5z"/></svg>
                        <span>{selectedFeedPost.comments} Comments</span>
                      </span>
                      <button 
                        onClick={() => { alert("Post link copied to clipboard!"); }}
                        className="flex items-center gap-1 hover:text-slate-800 transition-colors"
                      >
                        <Share2 size={13} className="text-slate-400" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </UserLayout>
  );
};

export default CategoryDetails;
