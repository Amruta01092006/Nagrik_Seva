import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveCommunityTicker: React.FC = () => {
  const { t } = useApp();

  const liveUpdates = [
    { text: '🚨 High severity pothole logged in Dharampeth (Ward 14) — Dispatched to Zone 2 Bitumen Unit', tag: 'DISPATCHED' },
    { text: '✅ Broken Streetlights resolved with Proof of Work on Gokulpeth Bypass (+100 pts awarded)', tag: 'RESOLVED' },
    { text: '🤖 Nagrik AI Vision verified 4 new drainage reports with 96% accuracy', tag: 'AI VERIFIED' },
    { text: '🏆 Vikramaditya R. unlocked "City Guardian" badge with 1,240 Civic Points', tag: 'LEADERBOARD' },
    { text: '🌧️ Monsoon Action: 2 De-watering pumps deployed in Sitabuldi Low-lying Area', tag: 'EMERGENCY' }
  ];

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 bg-orange-600/90 text-white px-2 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase flex-shrink-0 animate-pulse">
          <Activity className="w-3 h-3" />
          <span>LIVE RADAR</span>
        </div>

        <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="inline-flex items-center space-x-8 animate-marquee">
            {liveUpdates.map((item, idx) => (
              <div key={idx} className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>{item.text}</span>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
