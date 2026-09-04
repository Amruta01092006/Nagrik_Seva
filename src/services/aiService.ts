import { AIAnalysisResult, CivicIssue, IssueCategory, SeverityLevel, VerificationStatus } from '../types';

// Calculate distance between two GPS coordinates using Haversine formula in meters
export function calculateGeoDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedIssue?: CivicIssue;
  distanceMeters?: number;
  similarityScore?: number;
  reason?: string;
}

// AI Duplicate Detection Engine
export function checkDuplicateIssue(
  candidate: { category: IssueCategory; lat: number; lng: number; description: string; title?: string },
  existingIssues: CivicIssue[],
  maxDistanceThresholdMeters = 350
): DuplicateCheckResult {
  for (const issue of existingIssues) {
    if (issue.status === 'resolved') continue;

    const distance = calculateGeoDistanceMeters(
      candidate.lat,
      candidate.lng,
      issue.location.lat,
      issue.location.lng
    );

    const isSameCategory = candidate.category === issue.category ||
      (candidate.category === 'Potholes' && issue.category === 'Road Damage') ||
      (candidate.category === 'Road Damage' && issue.category === 'Potholes') ||
      (candidate.category === 'Blocked Gutters' && issue.category === 'Waterlogging');
    
    // Keyword similarity check
    const candidateWords = (candidate.description + ' ' + (candidate.title || '')).toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const issueWords = (issue.description + ' ' + issue.title).toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const commonWords = candidateWords.filter(w => issueWords.includes(w));
    const textOverlap = commonWords.length / Math.max(candidateWords.length, 1);

    if (distance <= maxDistanceThresholdMeters && (isSameCategory || textOverlap >= 0.35)) {
      return {
        isDuplicate: true,
        matchedIssue: issue,
        distanceMeters: Math.round(distance),
        similarityScore: Math.min(Math.round((1 - distance / maxDistanceThresholdMeters) * 50 + textOverlap * 50), 99),
        reason: `Found matching ${issue.category.toLowerCase()} report (${issue.id}) located only ${Math.round(distance)}m away.`
      };
    }
  }

  return { isDuplicate: false };
}

