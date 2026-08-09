import { ProductItem } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  // Digital Products
  {
    id: 'prod-ai-prompts-masterkit',
    slug: 'ai-prompts-masterkit',
    title: 'Ultimate AI Prompts Masterkit for Marketing & Business',
    category: 'AI Prompts',
    priceUSD: 29,
    originalPriceUSD: 79,
    rating: 4.9,
    reviewsCount: 128,
    featured: true,
    description: 'Over 1,500+ battle-tested Gemini, ChatGPT, and Midjourney prompts engineered for copywriters, agency owners, digital marketers, and startup founders.',
    features: [
      '1,500+ categorized copy & strategy prompts',
      'Midjourney & DALL-E 3 image creation formulas',
      'SEO content structuring & outline generators',
      'Email marketing & sales funnel sequences',
      'Notion database & CSV format downloads',
      'Lifetime updates included'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
    tags: ['AI Prompts', 'Gemini', 'ChatGPT', 'Marketing', 'Copywriting']
  },
  {
    id: 'prod-canva-agency-kit',
    slug: 'canva-agency-kit',
    title: 'Agency Social Media Kit — 300+ Editable Canva Templates',
    category: 'Canva Templates',
    priceUSD: 39,
    originalPriceUSD: 99,
    rating: 4.8,
    reviewsCount: 94,
    featured: true,
    description: 'Transform your brand feed with 300+ premium, modern Instagram, LinkedIn, and Facebook templates designed specifically for agency & SaaS brands.',
    features: [
      '100 Instagram Carousel Post Templates',
      '100 Story & Reel Cover Templates',
      '50 LinkedIn Infographic Sliders',
      '50 High-Converting Ad Creative Layouts',
      'Fully editable in free Canva account',
      'Instant access link & setup guide'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'],
    tags: ['Canva', 'Social Media', 'Templates', 'Instagram', 'Agency']
  },
  {
    id: 'prod-notion-agency-os',
    slug: 'notion-agency-os',
    title: 'BRANIFY Agency OS — Complete Notion Workspace for Freelancers',
    category: 'Notion Templates',
    priceUSD: 49,
    originalPriceUSD: 129,
    rating: 5.0,
    reviewsCount: 67,
    featured: true,
    description: 'All-in-one Notion template system for managing client leads, project tasks, contracts, invoices, team workflows, and financial revenue tracking.',
    features: [
      'CRM & Client Lead Pipeline Database',
      'Project Management Kanban & Timeline Views',
      'Invoice & Proposal Generator Hub',
      'Client Onboarding Portal Template',
      'Finance, Expense & Revenue Dashboard',
      'Video Walkthrough Tutorial Included'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80'],
    tags: ['Notion', 'Productivity', 'Agency', 'Business', 'Freelance']
  },
  {
    id: 'prod-startup-pitch-deck-ppt',
    slug: 'startup-pitch-deck-ppt',
    title: 'SaaS & Startup Pitch Deck Template (PowerPoint + Keynote)',
    category: 'Presentation Templates',
    priceUSD: 35,
    originalPriceUSD: 85,
    rating: 4.9,
    reviewsCount: 42,
    description: 'Investor-ready 45-slide presentation template formatted for venture capital pitches, product demos, and strategic business proposals.',
    features: [
      '45 unique, modern slide layouts',
      'Vector charts & editable data graphs',
      'Light & Dark visual themes included',
      'Available in PPTX, Keynote, and Google Slides',
      'Free typography font links included'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'],
    tags: ['PowerPoint', 'Pitch Deck', 'Startup', 'Presentation', 'SaaS']
  },
  {
    id: 'prod-nextjs-saas-starter',
    slug: 'nextjs-saas-starter',
    title: 'BRANIFY SaaS Starter Kit — Modern React & Tailwind Template',
    category: 'Website Templates',
    priceUSD: 69,
    originalPriceUSD: 149,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    description: 'Production-ready React & Tailwind CSS web app boilerplate complete with dark mode, responsive layout, pricing tables, and UI component suite.',
    features: [
      'Built with React 19, TypeScript & Vite',
      'Tailwind CSS v4 & Lucide Icons suite',
      'Dark & Light mode themes out of the box',
      'Interactive pricing calculator & comparison grids',
      'SEO metadata architecture & clean code',
      'Full GitHub code repository access'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'SaaS', 'Website Template']
  },
  {
    id: 'prod-excel-financial-model',
    slug: 'excel-financial-model',
    title: 'Startup Financial Model & Valuation Spreadsheet',
    category: 'Spreadsheet Templates',
    priceUSD: 25,
    originalPriceUSD: 60,
    rating: 4.7,
    reviewsCount: 51,
    description: 'Comprehensive 5-year financial forecasting model for startups, e-commerce, and SaaS businesses. Includes P&L, cash flow, and CAC metrics.',
    features: [
      'Dynamic revenue & expense forecasting',
      'Customer Acquisition Cost (CAC) & LTV formulas',
      'Break-even analysis & sensitivity matrix',
      'Google Sheets & Microsoft Excel compatible',
      'Pre-formatted executive summary charts'
    ],
    downloadUrl: '#',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
    tags: ['Excel', 'Finance', 'Google Sheets', 'Startup', 'Valuation']
  },

  // Premium Subscription Products (Legitimate resale/affiliate partner catalog)
  {
    id: 'sub-ai-writing-pro',
    slug: 'ai-writing-pro-pass',
    title: 'AI Pro Productivity Suite Pass — 12 Months Access',
    category: 'Subscription Products',
    priceUSD: 149,
    originalPriceUSD: 240,
    rating: 4.9,
    reviewsCount: 210,
    featured: true,
    isSubscription: true,
    subscriptionPlan: 'Pro Annual License',
    provider: 'BRANIFY Authorized Resell Partner',
    deliveryMethod: 'Digital Key Activation via Email',
    description: 'Legitimate 1-year authorized subscription key granting full tier access to AI text generation, content expansion, and automated copywriting tools.',
    features: [
      '100% Legitimate single-user key activation',
      'Unlimited AI content generations',
      'Plagiarism checker & SEO mode integration',
      'Official software updates & direct customer support',
      '30-Day Money-Back Satisfaction Guarantee'
    ],
    images: ['https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'],
    tags: ['AI', 'Subscription', 'Copywriting', 'Productivity'],
    terms: 'Authorized resale product. Valid for 1 year from activation date. Single account registration required.'
  },
  {
    id: 'sub-design-cloud-annual',
    slug: 'design-cloud-annual',
    title: 'Creative Cloud & Asset Library Membership',
    category: 'Subscription Products',
    priceUSD: 199,
    originalPriceUSD: 360,
    rating: 5.0,
    reviewsCount: 154,
    featured: true,
    isSubscription: true,
    subscriptionPlan: 'Commercial Enterprise License',
    provider: 'BRANIFY Reseller Network',
    deliveryMethod: 'Direct License Transfer / License Code',
    description: 'Get 1 year of unlimited commercial access to curated vector graphics, 3D assets, high-res stock photography, and premium font families.',
    features: [
      'Unlimited asset downloads for client projects',
      'Commercial royalty-free clearance worldwide',
      '4K video stock, PNG cutouts & 3D models',
      'Priority download speeds & API access',
      'Dedicated account support'
    ],
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'],
    tags: ['Design', 'Stock Photos', 'Subscription', 'Creative'],
    terms: 'Official partner license code. Allows commercial usage across digital & print media.'
  },
  {
    id: 'sub-cloud-storage-workspace',
    slug: 'cloud-storage-workspace',
    title: 'Secure Business Cloud Storage — 2TB Workspace Annual',
    category: 'Subscription Products',
    priceUSD: 119,
    originalPriceUSD: 180,
    rating: 4.8,
    reviewsCount: 88,
    isSubscription: true,
    subscriptionPlan: '2TB Business Annual',
    provider: 'Cloud Enterprise Partner',
    deliveryMethod: 'Account Voucher Code',
    description: 'Secure enterprise cloud storage with end-to-end encryption, automated backup, file versioning, and fast team sharing links.',
    features: [
      '2,000 GB encrypted storage space',
      'Zero-knowledge encryption & AES-256 standards',
      'Automated desktop & mobile folder sync',
      'Unlimited bandwidth for sharing links',
      '24/7 Priority technical assistance'
    ],
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
    tags: ['Cloud Storage', 'Backup', 'Security', 'Subscription'],
    terms: 'Redeemable voucher code applied directly to your official workspace account.'
  }
];
