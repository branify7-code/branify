import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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

export interface NewsletterSubscription {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface SupabaseOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  paymentMethod?: string;
  paymentId?: string;
  createdAt: string;
  items?: SupabaseOrderItem[];
}

export interface SupabaseOrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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
  newsletterSubscriptions: NewsletterSubscription[];
  orders: SupabaseOrder[];

  // Admin CRUD
  addLead: (lead: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: ProjectRequestLead['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addNewsletterSubscription: (email: string) => Promise<boolean>;
  deleteNewsletterSubscription: (id: string) => Promise<void>;

  // Products CRUD
  addProduct: (product: Omit<ProductItem, 'id' | 'rating' | 'reviewsCount'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<ProductItem>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Blogs CRUD
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  // Portfolio CRUD
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;

  // Orders CRUD
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  isAdminChecking: boolean;
  adminLogin: (email: string, pwd: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // PWA Prompt
  pwaDeferredPrompt: any;
  setPwaDeferredPrompt: (prompt: any) => void;

  refreshData: () => Promise<void>;
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
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [tools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);

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

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminChecking, setIsAdminChecking] = useState(true);

  // Function to fetch data from Supabase if configured
  const refreshData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      // 1. Fetch Products
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!prodErr && dbProducts && dbProducts.length > 0) {
        const mappedProducts: ProductItem[] = dbProducts.map((p: any) => ({
          id: p.id,
          slug: p.slug || p.id,
          title: p.title,
          category: p.category,
          priceUSD: Number(p.price) || 0,
          originalPriceUSD: p.sale_price ? Number(p.sale_price) : undefined,
          rating: 5,
          reviewsCount: 12,
          featured: p.is_featured ?? false,
          description: p.description || '',
          features: p.download_info?.features || [],
          images: p.image ? [p.image] : [],
          tags: p.download_info?.tags || [p.category],
          downloadUrl: p.download_info?.file_url
        }));
        setProducts(mappedProducts);
      }

      // 2. Fetch Blog Posts
      const { data: dbBlogs, error: blogErr } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!blogErr && dbBlogs && dbBlogs.length > 0) {
        const mappedBlogs: BlogPost[] = dbBlogs.map((b: any) => ({
          id: b.id,
          slug: b.slug || b.id,
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          category: b.category,
          author: {
            name: b.author || 'BRANIFY Editorial',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            role: 'Tech Strategist'
          },
          publishedAt: b.date || b.created_at,
          readTime: b.read_time || '5 min read',
          coverImage: b.image,
          tags: b.tags || [],
          featured: b.is_published
        }));
        setBlogs(mappedBlogs);
      }

      // 3. Fetch Portfolio
      const { data: dbPort, error: portErr } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!portErr && dbPort && dbPort.length > 0) {
        const mappedPortfolio: PortfolioItem[] = dbPort.map((pt: any) => ({
          id: pt.id,
          slug: pt.slug || pt.id,
          title: pt.title,
          client: pt.client || 'Private Client',
          industry: pt.category || 'Technology',
          year: '2026',
          category: (pt.category as any) || 'Web Development',
          challenge: pt.challenge || pt.description || '',
          solution: pt.solution || '',
          results: pt.results ? [pt.results] : [],
          technologies: pt.tags || [],
          coverImage: pt.image,
          galleryImages: [pt.image],
          featured: true
        }));
        setPortfolio(mappedPortfolio);
      }

      // If Admin is logged in, fetch admin-protected tables
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch Contact Submissions
        const { data: dbLeads } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbLeads) {
          const mappedLeads: ProjectRequestLead[] = dbLeads.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            company: '',
            country: 'Global',
            service: c.subject || 'General Inquiry',
            budget: 'N/A',
            timeline: 'N/A',
            description: c.message,
            status: (c.status as any) || 'New',
            createdAt: c.created_at
          }));
          setLeads(mappedLeads);
        }

        // Fetch Newsletter Subscriptions
        const { data: dbNews } = await supabase
          .from('newsletter_subscriptions')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbNews) {
          setNewsletterSubscriptions(dbNews.map((n: any) => ({
            id: n.id,
            email: n.email,
            status: n.status,
            createdAt: n.created_at
          })));
        }

        // Fetch Orders
        const { data: dbOrders } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (dbOrders) {
          setOrders(dbOrders.map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            customerName: o.customer_name,
            customerEmail: o.customer_email,
            totalAmount: Number(o.total_amount),
            status: o.status,
            paymentMethod: o.payment_method,
            paymentId: o.payment_id,
            createdAt: o.created_at,
            items: (o.order_items || []).map((oi: any) => ({
              id: oi.id,
              orderId: oi.order_id,
              productId: oi.product_id,
              productTitle: oi.product_title,
              quantity: oi.quantity,
              unitPrice: Number(oi.unit_price),
              totalPrice: Number(oi.total_price)
            }))
          })));
        }
      }
    } catch (err) {
      console.error('Error fetching Supabase data:', err);
    }
  }, []);

  // Check admin auth state on mount and subscribe to session changes
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsAdminChecking(false);
      return;
    }

    const checkAdminSession = async (session: any) => {
      if (!session?.user) {
        setIsAdminLoggedIn(false);
        setIsAdminChecking(false);
        return;
      }

      try {
        const { data: adminRow, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();

        if (adminRow && !error) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
          await supabase.auth.signOut();
        }
      } catch (err) {
        setIsAdminLoggedIn(false);
      } finally {
        setIsAdminChecking(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData, isAdminLoggedIn]);

  // Admin Auth Methods
  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured() || !supabase) {
      const error = 'Supabase client is not configured.';
      addToast(error, 'error');
      return { success: false, error };
    }

    try {
      const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authErr || !authData.user) {
        const error = authErr?.message || 'Invalid email or password credentials.';
        addToast(error, 'error');
        return { success: false, error };
      }

      // Check if logged in user's ID exists in admin_users table
      const { data: adminRow, error: adminErr } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (adminErr || !adminRow) {
        await supabase.auth.signOut();
        setIsAdminLoggedIn(false);
        const error = 'Unauthorized access: Account is not listed in admin_users.';
        addToast(error, 'error');
        return { success: false, error };
      }

      setIsAdminLoggedIn(true);
      addToast('Welcome back, Admin! Session authenticated.', 'success');
      await refreshData();
      return { success: true };
    } catch (err: any) {
      const error = err?.message || 'An error occurred during authentication.';
      addToast(error, 'error');
      return { success: false, error };
    }
  };

  const adminLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAdminLoggedIn(false);
    addToast('Logged out of admin dashboard.', 'info');
  };

  // Public/Admin CRUD Functions

  // Leads / Contact Submissions
  const addLead = async (leadData: Omit<ProjectRequestLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ProjectRequestLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').insert([
          {
            name: leadData.name,
            email: leadData.email,
            subject: leadData.service || 'Project Inquiry',
            message: `Company: ${leadData.company || 'N/A'}\nCountry: ${leadData.country || 'N/A'}\nBudget: ${leadData.budget || 'N/A'}\nTimeline: ${leadData.timeline || 'N/A'}\n\n${leadData.description}`,
            status: 'new'
          }
        ]);
      } catch (err) {
        console.error('Error inserting contact submission to Supabase:', err);
      }
    }

    addToast('Project request submitted successfully! Our strategy team will contact you within 24 hours.', 'success');
  };

  const updateLeadStatus = async (id: string, status: ProjectRequestLead['status'], notes?: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l))
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Error updating contact submission in Supabase:', err);
      }
    }

    addToast(`Lead status updated to "${status}"`, 'info');
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_submissions').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting contact submission from Supabase:', err);
      }
    }
    addToast('Lead deleted.', 'info');
  };

  // Newsletter Subscriptions
  const addNewsletterSubscription = async (email: string): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('newsletter_subscriptions').insert([
          { email, status: 'subscribed' }
        ]);
        if (error) {
          if (error.code === '23505') {
            addToast('You are already subscribed to BRANIFY Insider!', 'info');
            return true;
          }
          console.error('Supabase newsletter insert error:', error);
        }
      } catch (err) {
        console.error('Newsletter error:', err);
      }
    }
    setNewsletterSubscriptions((prev) => [
      { id: `news-${Date.now()}`, email, status: 'subscribed', createdAt: new Date().toISOString() },
      ...prev
    ]);
    addToast('Thank you for subscribing to BRANIFY Insider!', 'success');
    return true;
  };

  const deleteNewsletterSubscription = async (id: string) => {
    setNewsletterSubscriptions((prev) => prev.filter((n) => n.id !== id));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('newsletter_subscriptions').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting newsletter subscriber from Supabase:', err);
      }
    }
    addToast('Subscriber removed.', 'info');
  };

  // Products CRUD
  const addProduct = async (productData: Omit<ProductItem, 'id' | 'rating' | 'reviewsCount'>) => {
    const slug = productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('products').insert([
          {
            title: productData.title,
            slug,
            description: productData.description,
            category: productData.category,
            image: productData.images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
            price: productData.priceUSD,
            sale_price: productData.originalPriceUSD || null,
            product_type: 'digital',
            download_info: {
              features: productData.features,
              tags: productData.tags,
              file_url: productData.downloadUrl
            },
            is_featured: productData.featured || false,
            is_active: true
          }
        ]);
        if (error) {
          addToast(`Failed to add product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding product:', err);
      }
    }

    await refreshData();
    addToast(`Product "${productData.title}" created successfully!`, 'success');
  };

  const updateProduct = async (id: string, updates: Partial<ProductItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.description) dbUpdates.description = updates.description;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.priceUSD !== undefined) dbUpdates.price = updates.priceUSD;
        if (updates.originalPriceUSD !== undefined) dbUpdates.sale_price = updates.originalPriceUSD;
        if (updates.featured !== undefined) dbUpdates.is_featured = updates.featured;
        if (updates.images && updates.images.length > 0) dbUpdates.image = updates.images[0];

        const { error } = await supabase.from('products').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating product:', err);
      }
    }

    await refreshData();
    addToast('Product updated successfully!', 'success');
  };

  const deleteProduct = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete product: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product deleted.', 'info');
  };

  // Blog Posts CRUD
  const addBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('blog_posts').insert([
          {
            title: postData.title,
            slug,
            excerpt: postData.excerpt,
            content: postData.content,
            author: postData.author.name,
            category: postData.category,
            image: postData.coverImage,
            read_time: postData.readTime,
            date: new Date().toISOString().split('T')[0],
            tags: postData.tags,
            is_published: postData.featured ?? true
          }
        ]);
        if (error) {
          addToast(`Failed to add blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding blog post:', err);
      }
    }

    await refreshData();
    addToast(`Blog post "${postData.title}" published!`, 'success');
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.excerpt) dbUpdates.excerpt = updates.excerpt;
        if (updates.content) dbUpdates.content = updates.content;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.coverImage) dbUpdates.image = updates.coverImage;
        if (updates.readTime) dbUpdates.read_time = updates.readTime;
        if (updates.tags) dbUpdates.tags = updates.tags;
        if (updates.featured !== undefined) dbUpdates.is_published = updates.featured;

        const { error } = await supabase.from('blog_posts').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating blog post:', err);
      }
    }

    await refreshData();
    addToast('Blog post updated.', 'success');
  };

  const deleteBlogPost = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete blog post: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting blog post:', err);
      }
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    addToast('Blog post deleted.', 'info');
  };

  // Portfolio Items CRUD
  const addPortfolioItem = async (itemData: Omit<PortfolioItem, 'id'>) => {
    const slug = itemData.slug || itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('portfolio_items').insert([
          {
            title: itemData.title,
            slug,
            description: itemData.challenge,
            category: itemData.category,
            client: itemData.client,
            image: itemData.coverImage,
            tags: itemData.technologies,
            challenge: itemData.challenge,
            solution: itemData.solution,
            results: itemData.results[0] || ''
          }
        ]);
        if (error) {
          addToast(`Failed to add portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error adding portfolio item:', err);
      }
    }

    await refreshData();
    addToast(`Portfolio item "${itemData.title}" created!`, 'success');
  };

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdates: any = {};
        if (updates.title) dbUpdates.title = updates.title;
        if (updates.client) dbUpdates.client = updates.client;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.coverImage) dbUpdates.image = updates.coverImage;
        if (updates.challenge) dbUpdates.challenge = updates.challenge;
        if (updates.solution) dbUpdates.solution = updates.solution;
        if (updates.results) dbUpdates.results = updates.results[0] || '';
        if (updates.technologies) dbUpdates.tags = updates.technologies;

        const { error } = await supabase.from('portfolio_items').update(dbUpdates).eq('id', id);
        if (error) {
          addToast(`Failed to update portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error updating portfolio item:', err);
      }
    }

    await refreshData();
    addToast('Portfolio item updated.', 'success');
  };

  const deletePortfolioItem = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
        if (error) {
          addToast(`Failed to delete portfolio item: ${error.message}`, 'error');
          return;
        }
      } catch (err) {
        console.error('Error deleting portfolio item:', err);
      }
    }
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    addToast('Portfolio item deleted.', 'info');
  };

  // Orders CRUD
  const updateOrderStatus = async (id: string, status: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Error updating order status:', err);
      }
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addToast(`Order status updated to ${status}.`, 'info');
  };

  const deleteOrder = async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('orders').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting order:', err);
      }
    }
    setOrders((prev) => prev.filter((o) => o.id !== id));
    addToast('Order deleted.', 'info');
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
        newsletterSubscriptions,
        orders,
        addLead,
        updateLeadStatus,
        deleteLead,
        addNewsletterSubscription,
        deleteNewsletterSubscription,
        addProduct,
        updateProduct,
        deleteProduct,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        updateOrderStatus,
        deleteOrder,
        isAdminLoggedIn,
        isAdminChecking,
        adminLogin,
        adminLogout,
        toasts,
        addToast,
        removeToast,
        pwaDeferredPrompt,
        setPwaDeferredPrompt,
        refreshData
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

