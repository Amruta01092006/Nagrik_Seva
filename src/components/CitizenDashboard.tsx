import React, { useState } from 'react';
import {
  Camera,
  Trophy,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Filter,
  Plus,
  Flame,
  Star,
  Activity,
  User,
  ExternalLink,
  Calendar,
  AlertCircle,
  Wrench,
  Bot,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IssueStatus } from '../types';

export const CitizenDashboard: React.FC = () => {
  const {
    currentUser,
    issues,
    stats,
    recentActivities,
    setIsReportModalOpen,
    setSelectedIssueId,
    setActiveTab,
    t
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'reported' | 'in_progress' | 'resolved'>('all');

  // Filter issues reported by current user or general community
  const myIssues = issues.filter(
    i => i.reportedBy.id === currentUser.id || i.reportedBy.name.includes(currentUser.name)
  );

  const displayedIssues = myIssues.filter(issue => {
    if (activeFilter === 'reported') return issue.status === 'reported' || issue.status === 'under_review';
    if (activeFilter === 'in_progress') return issue.status === 'in_progress' || issue.status === 'assigned' || issue.status === 'authorities_notified';
    if (activeFilter === 'resolved') return issue.status === 'resolved';
    return true;
  });

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'resolved':
        return { label: '✅ Resolved', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'in_progress':
        return { label: '🔧 In Progress', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'assigned':
        return { label: '📢 Assigned', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'under_review':
        return { label: '🤖 Under Review', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: '📝 Reported', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Personalized Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-4 border-white/80 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  🌱 {currentUser.league}
                </span>
                <span className="text-xs text-orange-100">
                  {currentUser.locality}, {currentUser.city}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1">
                👋 Welcome back, {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
                «Every report you make helps build a better community.»
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full md:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-orange-50 text-orange-700 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center space-x-2.5 group flex-shrink-0"
          >
            <Camera className="w-5 h-5 text-orange-600 group-hover:rotate-12 transition-transform" />
            <span>🚨 REPORT A PROBLEM</span>
          </button>
        </div>
      </div>

      {/* 5 Interactive Dashboard Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Problems Reported */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>📝 Problems Reported</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-slate-900">
              {stats.reportedCount}
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-0.5">
              100% Geotagged
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Total submitted</div>
        </div>

        {/* 2. Problems In Progress */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>🔧 In Progress</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-amber-600">
              {stats.inProgressCount}
            </div>
            <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
              Squads Active
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Field work active</div>
        </div>

        {/* 3. Problems Resolved */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>✅ Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-emerald-600">
              {stats.resolvedCount}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              With Proof of Work
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Verified & certified</div>
        </div>

        {/* 4. Contribution Points */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>⭐ Points</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-slate-900">
              {stats.points}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              +80 pts recently
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Reward balance</div>
        </div>

        {/* 5. Current Rank */}
        <div className="col-span-2 lg:col-span-1 p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>🏆 Current Rank</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-amber-400">
              #{stats.rank}
            </div>
            <div className="text-[11px] text-slate-300">
              Top 1% Citywide
            </div>
          </div>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className="text-[11px] text-orange-400 font-bold hover:underline text-left flex items-center space-x-1"
          >
            <span>View Podium</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Grid: Recent Activity Stream (Left) + Badges (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Activity Timeline */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Recent User Activity
                </h3>
                <p className="text-[11px] text-slate-500">Live timeline of your reported issues and updates</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              Live Stream
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 pt-1">
            {recentActivities.map(act => (
              <div
                key={act.id}
                onClick={() => setSelectedIssueId(act.issueId)}
                className="relative group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-colors -ml-2"
              >
                <div className="absolute -left-[23px] top-3 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white shadow"></div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors flex items-center space-x-1.5">
                      <span>{act.icon}</span>
                      <span>{act.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{act.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges & Achievements Box */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Badges & League Rank
                  </h3>
                  <p className="text-[11px] text-slate-500">{currentUser.league} League</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700">
                {currentUser.badges.length}/6
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentUser.badges.slice(0, 4).map(b => (
                <div key={b.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <div className="text-2xl">{b.icon}</div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">{b.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight line-clamp-1">{b.description}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1 transition-colors mt-4"
          >
            <span>View All Badges & Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* MY REPORTS SECTION */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              My Reported Problems
            </h2>
            <p className="text-xs text-slate-500">
              Track progress status, official updates, and proof of work across all your reports.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All ({myIssues.length})
            </button>

            <button
              onClick={() => setActiveFilter('reported')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeFilter === 'reported' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              📝 Reported
            </button>

            <button
              onClick={() => setActiveFilter('in_progress')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeFilter === 'in_progress' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🔧 In Progress
            </button>

            <button
              onClick={() => setActiveFilter('resolved')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeFilter === 'resolved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              ✅ Resolved ({myIssues.filter(i => i.status === 'resolved').length})
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedIssues.map(issue => {
            const statusInfo = getStatusBadge(issue.status);

            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {issue.id}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusInfo.bg}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Image & Main Info */}
                  <div className="flex items-start space-x-3.5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform bg-slate-100">
                      <img
                        src={issue.imageUrl}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute bottom-1 right-1 text-[9px] font-black text-white px-1.5 py-0.2 rounded-md ${
                        issue.severityScore >= 8 ? 'bg-red-600' : issue.severityScore >= 6 ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}>
                        ⚡ {issue.severityScore}/10
                      </span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="text-[10px] font-bold text-orange-600 uppercase">
                        {issue.category} • {issue.location.ward}
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
                        {issue.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {issue.description}
                      </p>
                    </div>
                  </div>

                  {/* Location & Landmark */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    <span className="truncate">{issue.location.address}</span>
                  </div>

                </div>

                {/* Footer Bar */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {new Date(issue.reportedAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center space-x-1 text-orange-600 font-bold group-hover:translate-x-1 transition-transform">
                    <span>View Issue Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
