import React, { useState } from 'react';
import { useStore } from '../store';
import { AppPhase } from '../types';

export const UI: React.FC = () => {
  const { phase, gesture, toggleCamera, isCameraOpen } = useStore();
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      
      {/* Top Left: Status & Instructions */}
      <div className="flex flex-col gap-4 items-start z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 text-white w-64">
          <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Status</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${gesture !== 'None' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="font-bold text-sm">Phase: {phase.toUpperCase()}</span>
          </div>
          <div className="mt-2 text-xs opacity-70">
            Detected: <span className="font-mono text-yellow-300">{gesture}</span>
          </div>
        </div>

        <button 
          onClick={toggleCamera}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full transition-all flex items-center gap-2"
        >
          <span className={`w-2 h-2 rounded-full ${isCameraOpen ? 'bg-red-500' : 'bg-green-500'}`}></span>
          {isCameraOpen ? 'CLOSE CAMERA' : 'OPEN CAMERA'}
        </button>

        <div className="text-white/60 text-xs max-w-xs space-y-1">
            <p>👋 <span className="text-white font-bold">Open Palm</span> to Explode/Blooom</p>
            <p>✊ <span className="text-white font-bold">Closed Fist</span> to Reset Tree</p>
        </div>
      </div>

      {/* Top Center Title - Repositioned */}
      <div className="absolute inset-x-0 top-[12%] flex justify-center pointer-events-none select-none z-0">
        <h1 className="text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-200 to-amber-500 font-cinzel drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)] animate-pulse opacity-90 text-center px-4 tracking-wider">
          Merry Christmas
        </h1>
      </div>

      {/* Bottom Music Player */}
      <div className="self-center pointer-events-auto flex flex-col items-center gap-4 mb-2 max-w-full z-50">
        
        {/* Actual Apple Music Embed (Hidden by default, toggled by click) */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden w-full max-w-[660px] ${showPlayer ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <iframe 
                allow="autoplay *; encrypted-media *;" 
                frameBorder="0" 
                height="150" 
                style={{width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px'}} 
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                src="https://embed.music.apple.com/cn/album/merry-christmas-mr-lawrence-fyi/1460622477?i=1460622497"
            ></iframe>
        </div>

        {/* Visual Player Toggle */}
        <div 
          onClick={() => setShowPlayer(!showPlayer)}
          className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-4 text-white hover:bg-black/40 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-300 to-blue-500 flex items-center justify-center animate-[spin_4s_linear_infinite] group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            ❄️
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-cyan-200">Now Playing {showPlayer ? '(Tap to hide)' : '(Tap to open)'}</span>
            <div className="w-32 overflow-hidden whitespace-nowrap">
              <span className="text-sm font-semibold inline-block animate-[marquee_5s_linear_infinite]">
                Merry Christmas Mr. Lawrence - Sakamoto
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-end h-4">
            <div className="w-1 bg-green-400 h-2 animate-[music_1s_ease-in-out_infinite]"></div>
            <div className="w-1 bg-green-400 h-4 animate-[music_1.2s_ease-in-out_infinite_0.1s]"></div>
            <div className="w-1 bg-green-400 h-3 animate-[music_0.8s_ease-in-out_infinite_0.2s]"></div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animations Inject */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes music {
          0%, 100% { height: 4px; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};