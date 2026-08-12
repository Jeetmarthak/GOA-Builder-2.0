import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';
import type { GraphicFormat } from '../types';

interface HeaderProps {
  currentFormat: GraphicFormat;
  onSelectFormat: (format: GraphicFormat) => void;
  onScrollToStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentFormat,
  onSelectFormat,
  onScrollToStudio,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E3C28]/95 backdrop-blur-md border-b border-[#2D6A4F]/60 text-white shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-[#EFFD30] text-[#0E3C28] p-1.5 sm:p-2 rounded-xl font-pixel-hh font-bold text-[10px] sm:text-xs tracking-tighter shadow-md hover:scale-105 transition-transform flex flex-col items-center">
            <span>2:47PM</span>
            <span className="text-[8px] sm:text-[9px] -mt-0.5">STUDIO</span>
          </div>
          
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif-hh text-sm sm:text-xl font-bold tracking-wider text-[#EFFD30]">
                HH GOA
              </span>
              <span className="bg-[#FF007F] text-white text-[10px] sm:text-[11px] font-hindi-hh px-1.5 py-0.5 rounded transform -rotate-6 shadow-sm">
                गोवा
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-stone-300 font-mono-hh hidden xs:inline">
              2026 Studio
            </span>
          </div>
        </div>

        {/* Center Toggle Tabs */}
        <div className="bg-[#062C1D] p-1 rounded-xl sm:rounded-2xl border border-[#2D6A4F] flex items-center space-x-1 shadow-inner">
          <button
            onClick={() => {
              onSelectFormat('FRAME');
              onScrollToStudio();
            }}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
              currentFormat === 'FRAME'
                ? 'bg-[#EFFD30] text-[#0E3C28] shadow-md scale-[1.02]'
                : 'text-stone-300 hover:text-white hover:bg-[#0E3C28]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Format A: PFP Frame</span>
            <span className="inline sm:hidden">PFP</span>
          </button>

          <button
            onClick={() => {
              onSelectFormat('CARD');
              onScrollToStudio();
            }}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
              currentFormat === 'CARD'
                ? 'bg-[#EFFD30] text-[#0E3C28] shadow-md scale-[1.02]'
                : 'text-stone-300 hover:text-white hover:bg-[#0E3C28]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Format B: Builder Pass</span>
            <span className="inline sm:hidden">Pass</span>
          </button>
        </div>

          

      </div>
    </header>
  );
};
