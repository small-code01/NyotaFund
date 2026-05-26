import { 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Phone, 
  Zap, 
  User, 
  GraduationCap, 
  TrendingUp,
  ShieldCheck,
  Globe,
  Award,
  MapPin
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Loan Products', href: '#loans', icon: Briefcase },
  { name: 'About Us', href: '#about', icon: Users },
  { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { name: 'Contact', href: '#contact', icon: Phone },
];

export const LOAN_PRODUCTS = [
  {
    id: 'emergency',
    title: 'EMERGENCY LOANS',
    icon: Zap,
    description: 'Instant financial support for urgent needs like medical bills or unforeseen crises.',
    engineering: 'Engineered with a 24-hour approval cycle and minimal documentation, specifically designed to catch youth before they fall into predatory debt traps during crises.',
    color: 'text-kenya-red',
    bg: 'bg-kenya-red/5',
  },
  {
    id: 'personal',
    title: 'PERSONAL LOANS',
    icon: User,
    description: 'Flexible funding for personal growth, relocation, or equipment purchases.',
    engineering: 'Structured with a "Youth-First" credit scoring model that considers digital footprint and peer-group savings history rather than traditional collateral.',
    color: 'text-kenya-black',
    bg: 'bg-kenya-black/5',
  },
  {
    id: 'business',
    title: 'BUSINESS LOANS',
    icon: TrendingUp,
    description: 'Capital for startups and scaling existing youth-led enterprises.',
    engineering: 'Integrated with the NYOTA entrepreneurship grants, providing a hybrid of debt and equity to ensure sustainable business scaling without overwhelming interest burdens.',
    color: 'text-kenya-green',
    bg: 'bg-kenya-green/5',
  },
  {
    id: 'education',
    title: 'EDUCATION LOANS',
    icon: GraduationCap,
    description: 'Support for digital skills training, certifications, and higher education.',
    engineering: 'Engineered with a "Study-Now-Pay-Later" grace period that aligns repayment schedules with the completion of NYOTA digital skills training and job placement.',
    color: 'text-kenya-red',
    bg: 'bg-kenya-red/5',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Kevin Otieno',
    role: 'Tech Entrepreneur',
    content: 'Wueh! NYOTA Fund ni real deal. I managed to scale my digital agency hapa Nairobi bila stress. Hii business loan engineering imesaidia vijana sana kujiinua.',
  },
  {
    name: 'Sarah Wanjiku',
    role: 'Small Business Owner',
    content: 'Haba Haba scheme imenifundisha nidhamu ya ku-save. Shop yangu ilikuwa inahitaji boost na NYOTA walikuja through haraka sana. Sasa biashara inasonga mbele!',
  },
  {
    name: 'David Musyoka',
    role: 'Software Developer',
    content: 'Hii education loan ilikuwa life-saver. Niliweza kumaliza certifications zangu za coding na sasa niko na job poa. Shukran NYOTA kwa kuamini talent ya mtaa.',
  },
];

export const STATS = [
  { label: 'Youth Empowered', value: '820,000+', icon: Users },
  { label: 'Project Duration', value: '5 Years', icon: Globe },
  { label: 'Counties Covered', value: '47', icon: MapPin },
  { label: 'Success Rate', value: '94%', icon: Award },
];
