import React from 'react';
import { ShieldCheck, FileText, RefreshCw } from 'lucide-react';

interface PolicyProps {
  navigate: (path: string) => void;
  type: 'privacy' | 'terms' | 'refund' | 'disclaimer';
}

export const PolicyPage: React.FC<PolicyProps> = ({ navigate, type }) => {
  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'refund': return 'Refund & Cancellation Policy';
      default: return 'Legal Disclaimer';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        ← Back to Home
      </button>

      <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">{getTitle()}</h1>
        <div className="text-xs text-zinc-500 font-bold uppercase">Last Updated: January 1, 2026</div>

        <div className="text-xs text-zinc-300 leading-relaxed space-y-4 font-normal">
          <p>
            At BRANIFY (branify.store), we are committed to upholding transparency, data privacy, and ethical software development standards for all international clients and store visitors.
          </p>

          <h3 className="text-sm font-bold text-white uppercase pt-2">1. Information Collection & Usage</h3>
          <p>
            We collect personal information necessary to deliver custom web services, invoice processing, and instant digital asset downloads (such as your name, email address, and project brief requirements). We never sell or rent your personal information to third parties.
          </p>

          <h3 className="text-sm font-bold text-white uppercase pt-2">2. Digital Store & Instant Downloads</h3>
          <p>
            All digital products, including AI Prompt Kits, Canva Design Templates, and Notion Workspaces, are delivered electronically via email and instant portal access upon order confirmation.
          </p>

          <h3 className="text-sm font-bold text-white uppercase pt-2">3. Refund & Satisfaction Guarantee</h3>
          <p>
            Because digital assets are delivered instantly in full source format, sales of digital downloads are final once delivered. For custom agency services (Website Development, Branding, AI Solutions), refunds are governed by the custom milestone agreement signed prior to project commencement.
          </p>
        </div>
      </div>
    </div>
  );
};
