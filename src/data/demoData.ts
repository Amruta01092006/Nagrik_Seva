import { CivicIssue, LeaderboardEntry, UserBadge, CrowdfundCampaign, UserProfileData } from '../types';

export const initialBadges: UserBadge[] = [
  {
    id: 'badge-1',
    name: 'First Alert',
    description: 'Reported your very first verified civic problem',
    icon: '🌱',
    unlockedAt: '2026-08-10T10:00:00Z',
    category: 'reporting'
  },
  {
    id: 'badge-2',
    name: 'Sharp Eye AI',
    description: 'Maintained a 95%+ AI verification accuracy on reports',
    icon: '🤖',
    unlockedAt: '2026-08-18T14:30:00Z',
    category: 'verification'
  },
  {
    id: 'badge-3',
    name: 'Community Pillar',
    description: 'Supported 20+ community issues in your local ward',
    icon: '🏛️',
    unlockedAt: '2026-08-25T09:15:00Z',
    category: 'community'
  },
  {
    id: 'badge-4',
    name: 'Pothole Patrol',
    description: 'Successfully reported 5 road hazards that were repaired',
    icon: '🚧',
    unlockedAt: '2026-08-29T16:45:00Z',
    category: 'impact'
  },
  {
    id: 'badge-5',
    name: 'Civic Guardian',
    description: 'Achieved top 5 rank in the citywide monthly leaderboard',
    icon: '🛡️',
    category: 'impact'
  },
  {
    id: 'badge-6',
    name: 'Verified Social Worker',
    description: 'Officially recognized field contributor with municipal clearance',
    icon: '⭐',
    category: 'community'
  }
];

export const demoCitizenUser: UserProfileData = {
  id: 'user-amruta-01',
  name: 'Amruta Sharma',
  email: 'amruta.sharma@nagrikseva.in',
  phone: '+91 98230 45678',
  role: 'citizen',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  points: 620,
  rank: 3,
  league: 'Civic Hero',
  problemsReportedCount: 11,
  problemsResolvedCount: 8,
  reputationScore: 98,
  badges: initialBadges.slice(0, 4),
  joinedDate: '2026-07-15',
  locality: 'Dharampeth, Ward 14',
  city: 'Nagpur',
  isAnonymousDefault: false,
  highContrastMode: false
};

export const demoOfficialUser: UserProfileData = {
  id: 'official-nmc-01',
  name: 'Rajesh Kulkarni (NMC Lead)',
  email: 'rajesh.kulkarni@nmc.gov.in',
  phone: '+91 94221 11223',
  role: 'official',
  officialType: 'nmc_official',
  department: 'Road & Stormwater Drainage Division',
  wardAssigned: 'Ward 12 - 16 (Zone 2, West)',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
  points: 1850,
  rank: 1,
  league: 'Nagrik Seva Champion',
  problemsReportedCount: 0,
  problemsResolvedCount: 42,
  reputationScore: 100,
  badges: initialBadges,
  joinedDate: '2026-05-01',
  locality: 'Civil Lines NMC HQ',
  city: 'Nagpur',
  isAnonymousDefault: false,
  highContrastMode: false
};

