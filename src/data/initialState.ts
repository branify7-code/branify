import { SiteSettings, Testimonial } from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: 'BRANIFY',
  tagline: 'Build. Brand. Grow.',
  announcementText: 'Summer Launch Offer — Get 30% OFF on Websites & Branding',
  announcementCtaText: 'Claim Offer →',
  announcementLink: '/contact',
  announcementActive: true,
  contactEmail: 'branify7@gmail.com',
  contactPhone: '+92 300 1234567',
  contactWhatsApp: '+923001234567',
  location: 'Islamabad, Pakistan & Dubai, UAE (Serving Clients Worldwide)',
  businessHours: 'Mon - Sat: 9:00 AM - 9:00 PM (PKT / GST)',
  socials: {
    instagram: 'https://instagram.com/branify.store',
    linkedin: 'https://linkedin.com/company/branify',
    facebook: 'https://facebook.com/branify.store',
    twitter: 'https://x.com/branify_store',
    github: 'https://github.com/branify'
  }
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'David Miller',
    position: 'CEO & Founder',
    company: 'Apex Global Tech (UK)',
    rating: 5,
    review: 'BRANIFY completely transformed our brand position. The React web application they built is insanely fast and our international conversion rate jumped by 310% within two months.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  },
  {
    id: 'test-2',
    name: 'Amina Al-Mansoor',
    position: 'Managing Director',
    company: 'Lumina Living (Dubai)',
    rating: 5,
    review: 'The brand identity kit, logo guidelines, and WooCommerce store delivered by BRANIFY surpassed our expectations. Truly a world-class international agency experience.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  },
  {
    id: 'test-3',
    name: 'Hamza Farooq',
    position: 'Operations Lead',
    company: 'Zenith Freight (Pakistan)',
    rating: 5,
    review: 'Their AI solution integration reduced our customer support ticket response time to under 6 seconds. Outstanding technical capability and transparent communication.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isDemo: false
  }
];
