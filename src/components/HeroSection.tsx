import React from 'react';
import {
  Camera,
  MapPin,
  Sparkles,
  Bot,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Award,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { t, setIsReportModalOpen, setActiveTab, issues } = useApp();

  const totalReports = issues.length + 1240;
  const resolvedReports = issues.filter(i => i.status === 'resolved').length + 1084;
  const resolutionRate = Math.round((resolvedReports / totalReports) * 100);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
      
      {/* Background Subtle Animated City Grid & Ambient Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>AI-Powered Civic Action Platform 🇮🇳</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              See a Problem?{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Be the Solution.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              «{t.heroSubheading}»
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 transition-all flex items-center justify-center space-x-2.5 group"
              >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>🚨 {t.reportProblemBtn}</span>
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-base border border-slate-700 hover:border-slate-600 shadow-md backdrop-blur-md transition-all flex items-center justify-center space-x-2.5"
              >
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>🗺️ {t.exploreMapBtn}</span>
              </button>
            </div>

            {/* Quick Flow Pillars */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                <div className="text-orange-400 text-xs font-bold mb-1 flex items-center space-x-1">
                  <Bot className="w-3.5 h-3.5" />
                  <span>1. AI Vision</span>
                </div>
                <p className="text-[11px] text-slate-400">Classifies severity 1-10 & auto-routes</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                <div className="text-blue-400 text-xs font-bold mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>2. Geotag & Ward</span>
                </div>
                <p className="text-[11px] text-slate-400">Notifies field squads near location</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                <div className="text-emerald-400 text-xs font-bold mb-1 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>3. Proof & Points</span>
                </div>
                <p className="text-[11px] text-slate-400">Before/After proof & rewards</p>
              </div>
            </div>

          </div>

          {/* Right Interactive Civic Visualization Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header Ticker */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/70">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Nagpur Civic Action Hub
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  98.4% AI Accuracy
                </span>
              </div>

              {/* Sample Active Interactive Card */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-orange-950/80 text-orange-400 border border-orange-800/60 font-bold">
                    🚨 Severity 8/10 • High
                  </span>
                  <span className="text-slate-400">Dharampeth, Ward 14</span>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=200"
                    alt="Pothole"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      Deep Pothole on Carriageway
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      AI identified asphalt cavitation. Rapid Bitumen repair unit assigned.
                    </p>
                  </div>
                </div>

                {/* Interactive Mini Timeline */}
                <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Reported</span>
                  </div>
                  <div className="h-0.5 w-6 bg-emerald-500"></div>
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>AI Verified</span>
                  </div>
                  <div className="h-0.5 w-6 bg-amber-500"></div>
                  <div className="flex items-center space-x-1 text-amber-400 font-bold animate-pulse">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>In Progress</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                  <div className="text-lg sm:text-xl font-extrabold text-orange-400">
                    {totalReports}
                  </div>
                  <div className="text-[10px] text-slate-400">Reported</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                    {resolvedReports}
                  </div>
                  <div className="text-[10px] text-slate-400">Resolved ({resolutionRate}%)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40">
                  <div className="text-lg sm:text-xl font-extrabold text-amber-400">
                    84 Wards
                  </div>
                  <div className="text-[10px] text-slate-400">Live Coverage</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
