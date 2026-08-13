import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#062C1D] border-t-2 border-[#2D6A4F] text-stone-300 py-10 px-4 text-center font-mono-hh text-xs">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Banner Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-stone-400">
          <span className="text-[#EFFD30] font-bold">#FrameInGoa</span>
          <span>•</span>
          <span>HH GOA 2026</span>
          <span>•</span>
          <span>October 28-31, 2026</span>
          <span>•</span>
          <span>Goa, India</span>
        </div>

        {/* Tagline */}
        <p className="text-stone-400">
          Built for HH Goa 2026 builders & attendees. Fast, free, client-side, zero signup wall.
        </p>

        {/* Studio Branding */}
        <div className="inline-flex items-center space-x-2 bg-[#0E3C28] border border-[#2D6A4F] px-4 py-1.5 rounded-full text-stone-200">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#FF007F] fill-current animate-pulse" />
          <span>by</span>
          <span className="bg-[#EFFD30] text-[#0E3C28] font-pixel-hh px-2 py-0.5 rounded text-[9px] font-bold">
            Code Pirates
          </span>
        </div>

        <div className="text-[10px] text-stone-500 pt-2">
          © 2026 Hacker House Goa | All rights reserved.
        </div>

      </div>
    </footer>
  );
};
