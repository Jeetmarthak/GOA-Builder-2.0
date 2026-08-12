import React from 'react';
import { ZoomIn, RotateCw, FlipHorizontal, RefreshCw, Move } from 'lucide-react';
import type { PhotoTransform } from '../types';

interface PhotoAdjusterProps {
  transform: PhotoTransform;
  onChangeTransform: (newTransform: PhotoTransform) => void;
}

export const PhotoAdjuster: React.FC<PhotoAdjusterProps> = ({
  transform,
  onChangeTransform,
}) => {
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTransform({
      ...transform,
      zoom: parseFloat(e.target.value),
    });
  };

  const handleRotate90 = () => {
    onChangeTransform({
      ...transform,
      rotation: (transform.rotation + 90) % 360,
    });
  };

  const handleFlipH = () => {
    onChangeTransform({
      ...transform,
      flipH: !transform.flipH,
    });
  };

  const handleReset = () => {
    onChangeTransform({
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      flipH: false,
    });
  };

  const handlePan = (dx: number, dy: number) => {
    onChangeTransform({
      ...transform,
      panX: transform.panX + dx,
      panY: transform.panY + dy,
    });
  };

  return (
    <div className="w-full bg-[#FAF8EE] border border-[#2D6A4F]/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Move className="w-4 h-4 text-[#0E3C28]" />
          <span className="text-xs font-bold text-[#0E3C28] uppercase tracking-wider font-mono-hh">
            Adjust Photo Position & Scale
          </span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-bold text-[#0E3C28] border border-[#0E3C28] hover:bg-[#0E3C28] hover:text-[#EFFD30] px-3 py-1 rounded-xl transition-all flex items-center space-x-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Zoom Slider Controls (matching reference image 3) */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
          <span className="flex items-center space-x-1">
            <ZoomIn className="w-3.5 h-3.5 text-[#0E3C28]" />
            <span>Zoom</span>
          </span>
          <span className="font-mono-hh text-[#0E3C28]">{Math.round(transform.zoom * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.05"
          value={transform.zoom}
          onChange={handleZoomChange}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0E3C28]"
        />
      </div>

      {/* Rotation & Flip Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleRotate90}
          className="bg-white border border-stone-300 hover:border-[#0E3C28] text-stone-800 hover:text-[#0E3C28] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Rotate 90° ({transform.rotation}°)</span>
        </button>

        <button
          onClick={handleFlipH}
          className={`border py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-sm ${
            transform.flipH
              ? 'bg-[#0E3C28] text-[#EFFD30] border-[#0E3C28]'
              : 'bg-white text-stone-800 border-stone-300 hover:border-[#0E3C28]'
          }`}
        >
          <FlipHorizontal className="w-3.5 h-3.5" />
          <span>Flip Horizontal</span>
        </button>
      </div>

      {/* Directional Nudge Pad for precise positioning */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-600">
        <span className="font-mono-hh">Nudge position:</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePan(-15, 0)}
            className="w-7 h-7 bg-white border border-stone-300 hover:bg-[#0E3C28] hover:text-white rounded-lg font-bold transition-all shadow-sm"
            title="Pan Left"
          >
            ←
          </button>
          <button
            onClick={() => handlePan(0, -15)}
            className="w-7 h-7 bg-white border border-stone-300 hover:bg-[#0E3C28] hover:text-white rounded-lg font-bold transition-all shadow-sm"
            title="Pan Up"
          >
            ↑
          </button>
          <button
            onClick={() => handlePan(0, 15)}
            className="w-7 h-7 bg-white border border-stone-300 hover:bg-[#0E3C28] hover:text-white rounded-lg font-bold transition-all shadow-sm"
            title="Pan Down"
          >
            ↓
          </button>
          <button
            onClick={() => handlePan(15, 0)}
            className="w-7 h-7 bg-white border border-stone-300 hover:bg-[#0E3C28] hover:text-white rounded-lg font-bold transition-all shadow-sm"
            title="Pan Right"
          >
            →
          </button>
        </div>
      </div>

      <p className="text-[11px] text-stone-500 italic text-center">
        💡 Tip: You can also click and drag directly inside the canvas preview to position your photo!
      </p>

    </div>
  );
};
