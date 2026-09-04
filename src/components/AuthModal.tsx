import React, { useState } from 'react';
import {
  X,
  Users,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setActiveRole,
    currentUser,
    setCurrentUser,
    triggerCelebration
  } = useApp();

  const [authRole, setAuthRole] = useState<'citizen' | 'official'>('citizen');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [inputVal, setInputVal] = useState('+91 98230 45678');
  const [otpVal, setOtpVal] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(authRole);
    triggerCelebration();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
              🇮🇳
            </div>
            <div>
              <h3 className="text-base font-black">Nagrik Seva Secure Login</h3>
              <p className="text-xs text-orange-100">Your Voice. Your City. Your Responsibility.</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              onClick={() => {
                setAuthRole('citizen');
                setInputVal('+91 98230 45678');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                authRole === 'citizen' ? 'bg-white text-emerald-800 shadow' : 'text-slate-500'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>👥 Citizen</span>
            </button>

            <button
              onClick={() => {
                setAuthRole('official');
                setInputVal('rajesh.kulkarni@nmc.gov.in');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                authRole === 'official' ? 'bg-white text-indigo-800 shadow' : 'text-slate-500'
              }`}
            >
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>🏛️ NMC Official / NGO</span>
            </button>
          </div>

          {step === 'details' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  {authRole === 'citizen' ? 'Mobile Number or Email' : 'Official Government / NGO Email'}
                </label>
                <div className="relative">
                  {authMethod === 'phone' ? (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  )}
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 or email..."
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Citizen Authentication</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  A 6-digit OTP code will be sent to verify your identity.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-extrabold text-slate-900">Enter 6-Digit OTP</h4>
                <p className="text-xs text-slate-500">Sent to {inputVal}</p>
              </div>

              <div>
                <input
                  type="text"
                  value={otpVal}
                  onChange={e => setOtpVal(e.target.value)}
                  placeholder="• • • • • • (Type 123456)"
                  maxLength={6}
                  className="w-full text-center tracking-widest text-lg font-black py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Back to Change Number
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
