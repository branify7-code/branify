import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Currency,
  CurrencyRate,
  ServiceItem,
  ProductItem,
  ToolItem,
  PortfolioItem,
  BlogPost,
  Testimonial,
  ProjectRequestLead,
  SiteSettings,
  CartItem
} from '../types';
import { INITIAL_SERVICES } from '../data/servicesData';
import { INITIAL_PRODUCTS } from '../data/productsData';
import { INITIAL_TOOLS } from '../data/toolsData';
import { INITIAL_PORTFOLIO } from '../data/portfolioData';
import { INITIAL_BLOGS } from '../data/blogData';
import { INITIAL_SITE_SETTINGS, INITIAL_TESTIMONIALS } from '../data/initialState';

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amt) => `$${amt.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  },
  PKR: {
    code: 'PKR',
    symbol: 'PKR ',
    rate: 278.0,
    format: (amt) => `PKR ${(amt * 278).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rate: 3.67,
    format: (amt) => `AED ${(amt * 3.67).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  }
};

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
}

interface AppContextType {
  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Announcement Bar
  announcementDismissed: boolean;
  setAnnouncementDismissed: (d: boolean) => void;

  // Data Collections (Admin Editable)
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => void;

  services: ServiceItem[];
  products: ProductItem[];
  tools: ToolItem[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  leads: ProjectRequestLead[];

  // Admin CRUD
  addLead: (lead: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: ProjectRequestLead['status'], notes?: string) => void;
  
  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (pwd: string) => boolean;
  adminLogout: () => void;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // PWA Prompt
  pwaDeferredPrompt: any;
  setPwaDeferredPrompt: (prompt: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Currency State
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('branify_currency') as Currency) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('branify_currency', currency);
  }, [currency]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('branify_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('branify_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('branify_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('branify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Announcement Bar
  const [announcementDismissed, setAnnouncementDismissed] = useState(() => {
    return localStorage.getItem('branify_announcement_dismissed') === 'true';
  });

  // Site Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('branify_settings');
    return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
  });

  const updateSettings = (updated: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updated };
      localStorage.setItem('branify_settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Data Collections
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [tools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [portfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [blogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Leads
  const [leads, setLeads] = useState<ProjectRequestLead[]>(() => {
    const saved = localStorage.getItem('branify_leads');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'lead-1',
            name: 'Alexander Wright',
            email: 'alex@apexglobal.co.uk',
            company: 'Apex Global Tech',
            country: 'United Kingdom',
            service: 'Website Development',
            budget: '$1,000 - $3,000',
            timeline: '2-3 Weeks',
            description: 'Redesign of our SaaS platform homepage with AI chatbot widget.',
            status: 'Proposal Sent',
            createdAt: new Date().toISOString()
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('branify_leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ProjectRequestLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);
    addToast('Project request submitted successfully! Our strategy team will contact you within 24 hours.', 'success');
  };

  const updateLeadStatus = (id: string, status: ProjectRequestLead['status'], notes?: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l))
    );
    addToast(`Lead status updated to "${status}"`, 'info');
  };

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('branify_admin_session') === 'true';
  });

  const adminLogin = (password: string) => {
    if (password === 'admin123' || password === 'branify2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('branify_admin_session', 'true');
      addToast('Welcome back, Admin! Session authenticated.', 'success');
      return true;
    }
    addToast('Invalid admin password. Try "admin123"', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('branify_admin_session');
    addToast('Logged out of admin dashboard.', 'info');
  };

  // Cart Functions
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addToast(`Added "${item.title}" to cart!`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalUSD = cart.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Currency Helpers
  const formatPrice = (amountUSD: number) => {
    const rateObj = CURRENCY_RATES[currency];
    return rateObj.format(amountUSD);
  };

  const convertPrice = (amountUSD: number) => {
    return amountUSD * CURRENCY_RATES[currency].rate;
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // PWA Prompt
  const [pwaDeferredPrompt, setPwaDeferredPrompt] = useState<any>(null);

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalUSD,
        wishlist,
        toggleWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        announcementDismissed,
        setAnnouncementDismissed,
        settings,
        updateSettings,
        services,
        products,
        tools,
        portfolio,
        blogs,
        testimonials,
        leads,
        addLead,
        updateLeadStatus,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        toasts,
        addToast,
        removeToast,
        pwaDeferredPrompt,
        setPwaDeferredPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
