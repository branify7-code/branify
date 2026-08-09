export type Currency = 'USD' | 'PKR' | 'AED';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rate: number; // base USD = 1.0
  format: (amountUSD: number) => string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  startingPriceUSD: number;
  deliveryTimeline: string;
  iconName: string;
  features: string[];
  benefits: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  deliverables: string[];
  techStack?: string[];
  category: 'web' | 'branding' | 'design' | 'marketing' | 'ai' | 'consulting';
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isSubscription?: boolean;
  subscriptionPlan?: string;
  provider?: string;
  deliveryMethod?: string;
  description: string;
  features: string[];
  downloadUrl?: string;
  previewUrl?: string;
  images: string[];
  tags: string[];
  terms?: string;
}

export type ToolCategory = 
  | 'PDF Tools' 
  | 'Image Tools' 
  | 'Text Tools' 
  | 'Developer Tools' 
  | 'SEO Tools' 
  | 'Business Tools' 
  | 'Marketing Tools' 
  | 'Security / Utility Tools';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  featured?: boolean;
  popular?: boolean;
  inputType: 'text' | 'textarea' | 'image' | 'file' | 'multiline' | 'numbers' | 'json' | 'form' | 'none';
  outputType: 'text' | 'textarea' | 'image' | 'file' | 'json' | 'preview' | 'styled';
  placeholder?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  category: 'Web Development' | 'Branding' | 'UI/UX' | 'AI' | 'E-commerce' | 'WordPress' | 'Marketing';
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  coverImage: string;
  galleryImages: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  isDemo?: boolean;
}

export interface ProjectRequestLead {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  referenceUrl?: string;
  status: 'New' | 'In Contact' | 'Proposal Sent' | 'Converted' | 'Closed';
  createdAt: string;
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  announcementText: string;
  announcementCtaText: string;
  announcementLink: string;
  announcementActive: boolean;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  location: string;
  businessHours: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    github: string;
  };
}

export interface CartItem {
  id: string;
  title: string;
  priceUSD: number;
  type: 'service' | 'product' | 'subscription';
  image?: string;
  details?: string;
  quantity: number;
}
