import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  heroHeading: string;
  heroSubheading: string;
  reportProblemBtn: string;
  exploreMapBtn: string;
  continueAsCitizen: string;
  continueAsCitizenDesc: string;
  continueAsOfficial: string;
  continueAsOfficialDesc: string;
  navHome: string;
  navReport: string;
  navMap: string;
  navDashboard: string;
  navLeaderboard: string;
  navImpact: string;
  navAIChat: string;
  navProfile: string;
  login: string;
  logout: string;
  switchRole: string;
  liveIssuesTicker: string;
  citizenDashboard: string;
  officialDashboard: string;
  reportedProblems: string;
  resolvedProblems: string;
  myPoints: string;
  communityRank: string;
  contributionLevel: string;
  reportNewIssue: string;
  filterAll: string;
  statusReported: string;
  statusAIVerified: string;
  statusNotified: string;
  statusAssigned: string;
  statusInProgress: string;
  statusResolved: string;
  severityCritical: string;
  severityHigh: string;
  severityMedium: string;
  severityLow: string;
  aiAnalyzing: string;
  duplicateWarning: string;
  supportExistingBtn: string;
  submitAnywayBtn: string;
  proofOfWork: string;
  supportIssue: string;
  supported: string;
  aiVerificationBadge: string;
  cameraCapture: string;
  uploadImage: string;
  voiceRecord: string;
  aiChatReport: string;
  shareLocation: string;
  pickOnMap: string;
  confirmReport: string;
  impactFundTitle: string;
  impactFundSubtitle: string;
  comingSoon: string;
  leaderboardTitle: string;
  monthly: string;
  allTime: string;
  localArea: string;
  citywide: string;
  badgesTitle: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: "Nagrik Seva",
    tagline: "Your Voice. Your City. Your Responsibility.",
    welcomeTitle: "Welcome to Nagrik Seva",
    welcomeSubtitle: "Together, we can build better communities.",
    heroHeading: "See a Problem? Be the Solution.",
    heroSubheading: "Report civic issues in seconds. Let AI identify the problem, notify the right authorities, and track the journey until it's resolved.",
    reportProblemBtn: "Report a Problem",
    exploreMapBtn: "Explore Issues Near You",
    continueAsCitizen: "Continue as Citizen",
    continueAsCitizenDesc: "Report problems. Improve your locality. Earn recognition for making a difference.",
    continueAsOfficial: "Continue as Organization",
    continueAsOfficialDesc: "Manage civic issues, coordinate solutions, and make an impact in your community.",
    navHome: "Home",
    navReport: "Report Issue",
    navMap: "Explore Map",
    navDashboard: "Dashboard",
    navLeaderboard: "Leaderboard",
    navImpact: "Impact Fund",
    navAIChat: "Nagrik AI",
    navProfile: "Profile",
    login: "Log In",
    logout: "Log Out",
    switchRole: "Switch Mode",
    liveIssuesTicker: "Live Community Updates",
    citizenDashboard: "Citizen Dashboard",
    officialDashboard: "NMC & NGO Management Console",
    reportedProblems: "Problems Reported",
    resolvedProblems: "Problems Resolved",
    myPoints: "Civic Points",
    communityRank: "City Rank",
    contributionLevel: "League Level",
    reportNewIssue: "Report a New Problem",
    filterAll: "All Categories",
    statusReported: "Reported",
    statusAIVerified: "AI Verified",
    statusNotified: "Authorities Notified",
    statusAssigned: "Assigned",
    statusInProgress: "In Progress",
    statusResolved: "Resolved",
    severityCritical: "Critical (9-10)",
    severityHigh: "High Priority (7-8)",
    severityMedium: "Medium Priority (4-6)",
    severityLow: "Low Priority (1-3)",
    aiAnalyzing: "Nagrik AI Vision is analyzing your evidence...",
    duplicateWarning: "A similar issue has already been reported nearby.",
    supportExistingBtn: "Support Existing Report (+10 pts)",
    submitAnywayBtn: "Submit Anyway",
    proofOfWork: "Official Proof of Resolution",
    supportIssue: "Support This Issue",
    supported: "Supported",
    aiVerificationBadge: "AI Verified Report",
    cameraCapture: "Live Camera",
    uploadImage: "Upload Photo",
    voiceRecord: "Voice Report",
    aiChatReport: "Chat with AI",
    shareLocation: "Use Live GPS Location",
    pickOnMap: "Pinpoint on Map",
    confirmReport: "Submit Civic Report",
    impactFundTitle: "Nagrik Impact Fund",
    impactFundSubtitle: "Crowdfunding verified citizen & NGO micro-initiatives for rapid civic upliftment.",
    comingSoon: "Coming Soon (Future Module)",
    leaderboardTitle: "Civic Champions Leaderboard",
    monthly: "Monthly",
    allTime: "All Time",
    localArea: "Local Ward",
    citywide: "Citywide",
    badgesTitle: "Badges & Achievements"
  },
  hi: {
    appName: "नागरिक सेवा",
    tagline: "आपकी आवाज़। आपका शहर। आपकी ज़िम्मेदारी।",
    welcomeTitle: "नागरिक सेवा में आपका स्वागत है",
    welcomeSubtitle: "साथ मिलकर, हम बेहतर समुदाय बना सकते हैं।",
    heroHeading: "समस्या देखी? समाधान बनें।",
    heroSubheading: "कुछ ही सेकंड में नागरिक समस्याओं की रिपोर्ट करें। एआई को समस्या पहचानने दें, सही अधिकारियों को सूचित करें और समाधान तक ट्रैक करें।",
    reportProblemBtn: "समस्या रिपोर्ट करें",
    exploreMapBtn: "अपने आस-पास की समस्याएं देखें",
    continueAsCitizen: "नागरिक के रूप में जारी रखें",
    continueAsCitizenDesc: "समस्याएं बताएं, अपने इलाके को सुधारें और बदलाव लाने के लिए सम्मान पाएं।",
    continueAsOfficial: "संस्था / अधिकारी के रूप में जारी रखें",
    continueAsOfficialDesc: "नागरिक मुद्दों का प्रबंधन करें, समाधान का समन्वय करें और प्रभाव डालें।",
    navHome: "होम",
    navReport: "रिपोर्ट करें",
    navMap: "मानचित्र देखें",
    navDashboard: "डैशबोर्ड",
    navLeaderboard: "लीडरबोर्ड",
    navImpact: "प्रभाव कोष",
    navAIChat: "नागरिक एआई",
    navProfile: "प्रोफ़ाइल",
    login: "लॉग इन",
    logout: "लॉग आउट",
    switchRole: "भूमिका बदलें",
    liveIssuesTicker: "लाइव सामुदायिक अपडेट",
    citizenDashboard: "नागरिक डैशबोर्ड",
    officialDashboard: "अधिकारी एवं एनजीओ कंसोल",
    reportedProblems: "कुल रिपोर्ट की गई",
    resolvedProblems: "हल की गई समस्याएं",
    myPoints: "नागरिक अंक",
    communityRank: "शहर रैंक",
    contributionLevel: "लीग स्तर",
    reportNewIssue: "नई समस्या दर्ज करें",
    filterAll: "सभी श्रेणियां",
    statusReported: "दर्ज की गई",
    statusAIVerified: "एआई सत्यापित",
    statusNotified: "विभाग को सूचित",
    statusAssigned: "टीम को सौंपी गई",
    statusInProgress: "कार्य प्रगति पर",
    statusResolved: "समाधान पूर्ण",
    severityCritical: "अत्यधिक गंभीर (9-10)",
    severityHigh: "उच्च प्राथमिकता (7-8)",
    severityMedium: "मध्यम प्राथमिकता (4-6)",
    severityLow: "सामान्य (1-3)",
    aiAnalyzing: "नागरिक एआई चित्र का विश्लेषण कर रहा है...",
    duplicateWarning: "पास में ही एक मिलती-जुलती समस्या पहले से दर्ज है।",
    supportExistingBtn: "मौजूदा रिपोर्ट का समर्थन करें (+10 अंक)",
    submitAnywayBtn: "फिर भी नई रिपोर्ट दर्ज करें",
    proofOfWork: "कार्य समापन का आधिकारिक प्रमाण",
    supportIssue: "इस समस्या का समर्थन करें",
    supported: "समर्थन किया गया",
    aiVerificationBadge: "एआई सत्यापित रिपोर्ट",
    cameraCapture: "कैमरा खोलें",
    uploadImage: "फोटो अपलोड करें",
    voiceRecord: "आवाज़ से बताएं",
    aiChatReport: "एआई से चैट करें",
    shareLocation: "वर्तमान जीपीएस स्थान लें",
    pickOnMap: "मानचित्र पर चुनें",
    confirmReport: "रिपोर्ट सबमिट करें",
    impactFundTitle: "नागरिक इम्पैक्ट फंड",
    impactFundSubtitle: "नागरिकों और एनजीओ के सत्यापित सामुदायिक पहलों के लिए क्राउडफंडिंग।",
    comingSoon: "जल्द आ रहा है",
    leaderboardTitle: "नागरिक चैंपियंस लीडरबोर्ड",
    monthly: "मासिक",
    allTime: "सर्वकालिक",
    localArea: "स्थानीय वार्ड",
    citywide: "संपूर्ण शहर",
    badgesTitle: "बैज और उपलब्धियां"
  },
  mr: {
    appName: "नागरिक सेवा",
    tagline: "तुमचा आवाज. तुमचे शहर. तुमची जबाबदारी.",
    welcomeTitle: "नागरिक सेवेमध्ये आपले स्वागत आहे",
    welcomeSubtitle: "एकत्र येऊन, आपण अधिक चांगले समुदाय घडवू शकतो.",
    heroHeading: "समस्या दिसली? उपाय व्हा.",
    heroSubheading: "काही सेकंदात नागरी समस्या नोंदवा. एआय समस्या ओळखेल, योग्य अधिकाऱ्यांना कळवेल आणि निराकरणापर्यंत पाठपुरावा करेल.",
    reportProblemBtn: "समस्या नोंदवा",
    exploreMapBtn: "परिसरातील समस्या पहा",
    continueAsCitizen: "नागरिक म्हणून पुढे जा",
    continueAsCitizenDesc: "समस्या नोंदवा, परिसर सुधारा आणि समाजसेवेसाठी गौरव मिळवा.",
    continueAsOfficial: "अधिकारी / संस्था म्हणून पुढे जा",
    continueAsOfficialDesc: "नागरी समस्यांचे व्यवस्थापन करा, उपाययोजना करा आणि शहरात बदल घडवा.",
    navHome: "मुख्यपृष्ठ",
    navReport: "समस्या नोंदवा",
    navMap: "नकाशा",
    navDashboard: "डॅशबोर्ड",
    navLeaderboard: "लीडरबोर्ड",
    navImpact: "प्रभाव निधी",
    navAIChat: "नागरिक एआय",
    navProfile: "माझे प्रोफाईल",
    login: "लॉग इन",
    logout: "लॉग आउट",
    switchRole: "भूमिका बदला",
    liveIssuesTicker: "थेट समुदाय अपडेट्स",
    citizenDashboard: "नागरिक डॅशबोर्ड",
    officialDashboard: "मनपा व संस्था व्यवस्थापन",
    reportedProblems: "नोंदवलेल्या समस्या",
    resolvedProblems: "सोडवलेल्या समस्या",
    myPoints: "नागरी गुण",
    communityRank: "शहर रँक",
    contributionLevel: "योगदान स्तर",
    reportNewIssue: "नवीन तक्रार नोंदवा",
    filterAll: "सर्व प्रकार",
    statusReported: "नोंदवली",
    statusAIVerified: "एआय पडताळणी पूर्ण",
    statusNotified: "अधिकाऱ्यांना सूचित",
    statusAssigned: "टीम नियुक्त",
    statusInProgress: "काम सुरू आहे",
    statusResolved: "समस्या सुटली",
    severityCritical: "अतिगंभीर (९-१०)",
    severityHigh: "उच्च प्राधान्य (७-८)",
    severityMedium: "मध्यम प्राधान्य (४-६)",
    severityLow: "सामान्य (१-३)",
    aiAnalyzing: "नागरिक एआय फोटो तपासत आहे...",
    duplicateWarning: "जवळच अशाच प्रकारची समस्या आधीच नोंदवलेली आहे.",
    supportExistingBtn: "ह्या समस्येला पाठिंबा द्या (+१० गुण)",
    submitAnywayBtn: "तरीही नवीन नोंदवा",
    proofOfWork: "कामाचा अधिकृत पुरावा",
    supportIssue: "समस्येला पाठिंबा द्या",
    supported: "पाठिंबा दिला",
    aiVerificationBadge: "एआय सत्यापित तक्रार",
    cameraCapture: "कॅमेरा",
    uploadImage: "फोटो अपलोड",
    voiceRecord: "आवाजाने बोला",
    aiChatReport: "एआय शी बोला",
    shareLocation: "सध्याचे जीपीएस स्थान",
    pickOnMap: "नकाशावर निवडा",
    confirmReport: "तक्रार सबमिट करा",
    impactFundTitle: "नागरिक इम्पॅक्ट फंड",
    impactFundSubtitle: "स्थानिक विकास आणि सामाजिक कामांसाठी लोकसहभाग निधी.",
    comingSoon: "लवकरच येत आहे",
    leaderboardTitle: "नागरिक चॅम्पियन्स लीडरबोर्ड",
    monthly: "मासिक",
    allTime: "सर्वकालीन",
    localArea: "स्थानिक प्रभाग",
    citywide: "शहर पातळीवर",
    badgesTitle: "बॅजेस आणि पुरस्कार"
  },
  ta: {
    appName: "நாகரிக் சேவா",
    tagline: "உங்கள் குரல். உங்கள் நகரம். உங்கள் பொறுப்பு.",
    welcomeTitle: "நாகரிக் சேவாவிற்கு நல்வரவு",
    welcomeSubtitle: "ஒன்றிணைந்து, சிறந்த சமுதாயத்தை உருவாக்குவோம்.",
    heroHeading: "பிரச்சனையைக் கண்டீர்களா? தீர்வாக இருங்கள்.",
    heroSubheading: "சில நொடிகளில் புகார்களைப் பதிவு செய்யுங்கள். AI சிக்கலைக் கண்டறிந்து அதிகாரிகளுக்கு அறிவிக்கும்.",
    reportProblemBtn: "சிக்கலைப் புகாரளி",
    exploreMapBtn: "அருகிலுள்ள புகார்கள்",
    continueAsCitizen: "குடிமகனாக தொடரவும்",
    continueAsCitizenDesc: "பிரச்சனைகளைப் புகாரளித்து உங்கள் பகுதியை மேம்படுத்துங்கள்.",
    continueAsOfficial: "அதிகாரியாக தொடரவும்",
    continueAsOfficialDesc: "நகரப் பிரச்சனைகளை நிர்வகித்து உடனடி தீர்வு காணுங்கள்.",
    navHome: "முகப்பு",
    navReport: "புகார் செய்",
    navMap: "வரைபடம்",
    navDashboard: "டாஷ்போர்டு",
    navLeaderboard: "முன்னிலை பட்டியல்",
    navImpact: "தாக்க நிதி",
    navAIChat: "நாகரிக் AI",
    navProfile: "சுயவிவரம்",
    login: "உள்நுழைக",
    logout: "வெளியேறு",
    switchRole: "பங்கு மாற்றம்",
    liveIssuesTicker: "நேரலை அறிவிப்புகள்",
    citizenDashboard: "குடிமக்கள் டாஷ்போர்டு",
    officialDashboard: "அதிகாரிகள் டாஷ்போர்டு",
    reportedProblems: "பதிவான புகார்கள்",
    resolvedProblems: "தீர்க்கப்பட்டவை",
    myPoints: "புள்ளிகள்",
    communityRank: "நகர தரம்",
    contributionLevel: "பங்களிப்பு நிலை",
    reportNewIssue: "புதிய புகார் பதிவு",
    filterAll: "அனைத்து பிரிவுகளும்",
    statusReported: "பதிவு செய்யப்பட்டது",
    statusAIVerified: "AI சரிபார்க்கப்பட்டது",
    statusNotified: "அதிகாரிக்கு தெரிவிக்கப்பட்டது",
    statusAssigned: "குழுவுக்கு ஒதுக்கப்பட்டது",
    statusInProgress: "வேலை நடக்கிறது",
    statusResolved: "தீர்வு காணப்பட்டது",
    severityCritical: "மிகத் தீவிரமானது (9-10)",
    severityHigh: "அதி முக்கியத்துவம் (7-8)",
    severityMedium: "நடுத்தரம் (4-6)",
    severityLow: "குறைந்த முன்னுரிமை (1-3)",
    aiAnalyzing: "AI புகைப்படத்தை ஆய்வு செய்கிறது...",
    duplicateWarning: "அருகில் இதே போன்ற பிரச்சனை ஏற்கனவே பதிவாகியுள்ளது.",
    supportExistingBtn: "இதை ஆதரிக்கவும் (+10 புள்ளிகள்)",
    submitAnywayBtn: "புதிதாக பதிவு செய்",
    proofOfWork: "அதிகாரப்பூர்வ வேலை சான்று",
    supportIssue: "புகாரை ஆதரிக்கவும்",
    supported: "ஆதரிக்கப்பட்டது",
    aiVerificationBadge: "AI சரிபார்க்கப்பட்ட அறிக்கை",
    cameraCapture: "நேரடி கேமரா",
    uploadImage: "புகைப்படம் பதிவேற்று",
    voiceRecord: "குரல் பதிவு",
    aiChatReport: "AI உடன் அரட்டையடி",
    shareLocation: "நேரலை GPS இருப்பிடம்",
    pickOnMap: "வரைபடத்தில் குறிக்கவும்",
    confirmReport: "சமர்ப்பிக்கவும்",
    impactFundTitle: "நாகரிக் தாக்க நிதி",
    impactFundSubtitle: "சமூக பணிகளுக்கான நிதி உதவி தளம்.",
    comingSoon: "விரைவில் வருகிறது",
    leaderboardTitle: "சாம்பியன்கள் பட்டியல்",
    monthly: "மாதாந்திரம்",
    allTime: "எப்பொழுதும்",
    localArea: "உள்ளூர் பகுதி",
    citywide: "நகரம் முழுவதும்",
    badgesTitle: "பதக்கங்கள் மற்றும் சாதனைகள்"
  },
  bn: {
    appName: "নাগরিক সেবা",
    tagline: "আপনার কণ্ঠ। আপনার শহর। আপনার দায়িত্ব।",
    welcomeTitle: "নাগরিক সেবায় স্বাগতম",
    welcomeSubtitle: "একসাথে, আমরা গড়ে তুলব আরও সুন্দর সমাজ।",
    heroHeading: "সমস্যা দেখেছেন? সমাধান হোন।",
    heroSubheading: "কয়েক সেকেন্ডের মধ্যে নাগরিক সমস্যার রিপোর্ট করুন। AI সমস্যা শনাক্ত করবে এবং কর্তৃপক্ষকে জানাবে।",
    reportProblemBtn: "সমস্যা রিপোর্ট করুন",
    exploreMapBtn: "কাছের সমস্যাগুলি দেখুন",
    continueAsCitizen: "নাগরিক হিসেবে এগিয়ে যান",
    continueAsCitizenDesc: "সমস্যা জানান, এলাকা উন্নত করুন এবং পুরস্কার অর্জন করুন।",
    continueAsOfficial: "সংস্থা বা কর্মকর্তা হিসেবে এগিয়ে যান",
    continueAsOfficialDesc: "সমস্যাগুলি পরিচালনা করুন এবং দ্রুত সমাধানের ব্যবস্থা নিন।",
    navHome: "হোম",
    navReport: "রিপোর্ট",
    navMap: "ম্যাপ দেখুন",
    navDashboard: "ড্যাশবোর্ড",
    navLeaderboard: "লিডারবোর্ড",
    navImpact: "ইমপ্যাক্ট ফান্ড",
    navAIChat: "নাগরিক AI",
    navProfile: "প্রোফাইল",
    login: "লগইন",
    logout: "লগআউট",
    switchRole: "রোল পরিবর্তন",
    liveIssuesTicker: "লাইভ আপডেট",
    citizenDashboard: "নাগরিক ড্যাশবোর্ড",
    officialDashboard: "অফিসিয়াল ম্যানেজমেন্ট",
    reportedProblems: "মোট অভিযোগ",
    resolvedProblems: "সমাধান হয়েছে",
    myPoints: "পয়েন্ট",
    communityRank: "র‍্যাঙ্ক",
    contributionLevel: "লেভেল",
    reportNewIssue: "নতুন সমস্যা জানান",
    filterAll: "সমস্ত বিভাগ",
    statusReported: "রিপোর্ট করা হয়েছে",
    statusAIVerified: "AI দ্বারা যাচাইকৃত",
    statusNotified: "কর্তৃপক্ষকে জানানো হয়েছে",
    statusAssigned: "টিমকে নিযুক্ত করা হয়েছে",
    statusInProgress: "কাজ চলছে",
    statusResolved: "সমাধান সম্পন্ন",
    severityCritical: "অত্যন্ত জরুরি (৯-১০)",
    severityHigh: "উচ্চ অগ্রাধিকার (৭-৮)",
    severityMedium: "মাঝারি (৪-৬)",
    severityLow: "সাধারণ (১-৩)",
    aiAnalyzing: "নাগরিক AI ছবি বিশ্লেষণ করছে...",
    duplicateWarning: "কাছাকাছি একই ধরনের সমস্যা ইতিমধ্যে রিপোর্ট করা হয়েছে।",
    supportExistingBtn: "বিদ্যমান রিপোর্টে সমর্থন করুন (+১০ পয়েন্ট)",
    submitAnywayBtn: "তবুও নতুন রিপোর্ট জমা দিন",
    proofOfWork: "কাজের অফিসিয়াল প্রমাণ",
    supportIssue: "সমর্থন জানান",
    supported: "সমর্থিত",
    aiVerificationBadge: "AI যাচাইকৃত রিপোর্ট",
    cameraCapture: "লাইভ ক্যামেরা",
    uploadImage: "ছবি আপলোড",
    voiceRecord: "ভয়েস রেকর্ড",
    aiChatReport: "AI এর সাথে কথা বলুন",
    shareLocation: "লাইভ জিপিএস লোকেশন",
    pickOnMap: "ম্যাপে চিহ্নিত করুন",
    confirmReport: "জমা দিন",
    impactFundTitle: "নাগরিক ইমপ্যাক্ট ফান্ড",
    impactFundSubtitle: "নাগরিক উন্নয়ন ও সমাজকল্যাণের জন্য অনুদান তহবিল।",
    comingSoon: "শীঘ্রই আসছে",
    leaderboardTitle: "নাগরিক চ্যাম্পিয়ন লিডারবোর্ড",
    monthly: "মাসিক",
    allTime: "সর্বকালীন",
    localArea: "ওয়ার্ড ভিত্তিক",
    citywide: "শহরব্যাপী",
    badgesTitle: "ব্যাজ ও অর্জন"
  }
};
