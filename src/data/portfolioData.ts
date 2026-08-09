import { PortfolioItem } from '../types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'apex-global-saas',
    slug: 'apex-global-saas',
    title: 'Apex Global — AI Analytics Platform Redesign',
    client: 'Apex Global Tech Ltd.',
    industry: 'FinTech / SaaS',
    year: '2026',
    category: 'Web Development',
    challenge: 'Apex Global needed a modern, ultra-fast web dashboard and brand overhaul to reposition their analytics platform for enterprise international clients in London and Dubai.',
    solution: 'Engineered a full-stack React and TypeScript application featuring real-time interactive charts, serverless Gemini API query assistants, and a high-contrast dark luxury visual design system.',
    results: [
      '310% increase in enterprise demo requests within 60 days',
      '0.8s average initial page load speed worldwide',
      'Secured $2.4M Series-A funding post-rebrand'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Express', 'Gemini API'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'lumina-luxury-branding',
    slug: 'lumina-luxury-branding',
    title: 'Lumina Living — International Brand Identity & E-Commerce',
    client: 'Lumina Living Space',
    industry: 'E-Commerce / Architecture',
    year: '2025',
    category: 'Branding',
    challenge: 'Creating a cohesive luxury brand identity, typography guide, stationery suite, and high-converting WooCommerce storefront for an architectural interior design studio.',
    solution: 'Designed a timeless serif + sans-serif brand identity system with gold foil print specifications, paired with a custom responsive WooCommerce theme optimized for mobile buyer journeys.',
    results: [
      '180% surge in online checkout conversions',
      'Featured in International Interior Design Digest 2025',
      'Expanded customer base across UAE, UK, and Pakistan'
    ],
    technologies: ['WordPress', 'WooCommerce', 'Figma', 'Adobe Illustrator', 'Elementor Pro'],
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'zenith-ai-bot',
    slug: 'zenith-ai-bot',
    title: 'Zenith Logistics — AI Support Automation System',
    client: 'Zenith Freight Network',
    industry: 'Logistics & Supply Chain',
    year: '2026',
    category: 'AI',
    challenge: 'Zenith was overwhelmed with over 5,000 daily customer inquiry emails regarding shipment status and custom clearance procedures.',
    solution: 'Developed a custom Gemini 2.5 AI chatbot integrated directly into their customer dashboard with RAG vector grounding and live WhatsApp API notifications.',
    results: [
      'Automated 84% of routine customer support inquiries',
      'Reduced average resolution time from 4 hours to 6 seconds',
      'Saved $120,000 in annual support operational costs'
    ],
    technologies: ['AI Solutions', 'Gemini API', 'TypeScript', 'Node.js', 'WhatsApp Business API'],
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    id: 'vanguard-capital-presentation',
    slug: 'vanguard-capital-presentation',
    title: 'Vanguard Capital — Series B Investor Pitch Deck',
    client: 'Vanguard Capital Partners',
    industry: 'Venture Capital',
    year: '2025',
    category: 'UI/UX',
    challenge: 'Needed an executive 35-slide presentation deck to present financial returns and tech portfolio growth to institutional investors.',
    solution: 'Crafted custom vector infographics, isometric financial diagrams, and interactive master slide templates in PowerPoint and Figma.',
    results: [
      'Successfully closed $15M Series-B investment round',
      'Praise from board members for clarity and visual polish'
    ],
    technologies: ['Figma', 'PowerPoint', 'Illustrator', 'Financial Data Visualization'],
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
    ]
  }
];
