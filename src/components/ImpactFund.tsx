import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { demoCrowdfundCampaigns } from '../data/demoData';
import { useApp } from '../context/AppContext';

export const ImpactFund: React.FC = () => {
  const { t, triggerCelebration } = useApp();
  const [pledgedCampaignId, setPledgedCampaignId] = useState<string | null>(null);

  const handleSimulatedPledge = (id: string) => {
    setPledgedCampaignId(id);
    triggerCelebration();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Future Crowdfunding Module • Coming Soon</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black">
            ❤️ {t.impactFundTitle}
          </h1>

          <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
            {t.impactFundSubtitle}
          </p>
        </div>
      </div>

      {/* Architecture Highlights & Transparency Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">100% NGO & Cause Verified</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every civic initiative undergoes double municipal verification, 80G tax clearance, and on-ground feasibility audit before listing.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Transparent Fund Allocation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct ledger breakdown: 85%+ utilized directly on material equipment and field intervention with public receipts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Milestone-Based Releases</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Funds released strictly against verified Proof of Work milestones with photo evidence uploaded to the platform.
          </p>
        </div>
      </div>

      {/* Sample Verified Preview Campaigns */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Verified Prototype Micro-Campaigns
            </h2>
            <p className="text-xs text-slate-500">
              Explore how future crowdfunding and citizen micro-donations will fund rapid civic fixes.
            </p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Prototype Preview
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoCrowdfundCampaigns.map(camp => {
            const progressPercent = Math.round((camp.raisedAmount / camp.targetAmount) * 100);
            const isPledged = pledgedCampaignId === camp.id;

            return (
              <div
                key={camp.id}
                className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img src={camp.imageUrl} alt={camp.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-slate-900/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full">
                      {camp.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{camp.ngoName}</span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span className="text-slate-900">₹{camp.raisedAmount.toLocaleString()}</span>
                        <span className="text-slate-500">of ₹{camp.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{camp.donorCount} Donors</span>
                        <span className="font-bold text-rose-600">{progressPercent}% Funded</span>
                        <span>{camp.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSimulatedPledge(camp.id)}
                    className={`w-full py-3 rounded-2xl text-xs font-black shadow transition-all flex items-center justify-center space-x-1.5 ${
                      isPledged
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-rose-600 text-white'
                    }`}
                  >
                    <span>{isPledged ? 'Pledged ₹500 (Simulated) ✅' : 'Support Cause (Coming Soon)'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