export const sampleCivicIssues: CivicIssue[] = [
  {
    id: 'NS-2026-0891',
    title: 'Hazardous Deep Pothole on High-Traffic Main Arterial Road',
    description: 'Large pothole measuring approx 1.2m wide and 15cm deep right at the Dharampeth traffic junction causing frequent two-wheeler skids and traffic slowdown.',
    category: 'Infrastructure',
    status: 'in_progress',
    severityScore: 8,
    severityLevel: 'high',
    severityReason: 'Located directly in the center lane of a high-speed arterial corridor with severe risk of two-wheeler accidents and vehicle suspension damage during evening rush hour.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
    location: {
      lat: 21.1458,
      lng: 79.0882,
      address: 'Near Coffee House Square, WHC Road, Dharampeth',
      locality: 'Dharampeth',
      ward: 'Ward 14',
      city: 'Nagpur',
      pincode: '440010',
      landmark: 'Opposite Central Mall Gate 2'
    },
    reportedAt: '2026-08-30T14:22:00Z',
    reportedBy: {
      id: 'user-amruta-01',
      name: 'Amruta Sharma',
      isAnonymous: false,
      badge: 'Civic Hero',
      points: 620
    },
    aiAnalysis: {
      detectedProblem: 'Pothole & Road Surface Rupture',
      category: 'Infrastructure',
      severityScore: 8,
      severityLevel: 'high',
      severityReason: 'Deep tarmac depression (>12cm) on active multi-lane carriageway. High hazard index for two-wheelers.',
      suggestedDepartment: 'NMC Road Maintenance & Bitumen Works Dept',
      suggestedTitle: 'Hazardous Deep Pothole on High-Traffic Main Arterial Road',
      suggestedDescription: 'Pothole located near busy Dharampeth junction. Rapid hot-mix asphalt patching required.',
      confidenceScore: 0.96,
      verificationStatus: 'ai_verified',
      verificationReason: 'Visual geometric pattern confirms asphalt cavitation matching road surface texture and road markings.',
      tags: ['Pothole', 'Road Hazard', 'Two-Wheeler Risk', 'Dharampeth']
    },
    verificationStatus: 'ai_verified',
    supportCount: 38,
    supportedByUserIds: ['user-02', 'user-03', 'user-04'],
    assignedTo: {
      name: 'Kailash Meshram (Junior Engineer)',
      department: 'NMC Zone 2 Bitumen Rapid Action Team',
      organization: 'Nagpur Municipal Corporation',
      assignedAt: '2026-08-31T09:30:00Z'
    },
    timeline: [
      {
        id: 'tl-1',
        stage: 'reported',
        title: 'Problem Reported via Nagrik AI Camera',
        description: 'Citizen captured live photo with GPS coordinates attached.',
        timestamp: '2026-08-30T14:22:00Z',
        actorName: 'Amruta Sharma',
        actorRole: 'Citizen'
      },
      {
        id: 'tl-2',
        stage: 'ai_verified',
        title: 'Nagrik AI Vision Verification Complete',
        description: 'AI verified road surface rupture with 96% confidence. Severity assigned 8/10.',
        timestamp: '2026-08-30T14:22:05Z',
        actorName: 'Nagrik AI Engine',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: 'tl-3',
        stage: 'authorities_notified',
        title: 'NMC Central Control Room Alerted',
        description: 'Ticket dispatched to Zone 2 Road Maintenance Division.',
        timestamp: '2026-08-30T14:25:00Z',
        actorName: 'NMC Dispatch System',
        actorRole: 'Municipal Authority'
      },
      {
        id: 'tl-4',
        stage: 'assigned',
        title: 'Assigned to Rapid Bitumen Repair Unit',
        description: 'JE Kailash Meshram designated as field officer. Work order #WO-891 issued.',
        timestamp: '2026-08-31T09:30:00Z',
        actorName: 'Rajesh Kulkarni (NMC Lead)',
        actorRole: 'Ward Officer'
      },
      {
        id: 'tl-5',
        stage: 'in_progress',
        title: 'Repair Crew on Site',
        description: 'Cold-mix leveling and compaction in progress before evening traffic.',
        timestamp: '2026-09-01T11:00:00Z',
        actorName: 'Kailash Meshram',
        actorRole: 'Field Supervisor'
      }
    ],
    comments: [
      {
        id: 'comm-1',
        authorId: 'user-02',
        authorName: 'Sanjay V.',
        authorRole: 'citizen',
        content: 'Almost tripped here yesterday on my scooter. Glad this got assigned so quickly!',
        timestamp: '2026-08-30T16:10:00Z'
      },
      {
        id: 'comm-2',
        authorId: 'official-nmc-01',
        authorName: 'Rajesh Kulkarni (NMC)',
        authorRole: 'nmc_official',
        content: 'Our team is scheduled to complete the resurfacing today before 6 PM. Thank you for reporting.',
        timestamp: '2026-09-01T11:15:00Z',
        isOfficial: true
      }
    ],
    isDemo: true
  },
  {
    id: 'NS-2026-0884',
    title: 'Severe Waterlogging & Clogged Stormwater Drain',
    description: 'Rainwater accumulated over 1.5 feet deep outside Metro Station entrance due to silted catchpits and plastic choking the main drainage grid.',
    category: 'Water & Drainage',
    status: 'reported',
    severityScore: 9,
    severityLevel: 'critical',
    severityReason: 'High flood level restricting pedestrian entry to public mass transit hub. Electricity distribution pillar partially submerged nearby posing electrocution danger.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800',
    location: {
      lat: 21.1524,
      lng: 79.0821,
      address: 'Sitabuldi Metro Station Gate 3, Subhash Road',
      locality: 'Sitabuldi',
      ward: 'Ward 12',
      city: 'Nagpur',
      pincode: '440012',
      landmark: 'Near Metro Interchange Footover Bridge'
    },
    reportedAt: '2026-09-01T08:15:00Z',
    reportedBy: {
      id: 'user-05',
      name: 'Dr. Rohan Deshmukh',
      isAnonymous: false,
      badge: 'Active Contributor',
      points: 240
    },
    aiAnalysis: {
      detectedProblem: 'Severe Urban Inundation & Blocked Drain Grate',
      category: 'Water & Drainage',
      severityScore: 9,
      severityLevel: 'critical',
      severityReason: 'Standing flood water near high-voltage utility infrastructure and metro commuter walkway.',
      suggestedDepartment: 'NMC Stormwater Drainage & Disaster Cell',
      suggestedTitle: 'Severe Waterlogging & Clogged Stormwater Drain',
      suggestedDescription: 'Immediate deployment of de-watering suction pumps and catchpit de-silting crew needed.',
      confidenceScore: 0.98,
      verificationStatus: 'ai_verified',
      verificationReason: 'Water reflection analysis confirms deep standing flood water with submerged curbs.',
      tags: ['Waterlogging', 'Drainage', 'Submerged Road', 'Metro Station', 'Critical']
    },
    verificationStatus: 'ai_verified',
    supportCount: 64,
    supportedByUserIds: ['user-amruta-01', 'user-06', 'user-07', 'user-08'],
    timeline: [
      {
        id: 'tl-201',
        stage: 'reported',
        title: 'Emergency Issue Logged',
        description: 'Captured by commuter Dr. Rohan with voice description.',
        timestamp: '2026-09-01T08:15:00Z',
        actorName: 'Dr. Rohan Deshmukh',
        actorRole: 'Citizen'
      },
      {
        id: 'tl-202',
        stage: 'ai_verified',
        title: 'High Severity Escalation by AI',
        description: 'AI tagged as Critical Severity 9/10 due to high footfall zone and proximity to electric sub-station.',
        timestamp: '2026-09-01T08:15:04Z',
        actorName: 'Nagrik AI Engine',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: 'tl-203',
        stage: 'authorities_notified',
        title: 'Emergency SMS & Dashboard Alert Broadcasted',
        description: 'Auto-dispatched with highest priority to Executive Engineer, Drainage.',
        timestamp: '2026-09-01T08:16:00Z',
        actorName: 'Nagrik Emergency Dispatch',
        actorRole: 'System'
      }
    ],
    comments: [
      {
        id: 'comm-201',
        authorId: 'user-07',
        authorName: 'Pooja Iyer',
        authorRole: 'citizen',
        content: 'Elderly citizens cannot cross to reach the hospital. Please send the pump truck!',
        timestamp: '2026-09-01T08:45:00Z'
      }
    ],
    isDemo: true
  },
  {
    id: 'NS-2026-0872',
    title: 'Open Garbage Dump & Overflowing Waste Container',
    description: 'Massive garbage heap overflowing onto pedestrian walkway and school gate for over 4 days, emitting foul odor and attracting stray cattle.',
    category: 'Sanitation',
    status: 'assigned',
    severityScore: 6,
    severityLevel: 'medium',
    severityReason: 'Sanitation hazard located within 50 meters of St. Xavier Primary School. Risk of vector-borne diseases and stray animal disruption.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
    location: {
      lat: 21.1398,
      lng: 79.0674,
      address: 'Behind Ram Nagar Market, Near St. Xavier School Gate',
      locality: 'Ram Nagar',
      ward: 'Ward 15',
      city: 'Nagpur',
      pincode: '440033',
      landmark: 'Behind Community Garden'
    },
    reportedAt: '2026-08-28T07:40:00Z',
    reportedBy: {
      id: 'user-09',
      name: 'Sunil Gokhale',
      isAnonymous: false,
      badge: 'Community Champion',
      points: 480
    },
    aiAnalysis: {
      detectedProblem: 'Municipal Solid Waste Accumulation',
      category: 'Sanitation',
      severityScore: 6,
      severityLevel: 'medium',
      severityReason: 'Uncontained organic & plastic waste in residential school proximity.',
      suggestedDepartment: 'NMC Solid Waste Management & Health Dept',
      suggestedTitle: 'Open Garbage Dump & Overflowing Waste Container',
      suggestedDescription: 'Deploy compactor vehicle and sanitize area with bleaching powder.',
      confidenceScore: 0.94,
      verificationStatus: 'ai_verified',
      verificationReason: 'Identified overflowing green municipal bin and scattered refuse footprint.',
      tags: ['Garbage', 'Sanitation', 'School Zone', 'Solid Waste']
    },
    verificationStatus: 'ai_verified',
    supportCount: 29,
    supportedByUserIds: ['user-amruta-01', 'user-10'],
    assignedTo: {
      name: 'Clean City Green City NGO & NMC Sanitary Inspector',
      department: 'Ward 15 Sanitation Squad',
      organization: 'NMC & EcoSan NGO Partner',
      assignedAt: '2026-08-29T10:00:00Z'
    },
    timeline: [
      {
        id: 'tl-301',
        stage: 'reported',
        title: 'Reported by Resident Sunil',
        description: 'Photo uploaded with request for urgent school-morning clearance.',
        timestamp: '2026-08-28T07:40:00Z',
        actorName: 'Sunil Gokhale',
        actorRole: 'Citizen'
      },
      {
        id: 'tl-302',
        stage: 'ai_verified',
        title: 'AI Classified as Sanitation Priority',
        description: 'Visual classification confirmed solid waste overflow.',
        timestamp: '2026-08-28T07:40:04Z',
        actorName: 'Nagrik AI Engine',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: 'tl-303',
        stage: 'assigned',
        title: 'Joint NGO & Ward Sanitation Assigned',
        description: 'Compactor vehicle #MH31-CV-442 scheduled for round.',
        timestamp: '2026-08-29T10:00:00Z',
        actorName: 'Sanitary Inspector Pawar',
        actorRole: 'Health Officer'
      }
    ],
    comments: [
      {
        id: 'comm-301',
        authorId: 'ngo-01',
        authorName: 'Swachh Nagpur Foundation',
        authorRole: 'ngo',
        content: 'Our volunteers are coordinating with the dumper driver to sanitize the spot post clearance.',
        timestamp: '2026-08-29T11:20:00Z'
      }
    ],
    isDemo: true
  },
  {
    id: 'NS-2026-0860',
    title: 'Dark Unlit Stretch Due to 4 Broken Streetlights',
    description: 'Four consecutive LED streetlights non-functional on Gokulpeth Women’s Hostel bypass road, leaving a 200m stretch in total pitch darkness at night.',
    category: 'Public Safety',
    status: 'resolved',
    severityScore: 7,
    severityLevel: 'high',
    severityReason: 'Severe public safety hazard for female students and pedestrians walking home from coaching centers after 8 PM.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    location: {
      lat: 21.1412,
      lng: 79.0560,
      address: 'Gokulpeth 3rd Lane, Behind Girls Hostel Block B',
      locality: 'Gokulpeth',
      ward: 'Ward 13',
      city: 'Nagpur',
      pincode: '440010',
      landmark: 'Near Shivaji Nagar Garden Path'
    },
    reportedAt: '2026-08-24T20:10:00Z',
    reportedBy: {
      id: 'user-amruta-01',
      name: 'Amruta Sharma',
      isAnonymous: false,
      badge: 'Civic Hero',
      points: 620
    },
    aiAnalysis: {
      detectedProblem: 'Multiple Non-Functional Streetlight Luminaires',
      category: 'Public Safety',
      severityScore: 7,
      severityLevel: 'high',
      severityReason: 'Consecutive lighting failure in high-vulnerability pedestrian zone.',
      suggestedDepartment: 'NMC Electrical & Public Lighting Wing',
      suggestedTitle: 'Dark Unlit Stretch Due to Broken Streetlights',
      suggestedDescription: 'Replace faulty drivers / LED fixture units on pole numbers GP-34 to GP-37.',
      confidenceScore: 0.95,
      verificationStatus: 'ai_verified',
      verificationReason: 'Verified streetlight pole structure and dark illumination profile.',
      tags: ['Streetlight', 'Public Safety', 'Women Safety', 'Gokulpeth']
    },
    verificationStatus: 'ai_verified',
    supportCount: 52,
    supportedByUserIds: ['user-11', 'user-12', 'user-13'],
    assignedTo: {
      name: 'Pravin Joshi (Electrical Wing)',
      department: 'NMC Electrical Maintenance Division',
      organization: 'Nagpur Municipal Corporation',
      assignedAt: '2026-08-25T11:00:00Z'
    },
    timeline: [
      {
        id: 'tl-401',
        stage: 'reported',
        title: 'Reported with GPS Geotag',
        description: 'Reported by Amruta during evening walk.',
        timestamp: '2026-08-24T20:10:00Z',
        actorName: 'Amruta Sharma',
        actorRole: 'Citizen'
      },
      {
        id: 'tl-402',
        stage: 'ai_verified',
        title: 'Safety Priority Flagged by AI',
        description: 'Public safety classification applied with 7/10 severity.',
        timestamp: '2026-08-24T20:10:04Z',
        actorName: 'Nagrik AI Engine',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: 'tl-403',
        stage: 'assigned',
        title: 'Assigned to Electrical Division',
        description: 'Lineman assigned for ballast and LED module overhaul.',
        timestamp: '2026-08-25T11:00:00Z',
        actorName: 'NMC Electrical Lead',
        actorRole: 'Official'
      },
      {
        id: 'tl-404',
        stage: 'in_progress',
        title: 'Hydraulic Bucket Truck Deployed',
        description: 'Replacement of burned driver circuits underway.',
        timestamp: '2026-08-26T15:30:00Z',
        actorName: 'Pravin Joshi',
        actorRole: 'Electrical Inspector'
      },
      {
        id: 'tl-405',
        stage: 'resolved',
        title: 'Problem Resolved with Proof of Work',
        description: 'All 4 luminaires restored to full 120W LED brightness. Proof photos uploaded and verified.',
        timestamp: '2026-08-27T19:00:00Z',
        actorName: 'Pravin Joshi (NMC)',
        actorRole: 'Electrical Inspector',
        proofImageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800'
      }
    ],
    proofOfWork: {
      beforeImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
      afterImageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800',
      resolvedAt: '2026-08-27T19:00:00Z',
      resolvedBy: 'Pravin Joshi (Senior Electrical Inspector, Zone 2)',
      officialRole: 'NMC Electrical Division',
      resolutionNotes: 'Replaced 4 burnt SMPS power drivers and upgraded luminaires to energy-efficient 120W Philips Smart LEDs. Street is now brightly illuminated with zero dark spots.',
      materialsUsed: '4x 120W LED Modules, 20m Copper Cable, 4x Waterproof Junction Enclosures',
      verifiedByWardOfficer: true
    },
    comments: [
      {
        id: 'comm-401',
        authorId: 'user-amruta-01',
        authorName: 'Amruta Sharma',
        authorRole: 'citizen',
        content: 'Walked through here tonight — it is completely bright and safe now! Huge thanks to the NMC team! 🎉',
        timestamp: '2026-08-27T21:30:00Z'
      }
    ],
    isDemo: true
  },
  {
    id: 'NS-2026-0855',
    title: 'Broken Concrete Cover on Deep Drainage Manhole',
    description: 'Heavily cracked and sunken concrete lid on an 8-foot deep stormwater drain right next to a busy vegetable marketplace footpath.',
    category: 'Road Safety',
    status: 'in_progress',
    severityScore: 9,
    severityLevel: 'critical',
    severityReason: 'Severe fall hazard. Missing safety barrier near heavy foot traffic with risk of fatal pedestrian fall, especially for children and seniors.',
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800',
    location: {
      lat: 21.1480,
      lng: 79.0750,
      address: 'Cotton Market Main Road, Near North Footpath',
      locality: 'Cotton Market',
      ward: 'Ward 11',
      city: 'Nagpur',
      pincode: '440018',
      landmark: 'Beside Mandi Gate 1'
    },
    reportedAt: '2026-08-29T11:00:00Z',
    reportedBy: {
      id: 'user-14',
      name: 'Kunal Patil',
      isAnonymous: false,
      badge: 'Active Contributor',
      points: 190
    },
    aiAnalysis: {
      detectedProblem: 'Damaged Manhole Cover / Exposed Chamber',
      category: 'Road Safety',
      severityScore: 9,
      severityLevel: 'critical',
      severityReason: 'Deep chamber exposed on walkway. High probability of catastrophic fall.',
      suggestedDepartment: 'NMC Underground Drainage & Civil Infrastructure',
      suggestedTitle: 'Broken Concrete Cover on Deep Drainage Manhole',
      suggestedDescription: 'Immediate safety barricade installation and heavy-duty SFRC cover replacement.',
      confidenceScore: 0.97,
      verificationStatus: 'ai_verified',
      verificationReason: 'Visual edge detection identifies concrete shear fracture over chamber opening.',
      tags: ['Manhole', 'Pedestrian Risk', 'Critical Hazard', 'Market Area']
    },
    verificationStatus: 'ai_verified',
    supportCount: 47,
    supportedByUserIds: ['user-amruta-01', 'user-02', 'user-15'],
    assignedTo: {
      name: 'NMC Civil Maintenance Squad 4',
      department: 'Civil Infrastructure Works',
      organization: 'Nagpur Municipal Corporation',
      assignedAt: '2026-08-29T14:00:00Z'
    },
    timeline: [
      {
        id: 'tl-501',
        stage: 'reported',
        title: 'Reported with Alert Flag',
        description: 'Reported with high urgency tag.',
        timestamp: '2026-08-29T11:00:00Z',
        actorName: 'Kunal Patil',
        actorRole: 'Citizen'
      },
      {
        id: 'tl-502',
        stage: 'ai_verified',
        title: 'Critical Severity Flagged by AI',
        description: 'Assigned 9/10 severity score.',
        timestamp: '2026-08-29T11:00:05Z',
        actorName: 'Nagrik AI Engine',
        actorRole: 'Automated AI Verifier'
      },
      {
        id: 'tl-503',
        stage: 'in_progress',
        title: 'Warning Barricades Placed & Precast Cover Ordered',
        description: 'Red reflective drums placed around chamber. New heavy-duty SFRC lid being fabricated.',
        timestamp: '2026-08-30T10:00:00Z',
        actorName: 'Civil Squad 4',
        actorRole: 'Official'
      }
    ],
    comments: [
      {
        id: 'comm-501',
        authorId: 'official-nmc-01',
        authorName: 'Rajesh Kulkarni (NMC)',
        authorRole: 'nmc_official',
        content: 'Barricades are installed for safety. The new precast SFRC heavy load slab will be installed and cemented by tomorrow morning.',
        timestamp: '2026-08-30T10:15:00Z',
        isOfficial: true
      }
    ],
    isDemo: true
  }
];

