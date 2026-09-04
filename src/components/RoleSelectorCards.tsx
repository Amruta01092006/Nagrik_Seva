import React from 'react';
import { Users, Building2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoleSelectorCards: React.FC = () => {
  const { t, setActiveRole, setActiveTab } = useApp();

  return (
    <section className="py-12 bg-slate-100/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Inclusive Civic Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.welcomeTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.welcomeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Citizen / Contributor */}
          <div
            onClick={() => {
              setActiveRole('citizen');
              setActiveTab('dashboard');
            }}
            className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                <Users className="w-7 h-7" />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl font-bold text-slate-900">👥 Citizen / Contributor</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Public</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                «{t.continueAsCitizenDesc}»
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI Camera & Voice Civic Problem Reporting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-time Multi-stage Progress Tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gamified Civic Points, Badges & Leaderboards</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100">
              <button className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm group-hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 shadow-md">
                <span>{t.continueAsCitizen}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Social Worker / NGO / NMC Official */}
          <div
            onClick={() => {
              setActiveRole('official');
              setActiveTab('official');
            }}
            className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl font-bold text-slate-900">🏛️ Social Worker / NGO / NMC</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">Official</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                «{t.continueAsOfficialDesc}»
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Ward-wise Triage, Radar & Severity Heatmaps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Dispatch Field Squads & Update Statuses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Upload Proof of Work & Before/After Evidence</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100">
              <button className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm group-hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2 shadow-md">
                <span>{t.continueAsOfficial}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