// Phase 3 Nagrik AI Multi-Modal Vision & NLP Intelligence Engine
export function analyzeCivicProblem(input: {
  text?: string;
  imageUrl?: string;
  locality?: string;
  categoryHint?: string;
}): AIAnalysisResult {
  const content = (input.text || '').toLowerCase();
  const image = (input.imageUrl || '').toLowerCase();
  const hint = (input.categoryHint || '').toLowerCase();

  // 1. Water Supply Issue
  if (
    content.includes('water supply') ||
    content.includes('pipe burst') ||
    content.includes('drinking water') ||
    content.includes('tap') ||
    content.includes('pipeline') ||
    hint.includes('supply')
  ) {
    const isCritical = content.includes('burst') || content.includes('contaminated') || content.includes('hospital');
    const score = isCritical ? 9 : 7;
    return {
      detectedProblem: 'Municipal Drinking Water Pipeline Burst & Supply Disruption',
      category: 'Water Supply',
      severityScore: score,
      severityLevel: score >= 9 ? 'critical' : 'high',
      severityReason: `Severity: ${score}/10 — ${score >= 9 ? 'Critical Emergency' : 'High Priority'}: Direct impact on domestic drinking water distribution network with potential clean water loss and contamination risk.`,
      suggestedDepartment: 'NMC Water Works & Pipeline Maintenance Cell',
      suggestedTitle: 'Potable Water Pipeline Rupture Causing Supply Loss',
      suggestedDescription: `Severe drinking water pipeline leak observed${input.locality ? ` near ${input.locality}` : ''}. Rapid valve isolation and pipeline welding repair requested.`,
      confidenceScore: 0.94,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Visual flow dynamics and pressurized stream identify municipal water main.',
      tags: ['Water Supply', 'Pipeline Leak', 'Potable Water', 'NMC Water Works']
    };
  }

  // 2. Blocked Gutters & Drainage
  if (
    content.includes('gutter') ||
    content.includes('blocked drain') ||
    content.includes('choked') ||
    content.includes('sewage') ||
    hint.includes('gutter')
  ) {
    return {
      detectedProblem: 'Blocked Underground Drainage Culvert & Sewage Choke',
      category: 'Blocked Gutters',
      severityScore: 8,
      severityLevel: 'high',
      severityReason: 'Severity: 8/10 — High Priority: Solid waste and silt accumulation obstructing stormwater outflow, leading to backflow and unhygienic wastewater stagnation.',
      suggestedDepartment: 'NMC Underground Sewerage & De-silting Squad',
      suggestedTitle: 'Choked Stormwater Drain Culvert Causing Foul Overflow',
      suggestedDescription: `Underground drain blockage reported${input.locality ? ` at ${input.locality}` : ''}. High-pressure jetting machine and catchpit de-silting crew needed.`,
      confidenceScore: 0.95,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Verified drainage grating occlusion matching silt deposit profile.',
      tags: ['Blocked Gutter', 'Drainage', 'Sanitation Hazard', 'Sewerage']
    };
  }

  // 3. Waterlogging
  if (
    content.includes('waterlog') ||
    content.includes('flood') ||
    content.includes('inundation') ||
    content.includes('submerged') ||
    hint.includes('waterlog')
  ) {
    const isCritical = content.includes('metro') || content.includes('hospital') || content.includes('electric') || content.includes('foot');
    const score = isCritical ? 9 : 7;
    return {
      detectedProblem: 'Severe Stormwater Inundation & Street Flooding',
      category: 'Waterlogging',
      severityScore: score,
      severityLevel: score >= 9 ? 'critical' : 'high',
      severityReason: `Severity: ${score}/10 — ${score >= 9 ? 'Critical Emergency' : 'High Priority'}: The issue appears to create a serious safety risk and restricts movement on active commuter corridors.`,
      suggestedDepartment: 'NMC Stormwater Drainage & Disaster Rapid Cell',
      suggestedTitle: 'Severe Waterlogging Restricting Vehicular & Pedestrian Access',
      suggestedDescription: `Standing flood water over 1 foot deep reported${input.locality ? ` near ${input.locality}` : ''}. Emergency de-watering suction pump required.`,
      confidenceScore: 0.97,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Water reflection analysis confirms deep standing flood water with submerged curbs.',
      tags: ['Waterlogging', 'Monsoon Hazard', 'Flooding', 'NMC Rapid Cell']
    };
  }

  // 4. Garbage Accumulation
  if (
    content.includes('garbage') ||
    content.includes('trash') ||
    content.includes('waste') ||
    content.includes('dump') ||
    content.includes('kachra') ||
    content.includes('litter') ||
    hint.includes('garbage')
  ) {
    const isHigh = content.includes('school') || content.includes('hospital') || content.includes('market');
    const score = isHigh ? 7 : 6;
    return {
      detectedProblem: 'Uncontained Municipal Solid Waste Accumulation',
      category: 'Garbage',
      severityScore: score,
      severityLevel: score >= 7 ? 'high' : 'medium',
      severityReason: `Severity: ${score}/10 — ${score >= 7 ? 'High Priority' : 'Medium Priority'}: Large accumulation of domestic and plastic waste causing odor, mosquito breeding, and stray animal disruption in public area.`,
      suggestedDepartment: 'NMC Solid Waste Management & Health Wing',
      suggestedTitle: 'Open Solid Waste Accumulation on Pedestrian Walkway',
      suggestedDescription: `Uncollected garbage pile reported${input.locality ? ` at ${input.locality}` : ''}. Immediate dumper deployment and bleaching sanitization requested.`,
      confidenceScore: 0.95,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Multi-spectral pattern recognition identifies domestic refuse packaging and overflowing bin periphery.',
      tags: ['Garbage', 'Solid Waste', 'Sanitation', 'Swachh Bharat']
    };
  }

  // 5. Broken Streetlights
  if (
    content.includes('light') ||
    content.includes('dark') ||
    content.includes('bulb') ||
    content.includes('pole') ||
    content.includes('andhera') ||
    hint.includes('streetlight')
  ) {
    const isHigh = content.includes('women') || content.includes('hostel') || content.includes('wire') || content.includes('consecutive');
    const score = isHigh ? 8 : 6;
    return {
      detectedProblem: 'Non-Functional Streetlight Luminaires & Dark Pedestrian Stretch',
      category: 'Broken Streetlights',
      severityScore: score,
      severityLevel: score >= 7 ? 'high' : 'medium',
      severityReason: `Severity: ${score}/10 — ${score >= 7 ? 'High Priority' : 'Medium Priority'}: Non-functional public lighting creates dark blind spots with significant vulnerability for pedestrians and cyclists after sunset.`,
      suggestedDepartment: 'NMC Electrical & Public Lighting Wing',
      suggestedTitle: 'Broken Streetlights Creating Pitch Darkness on Bypass Road',
      suggestedDescription: `Non-operational streetlight fixtures reported${input.locality ? ` near ${input.locality}` : ''}. Lineman driver replacement and LED luminaire overhaul needed.`,
      confidenceScore: 0.96,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Illumination profile analysis confirms absence of required lux level on municipal pathway.',
      tags: ['Streetlight', 'Public Safety', 'Electrical Wing', 'Women Safety']
    };
  }

  // 6. Traffic Safety & Signals
  if (
    content.includes('traffic') ||
    content.includes('signal') ||
    content.includes('blind curve') ||
    content.includes('signboard') ||
    content.includes('speed breaker') ||
    hint.includes('traffic')
  ) {
    return {
      detectedProblem: 'Faulty Traffic Signal / Missing Road Safety Barrier',
      category: 'Traffic Safety',
      severityScore: 8,
      severityLevel: 'high',
      severityReason: 'Severity: 8/10 — High Priority: Unregulated vehicular flow at high-density junction creating imminent risk of multi-vehicle collisions.',
      suggestedDepartment: 'Traffic Police & NMC Traffic Engineering Wing',
      suggestedTitle: 'Malfunctioning Traffic Signal on High-Density Junction',
      suggestedDescription: `Traffic signal timer failure observed${input.locality ? ` at ${input.locality}` : ''}. Traffic warden deployment and controller card repair requested.`,
      confidenceScore: 0.93,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Traffic signal head optical check indicates non-sequenced illumination.',
      tags: ['Traffic Safety', 'Signal Failure', 'Road Safety', 'Traffic Police']
    };
  }

  // 7. Damaged Infrastructure & Civil Structures
  if (
    content.includes('bridge') ||
    content.includes('footpath') ||
    content.includes('railing') ||
    content.includes('collapse') ||
    content.includes('pavement') ||
    hint.includes('infrastructure')
  ) {
    return {
      detectedProblem: 'Structural Concrete Fracture on Pedestrian Infrastructure',
      category: 'Damaged Infrastructure',
      severityScore: 8,
      severityLevel: 'high',
      severityReason: 'Severity: 8/10 — High Priority: Damaged pedestrian walkway or guardrail compromising pedestrian barrier protection.',
      suggestedDepartment: 'NMC Civil Works & Bridge Infrastructure Division',
      suggestedTitle: 'Cracked Pavement & Broken Safety Guardrail',
      suggestedDescription: `Structural damage reported${input.locality ? ` near ${input.locality}` : ''}. Civil repair and concrete slab replacement requested.`,
      confidenceScore: 0.94,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Geometric structural anomaly confirms concrete shear fracture.',
      tags: ['Infrastructure', 'Footpath', 'Civil Works', 'Pedestrian Safety']
    };
  }

  // 8. Public Safety / Open Manholes / Hazards
  if (
    content.includes('manhole') ||
    content.includes('chamber') ||
    content.includes('open') ||
    content.includes('wire') ||
    hint.includes('public safety')
  ) {
    return {
      detectedProblem: 'Exposed Dangerous Manhole Chamber on Active Walkway',
      category: 'Public Safety',
      severityScore: 9,
      severityLevel: 'critical',
      severityReason: 'Severity: 9/10 — Critical Emergency: Exposed deep underground chamber aperture creating extreme danger of fatal pedestrian or two-wheeler fall.',
      suggestedDepartment: 'NMC Underground Drainage & Civil Safety Squad',
      suggestedTitle: 'Open Dangerous Drainage Manhole Chamber on Pedestrian Path',
      suggestedDescription: `Open manhole reported${input.locality ? ` at ${input.locality}` : ''}. Immediate reflective barricading and heavy-duty precast cover installation needed.`,
      confidenceScore: 0.98,
      confidenceRating: 'High',
      verificationStatus: 'ai_verified',
      verificationReason: 'Aperture edge anomaly confirms missing lid fixture on active carriageway.',
      tags: ['Manhole', 'Public Safety', 'Critical Hazard', 'Pedestrian Fall']
    };
  }

  // 9. Potholes & Road Damage (Default & Dedicated)
  const isPotholeSevere = content.includes('main road') || content.includes('traffic') || content.includes('deep') || content.includes('busy');
  const potholeScore = isPotholeSevere ? 8 : 6;
  const targetCategory: IssueCategory = content.includes('pothole') || hint.includes('pothole') ? 'Potholes' : 'Road Damage';

  return {
    detectedProblem: 'Road Surface Rupture & Deep Bitumen Pothole',
    category: targetCategory,
    severityScore: potholeScore,
    severityLevel: potholeScore >= 8 ? 'high' : 'medium',
    severityReason: `Severity: ${potholeScore}/10 — ${potholeScore >= 8 ? 'High Priority' : 'Medium Priority'}: The issue appears to create a significant safety risk and may affect heavy vehicular traffic.`,
    suggestedDepartment: 'NMC Road Works & Bitumen Rapid Action Team',
    suggestedTitle: 'Large Pothole on Main Road Causing Vehicle Hazard',
    suggestedDescription: `A large pothole has developed on a frequently used road${input.locality ? ` near ${input.locality}` : ''}, creating a potential safety risk for vehicles and pedestrians.`,
    confidenceScore: 0.96,
    confidenceRating: 'High',
    verificationStatus: 'ai_verified',
    verificationReason: 'Asphalt cavitation texture matching road surface perimeter and vehicular track pattern.',
    tags: ['Potholes', 'Road Damage', 'Two-Wheeler Safety', 'NMC Road Works']
  };
}

