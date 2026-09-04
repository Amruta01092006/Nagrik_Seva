import React, { useState } from 'react';
import {
  X,
  MapPin,
  ThumbsUp,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  Building2,
  Calendar,
  Send,
  MessageSquare,
  Sparkles,
  Share2,
  FileCheck,
  ArrowRight,
  Upload,
  Check,
  Layers,
  Compass,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IssueStatus, ProofOfWork } from '../types';

export const IssueDetailsModal: React.FC = () => {
  const {
    selectedIssue,
    selectedIssueId,
    setSelectedIssueId,
    supportIssue,
    addComment,
    updateIssueStatus,
    activeRole,
    currentUser,
    t
  } = useApp();

  const [commentInput, setCommentInput] = useState('');
  const [activeTab, setActiveTab] = useState<'timeline' | 'proof' | 'comments'>('timeline');
  const [showStatusUpdater, setShowStatusUpdater] = useState(false);
  const [newStatus, setNewStatus] = useState<IssueStatus>('in_progress');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800');
  const [materialsUsed, setMaterialsUsed] = useState('Cold-mix asphalt patch, compaction roller');

  if (!selectedIssueId || !selectedIssue) return null;

  const isUserSupported = selectedIssue.supportedByUserIds.includes(currentUser.id);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(selectedIssue.id, commentInput);
    setCommentInput('');
  };

  const handleOfficialStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let proof: ProofOfWork | undefined = undefined;

    if (newStatus === 'resolved') {
      proof = {
        beforeImageUrl: selectedIssue.imageUrl,
        afterImageUrl,
        resolvedAt: new Date().toISOString(),
        resolvedBy: currentUser.name,
        officialRole: currentUser.department || 'NMC Ward Officer',
        resolutionNotes: resolutionNotes || 'Repairs completed according to standard municipal specifications.',
        materialsUsed,
        verifiedByWardOfficer: true
      };
    }

    updateIssueStatus(selectedIssue.id, newStatus, proof, resolutionNotes);
    setShowStatusUpdater(false);
  };

  const stages: { stage: IssueStatus; label: string; icon: string }[] = [
    { stage: 'reported', label: 'Reported', icon: '📝' },
    { stage: 'ai_verified', label: 'AI Verified', icon: '🤖' },
    { stage: 'authorities_notified', label: 'Notified', icon: '📢' },
    { stage: 'assigned', label: 'Assigned', icon: '👷' },
    { stage: 'in_progress', label: 'In Progress', icon: '🔧' },
    { stage: 'resolved', label: 'Resolved', icon: '✅' },
  ];

  const currentStageIndex = stages.findIndex(s => s.stage === selectedIssue.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-orange-400 font-bold">
              {selectedIssue.id}
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {selectedIssue.category} • {selectedIssue.location.ward}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedIssueId(null)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Visual & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Image Preview */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video md:aspect-square flex-shrink-0">
              <img
                src={selectedIssue.imageUrl}
                alt={selectedIssue.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase text-white shadow-lg ${
                  selectedIssue.severityScore >= 8 ? 'bg-red-600' : selectedIssue.severityScore >= 6 ? 'bg-orange-500' : 'bg-emerald-600'
                }`}>
                  ⚡ Severity {selectedIssue.severityScore}/10
                </span>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="md:col-span-7 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1 text-xs">
                  <span className="font-bold text-orange-600 uppercase tracking-wider">
                    {selectedIssue.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(selectedIssue.reportedAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {selectedIssue.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedIssue.description}
                </p>

                {selectedIssue.whenNoticed && (
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Noticed by citizen: <strong>{selectedIssue.whenNoticed}</strong></span>
                  </div>
                )}
              </div>

              {/* Location Badge */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{selectedIssue.location.address}</div>
                  <div className="text-[11px] text-slate-500">
                    {selectedIssue.location.locality}, {selectedIssue.location.city} ({selectedIssue.location.lat.toFixed(4)}, {selectedIssue.location.lng.toFixed(4)})
                  </div>
                  {selectedIssue.landmark && (
                    <div className="text-[10px] text-orange-700 font-semibold mt-0.5">
                      Landmark: {selectedIssue.landmark}
                    </div>
                  )}
                </div>
              </div>

              {/* Support & Upvote Button */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => supportIssue(selectedIssue.id)}
                  disabled={isUserSupported}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm ${
                    isUserSupported
                      ? 'bg-orange-100 text-orange-800 border border-orange-200'
                      : 'bg-orange-600 hover:bg-orange-700 text-white active:scale-95'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    {isUserSupported ? 'Supported 👍' : `Support Issue (${selectedIssue.supportCount})`}
                  </span>
                </button>

                {activeRole === 'official' && (
                  <button
                    onClick={() => setShowStatusUpdater(!showStatusUpdater)}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Manage Status</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Official Status Update Drawer (For Officials & NGOs) */}
          {showStatusUpdater && activeRole === 'official' && (
            <form onSubmit={handleOfficialStatusSubmit} className="p-5 rounded-3xl bg-indigo-50/80 border-2 border-indigo-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Official NMC / NGO Resolution Console</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowStatusUpdater(false)}
                  className="text-xs text-indigo-700 font-bold hover:underline"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-indigo-900 mb-1">
                    New Action Stage
                  </label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as IssueStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-300 text-xs font-bold text-slate-800"
                  >
                    <option value="assigned">Assigned to Field Squad</option>
                    <option value="in_progress">Work in Progress (Crew on Site)</option>
                    <option value="resolved">Mark as Resolved (Attach Proof)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-indigo-900 mb-1">
                    Official Notes / Department Log
                  </label>
                  <input
                    type="text"
                    value={resolutionNotes}
                    onChange={e => setResolutionNotes(e.target.value)}
                    placeholder="e.g. Resurfaced with 50mm hot-mix bitumen"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              {newStatus === 'resolved' && (
                <div className="p-3 rounded-2xl bg-white border border-indigo-200 space-y-2">
                  <div className="text-[11px] font-bold text-indigo-950 flex items-center space-x-1">
                    <Upload className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Upload Proof of Work (After Image URL)</span>
                  </div>
                  <input
                    type="text"
                    value={afterImageUrl}
                    onChange={e => setAfterImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition-colors flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Update Municipal Status</span>
              </button>
            </form>
          )}

          {/* Phase 3 Nagrik AI Intelligence Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400 font-extrabold">
                <Bot className="w-4 h-4" />
                <span>Nagrik AI Intelligence Layer</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-400 font-mono">
                  AI Confidence: High (96%)
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-950 text-emerald-300 border border-emerald-700">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
                  🟢 AI Verified
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">AI Severity Reasoning</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedIssue.severityReason}
              </p>
            </div>

            <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-900 flex items-center justify-between">
              <span>🏛️ Designated Department: <strong>{selectedIssue.aiAnalysis.suggestedDepartment}</strong></span>
              <span className="text-[10px] text-slate-400">Auto-Assigned</span>
            </div>

            <div className="text-[10px] text-slate-400 italic text-center pt-1">
              «AI-generated suggestion — verified by municipal engineering standards.»
            </div>
          </div>

          {/* Sub-tabs: Timeline vs Proof of Work vs Comments */}
          <div className="border-b border-slate-200 flex space-x-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'timeline'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🔄 Progress Timeline ({selectedIssue.timeline.length})
            </button>

            <button
              onClick={() => setActiveTab('proof')}
              className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === 'proof'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Proof of Work {selectedIssue.proofOfWork && '✅'}</span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'comments'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              💬 Community Discussions ({selectedIssue.comments.length})
            </button>
          </div>

          {/* Tab 1: Interactive Progress Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              
              {/* Stepper Bar */}
              <div className="grid grid-cols-6 gap-1 text-center">
                {stages.map((st, idx) => {
                  const isPassed = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={st.stage} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 shadow-sm transition-all ${
                          isPassed
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                            : 'bg-slate-100 text-slate-400'
                        } ${isCurrent ? 'animate-bounce' : ''}`}
                      >
                        {st.icon}
                      </div>
                      <span className={`text-[10px] font-bold ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Event Logs */}
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 pt-2">
                {selectedIssue.timeline.map((event, idx) => (
                  <div key={event.id} className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">{event.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span>By: <strong>{event.actorName}</strong> ({event.actorRole})</span>
                      </div>

                      {event.proofImageUrl && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 max-w-xs h-32">
                          <img src={event.proofImageUrl} alt="Proof" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Tab 2: Proof of Work (Before vs After) */}
          {activeTab === 'proof' && (
            <div className="space-y-4">
              {selectedIssue.proofOfWork ? (
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Official Resolution Certificate
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Verified by Ward Officer
                    </span>
                  </div>

                  {/* Before vs After Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">Before Work</div>
                      <div className="rounded-2xl overflow-hidden h-44 border border-slate-200">
                        <img src={selectedIssue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-emerald-700 uppercase mb-1">After Resolution (Proof)</div>
                      <div className="rounded-2xl overflow-hidden h-44 border-2 border-emerald-500">
                        <img src={selectedIssue.proofOfWork.afterImageUrl} alt="After" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                    <div><strong>Resolution Notes:</strong> {selectedIssue.proofOfWork.resolutionNotes}</div>
                    {selectedIssue.proofOfWork.materialsUsed && (
                      <div><strong>Materials Used:</strong> {selectedIssue.proofOfWork.materialsUsed}</div>
                    )}
                    <div className="text-slate-500 text-[11px]">
                      Resolved by: {selectedIssue.proofOfWork.resolvedBy} ({selectedIssue.proofOfWork.officialRole}) on {new Date(selectedIssue.proofOfWork.resolvedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <FileCheck className="w-10 h-10 mx-auto text-slate-300" />
                  <div className="text-xs font-bold text-slate-600">Proof of Work Pending</div>
                  <p className="text-[11px] max-w-sm mx-auto">
                    Once the assigned municipal squad or NGO completes field repairs, high-resolution before & after verification photos will appear here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Community Discussions */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {selectedIssue.comments.map(comm => (
                  <div
                    key={comm.id}
                    className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                      comm.isOfficial
                        ? 'bg-indigo-50 border border-indigo-200'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                        <span>{comm.authorName}</span>
                        {comm.isOfficial && (
                          <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.2 rounded font-bold">
                            OFFICIAL
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comm.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{comm.content}</p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <form onSubmit={handleSendComment} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="Add a community remark or status update..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-bold text-xs shadow flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