export const demoLeaderboard: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    rank: 1,
    name: 'Vikramaditya Rao',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    locality: 'Civil Lines, Ward 10',
    city: 'Nagpur',
    points: 1240,
    reportedCount: 22,
    resolvedCount: 18,
    league: 'Nagrik Seva Champion',
    badge: '🏆 City Champion',
    isVerifiedSocialWorker: true
  },
  {
    id: 'lb-2',
    rank: 2,
    name: 'Priyanka Sen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    locality: 'Ramdaspeth, Ward 16',
    city: 'Nagpur',
    points: 890,
    reportedCount: 16,
    resolvedCount: 13,
    league: 'Civic Hero',
    badge: '🟣 Civic Hero',
    isVerifiedSocialWorker: true
  },
  {
    id: 'lb-3',
    rank: 3,
    name: 'Amruta Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    locality: 'Dharampeth, Ward 14',
    city: 'Nagpur',
    points: 620,
    reportedCount: 11,
    resolvedCount: 8,
    league: 'Civic Hero',
    badge: '🟣 Civic Hero'
  },
  {
    id: 'lb-4',
    rank: 4,
    name: 'Aditya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    locality: 'Pratap Nagar, Ward 18',
    city: 'Nagpur',
    points: 510,
    reportedCount: 9,
    resolvedCount: 7,
    league: 'Community Champion',
    badge: '🔵 Champion'
  },
  {
    id: 'lb-5',
    rank: 5,
    name: 'Meera Nambiar',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    locality: 'Bajaj Nagar, Ward 17',
    city: 'Nagpur',
    points: 440,
    reportedCount: 8,
    resolvedCount: 6,
    league: 'Community Champion',
    badge: '🔵 Champion'
  },
  {
    id: 'lb-6',
    rank: 6,
    name: 'Tariq Anwar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    locality: 'Sadar Bazaar, Ward 08',
    city: 'Nagpur',
    points: 380,
    reportedCount: 7,
    resolvedCount: 5,
    league: 'Active Contributor',
    badge: '🟢 Contributor'
  },
  {
    id: 'lb-7',
    rank: 7,
    name: 'Sneha Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=256',
    locality: 'Manish Nagar, Ward 22',
    city: 'Nagpur',
    points: 310,
    reportedCount: 6,
    resolvedCount: 4,
    league: 'Active Contributor',
    badge: '🟢 Contributor'
  }
];

