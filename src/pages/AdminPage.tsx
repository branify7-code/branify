import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  LogOut,
  Settings,
  Mail,
  Trash2,
  Plus,
  Edit2,
  ShoppingBag,
  Newspaper,
  FolderGit2,
  Users,
  CheckCircle2,
  Eye,
  Sparkles,
  X,
  CreditCard
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const {
    isAdminLoggedIn,
    isAdminChecking,
    adminLogin,
    adminLogout,
    leads,
    updateLeadStatus,
    deleteLead,
    newsletterSubscriptions,
    deleteNewsletterSubscription,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    blogs,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    portfolio,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    orders,
    updateOrderStatus,
    deleteOrder,
    settings,
    updateSettings
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'leads' | 'newsletter' | 'products' | 'blogs' | 'portfolio' | 'orders' | 'settings'
  >('leads');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'AI Prompts',
    priceUSD: 19,
    originalPriceUSD: 29,
    description: '',
    features: '',
    image: '',
    downloadUrl: '',
    featured: false
  });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Strategy & Growth',
    coverImage: '',
    readTime: '5 min read',
    tags: 'AI, Design, SaaS',
    featured: true
  });

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    client: '',
    category: 'Web Development',
    coverImage: '',
    challenge: '',
    solution: '',
    results: '',
    technologies: 'React, TypeScript, Tailwind'
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    const result = await adminLogin(email, password);
    setIsLoggingIn(false);

    if (!result.success && result.error) {
      setLoginError(result.error);
    }
  };

  if (isAdminChecking) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#F27D26] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-zinc-400 font-extrabold uppercase tracking-widest">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 space-y-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-[#F27D26]">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Admin Portal Access</h1>
            <p className="text-xs text-zinc-500 mt-1">Authenticate using your Supabase Auth Administrator Credentials.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                Admin Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@branify.store"
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? 'Authenticating...' : 'Authenticate & Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Helper open product modal
  const handleOpenProductModal = (prod?: any) => {
    if (prod) {
      setEditingProductId(prod.id);
      setProductForm({
        title: prod.title,
        category: prod.category,
        priceUSD: prod.priceUSD,
        originalPriceUSD: prod.originalPriceUSD || prod.priceUSD + 10,
        description: prod.description,
        features: prod.features.join(', '),
        image: prod.images[0] || '',
        downloadUrl: prod.downloadUrl || '',
        featured: prod.featured || false
      });
    } else {
      setEditingProductId(null);
      setProductForm({
        title: '',
        category: 'AI Prompts',
        priceUSD: 19,
        originalPriceUSD: 29,
        description: '',
        features: 'Commercial License, Lifetime Updates',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
        downloadUrl: '',
        featured: false
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = productForm.features.split(',').map((f) => f.trim()).filter(Boolean);
    const tagArray = [productForm.category, 'Digital'];

    if (editingProductId) {
      await updateProduct(editingProductId, {
        title: productForm.title,
        category: productForm.category,
        priceUSD: Number(productForm.priceUSD),
        originalPriceUSD: Number(productForm.originalPriceUSD),
        description: productForm.description,
        features: featArray,
        images: [productForm.image],
        tags: tagArray,
        featured: productForm.featured,
        downloadUrl: productForm.downloadUrl
      });
    } else {
      await addProduct({
        title: productForm.title,
        slug: productForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: productForm.category,
        priceUSD: Number(productForm.priceUSD),
        originalPriceUSD: Number(productForm.originalPriceUSD),
        description: productForm.description,
        features: featArray,
        images: [productForm.image],
        tags: tagArray,
        featured: productForm.featured,
        downloadUrl: productForm.downloadUrl
      });
    }
    setIsProductModalOpen(false);
  };

  // Helper open blog modal
  const handleOpenBlogModal = (b?: any) => {
    if (b) {
      setEditingBlogId(b.id);
      setBlogForm({
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        coverImage: b.coverImage,
        readTime: b.readTime,
        tags: b.tags.join(', '),
        featured: b.featured ?? true
      });
    } else {
      setEditingBlogId(null);
      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        category: 'Strategy & Growth',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
        readTime: '5 min read',
        tags: 'AI, Growth, Engineering',
        featured: true
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = blogForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingBlogId) {
      await updateBlogPost(editingBlogId, {
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        category: blogForm.category,
        coverImage: blogForm.coverImage,
        readTime: blogForm.readTime,
        tags: tagArray,
        featured: blogForm.featured
      });
    } else {
      await addBlogPost({
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        category: blogForm.category,
        author: {
          name: 'BRANIFY Lead Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          role: 'Technology Partner'
        },
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: blogForm.readTime,
        coverImage: blogForm.coverImage,
        tags: tagArray,
        featured: blogForm.featured
      });
    }
    setIsBlogModalOpen(false);
  };

  // Helper open portfolio modal
  const handleOpenPortfolioModal = (pt?: any) => {
    if (pt) {
      setEditingPortfolioId(pt.id);
      setPortfolioForm({
        title: pt.title,
        client: pt.client,
        category: pt.category,
        coverImage: pt.coverImage,
        challenge: pt.challenge,
        solution: pt.solution,
        results: pt.results.join(', '),
        technologies: pt.technologies.join(', ')
      });
    } else {
      setEditingPortfolioId(null);
      setPortfolioForm({
        title: '',
        client: '',
        category: 'Web Development',
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
        challenge: '',
        solution: '',
        results: '300% conversion boost',
        technologies: 'React, Supabase, Tailwind'
      });
    }
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = portfolioForm.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    const resArray = portfolioForm.results.split(',').map((r) => r.trim()).filter(Boolean);

    if (editingPortfolioId) {
      await updatePortfolioItem(editingPortfolioId, {
        title: portfolioForm.title,
        client: portfolioForm.client,
        category: portfolioForm.category as any,
        coverImage: portfolioForm.coverImage,
        challenge: portfolioForm.challenge,
        solution: portfolioForm.solution,
        results: resArray,
        technologies: techArray
      });
    } else {
      await addPortfolioItem({
        slug: portfolioForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: portfolioForm.title,
        client: portfolioForm.client,
        industry: portfolioForm.category,
        year: '2026',
        category: portfolioForm.category as any,
        challenge: portfolioForm.challenge,
        solution: portfolioForm.solution,
        results: resArray,
        technologies: techArray,
        coverImage: portfolioForm.coverImage,
        galleryImages: [portfolioForm.coverImage],
        featured: true
      });
    }
    setIsPortfolioModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F27D26] text-black font-black flex items-center justify-center shrink-0">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white uppercase tracking-tight">BRANIFY Executive Dashboard</h1>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase rounded-full">
                Supabase Connected
              </span>
            </div>
            <div className="text-xs text-zinc-500">Authenticated Single Owner Admin Control Center</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'leads' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Leads ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'newsletter' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Newsletter ({newsletterSubscriptions.length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'blogs' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            Blogs ({blogs.length})
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'portfolio' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Portfolio ({portfolio.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>

          <button
            onClick={adminLogout}
            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/20 transition-colors cursor-pointer"
            title="Logout Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab 1: Leads & Briefs */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
              Inbound Project Briefs & Contacts (<code className="text-[#F27D26]">contact_submissions</code>)
            </h2>
          </div>

          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="p-8 bg-[#080808] border border-white/10 rounded-2xl text-center text-zinc-500 text-xs">
                No inbound project inquiries found.
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase">{lead.name}</h3>
                      <div className="text-xs text-zinc-400">
                        {lead.company || 'Private Client'} • {lead.country}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-extrabold text-zinc-400 uppercase bg-zinc-900 px-3 py-1 rounded-full border border-white/10">
                        {lead.service}
                      </span>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="px-3 py-1.5 bg-zinc-950 border border-white/10 text-xs font-bold text-[#F27D26] rounded-xl focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete Brief"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Email Contact</span>
                      <a href={`mailto:${lead.email}`} className="text-white hover:text-[#F27D26] font-semibold">
                        {lead.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Budget & Timeline</span>
                      <span className="text-white font-semibold">
                        {lead.budget} • {lead.timeline}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-bold uppercase block text-[10px]">Received On</span>
                      <span className="text-zinc-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    <span className="font-extrabold text-white block uppercase text-[10px] mb-1">Project Brief Requirements:</span>
                    {lead.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Newsletter Subscriptions */}
      {activeTab === 'newsletter' && (
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
            Newsletter Subscribers (<code className="text-[#F27D26]">newsletter_subscriptions</code>)
          </h2>

          <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {newsletterSubscriptions.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-xs">No newsletter subscribers yet.</div>
            ) : (
              <div className="divide-y divide-white/10">
                <div className="grid grid-cols-12 gap-4 p-4 text-[10px] font-extrabold text-zinc-500 uppercase bg-zinc-950">
                  <div className="col-span-5">Subscriber Email</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-3">Subscribed Date</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                {newsletterSubscriptions.map((sub) => (
                  <div key={sub.id} className="grid grid-cols-12 gap-4 p-4 text-xs items-center text-zinc-300">
                    <div className="col-span-5 font-semibold text-white">{sub.email}</div>
                    <div className="col-span-3">
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full uppercase">
                        {sub.status}
                      </span>
                    </div>
                    <div className="col-span-3 text-zinc-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </div>
                    <div className="col-span-1 text-right">
                      <button
                        onClick={() => deleteNewsletterSubscription(sub.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 rounded-lg transition-colors"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Digital Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
              Digital Marketplace Catalog (<code className="text-[#F27D26]">products</code>)
            </h2>
            <button
              onClick={() => handleOpenProductModal()}
              className="px-4 py-2 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-black" />
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-lg">
                <div className="h-40 relative bg-zinc-900">
                  <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#F27D26] border border-white/10 text-[10px] font-extrabold uppercase rounded-lg">
                    {prod.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{prod.title}</h3>
                    <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{prod.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="text-sm font-black text-white">
                      ${prod.priceUSD}{' '}
                      {prod.originalPriceUSD && (
                        <span className="line-through text-zinc-500 text-xs font-normal">${prod.originalPriceUSD}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-white/10 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Blog Posts */}
      {activeTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
              Editorial Blog Articles (<code className="text-[#F27D26]">blog_posts</code>)
            </h2>
            <button
              onClick={() => handleOpenBlogModal()}
              className="px-4 py-2 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-black" />
              Write New Post
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((b) => (
              <div key={b.id} className="bg-[#080808] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-extrabold uppercase rounded-md">
                      {b.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold">{b.readTime}</span>
                  </div>
                  <h3 className="font-black text-white text-base leading-snug">{b.title}</h3>
                  <p className="text-zinc-400 text-xs line-clamp-2">{b.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">{b.publishedAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenBlogModal(b)}
                      className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-white/10 cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBlogPost(b.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Portfolio Showcase */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
              Client Case Studies (<code className="text-[#F27D26]">portfolio_items</code>)
            </h2>
            <button
              onClick={() => handleOpenPortfolioModal()}
              className="px-4 py-2 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-black" />
              Add Case Study
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((pt) => (
              <div key={pt.id} className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-lg">
                <div className="h-44 relative bg-zinc-900">
                  <img src={pt.coverImage} alt={pt.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-white border border-white/10 text-[10px] font-extrabold uppercase rounded-lg">
                    {pt.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{pt.title}</h3>
                    <div className="text-xs text-[#F27D26] font-semibold mt-0.5">Client: {pt.client}</div>
                    <p className="text-zinc-400 text-xs mt-2 line-clamp-2">{pt.challenge}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">{pt.technologies.join(' • ')}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenPortfolioModal(pt)}
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-white/10 cursor-pointer"
                        title="Edit Case Study"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deletePortfolioItem(pt.id)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 cursor-pointer"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Orders & Sales */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">
            Store Orders (<code className="text-[#F27D26]">orders</code> & <code className="text-[#F27D26]">order_items</code>)
          </h2>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="p-8 bg-[#080808] border border-white/10 rounded-2xl text-center text-zinc-500 text-xs">
                No customer orders recorded yet.
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-white">{ord.orderNumber}</h3>
                        <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-full uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Customer: <span className="text-white font-semibold">{ord.customerName}</span> ({ord.customerEmail})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-bold text-zinc-500 uppercase">Total Paid</div>
                        <div className="text-base font-black text-[#F27D26]">${ord.totalAmount}</div>
                      </div>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="px-3 py-1.5 bg-zinc-950 border border-white/10 text-xs font-bold text-white rounded-xl focus:outline-none"
                      >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                      <button
                        onClick={() => deleteOrder(ord.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {ord.items && ord.items.length > 0 && (
                    <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl space-y-2">
                      <div className="text-[10px] font-extrabold text-zinc-500 uppercase">Purchased Items:</div>
                      {ord.items.map((oi) => (
                        <div key={oi.id} className="flex justify-between text-xs text-zinc-300">
                          <span>
                            {oi.productTitle} × {oi.quantity}
                          </span>
                          <span className="font-semibold text-white">${oi.totalPrice}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 7: Agency Settings */}
      {activeTab === 'settings' && (
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl shadow-xl">
          <h2 className="text-base font-black text-white uppercase tracking-tight">Global Agency Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                Official Agency Email
              </label>
              <input
                type="text"
                value={settings.contactEmail}
                onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                WhatsApp Phone Contact
              </label>
              <input
                type="text"
                value={settings.contactWhatsApp}
                onChange={(e) => updateSettings({ contactWhatsApp: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => updateSettings({ announcementText: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal: Product Add/Edit */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white uppercase">
                {editingProductId ? 'Edit Product' : 'Add New Digital Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="AI Prompts">AI Prompts</option>
                    <option value="Canva Templates">Canva Templates</option>
                    <option value="Notion Templates">Notion Templates</option>
                    <option value="Presentation Templates">Presentation Templates</option>
                    <option value="Website Templates">Website Templates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={productForm.priceUSD}
                    onChange={(e) => setProductForm({ ...productForm, priceUSD: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.features}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F27D26] text-black text-xs font-black uppercase rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Blog Add/Edit */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white uppercase">{editingBlogId ? 'Edit Blog Article' : 'Write New Blog Article'}</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={blogForm.coverImage}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Full Markdown Content</label>
                <textarea
                  rows={4}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#F27D26] text-black text-xs font-black uppercase rounded-xl">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Portfolio Add/Edit */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white uppercase">{editingPortfolioId ? 'Edit Case Study' : 'Add New Case Study'}</h3>
              <button onClick={() => setIsPortfolioModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Client Name</label>
                  <input
                    type="text"
                    value={portfolioForm.client}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={portfolioForm.coverImage}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Challenge</label>
                <textarea
                  rows={2}
                  value={portfolioForm.challenge}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, challenge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-zinc-400 uppercase mb-1">Solution</label>
                <textarea
                  rows={2}
                  value={portfolioForm.solution}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, solution: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#F27D26] text-black text-xs font-black uppercase rounded-xl">
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

