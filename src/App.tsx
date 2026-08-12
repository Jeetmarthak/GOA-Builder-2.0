import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PhotoUploader } from './components/PhotoUploader';
import { PhotoAdjuster } from './components/PhotoAdjuster';
import { CardFormInputs } from './components/CardFormInputs';
import { ThemePicker } from './components/ThemePicker';
import { ExportActions } from './components/ExportActions';
import { Footer } from './components/Footer';

import type { GeneratorState, FrameTheme, CardTheme, BuilderCardData, PhotoTransform } from './types';
import { renderGraphicToCanvas } from './utils/canvasDrawer';
import { loadImage } from './utils/heicHelper';
import { Sparkles, Move } from 'lucide-react';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const studioRef = useRef<HTMLDivElement | null>(null);

  // Generator Main State
  const [state, setState] = useState<GeneratorState>({
    format: 'CARD', // Default to Builder Pass card format
    photoUrl: null,
    photoTransform: {
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      flipH: false,
    },
    frameTheme: 'classic',
    cardTheme: 'official_dark',
    cardData: {
      fullName: 'Satoshi Nakamoto',
      stackRole: 'Full-Stack / Rust / AI',
      builderTitle: 'Vibe Coder Extraordinaire',
      ticketId: `HH-GOA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      badgeSticker: 'VERIFIED BUILDER',
      customHashtag: '#FrameInGoa',
    },
    isProcessing: false,
  });

  // Loaded HTMLImageElement for canvas drawing
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Canvas Dragging State
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; initialPanX: number; initialPanY: number } | null>(null);

  // Load HTMLImageElement whenever state.photoUrl changes
  useEffect(() => {
    if (!state.photoUrl) {
      setLoadedImage(null);
      return;
    }

    let isMounted = true;
    loadImage(state.photoUrl)
      .then((img) => {
        if (isMounted) setLoadedImage(img);
      })
      .catch((err) => {
        console.error('Failed loading photo element', err);
      });

    return () => {
      isMounted = false;
    };
  }, [state.photoUrl]);

  // Re-draw Canvas on any state change or image load
  useEffect(() => {
    if (canvasRef.current) {
      renderGraphicToCanvas(canvasRef.current, state, loadedImage);
    }
  }, [state, loadedImage]);

  // Scroll to studio generator section
  const handleScrollToStudio = () => {
    if (studioRef.current) {
      studioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers for Canvas Direct Dragging & Wheel Zoom
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDraggingCanvas(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: state.photoTransform.panX,
      initialPanY: state.photoTransform.panY,
    };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingCanvas || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    setState((prev) => ({
      ...prev,
      photoTransform: {
        ...prev.photoTransform,
        panX: dragStartRef.current!.initialPanX + dx * 1.5,
        panY: dragStartRef.current!.initialPanY + dy * 1.5,
      },
    }));
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
    dragStartRef.current = null;
  };

  // Touch Handlers for Mobile Screens
  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDraggingCanvas(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        initialPanX: state.photoTransform.panX,
        initialPanY: state.photoTransform.panY,
      };
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingCanvas || !dragStartRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    setState((prev) => ({
      ...prev,
      photoTransform: {
        ...prev.photoTransform,
        panX: dragStartRef.current!.initialPanX + dx * 1.5,
        panY: dragStartRef.current!.initialPanY + dy * 1.5,
      },
    }));
  };

  const handleCanvasTouchEnd = () => {
    setIsDraggingCanvas(false);
    dragStartRef.current = null;
  };

  const handleCanvasWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.05 : -0.05;
    const newZoom = Math.min(Math.max(0.5, state.photoTransform.zoom + zoomFactor), 3.0);

    setState((prev) => ({
      ...prev,
      photoTransform: {
        ...prev.photoTransform,
        zoom: parseFloat(newZoom.toFixed(2)),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#0E3C28] text-stone-900 flex flex-col justify-between selection:bg-[#FF007F] selection:text-white font-sans-hh">
      
      {/* 1. TOP NAVBAR */}
      <Header
        currentFormat={state.format}
        onSelectFormat={(fmt) => setState((prev) => ({ ...prev, format: fmt }))}
        onScrollToStudio={handleScrollToStudio}
      />

      {/* 2. HERO BRANDING BANNER (Reference Image 1) */}
      <HeroBanner
        onSelectFormat={(fmt) => setState((prev) => ({ ...prev, format: fmt }))}
        onScrollToStudio={handleScrollToStudio}
      />

      {/* 3. GENERATOR STUDIO WORKSPACE (Reference Images 2 & 3) */}
      <main ref={studioRef} className="w-full bg-dot-matrix-cream py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header Title & Badges */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="font-display-hh text-3xl sm:text-5xl font-extrabold text-[#0E3C28] tracking-tight">
              Hacker Goa House {state.format === 'FRAME' ? 'Profile Frame' : 'Builder Pass'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans-hh">
              Personalize & generate your official graphic for <strong className="text-[#0E3C28]">Hacker House Goa 2026</strong>. Instant rendering, ready to download and tweet!
            </p>

            {/* Step Badges (Reference Image 2) */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/80 p-2 rounded-2xl border border-[#2D6A4F]/20 shadow-sm text-xs font-semibold text-stone-700">
              <span className="bg-[#FAF8EE] px-3 py-1 rounded-xl border border-stone-300 flex items-center space-x-1.5">
                <span>📷</span>
                <span>Upload Photo</span>
              </span>
              <span className="text-stone-400">→</span>
              <span className="bg-[#FAF8EE] px-3 py-1 rounded-xl border border-stone-300 flex items-center space-x-1.5">
                <span>⚡</span>
                <span>Auto Builder</span>
              </span>
              <span className="text-stone-400">→</span>
              <span className="bg-[#FAF8EE] px-3 py-1 rounded-xl border border-stone-300 flex items-center space-x-1.5">
                <span>🚀</span>
                <span>Share Pass</span>
              </span>
            </div>
          </div>

          {/* MAIN GENERATOR GRID: FORM CONTROLS 1ST ON MOBILE, PREVIEW BELOW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORM CONTROLS CARD: Rendered 1st in DOM -> TOP on Mobile, RIGHT on Desktop */}
            <div className="lg:col-span-5 space-y-6 lg:order-2">
              <div className="bg-white border-2 border-[#0E3C28] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-left">
                
                <div className="border-b border-stone-200 pb-4">
                  <h3 className="text-xl font-bold text-[#0E3C28] font-display-hh flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#FF007F]" />
                    <span>Personalize Details</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-sans-hh mt-1">
                    Fill out your photo & info to render your instant graphic
                  </p>
                </div>

                {/* 1. PHOTO UPLOADER */}
                <PhotoUploader
                  currentPhotoUrl={state.photoUrl}
                  onPhotoSelected={(url) =>
                    setState((prev) => ({ ...prev, photoUrl: url }))
                  }
                  onRemovePhoto={() =>
                    setState((prev) => ({ ...prev, photoUrl: null }))
                  }
                />

                {/* 2. FORMAT SPECIFIC INPUTS */}
                {state.format === 'CARD' && (
                  <CardFormInputs
                    cardData={state.cardData}
                    onChangeCardData={(newData: BuilderCardData) =>
                      setState((prev) => ({ ...prev, cardData: newData }))
                    }
                  />
                )}

                {/* 3. THEME PICKER */}
                <ThemePicker
                  format={state.format}
                  currentFrameTheme={state.frameTheme}
                  currentCardTheme={state.cardTheme}
                  onSelectFrameTheme={(theme: FrameTheme) =>
                    setState((prev) => ({ ...prev, frameTheme: theme }))
                  }
                  onSelectCardTheme={(theme: CardTheme) =>
                    setState((prev) => ({ ...prev, cardTheme: theme }))
                  }
                />

              </div>
            </div>

            {/* INTERACTIVE CANVAS PREVIEW: Rendered 2nd in DOM -> BELOW FORM on Mobile, LEFT on Desktop */}
            <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24 lg:order-1">
              <div className="bg-white border-2 border-[#0E3C28] rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
                
                {/* Preview Bar Header */}
                <div className="flex items-center justify-between text-xs font-mono-hh border-b border-stone-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#0E3C28] uppercase">
                      LIVE PREVIEW ({state.format === 'FRAME' ? '1:1 SQUARE' : '16:9 PASS'})
                    </span>
                  </div>

                  {/* Format Quick Toggle */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setState((prev) => ({ ...prev, format: 'FRAME' }))}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        state.format === 'FRAME'
                          ? 'bg-[#0E3C28] text-[#EFFD30]'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      Format A: PFP
                    </button>
                    <button
                      onClick={() => setState((prev) => ({ ...prev, format: 'CARD' }))}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        state.format === 'CARD'
                          ? 'bg-[#0E3C28] text-[#EFFD30]'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      Format B: Pass
                    </button>
                  </div>
                </div>

                {/* CANVAS VIEWPORT CONTAINER */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-stone-900 border border-stone-300 shadow-inner flex items-center justify-center p-2 group">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    onTouchStart={handleCanvasTouchStart}
                    onTouchMove={handleCanvasTouchMove}
                    onTouchEnd={handleCanvasTouchEnd}
                    onTouchCancel={handleCanvasTouchEnd}
                    onWheel={handleCanvasWheel}
                    className={`w-full max-w-full h-auto rounded-xl shadow-md transition-shadow touch-none ${
                      isDraggingCanvas ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                  />

                  {/* Drag overlay hint */}
                  <div className="absolute top-4 left-4 pointer-events-none bg-black/70 backdrop-blur-md text-white text-[11px] font-mono-hh px-3 py-1.5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 shadow">
                    <Move className="w-3 h-3 text-[#EFFD30]" />
                    <span>Drag inside canvas to reposition photo</span>
                  </div>
                </div>

                {/* Quick Photo Adjuster Bar inside Preview Card */}
                {state.photoUrl && (
                  <PhotoAdjuster
                    transform={state.photoTransform}
                    onChangeTransform={(newT: PhotoTransform) =>
                      setState((prev) => ({ ...prev, photoTransform: newT }))
                    }
                  />
                )}

                {/* EXPORT & SHARE BUTTONS */}
                <ExportActions
                  canvasRef={canvasRef}
                  format={state.format}
                  fullName={state.cardData.fullName}
                />

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 4. FOOTER */}
      <Footer />

    </div>
  );
}

export default App;
