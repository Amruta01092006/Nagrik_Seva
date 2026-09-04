import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Camera,
  MapPin,
  Trophy,
  HelpCircle,
  CornerDownLeft,
  ChevronRight,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  Image as ImageIcon,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateAIChatbotResponse } from '../services/aiService';
import { AIAnalysisResult } from '../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  imageUrl?: string;
  timestamp: string;
  structuredAnalysis?: AIAnalysisResult;
  quickActions?: { label: string; action: string; payload?: any }[];
}

export const NagrikAIChatbot: React.FC = () => {
  const {
    isAIChatbotOpen,
    setIsAIChatbotOpen,
    setIsReportModalOpen,
    setActiveTab,
    language,
    currentUser
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const initialGreeting = generateAIChatbotResponse('hello', language, { userPoints: currentUser.points });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: "👋 Hello! I'm Nagrik AI.\n\nTell me what's happening in your area, or simply take a photo. I'll help you report the problem.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🚧 Report a road problem', action: 'report_road' },
        { label: '💧 Report waterlogging', action: 'report_water' },
        { label: '🗑️ Report garbage', action: 'report_garbage' },
        { label: '💡 Report broken streetlights', action: 'report_light' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice recording architecture
  const toggleVoiceRecording = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : language === 'ta' ? 'ta-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => setIsVoiceRecording(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsVoiceRecording(false);
        };
        recognition.onerror = () => {
          setIsVoiceRecording(false);
          setInputMessage('There is a large pothole and broken streetlight outside my society.');
        };
        recognition.onend = () => setIsVoiceRecording(false);
        recognition.start();
        return;
      } catch (e) {
        console.warn('Speech error', e);
      }
    }

    // Fallback simulation
    setIsVoiceRecording(true);
    setTimeout(() => {
      setInputMessage('There is a dangerous open manhole and large pothole near the bus stop.');
      setIsVoiceRecording(false);
    }, 2000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAttachedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text && !attachedImage) return;

    const currentImg = attachedImage;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text || 'Uploaded civic photo for AI analysis',
      imageUrl: currentImg || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setAttachedImage(null);
    setIsTyping(true);

    // AI Analysis response
    setTimeout(() => {
      const aiReply = generateAIChatbotResponse(text, language, {
        userPoints: currentUser.points,
        attachedImage: currentImg || undefined
      });

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiReply.message,
        structuredAnalysis: aiReply.structuredAnalysis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: aiReply.quickActions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const handleQuickAction = (action: string, payload?: any) => {
    if (action === 'report_road') {
      handleSendMessage('There is a large hazardous pothole on the main road');
    } else if (action === 'report_water') {
      handleSendMessage('Severe waterlogging and flooded street near market');
    } else if (action === 'report_garbage') {
      handleSendMessage('Garbage accumulation and overflowing solid waste');
    } else if (action === 'report_light') {
      handleSendMessage('Broken streetlights leaving the entire stretch dark');
    } else if (action === 'prefill_report' || action === 'open_report') {
      setIsReportModalOpen(true);
      setIsAIChatbotOpen(false);
    } else {
      handleSendMessage(action.replace('_', ' '));
    }
  };

  if (!isAIChatbotOpen) {
    return (
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIChatbotOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-slate-900 hover:bg-emerald-700 text-white shadow-2xl border-2 border-emerald-400 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open Nagrik AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs font-black tracking-wide pr-1">Nagrik AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1"></span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[540px] animate-in fade-in slide-in-from-bottom-5 duration-200">
      
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-4 flex items-center justify-between shadow-md flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm font-black tracking-tight">Nagrik AI Assistant</h3>
              <span className="text-[9px] bg-emerald-400/20 border border-emerald-300/30 px-1.5 py-0.2 rounded font-bold uppercase">
                Vision & NLP
              </span>
            </div>
            <p className="text-[10px] text-emerald-100">Intelligent Civic Reporting Agent</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsAIChatbotOpen(false)}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Attached Image if any */}
            {msg.imageUrl && (
              <div className="mb-1 rounded-2xl overflow-hidden border border-slate-300 max-w-[200px] h-28 bg-slate-200 shadow-sm">
                <img src={msg.imageUrl} alt="Uploaded evidence" className="w-full h-full object-cover" />
              </div>
            )}

            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-orange-600 text-white rounded-tr-none font-medium'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal'
              }`}
            >
              {msg.text}
            </div>
            
            <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>

            {/* In-Chat Structured AI Analysis Card */}
            {msg.structuredAnalysis && (
              <div className="w-full max-w-[92%] mt-2 p-3.5 rounded-2xl bg-slate-900 text-white space-y-2.5 shadow-md border border-slate-800">
                <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-800">
                  <span className="font-extrabold text-orange-400 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{msg.structuredAnalysis.category}</span>
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">
                    {msg.structuredAnalysis.verificationStatus === 'ai_verified' ? '🟢 AI VERIFIED' : '🟡 REVIEW'}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-100">
                  {msg.structuredAnalysis.suggestedTitle}
                </div>

                <div className="text-[11px] text-slate-300">
                  {msg.structuredAnalysis.severityReason}
                </div>

                <button
                  onClick={() => {
                    setIsReportModalOpen(true);
                    setIsAIChatbotOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow transition-all"
                >
                  <span>📝 Create Pre-filled Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick Action Suggestion Chips */}
            {msg.quickActions && msg.quickActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {msg.quickActions.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(qa.action, qa.payload)}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm transition-all flex items-center space-x-1 active:scale-95"
                  >
                    <span>{qa.label}</span>
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 p-2 bg-white rounded-2xl border border-slate-200 w-fit">
            <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>Nagrik AI is thinking & classifying...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Image Attachment Preview Bar if selected */}
      {attachedImage && (
        <div className="p-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <img src={attachedImage} alt="Attachment" className="w-8 h-8 rounded-lg object-cover border border-slate-300" />
            <span className="font-bold text-slate-700 text-[11px]">Photo attached for AI vision</span>
          </div>
          <button onClick={() => setAttachedImage(null)} className="text-slate-400 hover:text-red-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 flex-shrink-0"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-xl text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          title="Attach Photo for AI Vision"
        >
          <Camera className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={toggleVoiceRecording}
          className={`p-2 rounded-xl transition-all ${
            isVoiceRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
          title="Voice-to-Text Recording"
        >
          {isVoiceRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={isVoiceRecording ? 'Listening to speech...' : 'Type issue or pick prompt...'}
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() && !attachedImage}
          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white shadow transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
