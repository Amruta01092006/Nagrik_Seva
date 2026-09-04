import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LiveCommunityTicker } from './components/LiveCommunityTicker';
import { HeroSection } from './components/HeroSection';
import { RoleSelectorCards } from './components/RoleSelectorCards';
import { CitizenDashboard } from './components/CitizenDashboard';
import { OfficialDashboard } from './components/OfficialDashboard';
import { CivicMap } from './components/CivicMap';
import { Leaderboard } from './components/Leaderboard';
import { ImpactFund } from './components/ImpactFund';
import { UserProfile } from './components/UserProfile';
import { ReportModal } from './components/ReportModal';
import { NagrikAIChatbot } from './components/NagrikAIChatbot';
import { IssueDetailsModal } from './components/IssueDetailsModal';
import { NotificationCenter } from './components/NotificationCenter';
import { AuthModal } from './components/AuthModal';
import { Heart, ShieldCheck, PhoneCall, Sparkles, MapPin } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, activeRole, t } = useApp();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 lg:pb-0">
      
      {/* Navbar */}
      <Navbar onOpenNotifications={() => setIsNotificationOpen(true)} />

      {/* Live Ticker */}
      {activeTab === 'home' && <LiveCommunityTicker />}

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection />
            <RoleSelectorCards />
            {activeRole === 'official' ? <OfficialDashboard /> : <CitizenDashboard />}
          </div>
        )}

        {activeTab === 'map' && <CivicMap />}

        {activeTab === 'dashboard' && <CitizenDashboard />}

        {activeTab === 'official' && <OfficialDashboard />}

        {activeTab === 'leaderboard' && <Leaderboard />}

        {activeTab === 'impact' && <ImpactFund />}

        {activeTab === 'profile' && <UserProfile />}
      </main>

      {/* Interactive Global Modals & Drawers */}
      <ReportModal />
      <NagrikAIChatbot />
      <IssueDetailsModal />
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <AuthModal />

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-base font-extrabold text-white">
                  Nagrik Seva
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                «Your Voice. Your City. Your Responsibility.» A next-generation AI-powered civic technology platform uniting citizens, municipal authorities, NGOs, and volunteers for cleaner, safer Indian cities.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Municipal Quick Helplines
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>📞 NMC Central Control: <strong>1800-233-3764</strong></li>
                <li>🚨 Road & Pothole Cell: <strong>0712-2567035</strong></li>
                <li>🌧️ Flood & Drainage Emergency: <strong>101 / 1077</strong></li>
                <li>💡 Streetlight Helpline: <strong>1912</strong></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Core AI Capabilities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>✨ Multi-Spectral Image Recognition</li>
                <li>⚡ 1–10 Severity Score Engine</li>
                <li>📍 Geospatial Duplicate Detection</li>
                <li>🛡️ Anti-Spam & Fake Report Verification</li>
                <li>🗣️ 5-Language NLP Assistant</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Social Impact & Transparency
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every reported issue is geotagged and open for community tracking. Proof of Work photos must be certified before municipal closure.
              </p>
              <div className="pt-2 flex items-center space-x-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Transparent Citizen Audit Trail</span>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <div>
              © 2026 Nagrik Seva 🇮🇳. Built for Social Impact & Smart City Innovation.
            </div>
            <div className="flex items-center space-x-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Open Data Charter</span>
              <span>•</span>
              <span>Ward Directory</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
