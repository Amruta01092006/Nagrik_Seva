import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Filter,
  Layers,
  Search,
  ThumbsUp,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Bot,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CivicIssue, IssueCategory, SeverityLevel } from '../types';

// Custom SVG map icons for Leaflet with accessible colors and severity tags
const createCustomPinIcon = (category: IssueCategory, severityScore: number, status: string) => {
  let bgColor = '#10B981'; // green / low
  let label = 'LOW';
  if (severityScore >= 9) {
    bgColor = '#DC2626'; // red / critical
    label = 'CRIT';
  } else if (severityScore >= 7) {
    bgColor = '#EA580C'; // orange / high
    label = 'HIGH';
  } else if (severityScore >= 4) {
    bgColor = '#D97706'; // amber / med
    label = 'MED';
  }

  const isResolved = status === 'resolved';

  const iconHtml = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      <div style="
        background: ${isResolved ? '#059669' : bgColor};
        color: white;
        padding: 4px 8px;
        border-radius: 9999px;
        font-weight: 800;
        font-size: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
      ">
        <span>${isResolved ? '✅ RESOLVED' : `⚡ ${severityScore}/10 ${label}`}</span>
      </div>
      <div style="
        width: 0; 
        height: 0; 
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid ${isResolved ? '#059669' : bgColor};
        margin-top: -1px;
      "></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-marker',
    iconSize: [80, 40],
    iconAnchor: [40, 36],
    popupAnchor: [0, -36]
  });
};

// Map Recenter Helper Component
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const CivicMap: React.FC = () => {
  const {
    issues,
    setSelectedIssueId,
    supportIssue,
    t,
    setIsReportModalOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Default Map center: Nagpur, India
  const [mapCenter, setMapCenter] = useState<[number, number]>([21.1458, 79.0882]);
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  // Quick Indian City Jump Presets
  const cityPresets = [
    { name: 'Nagpur', center: [21.1458, 79.0882] as [number, number], zoom: 14 },
    { name: 'Mumbai', center: [19.0760, 72.8777] as [number, number], zoom: 13 },
    { name: 'Pune', center: [18.5204, 73.8567] as [number, number], zoom: 13 },
    { name: 'New Delhi', center: [28.6139, 77.2090] as [number, number], zoom: 13 },
    { name: 'Bengaluru', center: [12.9716, 77.5946] as [number, number], zoom: 13 },
  ];

  const filteredIssues = issues.filter(issue => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && issue.status !== selectedStatus) return false;
    if (selectedSeverity === 'critical' && issue.severityScore < 9) return false;
    if (selectedSeverity === 'high' && (issue.severityScore < 7 || issue.severityScore >= 9)) return false;
    if (selectedSeverity === 'medium' && (issue.severityScore < 4 || issue.severityScore >= 7)) return false;
    if (
      searchQuery &&
      !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !issue.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !issue.location.ward.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] flex flex-col bg-slate-900 overflow-hidden">
      
      {/* Top Filter Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] max-w-5xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-slate-200/90 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ward, locality or issue..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="Infrastructure">Infrastructure (Potholes)</option>
              <option value="Sanitation">Sanitation (Garbage)</option>
              <option value="Water & Drainage">Water & Drainage</option>
              <option value="Road Safety">Road Safety</option>
              <option value="Public Safety">Public Safety (Streetlights)</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={e => setSelectedSeverity(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="All">All Severities</option>
              <option value="critical">🔴 Critical (9-10)</option>
              <option value="high">🟠 High (7-8)</option>
              <option value="medium">🟡 Medium (4-6)</option>
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="reported">Reported</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* City presets dropdown */}
            <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">City:</span>
              {cityPresets.map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    setMapCenter(c.center);
                    setZoomLevel(c.zoom);
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-800 transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Main Leaflet Map Container */}
      <div className="w-full h-full z-0">
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <ChangeView center={mapCenter} zoom={zoomLevel} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredIssues.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={createCustomPinIcon(issue.category, issue.severityScore, issue.status)}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 w-64 text-slate-900 space-y-2">
                  <div className="relative rounded-xl overflow-hidden h-28 bg-slate-100">
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow" style={{
                      backgroundColor: issue.severityScore >= 8 ? '#dc2626' : issue.severityScore >= 6 ? '#ea580c' : '#059669'
                    }}>
                      ⚡ Severity {issue.severityScore}/10
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      {issue.category} • {issue.location.ward}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">
                      {issue.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => supportIssue(issue.id)}
                      className="flex items-center space-x-1 text-slate-700 hover:text-orange-600 font-bold"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{issue.supportCount} Upvotes</span>
                    </button>

                    <button
                      onClick={() => setSelectedIssueId(issue.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-orange-600 text-white font-bold text-[11px] flex items-center space-x-1 shadow transition-colors"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating Bottom Action & Legend */}
      <div className="absolute bottom-6 left-4 right-4 z-[400] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Severity Legend */}
        <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-slate-700 shadow-xl flex items-center space-x-4 text-xs pointer-events-auto">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600"></span>
            <span className="text-[11px] font-medium">Critical (9-10)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-[11px] font-medium">High (7-8)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-[11px] font-medium">Medium (4-6)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-medium">Resolved</span>
          </div>
        </div>

        {/* Floating Report CTA */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="pointer-events-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs shadow-2xl flex items-center space-x-2 active:scale-95 transition-all"
        >
          <MapPin className="w-4 h-4" />
          <span>Report Problem at Current Location</span>
        </button>

      </div>

    </div>
  );
};
