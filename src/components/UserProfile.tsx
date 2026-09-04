import React, { useState } from 'react';
import {
  User,
  Award,
  ShieldCheck,
  Trophy,
  MapPin,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Leaf,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfile: React.FC = () => {
  const { currentUser, setCurrentUser, activeRole, setActiveRole } = useApp();
  const [isAnonymous, setIsAnonymous] = useState(currentUser.isAnonymousDefault);
  const [preciseLocation, setPreciseLocation] = useState(true);

  const toggleAnonymous = () => {
    const next = !isAnonymous;
    setIsAnonymous(next);
    setCurrentUser(prev => ({ ...prev, isAnonymousDefault: next }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-orange-500 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full border-2 border-white shadow">
              ⭐ {currentUser.points}
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                🌱 {currentUser.league}
              </span>
              <span className="text-xs font-bold text-slate-500">
                City Rank #{currentUser.rank}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentUser.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>{currentUser.locality}, {currentUser.city}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Member since {currentUser.joinedDate}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Community Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-emerald-800">
            <span>Clean City Impact</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">~240 kg</div>
          <p className="text-[11px] text-emerald-800">Solid waste & plastic cleared from roads</p>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-blue-800">
            <span>Safety Interventions</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700">8 Hazards</div>
          <p className="text-[11px] text-blue-800">Potholes & open manholes repaired</p>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-amber-800">
            <span>AI Trust Score</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{currentUser.reputationScore}%</div>
          <p className="text-[11px] text-amber-800">Zero false flags or spam reports</p>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>My Unlocked Badges & Honors</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentUser.badges.map(badge => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1"
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="text-xs font-extrabold text-slate-900">{badge.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security Settings */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          <span>Privacy & Citizen Security Controls</span>
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900">Default Anonymous Reporting</div>
              <div className="text-slate-500 text-[11px]">
                Hide your full name and profile photo from public civic feeds.
              </div>
            </div>
            <button
              onClick={toggleAnonymous}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                isAnonymous ? 'bg-orange-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  isAnonymous ? 'left-6' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900">Public Location Obfuscation</div>
              <div className="text-slate-500 text-[11px]">
                Blur exact house/flat numbers publicly while providing exact GPS to authorized NMC officials.
              </div>
            </div>
            <button
              onClick={() => setPreciseLocation(!preciseLocation)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preciseLocation ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  preciseLocation ? 'left-6' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
