export type UserRole = 'citizen' | 'official';

export type OfficialType = 'social_worker' | 'ngo' | 'nmc_official' | 'contractor';

export type IssueCategory =
  | 'Road Damage'
  | 'Potholes'
  | 'Waterlogging'
  | 'Water Supply'
  | 'Garbage'
  | 'Blocked Gutters'
  | 'Broken Streetlights'
  | 'Traffic Safety'
  | 'Damaged Infrastructure'
  | 'Public Safety'
  | 'Infrastructure'
  | 'Sanitation'
  | 'Water & Drainage'
  | 'Road Safety'
  | 'Environment';

export type IssueStatus =
  | 'reported'
  | 'under_review'
  | 'ai_verified'
  | 'authorities_notified'
  | 'assigned'
  | 'in_progress'
  | 'resolved';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type VerificationStatus = 'ai_verified' | 'needs_review' | 'suspicious';

export type League =
  | 'Citizen'
  | 'Active Contributor'
  | 'Community Champion'
  | 'Civic Hero'
  | 'Nagrik Seva Champion';

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  locality: string;
  ward: string;
  city: string;
  pincode?: string;
  landmark?: string;
}

export interface AIAnalysisResult {
  detectedProblem: string;
  category: IssueCategory;
  severityScore: number; // 1 to 10
  severityLevel: SeverityLevel;
  severityReason: string;
  suggestedDepartment: string;
  suggestedTitle: string;
  suggestedDescription: string;
  confidenceScore: number; // 0.0 - 1.0
  confidenceRating?: 'High' | 'Medium' | 'Low';
  verificationStatus: VerificationStatus;
  verificationReason: string;
  tags: string[];
}

export interface ProofOfWork {
  beforeImageUrl?: string;
  afterImageUrl: string;
  resolvedAt: string;
  resolvedBy: string;
  officialRole: string;
  resolutionNotes: string;
  contractorName?: string;
  materialsUsed?: string;
  verifiedByWardOfficer?: boolean;
}

export interface IssueTimelineEvent {
  id: string;
  stage: IssueStatus;
  title: string;
  description: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  avatarUrl?: string;
  proofImageUrl?: string;
}

export interface IssueComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole | OfficialType;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  isOfficial?: boolean;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  severityScore: number;
  severityLevel: SeverityLevel;
  severityReason: string;
  imageUrl: string;
  location: LocationData;
  whenNoticed?: string;
  landmark?: string;
  reportedAt: string;
  reportedBy: {
    id: string;
    name: string;
    isAnonymous: boolean;
    badge?: string;
    points?: number;
  };
  aiAnalysis: AIAnalysisResult;
  verificationStatus: VerificationStatus;
  supportCount: number; // upvotes
  supportedByUserIds: string[];
  assignedTo?: {
    name: string;
    department: string;
    organization: string;
    assignedAt: string;
  };
  timeline: IssueTimelineEvent[];
  proofOfWork?: ProofOfWork;
  comments: IssueComment[];
  isDemo?: boolean;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'reporting' | 'verification' | 'impact' | 'community';
}

export interface UserActivityEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'reported' | 'verified' | 'assigned' | 'in_progress' | 'resolved' | 'supported';
  issueId: string;
  category: string;
  icon: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  officialType?: OfficialType;
  department?: string;
  wardAssigned?: string;
  avatar: string;
  points: number;
  rank: number;
  league: League;
  problemsReportedCount: number;
  problemsResolvedCount: number;
  reputationScore: number; // 0 - 100
  badges: UserBadge[];
  joinedDate: string;
  locality: string;
  city: string;
  isAnonymousDefault: boolean;
  highContrastMode?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  locality: string;
  city: string;
  points: number;
  reportedCount: number;
  resolvedCount: number;
  league: League;
  badge: string;
  isVerifiedSocialWorker?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'status_change' | 'points_earned' | 'duplicate_alert' | 'official_alert' | 'urgent_ward';
  issueId?: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ta' | 'bn';

export interface CrowdfundCampaign {
  id: string;
  title: string;
  category: string;
  ngoName: string;
  ngoVerified: boolean;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  daysLeft: number;
  imageUrl: string;
  locality: string;
  city: string;
  allocationBreakdown: {
    label: string;
    percent: number;
  }[];
}
