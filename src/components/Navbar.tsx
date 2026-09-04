import React, { useState } from 'react';
import {
  ShieldAlert,
  MapPin,
  LayoutDashboard,
  Trophy,
  HeartHandshake,
  Bot,
  Bell,
  Sparkles,
  Camera,
  Users,
  Building2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const {
    t,
    activeRole,
    setActiveRole,
    currentUser,
    activeTab,
    setActiveTab,
    setIsReportModalOpen,
    setIsAIChatbotOpen,
    unreadNotificationCount
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Tiranga Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 p-[2px] shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🇮🇳</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-slate-900 to-emerald-700 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200 uppercase tracking-wider">
                  AI v2.0
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 font-medium tracking-tight">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{t.navHome}</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.navReport}</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'map'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.navMap}</span>
            </button>

            <button
              onClick={() => setActiveTab(activeRole === 'official' ? 'official' : 'dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'dashboard' || activeTab === 'official'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.navDashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.navLeaderboard}</span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'impact'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.navImpact}</span>
            </button>

            <button
              onClick={() => setIsAIChatbotOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navAIChat}</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </button>
          </nav>

          {/* Right Header Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector */}
            <LanguageSelector />

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Role Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
                  activeRole === 'official'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
                title="Switch Active Persona"
              >
                {activeRole === 'official' ? (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">NMC Official</span>
                  </>
                ) : (
                  <>
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Citizen Contributor</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Workspace Role
                  </div>

                  <button
                    onClick={() => {
                      setActiveRole('citizen');
                      setActiveTab('dashboard');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-colors ${
                      activeRole === 'citizen' ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">👥 Citizen / Contributor</div>
                      <div className="text-[10px] text-slate-500">Report problems, earn points</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('official');
                      setActiveTab('official');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-colors ${
                      activeRole === 'official' ? 'bg-indigo-50 text-indigo-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">🏛️ Official / NGO / NMC</div>
                      <div className="text-[10px] text-slate-500">Triage, dispatch, proof of work</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Trigger & Points Pill */}
            <div
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 pl-1 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-orange-500 group-hover:ring-2 group-hover:ring-orange-300 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-[9px] font-black text-white px-1 rounded-full border border-white">
                  {currentUser.points}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
