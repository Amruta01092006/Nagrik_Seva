import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CivicIssue,
  UserProfileData,
  UserRole,
  SupportedLanguage,
  NotificationItem,
  IssueStatus,
  ProofOfWork,
  IssueTimelineEvent,
  IssueComment,
  IssueCategory,
  SeverityLevel,
  UserActivityEvent
} from '../types';
import {
  sampleCivicIssues,
  demoCitizenUser,
  demoOfficialUser
} from '../data/demoData';
import { translations, Translations } from '../i18n/translations';
import { analyzeCivicProblem, checkDuplicateIssue } from '../services/aiService';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: UserProfileData;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfileData>>;
  issues: CivicIssue[];
  selectedIssue: CivicIssue | null;
  selectedIssueId: string | null;
  setSelectedIssueId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAIChatbotOpen: boolean;
  setIsAIChatbotOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  recentActivities: UserActivityEvent[];
  stats: {
    reportedCount: number;
    inProgressCount: number;
    resolvedCount: number;
    points: number;
    rank: number;
  };
  reportIssue: (issueData: {
    title: string;
    description: string;
    category?: IssueCategory;
    imageUrl: string;
    lat: number;
    lng: number;
    address: string;
    locality: string;
    ward: string;
    city: string;
    whenNoticed?: string;
    landmark?: string;
    severityScore?: number;
    severityLevel?: SeverityLevel;
    isAnonymous?: boolean;
  }) => { success: boolean; issueId: string; newIssue: CivicIssue; pointsEarned: number };
  supportIssue: (issueId: string) => void;
  updateIssueStatus: (
    issueId: string,
    newStatus: IssueStatus,
    proofOfWork?: ProofOfWork,
    officialNote?: string
  ) => void;
  addComment: (issueId: string, content: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerCelebration: () => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ISSUES_STORAGE_KEY = 'nagrik_seva_issues_v2';
const USER_STORAGE_KEY = 'nagrik_seva_user_v2';
const NOTIFICATIONS_STORAGE_KEY = 'nagrik_seva_notifications_v2';
const ACTIVITIES_STORAGE_KEY = 'nagrik_seva_activities_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [activeRole, setActiveRole] = useState<UserRole>('citizen');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Load issues from localStorage or fallback to demo issues
  const [issues, setIssues] = useState<CivicIssue[]>(() => {
    try {
      const stored = localStorage.getItem(ISSUES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed loading stored issues', e);
    }
    return sampleCivicIssues;
  });

  // Current user based on active role
  const [currentUser, setCurrentUser] = useState<UserProfileData>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed loading stored user', e);
    }
    return demoCitizenUser;
  });

  // Recent Activities
  const [recentActivities, setRecentActivities] = useState<UserActivityEvent[]>(() => {
    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed loading stored activities', e);
    }
    return [
      {
        id: 'act-1',
        title: 'You reported a hazardous pothole',
        description: 'Near Coffee House Square, WHC Road, Dharampeth',
        timestamp: '2 hours ago',
        type: 'reported',
        issueId: 'NS-2026-0891',
        category: 'Infrastructure',
        icon: '🚨'
      },
      {
        id: 'act-2',
        title: 'Nagrik AI verified your report',
        description: 'Road surface cavitation verified with 96% AI confidence score',
        timestamp: '1 hour ago',
        type: 'verified',
        issueId: 'NS-2026-0891',
        category: 'Infrastructure',
        icon: '🤖'
      },
      {
        id: 'act-3',
        title: 'Your issue was assigned to field squad',
        description: 'NMC Zone 2 Rapid Bitumen Team assigned JE Kailash Meshram',
        timestamp: '45 mins ago',
        type: 'assigned',
        issueId: 'NS-2026-0891',
        category: 'Infrastructure',
        icon: '👷'
      },
      {
        id: 'act-4',
        title: 'Work has started on site',
        description: 'Repair crew active with cold-mix leveling equipment',
        timestamp: '20 mins ago',
        type: 'in_progress',
        issueId: 'NS-2026-0891',
        category: 'Infrastructure',
        icon: '🔧'
      },
      {
        id: 'act-5',
        title: 'Your reported problem was resolved!',
        description: '4 streetlights restored on Gokulpeth Bypass. +100 Points awarded!',
        timestamp: 'Yesterday',
        type: 'resolved',
        issueId: 'NS-2026-0860',
        category: 'Public Safety',
        icon: '✅'
      }
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed loading notifications', e);
    }
    return [
      {
        id: 'notif-1',
        userId: 'user-amruta-01',
        title: '🎉 Issue Resolved: Dark Streetlights on Gokulpeth Bypass',
        message: 'NMC Electrical Division completed LED luminaire replacements. You earned +100 Civic Points!',
        type: 'points_earned',
        issueId: 'NS-2026-0860',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        read: false
      },
      {
        id: 'notif-2',
        userId: 'user-amruta-01',
        title: '👷 Crew Dispatched for Dharampeth Pothole',
        message: 'JE Kailash Meshram (NMC Zone 2) is currently on site for cold-mix bitumen leveling.',
        type: 'status_change',
        issueId: 'NS-2026-0891',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
        read: false
      },
      {
        id: 'notif-3',
        userId: 'user-amruta-01',
        title: '🤖 Nagrik AI Verified Your Report',
        message: 'Your photo submission was verified with 96% AI confidence score. +20 Points added to your rank.',
        type: 'status_change',
        issueId: 'NS-2026-0891',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        read: true
      }
    ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error('Failed to save issues to localStorage', e);
    }
  }, [issues]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(recentActivities));
    } catch (e) {
      console.error('Failed to save activities to localStorage', e);
    }
  }, [recentActivities]);

  // Sync user profile when switching roles
  useEffect(() => {
    if (activeRole === 'official') {
      setCurrentUser(demoOfficialUser);
    } else {
      setCurrentUser(demoCitizenUser);
    }
  }, [activeRole]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF671F', '#FFFFFF', '#046A38', '#0284C7', '#FFD700', '#EA580C']
      });
    } catch (e) {
      // ignore
    }
  };

  const selectedIssue = issues.find(i => i.id === selectedIssueId) || null;
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Calculate statistics for Citizen Dashboard
  const myIssues = issues.filter(
    i => i.reportedBy.id === currentUser.id || i.reportedBy.name.includes(currentUser.name)
  );
  const reportedCount = myIssues.length;
  const inProgressCount = myIssues.filter(i => i.status === 'in_progress' || i.status === 'assigned' || i.status === 'authorities_notified').length;
  const resolvedCount = myIssues.filter(i => i.status === 'resolved').length;

  const stats = {
    reportedCount,
    inProgressCount,
    resolvedCount,
    points: currentUser.points,
    rank: currentUser.rank
  };

  const reportIssue = (data: {
    title: string;
    description: string;
    category?: IssueCategory;
    imageUrl: string;
    lat: number;
    lng: number;
    address: string;
    locality: string;
    ward: string;
    city: string;
    whenNoticed?: string;
    landmark?: string;
    severityScore?: number;
    severityLevel?: SeverityLevel;
    isAnonymous?: boolean;
  }) => {
    const aiAnalysis = analyzeCivicProblem({
      text: `${data.title} ${data.description}`,
      imageUrl: data.imageUrl,
      locality: data.locality,
      categoryHint: data.category
    });

    const newIssueId = `NS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const finalCategory: IssueCategory = data.category || aiAnalysis.category;
    const finalSeverityScore = data.severityScore || aiAnalysis.severityScore;
    let finalSeverityLevel: SeverityLevel = data.severityLevel || aiAnalysis.severityLevel;
    if (!data.severityLevel && finalSeverityScore) {
      if (finalSeverityScore >= 9) finalSeverityLevel = 'critical';
      else if (finalSeverityScore >= 7) finalSeverityLevel = 'high';
      else if (finalSeverityScore >= 4) finalSeverityLevel = 'medium';
      else finalSeverityLevel = 'low';
    }

    const timeline: IssueTimelineEvent[] = [
      {
        id: `tl-${Date.now()}-1`,
        stage: 'reported',
        title: 'Problem Reported via Nagrik Seva',
        description: `Logged with location at ${data.locality || data.address}.${data.whenNoticed ? ` Noticed: ${data.whenNoticed}.` : ''}`,
        timestamp: nowIso,
        actorName: data.isAnonymous ? 'Anonymous Citizen' : currentUser.name,
        actorRole: 'Citizen Contributor'
      },
      {
        id: `tl-${Date.now()}-2`,
        stage: 'ai_verified',
        title: 'Nagrik AI Verification & Classification',
        description: `Verified ${aiAnalysis.detectedProblem}. Severity score: ${finalSeverityScore}/10 (${finalSeverityLevel.toUpperCase()}).`,
        timestamp: nowIso,
        actorName: 'Nagrik AI Core',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: `tl-${Date.now()}-3`,
        stage: 'authorities_notified',
        title: `Notified ${aiAnalysis.suggestedDepartment}`,
        description: 'Auto-routed with digital ticket to local ward officer and rapid action squad.',
        timestamp: nowIso,
        actorName: 'Nagrik Municipal Gateway',
        actorRole: 'System'
      }
    ];

    const newIssue: CivicIssue = {
      id: newIssueId,
      title: data.title || aiAnalysis.suggestedTitle,
      description: data.description || aiAnalysis.suggestedDescription,
      category: finalCategory,
      status: 'reported',
      severityScore: finalSeverityScore,
      severityLevel: finalSeverityLevel,
      severityReason: aiAnalysis.severityReason,
      imageUrl: data.imageUrl,
      location: {
        lat: data.lat,
        lng: data.lng,
        address: data.address,
        locality: data.locality,
        ward: data.ward || 'Ward 14',
        city: data.city || 'Nagpur',
        landmark: data.landmark || 'Near Location'
      },
      whenNoticed: data.whenNoticed,
      landmark: data.landmark,
      reportedAt: nowIso,
      reportedBy: {
        id: currentUser.id,
        name: data.isAnonymous ? 'Anonymous Citizen' : currentUser.name,
        isAnonymous: !!data.isAnonymous,
        badge: currentUser.league,
        points: currentUser.points
      },
      aiAnalysis,
      verificationStatus: aiAnalysis.verificationStatus,
      supportCount: 1,
      supportedByUserIds: [currentUser.id],
      timeline,
      comments: [
        {
          id: `comm-${Date.now()}`,
          authorId: currentUser.id,
          authorName: data.isAnonymous ? 'Anonymous Citizen' : currentUser.name,
          authorRole: 'citizen',
          content: 'Civic issue registered for municipal resolution. Requesting swift turnaround.',
          timestamp: nowIso
        }
      ]
    };

    // Calculate points: +50 report, +10 photo, +20 AI verified = 80 pts
    const pointsAwarded = 80;

    setIssues(prev => [newIssue, ...prev]);

    // Update current user points & count
    setCurrentUser(prev => {
      const newPoints = prev.points + pointsAwarded;
      let newLeague = prev.league;
      if (newPoints >= 1500) newLeague = 'Nagrik Seva Champion';
      else if (newPoints >= 800) newLeague = 'Civic Hero';
      else if (newPoints >= 400) newLeague = 'Community Champion';
      else if (newPoints >= 150) newLeague = 'Active Contributor';

      return {
        ...prev,
        points: newPoints,
        league: newLeague,
        problemsReportedCount: prev.problemsReportedCount + 1
      };
    });

    // Add activity event
    const newActivity: UserActivityEvent = {
      id: `act-${Date.now()}`,
      title: `You reported ${newIssue.title.substring(0, 32)}...`,
      description: `${data.locality || data.address} • Severity ${finalSeverityScore}/10`,
      timestamp: 'Just now',
      type: 'reported',
      issueId: newIssueId,
      category: finalCategory,
      icon: '🚨'
    };
    setRecentActivities(prev => [newActivity, ...prev]);

    // Add notification
    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: `✨ Report Registered: ${newIssue.title.substring(0, 35)}...`,
      message: `Report ID: ${newIssueId}. AI verified with severity ${finalSeverityScore}/10. You earned +${pointsAwarded} Civic Points!`,
      type: 'points_earned',
      issueId: newIssueId,
      timestamp: nowIso,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    triggerCelebration();

    return { success: true, issueId: newIssueId, newIssue, pointsEarned: pointsAwarded };
  };

  const supportIssue = (issueId: string) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id !== issueId) return issue;
        if (issue.supportedByUserIds.includes(currentUser.id)) return issue;

        return {
          ...issue,
          supportCount: issue.supportCount + 1,
          supportedByUserIds: [...issue.supportedByUserIds, currentUser.id]
        };
      })
    );

    // Give supporter +10 points
    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + 10
    }));

    const matched = issues.find(i => i.id === issueId);
    if (matched) {
      const suppActivity: UserActivityEvent = {
        id: `act-${Date.now()}`,
        title: `You supported issue ${matched.id}`,
        description: `${matched.title.substring(0, 36)}...`,
        timestamp: 'Just now',
        type: 'supported',
        issueId,
        category: matched.category,
        icon: '👍'
      };
      setRecentActivities(prev => [suppActivity, ...prev]);
    }

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: '👍 Supported Community Issue',
      message: 'You supported an active civic ticket. +10 Civic Points awarded!',
      type: 'points_earned',
      issueId,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateIssueStatus = (
    issueId: string,
    newStatus: IssueStatus,
    proofOfWork?: ProofOfWork,
    officialNote?: string
  ) => {
    const nowIso = new Date().toISOString();

    setIssues(prev =>
      prev.map(issue => {
        if (issue.id !== issueId) return issue;

        const stageTitleMap: Record<IssueStatus, string> = {
          reported: 'Reported',
          under_review: 'Under Official Review',
          ai_verified: 'AI Verified',
          authorities_notified: 'Authorities Notified',
          assigned: 'Assigned to Field Squad',
          in_progress: 'Repair Work in Progress',
          resolved: 'Civic Problem Successfully Resolved'
        };

        const newTimelineEvent: IssueTimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: newStatus,
          title: stageTitleMap[newStatus],
          description:
            officialNote ||
            (newStatus === 'resolved'
              ? 'Work verified on site with before & after photographic evidence.'
              : `Status updated to ${newStatus.replace('_', ' ')} by municipal authorities.`),
          timestamp: nowIso,
          actorName: currentUser.name,
          actorRole: currentUser.role === 'official' ? 'NMC Official / NGO' : 'Civic Supervisor',
          proofImageUrl: proofOfWork?.afterImageUrl
        };

        return {
          ...issue,
          status: newStatus,
          proofOfWork: proofOfWork || issue.proofOfWork,
          timeline: [...issue.timeline, newTimelineEvent]
        };
      })
    );

    // If marked as resolved, reward the reporting citizen +100 points
    if (newStatus === 'resolved') {
      triggerCelebration();

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: '🎉 Issue Marked as Resolved!',
        message: `Issue ${issueId} has been resolved on site with official Proof of Work uploaded! +100 Points bonus awarded to reporters.`,
        type: 'status_change',
        issueId,
        timestamp: nowIso,
        read: false
      };
      setNotifications(prev => [notif, ...prev]);

      const resActivity: UserActivityEvent = {
        id: `act-${Date.now()}`,
        title: `Your reported problem was resolved!`,
        description: `Issue ${issueId} verified and completed on site`,
        timestamp: 'Just now',
        type: 'resolved',
        issueId,
        category: 'Resolution',
        icon: '✅'
      };
      setRecentActivities(prev => [resActivity, ...prev]);
    }
  };

  const addComment = (issueId: string, content: string) => {
    if (!content.trim()) return;
    const nowIso = new Date().toISOString();
    const newComment: IssueComment = {
      id: `comm-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      content: content.trim(),
      timestamp: nowIso,
      isOfficial: currentUser.role === 'official'
    };

    setIssues(prev =>
      prev.map(issue => {
        if (issue.id !== issueId) return issue;
        return {
          ...issue,
          comments: [...issue.comments, newComment]
        };
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeRole,
        setActiveRole,
        currentUser,
        setCurrentUser,
        issues,
        selectedIssue,
        selectedIssueId,
        setSelectedIssueId,
        activeTab,
        setActiveTab,
        isReportModalOpen,
        setIsReportModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAIChatbotOpen,
        setIsAIChatbotOpen,
        notifications,
        unreadNotificationCount,
        recentActivities,
        stats,
        reportIssue,
        supportIssue,
        updateIssueStatus,
        addComment,
        markNotificationRead,
        markAllNotificationsRead,
        triggerCelebration,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
