import React from 'react';
import { Sparkles, Image as ImageIcon, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import type { GraphicFormat } from '../types';

interface HeroBannerProps {
  onSelectFormat: (format: GraphicFormat) => void;
  onScrollToStudio: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectFormat, onScrollToStudio }) => {
  return (
    <div className="relative w-full bg-goa-responsive border-b-4 border-[#2D6A4F] text-white pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EFFD30]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#FF007F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-2 bg-[#062C1D]/90 border border-[#EFFD30]/40 px-4 py-1.5 rounded-full text-xs font-mono-hh text-[#EFFD30] mb-8 shadow-lg backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-[#FF007F] animate-spin" />
          <span>OFFICIAL HH GOA 2026 SOCIAL GRAPHIC GENERATOR</span>
        </div>

        {/* Main Title replicating Reference Image 1 */}
        <div className="relative mb-6">
          <h1 className="font-serif-hh text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight text-[#EFFD30] drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)] leading-none select-none uppercase">
            HACKER HOUSE
          </h1>
          
          {/* Neon Pink Hindi "गोवा" Script Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-[40%] sm:left-[52%] neon-pink-badge px-6 py-2 rounded-2xl border-2 border-white shadow-2xl transition-transform hover:scale-110">
            <span className="font-hindi-hh text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-wide">
              गोवा
            </span>
          </div>
        </div>

        {/* Ribbon Bar replicating Reference Image 1 */}
        <div className="w-full max-w-4xl bg-[#1E4D3B]/90 border border-[#EFFD30]/30 rounded-2xl p-3 sm:p-4 mb-10 shadow-2xl flex flex-wrap items-center justify-between gap-4 font-mono-hh text-xs sm:text-sm text-[#EFFD30]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] animate-ping" />
            <span className="font-bold">GOA, INDIA • 28 - 31 OCT 2026</span>
          </div>
          <div className="flex items-center space-x-4 text-stone-200">
            <span>#FrameInGoa</span>
            <span className="bg-[#EFFD30] text-[#0E3C28] font-pixel-hh px-2 py-0.5 rounded text-[10px]">
              2:47 PM STUDIO
            </span>
          </div>
        </div>

        {/* Quick Description */}
        <p className="max-w-2xl text-stone-200 text-base sm:text-lg mb-10 leading-relaxed">
          Upload your photo and instantly get back a branded <strong className="text-[#EFFD30]">HH Goa 2026</strong> profile frame or custom builder pass—ready to download & share on X in seconds.
        </p>

        {/* Quick Format Picker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
          
          {/* Format A Selection Box */}
          <div
            onClick={() => {
              onSelectFormat('FRAME');
              onScrollToStudio();
            }}
            className="group bg-[#062C1D]/90 border-2 border-[#EFFD30]/50 hover:border-[#EFFD30] p-6 rounded-3xl text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(239,253,48,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#EFFD30] text-[#0E3C28] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Format A
                </span>
                <ImageIcon className="w-6 h-6 text-[#EFFD30] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display-hh">
                PFP Frame / Overlay
              </h3>
              <p className="text-stone-300 text-sm mb-4">
                Wraps your photo in official HH Goa 2026 branding. Perfect ready-to-use X profile picture!
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs font-semibold text-[#EFFD30] pt-4 border-t border-[#2D6A4F]/60">
              <span>Instant 1:1 Avatar Export</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Format B Selection Box */}
          <div
            onClick={() => {
              onSelectFormat('CARD');
              onScrollToStudio();
            }}
            className="group bg-[#062C1D]/90 border-2 border-[#FF007F]/50 hover:border-[#FF007F] p-6 rounded-3xl text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,0,127,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#FF007F] text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Format B
                </span>
                <CreditCard className="w-6 h-6 text-[#FF007F] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display-hh">
                Builder ID Card Pass
              </h3>
              <p className="text-stone-300 text-sm mb-4">
                Badge pass with photo + name + stack/role + generated builder title. Designed to post on X feed!
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-[#FF007F] pt-4 border-t border-[#2D6A4F]/60">
              <span>High-Res Social Pass</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-mono-hh">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#EFFD30]" />
            <span>No Login or Signup Required</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#EFFD30]" />
            <span>HEIC / Phone Photo Support</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#EFFD30]" />
            <span>1-Click X Share + #FrameInGoa</span>
          </div>
        </div>

      </div>
    </div>
  );
};