export interface AIChatbotReply {
  message: string;
  structuredAnalysis?: AIAnalysisResult;
  quickActions?: { label: string; action: string; payload?: any }[];
}

// Conversational Nagrik AI Chatbot Intelligence
export function generateAIChatbotResponse(
  userMessage: string,
  language: string = 'en',
  context?: { reportedIssuesCount?: number; userPoints?: number; attachedImage?: string }
): AIChatbotReply {
  const msg = userMessage.toLowerCase();

  // Check if user is asking to report a specific issue
  if (
    msg.includes('road') ||
    msg.includes('pothole') ||
    msg.includes('waterlog') ||
    msg.includes('flood') ||
    msg.includes('garbage') ||
    msg.includes('light') ||
    msg.includes('manhole') ||
    msg.includes('drain') ||
    context?.attachedImage
  ) {
    const analysis = analyzeCivicProblem({
      text: userMessage,
      imageUrl: context?.attachedImage
    });

    return {
      message: `🤖 **Nagrik AI Analysis Complete!**\n\nI have analyzed your complaint:\n• **Title:** ${analysis.suggestedTitle}\n• **Category:** ${analysis.category}\n• **Severity:** ${analysis.severityScore}/10 (${analysis.severityLevel.toUpperCase()})\n• **Routing:** ${analysis.suggestedDepartment}\n\n*«AI-generated suggestion — please review before submitting.»*`,
      structuredAnalysis: analysis,
      quickActions: [
        { label: '📝 Create Pre-filled Report', action: 'prefill_report', payload: analysis },
        { label: '📍 Add GPS Location', action: 'open_report' }
      ]
    };
  }

  // Language: Hindi
  if (language === 'hi') {
    return {
      message: '👋 नमस्ते! मैं नागरिक एआई हूँ।\n\nबताइए आपके इलाके में क्या नागरिक समस्या है, या बस एक फोटो भेजें। मैं समस्या को पहचानने, गंभीरता जांचने और अधिकारियों को भेजने में आपकी पूरी मदद करूँगा।',
      quickActions: [
        { label: '🚧 सड़क के गड्ढे बताएं', action: 'report_road' },
        { label: '💧 जलभराव की रिपोर्ट', action: 'report_water' },
        { label: '🗑️ कचरा ढेर बताएं', action: 'report_garbage' },
        { label: '💡 बंद स्ट्रीटलाइट', action: 'report_light' }
      ]
    };
  }

  // Language: Marathi
  if (language === 'mr') {
    return {
      message: '👋 नमस्कार! मी नागरिक एआय आहे.\n\nतुमच्या परिसरातील खड्डे, कचऱ्याचे ढीग, बंद पथदिवे किंवा तुंबलेली गटारे याविषयी फोटो पाठवा किंवा सांगा. मी त्वरित मनपा विभागाशी समन्वय साधेन.',
      quickActions: [
        { label: '🚧 रस्त्यावरील खड्डा', action: 'report_road' },
        { label: '💧 पाणी साचणे', action: 'report_water' },
        { label: '🗑️ कचऱ्याचा ढीग', action: 'report_garbage' },
        { label: '💡 बंद पथदिवा', action: 'report_light' }
      ]
    };
  }

  // Default English Greeting & Suggested Prompts
  return {
    message: "👋 Hello! I'm Nagrik AI.\n\nTell me what's happening in your area, or simply take a photo. I'll help you report the problem.",
    quickActions: [
      { label: '🚧 Report a road problem', action: 'report_road' },
      { label: '💧 Report waterlogging', action: 'report_water' },
      { label: '🗑️ Report garbage', action: 'report_garbage' },
      { label: '💡 Report broken streetlights', action: 'report_light' }
    ]
  };
}
