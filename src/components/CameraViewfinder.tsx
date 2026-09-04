import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, Image as ImageIcon, Sparkles, X, Check } from 'lucide-react';
import { curatedSamplePhotos } from '../data/demoData';

interface CameraViewfinderProps {
  onCaptureImage: (imageUrl: string, sampleInfo?: any) => void;
  onClose: () => void;
}

export const CameraViewfinder: React.FC<CameraViewfinderProps> = ({ onCaptureImage, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'camera' | 'sample' | 'upload'>('sample');

  useEffect(() => {
    if (activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access error', err);
      setCameraError('Camera access unavailable on this device/browser. Please choose from sample photos or upload an image.');
      setStreamActive(false);
      setActiveMode('sample');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        onCaptureImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCaptureImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-2xl relative">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white">
            <Camera className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold">Nagrik Visual Capture Studio</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 my-3 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveMode('sample')}
          className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeMode === 'sample' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Samples</span>
        </button>

        <button
          onClick={() => setActiveMode('camera')}
          className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeMode === 'camera' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Live Camera</span>
        </button>

        <button
          onClick={() => setActiveMode('upload')}
          className={`py-2 rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeMode === 'upload' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Viewport content */}
      {activeMode === 'camera' && (
        <div className="space-y-3">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Viewfinder crosshairs overlay */}
            <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-orange-500/40 m-4 rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-l-2 border-orange-400 absolute top-2 left-2"></div>
              <div className="w-12 h-12 border-t-2 border-r-2 border-orange-400 absolute top-2 right-2"></div>
              <div className="w-12 h-12 border-b-2 border-l-2 border-orange-400 absolute bottom-2 left-2"></div>
              <div className="w-12 h-12 border-b-2 border-r-2 border-orange-400 absolute bottom-2 right-2"></div>
              <span className="text-[10px] text-orange-300 font-mono bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                AI Vision Reticle Active
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={capturePhoto}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl flex items-center space-x-2 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Photo</span>
            </button>
          </div>
        </div>
      )}

      {activeMode === 'sample' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Select a realistic civic scenario to test Nagrik AI classification, severity scoring, and duplicate detection:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
            {curatedSamplePhotos.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => onCaptureImage(sample.url, sample)}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500 cursor-pointer bg-slate-950 transition-all hover:scale-[1.02] shadow-sm"
              >
                <img
                  src={sample.url}
                  alt={sample.title}
                  className="w-full h-24 object-cover group-hover:opacity-90"
                />
                <div className="p-2">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-bold text-orange-400">{sample.category}</span>
                    <span className="text-amber-400 font-bold">★ {sample.severity}/10</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                    {sample.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMode === 'upload' && (
        <div className="py-6 border-2 border-dashed border-slate-700 hover:border-orange-500 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="civic-image-upload"
          />
          <label htmlFor="civic-image-upload" className="cursor-pointer space-y-2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-orange-400">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">Click to Browse or Drop Photo</div>
            <div className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP from camera roll</div>
          </label>
        </div>
      )}
    </div>
  );
};
