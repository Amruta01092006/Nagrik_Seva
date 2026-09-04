import React, { useState } from 'react';
import {
  Building2,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  MapPin,
  Filter,
  UserCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IssueCategory, IssueStatus } from '../types';

export const OfficialDashboard: React.FC = () => {
  const {
    currentUser,
    issues,
    setSelectedIssueId,
    setActiveTab,
    updateIssueStatus
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [wardSearch, setWardSearch] = useState<string>('');

  // Critical issues count
  const criticalCount = issues.filter(i => i.severityScore >= 8 && i.status !== 'resolved').length;
  const inProgressCount = issues.filter(i => i.status === 'in_progress').length;
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;

  const filteredIssues = issues.filter(issue => {
    if (filterCategory !== 'All' && issue.category !== filterCategory) return false;
    if (filterStatus !== 'All' && issue.status !== filterStatus) return false;
    if (filterSeverity === 'critical' && issue.severityScore < 8) return false;
    if (filterSeverity === 'medium_low' && issue.severityScore >= 8) return false;
    if (
      wardSearch &&
      !issue.location.ward.toLowerCase().includes(wardSearch.toLowerCase()) &&
      !issue.location.locality.toLowerCase().includes(wardSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Official Top Bar */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                NMC Official Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUser.wardAssigned || 'Zone 2 (Wards 12-16)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {currentUser.department || 'Road, Drainage & Solid Waste Rapid Response Division'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('map')}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 transition-all active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Ward GIS Radar</span>
          </button>
        </div>
      </div>

      {/* Official Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-red-50 border-2 border-red-200 text-red-950 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-red-700">
            <span>🔥 Critical Radar (8-10)</span>
            <Flame className="w-4 h-4 text-red-600" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-red-600">
              {criticalCount}
            </div>
            <div className="text-[11px] font-semibold text-red-800">
              Immediate SLA: &lt; 24h
            </div>
          </div>
          <div className="text-[10px] text-red-600">Requires on-site inspection</div>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-950 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-amber-700">
            <span>🔧 In Progress</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-amber-600">
              {inProgressCount}
            </div>
            <div className="text-[11px] font-semibold text-amber-800">
              Crews Dispatched
            </div>
          </div>
          <div className="text-[10px] text-amber-600">Work orders active</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-emerald-700">
            <span>✅ Resolved Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-emerald-600">
              {resolvedCount}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800">
              Proof Uploaded
            </div>
          </div>
          <div className="text-[10px] text-emerald-600">Ward Officer Certified</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
            <span>AI Verification Avg</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-black text-emerald-400">
              96.8%
            </div>
            <div className="text-[11px] text-slate-300">
              Zero False Alarms
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Automated Dispatch</div>
        </div>

      </div>

      {/* Triage & Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        
        {/* Table Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Ward Triage & Resolution Queue
            </h3>
            <p className="text-xs text-slate-500">
              Manage incoming civic tickets, dispatch municipal squads, and sign off with Proof of Work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={wardSearch}
                onChange={e => setWardSearch(e.target.value)}
                placeholder="Search Ward (e.g. Ward 14)..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Water & Drainage">Water & Drainage</option>
              <option value="Public Safety">Public Safety</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
            >
              <option value="All">All Severities</option>
              <option value="critical">Critical (8-10)</option>
              <option value="medium_low">Medium/Low (&lt;8)</option>
            </select>
          </div>
        </div>

        {/* Ticket List */}
        <div className="divide-y divide-slate-100">
          {filteredIssues.map(issue => (
            <div
              key={issue.id}
              className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 p-2 rounded-2xl transition-colors"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={issue.imageUrl}
                  alt={issue.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {issue.id}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      issue.severityScore >= 8 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      ⚡ Severity {issue.severityScore}/10
                    </span>
                    <span className="text-xs font-bold text-indigo-700">
                      {issue.location.ward}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    {issue.title}
                  </h4>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                    <span>{issue.location.address}</span>
                    <span>•</span>
                    <span className="font-bold text-orange-600">👍 {issue.supportCount} Citizens Backing</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedIssueId(issue.id)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow flex items-center space-x-1.5 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Triage & Resolve</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
