import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Share2, Copy, Check, ExternalLink, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GraphicFormat } from '../types';
import { XLogoIcon } from './XLogoIcon';

interface ExportActionsProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  format: GraphicFormat;
  fullName: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  canvasRef,
  format,
  fullName,
}) => {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Trigger Confetti Celebration
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EFFD30', '#FF007F', '#0E3C28', '#FFFFFF', '#00F0FF'],
      });
    } catch (e) {
      console.warn('Confetti animation deferred', e);
    }
  };

  // 1. Download PNG Image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      const filename = format === 'FRAME'
        ? `hh-goa-2026-pfp-frame-${Date.now()}.png`
        : `hh-goa-2026-builder-pass-${Date.now()}.png`;

      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerConfetti();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          triggerConfetti();
          setTimeout(() => setCopied(false), 3000);
        } catch (clipErr) {
          console.warn('Clipboard API not fully supported, copying text fallback', clipErr);
          alert('Image ready! Click Download PNG to save, or right click canvas to copy.');
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Share to X (Twitter Intent)
  const getTweetText = () => {
    const nameStr = fullName ? ` as ${fullName}` : '';
    const itemStr = format === 'FRAME' ? 'Profile Frame' : 'Builder Pass';
    const siteUrl = window.location.href;
    return `Just created my official ${itemStr}${nameStr} for @HackerHouseGoa 2026! 🚀🌴\n\nHeading to Goa, India this Oct 28-31 to build with top devs.\n\nGenerate your frame & badge here:\n${siteUrl}\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa`;
  };

  const handleShareToX = () => {
    const tweetText = getTweetText();
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(xUrl, '_blank', 'noopener,noreferrer');
  };

  // 4. Native Web Share API (Mobile direct share with image file)
  const handleNativeShare = async () => {
    if (!canvasRef.current) return;
    if (navigator.share && navigator.canShare) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'hh-goa-2026-pass.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'HH Goa 2026 Graphic',
              text: getTweetText(),
              files: [file],
            });
            triggerConfetti();
            return;
          }
          // Fallback to text share
          await navigator.share({
            title: 'HH Goa 2026 Graphic',
            text: getTweetText(),
            url: window.location.href,
          });
        });
      } catch (e) {
        console.warn('Native share cancelled or unsupported', e);
        handleShareToX();
      }
    } else {
      handleShareToX();
    }
  };

  return (
    <div className="w-full space-y-4 pt-2">
      
      {/* Primary Download & Share Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full bg-[#0E3C28] hover:bg-[#062C1D] text-[#EFFD30] font-bold py-4 px-6 rounded-2xl shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 border-2 border-[#EFFD30]/40 group"
        >
          <Download className="w-5 h-5 text-[#EFFD30] group-hover:translate-y-0.5 transition-transform" />
          <span className="font-sans-hh text-base uppercase tracking-wider">
            Download PNG
          </span>
        </button>

        {/* SHARE TO X BUTTON */}
        <button
          onClick={() => {
            handleDownload(); // Auto download first so user has image ready
            setShowShareModal(true);
          }}
          className="w-full bg-[#1DA1F2] hover:bg-[#0c85d0] text-white font-bold py-4 px-6 rounded-2xl shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 border-2 border-white/20 group"
        >
          <XLogoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-sans-hh text-base uppercase tracking-wider">
            Share to X (#FrameInGoa)
          </span>
        </button>

      </div>

      {/* Secondary Action Bar: Copy to Clipboard & Web Share */}
      <div className="flex items-center justify-center space-x-3 text-xs font-semibold">
        <button
          onClick={handleCopyClipboard}
          className="bg-white hover:bg-stone-50 border border-stone-300 hover:border-[#0E3C28] text-stone-800 px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-600" />
              <span>Copy Image to Clipboard</span>
            </>
          )}
        </button>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="bg-white hover:bg-stone-50 border border-stone-300 hover:border-[#0E3C28] text-stone-800 px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Share2 className="w-4 h-4 text-stone-600" />
            <span>Mobile System Share</span>
          </button>
        )}
      </div>

      {/* SHARE MODAL / PREVIEW INSTRUCTION BOX (Rendered via React Portal onto document.body) */}
      {showShareModal && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8EE] border-4 border-[#0E3C28] rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <XLogoIcon className="w-6 h-6 text-[#1DA1F2]" />
                <h3 className="text-xl font-extrabold text-[#0E3C28] font-display-hh">
                  Ready to Post on X!
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Instruction box */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-4 text-xs text-amber-900 space-y-2">
              <div className="flex items-center space-x-1.5 font-bold">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>2 Easy Steps to Share:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-amber-800">
                <li>Your PNG graphic has been downloaded to your device!</li>
                <li>Click <strong>"Open X"</strong> below to open X with your pre-written caption + <strong className="text-[#FF007F]">#FrameInGoa</strong>, then attach your downloaded image!</li>
              </ol>
            </div>

            {/* Pre-filled Caption Preview */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-stone-600 mb-1 font-mono-hh uppercase">
                Pre-filled X Caption:
              </label>
              <textarea
                readOnly
                value={getTweetText()}
                className="w-full h-32 bg-white border-2 border-stone-300 rounded-2xl p-3 text-xs font-mono-hh text-stone-800 focus:outline-none resize-none"
              />
            </div>

            {/* Action Buttons inside Modal */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleShareToX}
                className="flex-1 bg-[#1DA1F2] hover:bg-[#0c85d0] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Open X</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3 px-4 rounded-xl transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