export const demoCrowdfundCampaigns: CrowdfundCampaign[] = [
  {
    id: 'cf-1',
    title: 'Monsoon Flood Relief Kits & De-watering Pumps for Slum Clusters',
    category: 'Emergency Community Assistance',
    ngoName: 'Nagpur Seva Foundation (Reg. 80G Verified)',
    ngoVerified: true,
    description: 'Providing heavy-duty 5HP portable de-watering pumps, 300 waterproof tarpaulin emergency roof shelters, and clean drinking water purification filters to flood-vulnerable low-lying slum families in Ward 24.',
    targetAmount: 250000,
    raisedAmount: 185000,
    donorCount: 142,
    daysLeft: 12,
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
    locality: 'Nag River Basin Settlements, Ward 24',
    city: 'Nagpur',
    allocationBreakdown: [
      { label: 'Direct Equipment & Tarpaulin Kits', percent: 85 },
      { label: 'Field Logistics & Fuel', percent: 10 },
      { label: 'Emergency Medical First Aid Reserve', percent: 5 }
    ]
  },
  {
    id: 'cf-2',
    title: 'Solar High-Mast Streetlights for 3 Unlit Community Playgrounds',
    category: 'Public Safety & Youth',
    ngoName: 'Youth For City Green Trust',
    ngoVerified: true,
    description: 'Installing 3 solar-powered high-lumen lighting towers with automatic dusk-to-dawn sensors in municipal open parks so neighborhood children and women can safely use recreation spaces in the evenings.',
    targetAmount: 180000,
    raisedAmount: 94000,
    donorCount: 88,
    daysLeft: 20,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    locality: 'Bhandewadi & Nandanvan',
    city: 'Nagpur',
    allocationBreakdown: [
      { label: 'Solar Panels & Lithium Batteries', percent: 78 },
      { label: 'Structural Poles & Civil Foundation', percent: 15 },
      { label: 'Maintenance Warranty Fund (2 Years)', percent: 7 }
    ]
  },
  {
    id: 'cf-3',
    title: 'Zero-Waste Decentralized Compost Units for Municipal Primary Schools',
    category: 'Sanitation & Education',
    ngoName: 'Swachh Bharat Citizen Collective',
    ngoVerified: true,
    description: 'Setting up aerobic smart composting tumblers and organic waste segregation bins across 6 municipal primary schools, turning canteen food waste into nutrient-rich garden manure for student-run vegetable patches.',
    targetAmount: 120000,
    raisedAmount: 76000,
    donorCount: 65,
    daysLeft: 18,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    locality: 'Sitabuldi & Mahal Zones',
    city: 'Nagpur',
    allocationBreakdown: [
      { label: 'Composting Drum Units & Tools', percent: 80 },
      { label: 'Student Eco-Workshops & Manuals', percent: 12 },
      { label: 'Microbial Culture & Consumables', percent: 8 }
    ]
  }
];

export const curatedSamplePhotos = [
  {
    title: 'Major Pothole on Carriageway',
    category: 'Infrastructure',
    severity: 8,
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
    description: 'Deep road cavity with loose gravel along asphalt lane'
  },
  {
    title: 'Overflowing Solid Waste & Plastic Pile',
    category: 'Sanitation',
    severity: 7,
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
    description: 'Unmanaged garbage accumulation spilling onto sidewalk'
  },
  {
    title: 'Street Inundation & Blocked Drain',
    category: 'Water & Drainage',
    severity: 9,
    url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800',
    description: 'Deep rain water accumulation blocking access to public path'
  },
  {
    title: 'Broken Streetlight in Dark Alley',
    category: 'Public Safety',
    severity: 6,
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    description: 'Damaged electrical luminaire leaving residential corridor dark'
  },
  {
    title: 'Damaged Open Manhole Chamber',
    category: 'Road Safety',
    severity: 9,
    url: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800',
    description: 'Missing/fractured storm drain concrete slab on active walkway'
  }
];
