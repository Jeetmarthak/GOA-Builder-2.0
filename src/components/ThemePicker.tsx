import React from 'react';
import { Palette, Check } from 'lucide-react';
import type { GraphicFormat, FrameTheme, CardTheme } from '../types';
import { FRAME_THEMES, CARD_THEMES } from '../constants/presets';

interface ThemePickerProps {
  format: GraphicFormat;
  currentFrameTheme: FrameTheme;
  currentCardTheme: CardTheme;
  onSelectFrameTheme: (theme: FrameTheme) => void;
  onSelectCardTheme: (theme: CardTheme) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  format,
  currentFrameTheme,
  currentCardTheme,
  onSelectFrameTheme,
  onSelectCardTheme,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center space-x-2">
        <Palette className="w-4 h-4 text-[#0E3C28]" />
        <span className="text-sm font-bold text-[#0E3C28] uppercase tracking-wider font-mono-hh">
          {format === 'FRAME' ? 'Select Frame Style' : 'Select Card Theme'}
        </span>
      </div>

      {format === 'FRAME' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {FRAME_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectFrameTheme(t.id)}
              className={`p-3 rounded-2xl text-left border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentFrameTheme === t.id
                  ? 'bg-[#0E3C28] text-white border-[#EFFD30] shadow-md scale-[1.02]'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-[#0E3C28]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-display-hh">{t.name}</span>
                {currentFrameTheme === t.id && (
                  <Check className="w-4 h-4 text-[#EFFD30]" />
                )}
              </div>
              <span className="text-[10px] opacity-80 line-clamp-1">{t.tag}</span>
              <div
                className="w-full h-1.5 rounded-full mt-2"
                style={{ backgroundColor: t.primaryColor }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CARD_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectCardTheme(t.id)}
              className={`p-3 rounded-2xl text-left border-2 transition-all relative flex flex-col justify-between ${
                currentCardTheme === t.id
                  ? 'bg-[#0E3C28] text-white border-[#EFFD30] shadow-md scale-[1.02]'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-[#0E3C28]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-display-hh">{t.name}</span>
                {currentCardTheme === t.id && (
                  <Check className="w-4 h-4 text-[#EFFD30]" />
                )}
              </div>
              <p className="text-[11px] opacity-85">{t.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
