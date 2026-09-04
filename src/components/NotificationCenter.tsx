import React from 'react';
import {
  Bell,
  X,
  CheckCheck,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setSelectedIssueId
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mt-16 mr-2 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black">Civic Alerts & Updates</h3>
              <p className="text-[10px] text-slate-400">Real-time resolution updates</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-orange-400 hover:text-orange-300 font-bold flex items-center space-x-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <div className="text-xs font-bold text-slate-600">No New Notifications</div>
              <p className="text-[10px]">You are all caught up on city updates!</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.issueId) {
                    setSelectedIssueId(notif.issueId);
                    onClose();
                  }
                }}
                className={`pt-2.5 p-3 rounded-2xl cursor-pointer transition-colors ${
                  notif.read ? 'bg-white hover:bg-slate-50' : 'bg-orange-50/70 border border-orange-200/80 hover:bg-orange-100/70'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                    <span className="text-base mt-0.5">
                      {notif.type === 'points_earned' ? '🎉' : notif.type === 'official_alert' ? '🚨' : '📢'}
                    </span>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-orange-600 flex-shrink-0 mt-1"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
