import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, LogOut, CheckCircle2, Clock, FileText, Settings, ShieldCheck, Mail, Phone } from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    leads,
    updateLeadStatus,
    settings,
    updateSettings
  } = useApp();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(password);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 space-y-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-[#F27D26]">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Admin Portal Access</h1>
            <p className="text-xs text-zinc-500 mt-1">Default demo password: <code className="text-[#F27D26] font-mono">admin123</code></p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all"
            >
              Authenticate & Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F27D26] text-black font-black flex items-center justify-center">
            A
          </div>
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">BRANIFY Executive Dashboard</h1>
            <div className="text-xs text-zinc-500">Authenticated Lead Management & Agency Controls</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
              activeTab === 'leads' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Leads & Briefs ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
              activeTab === 'settings' ? 'bg-[#F27D26] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Agency Settings
          </button>
          <button
            onClick={adminLogout}
            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/20"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'leads' ? (
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">Inbound Project Inquiries</h2>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase">{lead.name}</h3>
                    <div className="text-xs text-zinc-400">{lead.company || 'Private Client'} • {lead.country}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-zinc-400 uppercase bg-zinc-900 px-3 py-1 rounded-full border border-white/10">
                      {lead.service}
                    </span>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="px-3 py-1 bg-zinc-950 border border-white/10 text-xs font-bold text-[#F27D26] rounded-xl focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 font-bold uppercase block text-[10px]">Email Contact</span>
                    <a href={`mailto:${lead.email}`} className="text-white hover:text-[#F27D26] font-semibold">{lead.email}</a>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase block text-[10px]">Budget & Timeline</span>
                    <span className="text-white font-semibold">{lead.budget} • {lead.timeline}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold uppercase block text-[10px]">Received On</span>
                    <span className="text-zinc-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-300 leading-relaxed">
                  <span className="font-extrabold text-white block uppercase text-[10px] mb-1">Project Brief Requirements:</span>
                  {lead.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl">
          <h2 className="text-base font-black text-white uppercase tracking-tight">Global Site Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Agency Email</label>
              <input
                type="text"
                value={settings.contactEmail}
                onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">WhatsApp Contact</label>
              <input
                type="text"
                value={settings.contactWhatsApp}
                onChange={(e) => updateSettings({ contactWhatsApp: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Top Announcement Text</label>
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
    </div>
  );
};
