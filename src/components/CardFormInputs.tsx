import React from 'react';
import { Dices, User, Code2, Sparkles, Tag } from 'lucide-react';
import type { BuilderCardData, BadgeSticker } from '../types';
import { BUILDER_TITLES, STACK_SUGGESTIONS, STICKER_BADGES } from '../constants/presets';

interface CardFormInputsProps {
  cardData: BuilderCardData;
  onChangeCardData: (data: BuilderCardData) => void;
}

export const CardFormInputs: React.FC<CardFormInputsProps> = ({
  cardData,
  onChangeCardData,
}) => {
  const handleChange = (field: keyof BuilderCardData, value: string) => {
    onChangeCardData({
      ...cardData,
      [field]: value,
    });
  };

  const handleRandomizeTitle = () => {
    const randomIndex = Math.floor(Math.random() * BUILDER_TITLES.length);
    const newTitle = BUILDER_TITLES[randomIndex];
    handleChange('builderTitle', newTitle);
  };

  return (
    <div className="w-full space-y-5">
      
      {/* 1. Full Name Input (Matching reference image 2 & 3) */}
      <div className="space-y-1.5 text-left">
        <label className="block text-sm font-bold text-[#0E3C28] flex items-center space-x-1.5">
          <User className="w-4 h-4 text-[#0E3C28]" />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          value={cardData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="e.g. Satoshi Nakamoto"
          className="w-full bg-[#FAF8EE] border-2 border-[#2D6A4F]/30 focus:border-[#0E3C28] focus:bg-white rounded-2xl px-4 py-3 text-stone-900 placeholder-stone-400 font-semibold transition-all shadow-inner outline-none"
        />
      </div>

      {/* 2. Stack / Role Input */}
      <div className="space-y-1.5 text-left">
        <label className="block text-sm font-bold text-[#0E3C28] flex items-center space-x-1.5">
          <Code2 className="w-4 h-4 text-[#0E3C28]" />
          <span>Stack / Role</span>
        </label>
        <input
          type="text"
          value={cardData.stackRole}
          onChange={(e) => handleChange('stackRole', e.target.value)}
          placeholder="e.g. Full-Stack / Rust / AI"
          className="w-full bg-[#FAF8EE] border-2 border-[#2D6A4F]/30 focus:border-[#0E3C28] focus:bg-white rounded-2xl px-4 py-3 text-stone-900 placeholder-stone-400 font-semibold transition-all shadow-inner outline-none"
        />

        {/* Stack Suggestions Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {STACK_SUGGESTIONS.slice(0, 4).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleChange('stackRole', suggestion)}
              className="text-[11px] font-mono-hh bg-stone-100 hover:bg-[#0E3C28] text-stone-700 hover:text-[#EFFD30] border border-stone-300 px-2.5 py-1 rounded-full transition-all"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Generated Builder Title (Fun Feature!) */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-[#0E3C28] flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-[#FF007F]" />
            <span>Generated Builder Title</span>
          </label>
          <button
            type="button"
            onClick={handleRandomizeTitle}
            className="text-xs font-bold text-white bg-[#FF007F] hover:bg-[#D9006C] px-3 py-1 rounded-xl transition-all shadow-md flex items-center space-x-1.5 active:scale-95"
          >
            <Dices className="w-3.5 h-3.5 animate-bounce" />
            <span>Randomize Title</span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={cardData.builderTitle}
            onChange={(e) => handleChange('builderTitle', e.target.value)}
            placeholder="e.g. Vibe Coder Extraordinaire"
            className="w-full bg-[#FAF8EE] border-2 border-[#FF007F]/40 focus:border-[#FF007F] focus:bg-white rounded-2xl px-4 py-3 text-[#FF007F] font-bold placeholder-stone-400 transition-all shadow-inner outline-none"
          />
        </div>
      </div>

      {/* 4. Sticker Badge Overlay Selector */}
      <div className="space-y-1.5 text-left">
        <label className="block text-sm font-bold text-[#0E3C28] flex items-center space-x-1.5">
          <Tag className="w-4 h-4 text-[#0E3C28]" />
          <span>Badge Sticker Tag</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STICKER_BADGES.map((badge) => (
            <button
              key={badge.id}
              type="button"
              onClick={() => handleChange('badgeSticker', badge.id as BadgeSticker)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left truncate ${
                cardData.badgeSticker === badge.id
                  ? 'bg-[#0E3C28] text-[#EFFD30] border-[#0E3C28] shadow-md scale-[1.02]'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-[#0E3C28]'
              }`}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
