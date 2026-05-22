import { Scissors, Mic, Dumbbell, Sparkles, Sofa, Building2, Utensils, Activity, CarFront, Package, Heart, Dog, Bed, Store, GraduationCap, Zap, Wrench, Truck, UserCog } from 'lucide-react';
import hotelIcon from '../assets/icons/hotel.png';
import beautyIcon from '../assets/icons/beauty.png';

export const CATEGORIES = [
  { id: 1, name: 'Manufacturers', icon: 'https://images.pexels.com/photos/2566573/pexels-photo-2566573.jpeg?auto=compress&cs=tinysrgb&w=150', count: '340K+', color: 'bg-primary-50/50' },
  { id: 2, name: 'Industrial Goods', icon: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=150', count: '220K+', color: 'bg-primary-50/50' },
  { id: 3, name: 'Retail & Shops', icon: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=150', count: '450K+', color: 'bg-primary-50/50' },
  { id: 4, name: 'Agriculture', icon: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=150', count: '78K+', color: 'bg-primary-50/50' },
  { id: 5, name: 'Home & Decor', icon: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150', count: '92K+', color: 'bg-primary-50/50' },
  { id: 6, name: 'Food & Beverages', icon: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=150', count: '280K+', color: 'bg-primary-50/50' },
  { id: 7, name: 'Automotive Parts', icon: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=150', count: '110K+', color: 'bg-primary-50/50' },
  { id: 8, name: 'Electronics', icon: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150', count: '190K+', color: 'bg-primary-50/50' },
  { id: 9, name: 'Textiles & Apparel', icon: 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=150', count: '260K+', color: 'bg-primary-50/50' },
  { id: 10, name: 'Beauty', icon: beautyIcon, count: '120K+', color: 'bg-primary-50/50' },
  { id: 11, name: 'Hotels', icon: hotelIcon, count: '50K+', color: 'bg-primary-50/50' },
  { id: 12, name: 'Chemicals', icon: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=150', count: '65K+', color: 'bg-primary-50/50' },
];

export const SERVICES_CATEGORIES = [
  { id: 1, name: 'Logistics', icon: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=150', count: '85K+', color: 'bg-primary-50/50' },
  { id: 2, name: 'Repair Services', icon: 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=150', count: '120K+', color: 'bg-primary-50/50' },
  { id: 3, name: 'IT & Software', icon: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=150', count: '95K+', color: 'bg-primary-50/50' },
  { id: 4, name: 'Real Estate', icon: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=150', count: '210K+', color: 'bg-primary-50/50' },
  { id: 5, name: 'Healthcare', icon: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=150', count: '165K+', color: 'bg-primary-50/50' },
  { id: 6, name: 'Education', icon: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=150', count: '130K+', color: 'bg-primary-50/50' },
  { id: 7, name: 'Food & Dining', icon: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=150', count: '180K+', color: 'bg-primary-50/50' },
  { id: 8, name: 'Consulting', icon: 'https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=150', count: '72K+', color: 'bg-primary-50/50' },
  { id: 9, name: 'Marketing', icon: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=150', count: '58K+', color: 'bg-primary-50/50' },
  { id: 10, name: 'Legal Services', icon: 'https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=150', count: '44K+', color: 'bg-primary-50/50' },
  { id: 11, name: 'Financial Services', icon: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=150', count: '96K+', color: 'bg-primary-50/50' },
  { id: 12, name: 'Travel & Tourism', icon: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=150', count: '115K+', color: 'bg-primary-50/50' },
];

export const FEATURED_VENDORS = [
  { id: 1, name: 'AquaSmooth Plumbing', rating: 4.9, reviews: 1240, type: 'Premium', verified: true, image: 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Apex Car Care', rating: 4.8, reviews: 3100, type: 'Featured', verified: true, image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Zenith Home Spa', rating: 4.7, reviews: 890, type: 'Promoted', verified: false, image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, name: 'Glow Dental Clinic', rating: 5.0, reviews: 450, type: 'Top Rated', verified: true, image: 'https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const HOME_SERVICES = [
  { id: 1, name: 'AC REPAIR & SERVICE', image: 'https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#1A2B4B]' },
  { id: 2, name: 'PAINTERS', image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#9D446E]' },
  { id: 3, name: 'PEST CONTROL', image: 'https://images.pexels.com/photos/4064560/pexels-photo-4064560.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#C59D3F]' },
  { id: 4, name: 'PLUMBERS', image: 'https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#E68D40]' },
  { id: 5, name: 'ELECTRICIANS', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400', color: 'from-[#2D5A27]' },
  { id: 6, name: 'CLEANING', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#2B5278]' },
  { id: 7, name: 'CARPENTERS', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#5D4037]' },
  { id: 8, name: 'SECURITY', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400', color: 'from-[#37474F]' },
  { id: 9, name: 'APPLIANCE REPAIR', image: 'https://images.pexels.com/photos/2249290/pexels-photo-2249290.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#4A3B52]' },
  { id: 10, name: 'HOME DECOR', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-[#1B4B5A]' },
];

export const PREVIEW_CARDS = [
  {
    id: 0,
    user: 'Luxe Interior Studio',
    title: 'Minimalist Transformation',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    likes: '2k',
    comments: '45',
    text: 'Just finished this beautiful minimalist living room transformation in Goregaon. Every corner tells a story! ✨'
  },
  {
    id: 1,
    user: 'Zenith Home Spa',
    title: 'Morning Wellness',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.2k',
    comments: '28',
    text: 'Relaxing home spa session today. Peace begins with a healthy mind and body. 🧘‍♀️'
  },
  {
    id: 2,
    user: 'Apex Car Care',
    title: 'Extreme Detailing',
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '800',
    comments: '15',
    text: 'Brought this vintage beauty back to life with our premium detailing package! 🚗✨'
  }
];

export const PRODUCT_CATEGORIES_SIDEBAR = [
  { id: 1, name: 'Apparel & Accessories', icon: Scissors },
  { id: 2, name: 'Consumer Electronics', icon: Mic },
  { id: 3, name: 'Sports & Entertainment', icon: Dumbbell },
  { id: 4, name: 'Beauty', icon: Sparkles },
  { id: 5, name: 'Home & Decor', icon: Sofa },
  { id: 6, name: 'Industrial Goods', icon: Building2 },
  { id: 7, name: 'Agriculture & Food', icon: Utensils },
  { id: 8, name: 'Health & Medical', icon: Activity },
  { id: 9, name: 'Auto & Transportation', icon: CarFront },
  { id: 10, name: 'Bags & Shoes', icon: Package },
  { id: 11, name: 'Gifts & Crafts', icon: Heart },
  { id: 12, name: 'Toys & Hobbies', icon: Dog },
  { id: 13, name: 'Electrical Equip.', icon: Zap },
  { id: 14, name: 'Construction', icon: Wrench },
  { id: 15, name: 'Tools & Hardware', icon: Wrench },
  { id: 16, name: 'Machinery', icon: UserCog },
  { id: 17, name: 'Packaging & Printing', icon: Truck },
  { id: 18, name: 'Office & School', icon: GraduationCap },
  { id: 19, name: 'Furniture', icon: Bed },
  { id: 20, name: 'Lights & Lighting', icon: Sparkles },
  { id: 21, name: 'Textiles', icon: Scissors },
];

export const FREQUENTLY_SEARCHED = [
  { id: 1, name: 'Smart TVs', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Wedding Dresses', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 3, name: 'Wireless Audio', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 4, name: 'New Energy Vehicles', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Home Theater', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Laptops', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Gaming Consoles', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Cameras', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 9, name: 'Smart Watches', sub: 'Frequently searched', image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const TOP_DEALS = [
  { id: 'td1', name: 'Premium Wireless Headphones', price: '₹187.91', old: '₹226.99', moq: '1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600'] },
  { id: 'td2', name: 'Designer Gold Necklace Set', price: '₹240.90', old: '₹299.00', moq: '50', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600'] },
  { id: 'td3', name: 'Luxury Smart Watch', price: '₹21,777.23', old: '₹25,000', moq: '1', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600'] },
  { id: 'td4', name: 'Premium Leather Handbag', price: '₹770.88', old: '₹999.00', moq: '1', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1566150905458-1bf1fc15aae9?auto=format&fit=crop&q=80&w=600'] },
];

export const PRODUCT_BANNERS = [
  { id: 1, title: 'Hot Picks', sub: 'Must-have gadgets', color: 'bg-blue-100', btnColor: 'bg-blue-900', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, title: 'Super May exclusives', sub: 'Limited time offers', color: 'bg-orange-100', btnColor: 'bg-orange-700', image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, title: 'Smart Home', sub: 'Automate your life', color: 'bg-slate-100', btnColor: 'bg-slate-900', image: 'https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const TOP_RANKED_CATEGORIES = [
  { id: 'tr1', name: 'Portable Toilet', image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'tr2', name: 'Tree House', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'tr3', name: 'Factory Roofing Shed', image: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'tr4', name: 'Puff Cabins', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'tr5', name: 'Tennis Courts', image: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'tr6', name: 'Portable Pantry', image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export const PRODUCT_LIST_TABS = [
  'All', 'Fashion & Apparel', 'Jewelry & Accessories', 'Beauty & Personal Care', 'Electronics & Gadgets', 'Home & Kitchen', 'Food & Beverage'
];

export const FULL_PRODUCT_LIST = [
  // Fashion & Apparel
  { id: 'fp3', name: 'Premium Silk Saree with Zari Border Handwoven', price: '₹259.21', moq: '10', rating: '5.0', category: 'Fashion & Apparel', image: '/silk_saree.png', images: ['/silk_saree.png', '/silk_saree_2.png', '/silk_saree_3.png'] },
  { id: 'fp14', name: 'Elegant Floral Summer A-Line Dress for Women', price: '₹1,499.00', moq: '2', badge: 'Top Seller', category: 'Fashion & Apparel', image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&q=80', images: ['https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80'] },
  { id: 'fp15', name: 'Premium Men\'s Slim Fit Formal Suit Set', price: '₹4,999.00', moq: '1', sold: '1.2k+ sold', category: 'Fashion & Apparel', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80', images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80'] },
  { id: 'fp10', name: 'Designer Embroidered Lehenga Choli Bridal Collection', price: '₹3,432.33', moq: '1', category: 'Fashion & Apparel', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },

  // Jewelry & Accessories
  { id: 'fp1', name: 'Rose Gold Diamond Ring 18K Pure Gold Wedding Band', price: '₹120.45', moq: '1', badge: 'Lower priced than similar', category: 'Jewelry & Accessories', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600'] },
  { id: 'fp2', name: 'Polished Tungsten Carbide Ring Gunmetal Finish 8mm', price: '₹1,011.78', moq: '2', sold: '390+ sold', category: 'Jewelry & Accessories', image: '/tungsten_ring.png', images: ['/tungsten_ring.png', '/tungsten_ring_2.png', '/tungsten_ring_3.png'] },
  { id: 'fp8', name: 'Stainless Steel Chronograph Watch Silver Dial', price: '₹221.63', moq: '1', sold: '10+ sold', category: 'Jewelry & Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 'fp4', name: 'Classic Aviator Sunglasses UV400 Polarized Gold Frame', price: '₹53.00', moq: '100', delivery: 'Delivery by 04 Jun', category: 'Jewelry & Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
  { id: 'fp6', name: 'Premium Leather Oxford Shoes Men Formal Glossy Black', price: '₹1,146.68', moq: '1', rating: '5.0', category: 'Jewelry & Accessories', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80' },

  // Beauty & Personal Care
  { id: 'fp7', name: 'Crystal Perfume Bottle 100ml Luxury Glass Spray', price: '₹64.57', moq: '50', sold: '180+ sold', category: 'Beauty & Personal Care', image: '/perfume_bottle.png', images: ['/perfume_bottle.png', '/perfume_bottle_2.png', '/perfume_bottle_3.png'] },
  { id: 'fp11', name: 'Vitamin Mask 50ml Glow Enhancing Moisture Repair Cream', price: '₹97.00', moq: '1', rating: '5.0', sold: '840+ sold', category: 'Beauty & Personal Care', image: '/vitamin_mask.png', images: ['/vitamin_mask.png', 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&q=80', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'] },
  { id: 'fp18', name: 'Luxury Organic Handmade Bath Soap - Lavender & Oatmeal', price: '₹349.00', moq: '5', badge: 'Lower priced than similar', category: 'Beauty & Personal Care', image: '/soap_lavender_1.png', images: ['/soap_lavender_1.png', '/soap_lavender_2.png', '/soap_lavender_3.png', '/soap_lavender_4.png'] },

  // Electronics & Gadgets
  { id: 'fp16', name: 'Smart Solar Charging Backpack with USB Port', price: '₹2,499.00', moq: '1', rating: '4.9', category: 'Electronics & Gadgets', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 'fp5', name: 'Power Bank 10000mAh Slim Metallic Fast Charge', price: '₹1,108.14', moq: '50', badge: 'Lower priced than similar', category: 'Electronics & Gadgets', image: '/power_bank.png', images: ['/power_bank.png', 'https://images.unsplash.com/photo-1609592424089-8d5e1f0e4b77?w=600&q=80', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'] },
  { id: 'fp9', name: 'Bluetooth Earbuds TWS Pro Noise Cancelling', price: '₹1,985.01', moq: '10', sold: '520+ sold', category: 'Electronics & Gadgets', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
  { id: 'fp17', name: 'Ultra HD Smart Projector 4K Support Home Theater', price: '₹7,999.00', moq: '1', rating: '4.7', category: 'Electronics & Gadgets', image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80' },

  // Home & Kitchen
  { id: 'fp12', name: 'Pure Copper Water Pitcher Hammered Finish 1.5L', price: '₹1,499.00', moq: '5', rating: '4.8', category: 'Home & Kitchen', image: '/copper_pitcher.png', images: ['/copper_pitcher.png', '/copper_pitcher_2.png', '/copper_pitcher_3.png'] },
  { id: 'fp13', name: 'Brass Antique Door Knockers Lion Design Heavy Duty', price: '₹899.00', moq: '10', sold: '150+ sold', category: 'Home & Kitchen', image: '/brass_knocker.png', images: ['/brass_knocker.png', '/brass_knocker_2.png', '/brass_knocker_3.png'] },
  { id: 'fp19', name: 'Electric Ceramic Drip Kettle Cordless Matte Black', price: '₹2,299.00', moq: '5', rating: '4.6', category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80' },
  { id: 'fp20', name: 'Robotic Smart Vacuum & Mop Auto Self-Charging', price: '₹18,990.00', moq: '1', sold: '80+ sold', category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80' },

  // Food & Beverage
  { id: 'fp21', name: 'Organic Roasted Coffee Beans 100% Arabica Medium Roast', price: '₹450.00', moq: '10', category: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80' },
  { id: 'fp22', name: 'Premium Matcha Green Tea Powder Ceremonial Grade', price: '₹1,299.00', moq: '5', rating: '5.0', category: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80' },
  { id: 'fp23', name: 'Extra Virgin Cold Pressed Olive Oil Italian Harvest 1L', price: '₹1,850.00', moq: '2', sold: '300+ sold', category: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
];

export const RECOMMENDATIONS = [
  { id: 'rec1', name: 'Custom Die Cut Waterproof PVC Vinyl Logo', price: '₹8.68', moq: '1 piece', delivery: '12 Jun', image: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'rec2', name: 'Custom Decorative Transparent Logo Metal', price: '₹8.68', moq: '1 piece', delivery: '12 Jun', image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'rec3', name: 'High Quality Skateboard Double Sided Sticker', price: '₹8.68', moq: '1 piece', delivery: '12 Jun', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'rec4', name: 'Weatherproof Custom Brand Logo Design UV', price: '₹8.68', moq: '1 piece', delivery: '12 Jun', image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export const KEY_ATTRIBUTES = [
  { label: 'Application', value: 'Promotional Gifts', label2: 'Material', value2: 'adhesive vinyl' },
  { label: 'Product Type', value: 'paper sticker', label2: 'Pattern', value2: 'custom logo' },
  { label: 'Feature', value: 'Waterproof', label2: 'product type', value2: 'metal sticker' },
  { label: 'Style', value: 'Decorative Sticker', label2: 'Shape', value2: 'Customized' },
  { label: 'Surface finishing', value: 'UV Varnishing', label2: 'Printing', value2: 'CMYK' },
  { label: 'Place of Origin', value: 'Guangdong, China', label2: 'Brand Name', value2: 'Phcase' },
  { label: 'Model Number', value: 'PHC-Stickers', label2: '', value2: '' },
];

export const DUMMY_REVIEWS = [
  { id: 1, user: 'Rahul S.', rating: 5, date: '12 Apr 2024', comment: 'Excellent quality! The stickers are waterproof as mentioned and the colors are very vibrant. Will order again.', avatar: 'RS' },
  { id: 2, user: 'Anita M.', rating: 4, date: '05 Apr 2024', comment: 'Great product for the price. Delivery was a bit slow but the quality compensated for it.', avatar: 'AM' },
  { id: 3, user: 'Vikram K.', rating: 5, date: '28 Mar 2024', comment: 'Highly recommended for small businesses. The bulk pricing is very competitive.', avatar: 'VK' },
];

export const RECENT_SEARCHES = [
  'Gynaecologist & Obstetrician',
  'Real Estate Agents'
];

export const TRENDING_SEARCHES = [
  'Hostels For Women',
  'Car Rental',
  'Interior Designers',
  'Electricians'
];

export const TRENDING_AREAS = [
  'Vijay Nagar, Indore',
  'Vijay Nagar Road Vijay Nagar, Indore',
  'Bhawar Kuan, Indore',
  'Khajrana, Indore',
  'Sudama Nagar, Indore',
  'Mhow, Indore',
  'MG Road Indore, Indore',
  'New Palasia, Indore',
  'Kanadia, Indore',
  'Rau, Indore'
];



export const ALL_PRODUCTS = [...TOP_DEALS, ...FULL_PRODUCT_LIST, ...RECOMMENDATIONS];

