import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { DigitalProductsPage } from './pages/DigitalProductsPage';
import { ToolsPage } from './pages/ToolsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { PolicyPage } from './pages/PolicyPages';

function MainAppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const { setPwaDeferredPrompt } = useApp();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPwaDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [setPwaDeferredPrompt]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/services') {
      return <ServicesPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage navigate={navigate} slug={slug} />;
    }
    if (currentPath === '/digital-products' || currentPath === '/subscriptions') {
      return <DigitalProductsPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/digital-products/')) {
      return <DigitalProductsPage navigate={navigate} />;
    }
    if (currentPath === '/tools') {
      return <ToolsPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/tools/')) {
      const toolSlug = currentPath.replace('/tools/', '');
      return <ToolsPage navigate={navigate} selectedToolSlug={toolSlug} />;
    }
    if (currentPath === '/portfolio') {
      return <PortfolioPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/portfolio/')) {
      const slug = currentPath.replace('/portfolio/', '');
      return <PortfolioPage navigate={navigate} selectedSlug={slug} />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage navigate={navigate} />;
    }
    if (currentPath === '/blog') {
      return <BlogPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return <BlogPage navigate={navigate} selectedSlug={slug} />;
    }
    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (currentPath === '/cart') {
      return <CartPage navigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage navigate={navigate} />;
    }
    if (currentPath === '/privacy') {
      return <PolicyPage navigate={navigate} type="privacy" />;
    }
    if (currentPath === '/terms') {
      return <PolicyPage navigate={navigate} type="terms" />;
    }
    if (currentPath === '/refund') {
      return <PolicyPage navigate={navigate} type="refund" />;
    }
    if (currentPath === '/disclaimer') {
      return <PolicyPage navigate={navigate} type="disclaimer" />;
    }

    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-[#F27D26] selection:text-black">
      <AnnouncementBar />
      <Header currentPath={currentPath} navigate={navigate} />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer navigate={navigate} />
      <SearchModal navigate={navigate} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
