import React from 'react';
import { Home, MapPin, Camera, LayoutDashboard, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsReportModalOpen, setIsAIChatbotOpen, activeRole } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-2xl safe-area-bottom">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
          activeTab === 'home' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      <button
        onClick={() => setActiveTab('map')}
        className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
          activeTab === 'map' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Map</span>
      </button>

      {/* Floating Big Action Button */}
      <div className="relative -top-5">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 ring-4 ring-white active:scale-95 transition-all p-3.5"
          aria-label="Report Issue"
        >
          <Camera className="w-7 h-7 animate-pulse" />
        </button>
      </div>

      <button
        onClick={() => setActiveTab(activeRole === 'official' ? 'official' : 'dashboard')}
        className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
          activeTab === 'dashboard' || activeTab === 'official'
            ? 'text-orange-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Dashboard</span>
      </button>

      <button
        onClick={() => setIsAIChatbotOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 text-emerald-600 hover:text-emerald-800 transition-colors"
      >
        <Bot className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Nagrik AI</span>
      </button>
    </div>
  );
};
