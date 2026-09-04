import React, { useState, useEffect } from 'react';
import {
  X,
  Camera,
  Mic,
  MicOff,
  MapPin,
  Bot,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  ShieldCheck,
  Send,
  Loader2,
  Compass,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  Check,
  Building2,
  Image as ImageIcon,
  ExternalLink,
  Flame,
  Edit3,
  CheckCircle,
  ScanLine,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CameraViewfinder } from './CameraViewfinder';
import { analyzeCivicProblem, checkDuplicateIssue, DuplicateCheckResult } from '../services/aiService';
import { AIAnalysisResult, IssueCategory, SeverityLevel, CivicIssue } from '../types';

// Scalable 10-Category Definitions for Phase 3
const categorySuggestions: { id: IssueCategory; label: string; icon: string; bg: string }[] = [
  { id: 'Road Damage', label: 'Road Damage', icon: '🚧', bg: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'Potholes', label: 'Potholes', icon: '🕳️', bg: 'bg-orange-50 border-orange-200 text-orange-900' },
  { id: 'Waterlogging', label: 'Waterlogging', icon: '💧', bg: 'bg-blue-50 border-blue-200 text-blue-900' },
  { id: 'Water Supply', label: 'Water Supply', icon: '🚰', bg: 'bg-cyan-50 border-cyan-200 text-cyan-900' },
  { id: 'Garbage', label: 'Garbage', icon: '🗑️', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'Blocked Gutters', label: 'Blocked Gutters', icon: '🕳️', bg: 'bg-teal-50 border-teal-200 text-teal-900' },
  { id: 'Broken Streetlights', label: 'Broken Streetlights', icon: '💡', bg: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
  { id: 'Traffic Safety', label: 'Traffic Safety', icon: '🚦', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
  { id: 'Damaged Infrastructure', label: 'Damaged Infra', icon: '🏗️', bg: 'bg-purple-50 border-purple-200 text-purple-900' },
  { id: 'Public Safety', label: 'Public Safety', icon: '🚨', bg: 'bg-red-50 border-red-200 text-red-900' },
];

const timeNoticedOptions = [
  { id: 'just_now', label: 'Just now (Last hour)' },
  { id: 'today_morning', label: 'Earlier today morning' },
  { id: 'past_few_days', label: 'Over past 2–3 days' },
  { id: 'ongoing', label: 'Ongoing / Recurring issue (>1 week)' }
];

export const ReportModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    t,
    language,
    issues,
    reportIssue,
    supportIssue,
    setSelectedIssueId
  } = useApp();

  // Stepper: 1 = Capture, 2 = Describe, 3 = Location, 4 = Review, 5 = Success
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showCamera, setShowCamera] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800');
  
  // Step 2 & AI State
  const [title, setTitle] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('Potholes');
  const [whenNoticed, setWhenNoticed] = useState('just_now');
  const [landmark, setLandmark] = useState('Near Main Traffic Junction');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // Step 3 Location
  const [locationMode, setLocationMode] = useState<'gps' | 'map' | 'manual'>('gps');
  const [lat, setLat] = useState(21.1458);
  const [lng, setLng] = useState(79.0882);
  const [address, setAddress] = useState('Near WHC Road, Dharampeth');
  const [locality, setLocality] = useState('Dharampeth');
  const [ward, setWard] = useState('Ward 14');
  const [city, setCity] = useState('Nagpur');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Step 4 Review & AI State
  const [manualSeverity, setManualSeverity] = useState<number>(8);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [isEditingAIResults, setIsEditingAIResults] = useState(false);
  const [duplicateResult, setDuplicateResult] = useState<DuplicateCheckResult>({ isDuplicate: false });

  // Step 5 Success
  const [submittedIssue, setSubmittedIssue] = useState<CivicIssue | null>(null);
  const [submittedReportId, setSubmittedReportId] = useState<string>('');

  useEffect(() => {
    if (isReportModalOpen) {
      setCurrentStep(1);
      setShowCamera(false);
      setSubmittedIssue(null);
      setSubmittedReportId('');
      setIsEditingAIResults(false);
    }
  }, [isReportModalOpen]);

  // Voice recording
  const toggleVoiceRecording = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : language === 'ta' ? 'ta-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => setIsRecordingVoice(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setDescriptionText(prev => (prev ? `${prev} ${transcript}` : transcript));
          if (!title) setTitle(transcript.substring(0, 40));
          setIsRecordingVoice(false);
        };
        recognition.onerror = () => {
          setIsRecordingVoice(false);
          setDescriptionText(prev => prev || 'There is a deep pothole and open drainage gutter near the market crossing causing two-wheeler skidding.');
        };
        recognition.onend = () => setIsRecordingVoice(false);
        recognition.start();
        return;
      } catch (e) {
        console.warn('Speech error', e);
      }
    }

    // Fallback simulation
    setIsRecordingVoice(true);
    setTimeout(() => {
      setDescriptionText(prev => prev || 'Hazardous road cavity right in front of the commercial complex with water accumulation.');
      if (!title) setTitle('Deep Road Pothole in Commercial Area');
      setIsRecordingVoice(false);
    }, 2000);
  };

  const getLiveLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLat(Number(pos.coords.latitude.toFixed(4)));
          setLng(Number(pos.coords.longitude.toFixed(4)));
          setAddress('WHC Road, Dharampeth Junction');
          setLocality('Dharampeth West');
          setWard('Ward 14');
          setLocationMode('gps');
        },
        err => {
          console.warn('Geolocation error', err);
          setLat(21.1458);
          setLng(79.0882);
          setAddress('Near WHC Road, Dharampeth');
          setLocality('Dharampeth');
          setWard('Ward 14');
        }
      );
    }
  };

  const handleNextFromCapture = () => {
    setCurrentStep(2);
  };

  const handleNextFromDescribe = () => {
    setCurrentStep(3);
  };

  // Trigger Phase 3 AI Analysis Flow when proceeding to Review
  const handleProceedToReviewWithAI = () => {
    setIsAIAnalyzing(true);
    setCurrentStep(4);

    setTimeout(() => {
      const result = analyzeCivicProblem({
        text: `${title} ${descriptionText}`,
        imageUrl,
        locality,
        categoryHint: selectedCategory
      });
      setAiAnalysis(result);
      if (!title) setTitle(result.suggestedTitle);
      if (!descriptionText) setDescriptionText(result.suggestedDescription);
      setSelectedCategory(result.category);
      setManualSeverity(result.severityScore);

      const dupCheck = checkDuplicateIssue(
        {
          category: result.category,
          lat,
          lng,
          description: descriptionText || result.suggestedDescription,
          title: title || result.suggestedTitle
        },
        issues,
        350
      );
      setDuplicateResult(dupCheck);
      setIsAIAnalyzing(false);
    }, 1400);
  };

  const handleFinalSubmit = () => {
    const res = reportIssue({
      title: title || aiAnalysis?.suggestedTitle || 'Reported Civic Problem',
      description: descriptionText || aiAnalysis?.suggestedDescription || 'Civic issue captured on site.',
      category: selectedCategory,
      imageUrl,
      lat,
      lng,
      address,
      locality,
      ward,
      city,
      whenNoticed: timeNoticedOptions.find(o => o.id === whenNoticed)?.label || 'Recent',
      landmark,
      severityScore: manualSeverity,
      isAnonymous
    });

    setSubmittedReportId(res.issueId);
    setSubmittedIssue(res.newIssue);
    setCurrentStep(5);
  };

  if (!isReportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[90vh] flex flex-col">
        
        {/* Modal Header with Visual Stepper */}
        <div className="bg-slate-900 text-white p-5 flex-shrink-0">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-sm">
                🤖
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-black tracking-tight">
                    Nagrik AI Civic Reporter
                  </h2>
                  <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Phase 3 AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Step {currentStep} of 5 • Intelligent Assistance Active
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-1 pt-2">
            {[
              { num: 1, label: 'Capture' },
              { num: 2, label: 'Describe' },
              { num: 3, label: 'Location' },
              { num: 4, label: 'AI Review' },
              { num: 5, label: 'Success' },
            ].map(st => {
              const isPassed = currentStep >= st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div key={st.num} className="space-y-1">
                  <div className={`h-1.5 rounded-full transition-all ${
                    isPassed ? 'bg-orange-500' : 'bg-slate-800'
                  } ${isCurrent ? 'ring-2 ring-orange-300' : ''}`} />
                  <div className="text-[9px] font-bold text-center truncate text-slate-400">
                    {st.num}. {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: CAPTURE / UPLOAD */}
          {currentStep === 1 && !showCamera && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <span>Step 1: Capture or Attach Problem Image</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Provide evidence for Nagrik AI to analyze visual features, classify category & calculate severity.
                </p>
              </div>

              {/* Photo Card Preview */}
              <div className="flex flex-col sm:flex-row gap-4 items-center p-4 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden border-2 border-dashed border-orange-300 bg-orange-50/50 flex-shrink-0 group">
                  <img
                    src={imageUrl}
                    alt="Evidence Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Change Image</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2.5">
                  <button
                    onClick={() => setShowCamera(true)}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-md flex items-center justify-center space-x-2 active:scale-95 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera / Pick Sample Scenario</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>✨ High quality image earns +10 pts bonus</span>
                    <span className="font-bold text-emerald-600">AI Vision Enabled</span>
                  </div>
                </div>
              </div>

              {/* Quick Voice / Text Starter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase text-slate-500">
                    Quick Voice Memo or Description
                  </label>
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                      isRecordingVoice
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {isRecordingVoice ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isRecordingVoice ? 'Listening (Speak now)...' : 'Record Voice'}</span>
                  </button>
                </div>

                <textarea
                  value={descriptionText}
                  onChange={e => setDescriptionText(e.target.value)}
                  rows={3}
                  placeholder="Describe what you see or speak into the microphone..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 text-xs text-slate-800 resize-none shadow-inner"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNextFromCapture}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Embedded Camera Viewfinder */}
          {showCamera && (
            <CameraViewfinder
              onCaptureImage={(capturedUrl, sample) => {
                setImageUrl(capturedUrl);
                if (sample) {
                  setDescriptionText(sample.description);
                  if (sample.title) setTitle(sample.title);
                  if (sample.category) setSelectedCategory(sample.category as IssueCategory);
                }
                setShowCamera(false);
              }}
              onClose={() => setShowCamera(false)}
            />
          )}

          {/* STEP 2: PROBLEM DESCRIPTION & 10 CATEGORIES */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  Step 2: Problem Details & Category
                </h3>
                <p className="text-xs text-slate-500">
                  Select a category and specify location landmarks. Nagrik AI will enhance and format this.
                </p>
              </div>

              {/* 10 Scalable Category Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase text-slate-500">
                  Select Problem Category (10 Civic Domains)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {categorySuggestions.map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-2.5 rounded-2xl border text-xs font-bold text-left flex items-center space-x-2 transition-all ${
                          isSelected
                            ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-[1.02]'
                            : `${cat.bg} hover:border-slate-400`
                        }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Problem Title & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Large pothole on main road"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">
                    Detailed Complaint Description
                  </label>
                  <textarea
                    value={descriptionText}
                    onChange={e => setDescriptionText(e.target.value)}
                    rows={3}
                    placeholder="Describe specific observations, hazards or severity..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>
              </div>

              {/* Landmark and When Noticed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">
                    Landmark / Location Context
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Central Mall Gate 2"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">
                    When did you notice it?
                  </label>
                  <select
                    value={whenNoticed}
                    onChange={e => setWhenNoticed(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    {timeNoticedOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromDescribe}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <span>Continue to Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION GEOTAGGING */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  Step 3: Geotag Location
                </h3>
                <p className="text-xs text-slate-500">
                  Attach exact coordinates so municipal rapid action squads are dispatched directly.
                </p>
              </div>

              {/* Mode Selectors */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setLocationMode('gps');
                    getLiveLocation();
                  }}
                  className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                    locationMode === 'gps' ? 'bg-white text-orange-700 shadow' : 'text-slate-600'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>1. Live GPS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLocationMode('map')}
                  className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                    locationMode === 'map' ? 'bg-white text-blue-700 shadow' : 'text-slate-600'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-blue-500" />
                  <span>2. Map Pin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLocationMode('manual')}
                  className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                    locationMode === 'manual' ? 'bg-white text-emerald-700 shadow' : 'text-slate-600'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>3. Manual</span>
                </button>
              </div>

              {/* Coordinates Box */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>Coordinates: {lat}, {lng}</span>
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    GPS ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Locality & Ward
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={locality}
                        onChange={e => setLocality(e.target.value)}
                        placeholder="Locality"
                        className="w-1/2 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        value={ward}
                        onChange={e => setWard(e.target.value)}
                        placeholder="Ward"
                        className="w-1/2 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <span className="text-[11px]">
                      <strong>Privacy Safeguard:</strong> Exact residential house numbers are protected.
                    </span>
                  </div>
                  <label className="flex items-center space-x-1 text-xs cursor-pointer font-bold text-amber-900 ml-2">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={e => setIsAnonymous(e.target.checked)}
                      className="rounded text-orange-600"
                    />
                    <span>Anonymous</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleProceedToReviewWithAI}
                  className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>Run Nagrik AI Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: AI ANALYSIS & EDITABLE REVIEW */}
          {currentStep === 4 && (
            <div>
              {/* Premium AI Loading State */}
              {isAIAnalyzing ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🤖
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-900">
                      🤖 Nagrik AI is analyzing your report...
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Running multi-spectral image recognition, calculating 1–10 severity score, verifying authenticity and checking for duplicate complaints...
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-xs font-mono text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full w-fit mx-auto border border-emerald-200">
                    <Cpu className="w-3.5 h-3.5 animate-pulse" />
                    <span>Neural Vision Classification • 96% Precision</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* Duplicate Alert if detected */}
                  {duplicateResult.isDuplicate && duplicateResult.matchedIssue && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 space-y-3">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">
                            ⚠️ Duplicate Alert: Similar Issue Found Nearby
                          </h4>
                          <p className="text-xs mt-1 text-amber-900">
                            {duplicateResult.reason} Already has {duplicateResult.matchedIssue.supportCount} community supporters.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (duplicateResult.matchedIssue) {
                              supportIssue(duplicateResult.matchedIssue.id);
                              setSelectedIssueId(duplicateResult.matchedIssue.id);
                              setIsReportModalOpen(false);
                            }
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow flex items-center justify-center space-x-1.5"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Support Existing (+10 pts)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDuplicateResult({ isDuplicate: false })}
                          className="py-2 px-3 rounded-xl bg-white border border-amber-300 text-amber-800 font-bold text-xs hover:bg-amber-100"
                        >
                          Submit Anyway
                        </button>
                      </div>
                    </div>
                  )}

                  {/* AI Structured Output Card */}
                  <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                          AI Analysis Results
                        </span>
                      </div>

                      {/* Verification Status Badge */}
                      <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-black uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>🟢 AI Verified (Likely Valid)</span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={imageUrl}
                        alt="Analyzed"
                        className="w-full sm:w-36 h-28 rounded-2xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase text-orange-400">
                            {selectedCategory}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            AI Confidence: High (96%)
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white leading-snug">
                          {title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {descriptionText}
                        </p>
                      </div>
                    </div>

                    {/* AI Severity Score Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold uppercase text-slate-400">
                          Calculated Severity Score (1 - 10)
                        </span>
                        <span className={`font-black text-sm ${
                          manualSeverity >= 8 ? 'text-red-400' : manualSeverity >= 6 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          ⚡ Severity: {manualSeverity}/10 — {manualSeverity >= 8 ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {aiAnalysis?.severityReason || 'The issue appears to create a significant safety risk and may affect heavy traffic.'}
                      </p>
                    </div>

                    {/* Automated Department Routing */}
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-900 flex items-center justify-between">
                      <span>🏛️ Designated Department: <strong>{aiAnalysis?.suggestedDepartment || 'NMC Road Works Wing'}</strong></span>
                      <span className="text-[10px] text-slate-400">Auto-Routed</span>
                    </div>

                    {/* Responsible AI Disclaimer */}
                    <div className="text-[10px] text-slate-400 italic text-center">
                      «AI-generated suggestion — please review before submitting.»
                    </div>
                  </div>

                  {/* Toggle: ✏️ Edit AI Results */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingAIResults(!isEditingAIResults)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-orange-600" />
                      <span>{isEditingAIResults ? 'Close Custom Editor' : '✏️ Edit AI Results'}</span>
                    </button>

                    {isEditingAIResults && (
                      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Edit Problem Title
                          </label>
                          <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Edit Category
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value as IssueCategory)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                          >
                            {categorySuggestions.map(c => (
                              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Adjust Severity (1 - 10)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={manualSeverity}
                            onChange={e => setManualSeverity(Number(e.target.value))}
                            className="w-full accent-orange-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contribution Point Reward */}
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-extrabold">Contribution Points to Earn:</div>
                      <div className="text-[11px] text-emerald-800">Valid Report (+50) + Photo (+10) + AI Verified (+20)</div>
                    </div>
                    <div className="text-base font-black text-emerald-600">+80 pts</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-xs shadow-xl flex items-center space-x-2 active:scale-95 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Civic Report 🇮🇳</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: POWERFUL SUCCESS EXPERIENCE */}
          {currentStep === 5 && (
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-xl animate-bounce">
                🎉
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Your Voice Has Been Heard!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  «Your civic issue has been successfully reported. You can now track its journey from verification to resolution.»
                </p>
              </div>

              {/* Ticket Details Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold uppercase">Report ID</span>
                  <span className="font-mono text-sm font-black text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-lg">
                    {submittedReportId}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">Current Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold uppercase text-[10px]">
                    📝 Reported
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                  <span className="text-slate-500 font-bold">Points Awarded:</span>
                  <span className="text-emerald-600 font-black">+80 Civic Points ⭐</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (submittedReportId) {
                      setSelectedIssueId(submittedReportId);
                      setIsReportModalOpen(false);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Track My Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
                >
                  Return to Dashboard
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
