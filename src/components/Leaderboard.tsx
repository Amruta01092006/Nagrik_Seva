import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Search,
  Star
} from 'lucide-react';
import { demoLeaderboard } from '../data/demoData';
import { useApp } from '../context/AppContext';

export const Leaderboard: React.FC = () => {
  const { t, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'monthly' | 'allTime' | 'local' | 'citywide'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBoard = demoLeaderboard.filter(entry => {
    if (searchQuery && !entry.name.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.locality.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const rank1 = filteredBoard[0];
  const rank2 = filteredBoard[1];
  const rank3 = filteredBoard[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>Civic Champions Honor Roll</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.leaderboardTitle}
        </h1>
        <p className="text-sm text-slate-600">
          Recognizing the inspiring citizens and social workers transforming our city through everyday civic actions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-inner text-xs font-bold">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'monthly' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏆 {t.monthly}
          </button>

          <button
            onClick={() => setActiveTab('allTime')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'allTime' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📅 {t.allTime}
          </button>

          <button
            onClick={() => setActiveTab('local')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'local' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📍 {t.localArea}
          </button>

          <button
            onClick={() => setActiveTab('citywide')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'citywide' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌆 {t.citywide}
          </button>
        </div>
      </div>

      {/* Top 3 Interactive Podium Visualizer */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 items-end pt-8 pb-4">
        
        {/* Rank 2 - Silver */}
        {rank2 && (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-2">
              <img
                src={rank2.avatar}
                alt={rank2.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-slate-300 shadow-lg"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow">
                2
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              {rank2.name}
            </h4>
            <div className="text-[11px] text-orange-600 font-black">{rank2.points} pts</div>
            <div className="w-full h-28 sm:h-32 mt-3 rounded-t-3xl bg-gradient-to-t from-slate-300 to-slate-200 flex items-center justify-center shadow-md">
              <span className="text-2xl">🥈</span>
            </div>
          </div>
        )}

        {/* Rank 1 - Gold Champion */}
        {rank1 && (
          <div className="flex flex-col items-center text-center -mt-6">
            <div className="relative mb-2">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500 animate-bounce">
                <Crown className="w-7 h-7 fill-amber-400" />
              </div>
              <img
                src={rank1.avatar}
                alt={rank1.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-400 shadow-2xl ring-4 ring-amber-200"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black px-2 py-0.5 rounded-full shadow">
                #1
              </div>
            </div>
            <h4 className="text-xs sm:text-base font-black text-slate-900 leading-tight mt-1">
              {rank1.name}
            </h4>
            <div className="text-xs sm:text-sm text-amber-600 font-black">{rank1.points} pts</div>
            <div className="w-full h-36 sm:h-44 mt-3 rounded-t-3xl bg-gradient-to-t from-amber-400 to-amber-300 flex items-center justify-center shadow-xl border-t-2 border-amber-200">
              <span className="text-4xl">🥇</span>
            </div>
          </div>
        )}

        {/* Rank 3 - Bronze */}
        {rank3 && (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-2">
              <img
                src={rank3.avatar}
                alt={rank3.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-700/40 shadow-lg"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow">
                3
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
              {rank3.name}
            </h4>
            <div className="text-[11px] text-orange-600 font-black">{rank3.points} pts</div>
            <div className="w-full h-24 sm:h-28 mt-3 rounded-t-3xl bg-gradient-to-t from-amber-700/40 to-amber-600/30 flex items-center justify-center shadow-md">
              <span className="text-2xl">🥉</span>
            </div>
          </div>
        )}

      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900">
            Nagpur City Top Contributors
          </h3>
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search citizens..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredBoard.map((entry, idx) => (
            <div
              key={entry.id}
              className={`py-3.5 px-3 flex items-center justify-between rounded-2xl transition-colors ${
                entry.name.includes(currentUser.name) ? 'bg-orange-50 border border-orange-200' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className={`w-6 text-center font-black text-xs sm:text-sm ${
                  entry.rank === 1 ? 'text-amber-600' : entry.rank === 2 ? 'text-slate-600' : entry.rank === 3 ? 'text-amber-800' : 'text-slate-400'
                }`}>
                  #{entry.rank}
                </span>

                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />

                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {entry.name}
                    </span>
                    {entry.isVerifiedSocialWorker && (
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300" title="Verified Social Worker">
                        ⭐ Official Volunteer
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">{entry.locality}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-8 text-right">
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-slate-700">{entry.reportedCount} Reports</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{entry.resolvedCount} Resolved</div>
                </div>

                <div className="w-20">
                  <span className="text-sm font-black text-orange-600">
                    {entry.points}
                  </span>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">pts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
