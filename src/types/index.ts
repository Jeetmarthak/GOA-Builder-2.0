export type GraphicFormat = 'FRAME' | 'CARD';

export type FrameTheme = 'classic' | 'neon' | 'retro' | 'minimal' | 'sunset';
export type CardTheme = 'official_dark' | 'retro_paper' | 'cyber_hologram' | 'executive_gold';
export type BadgeSticker = 'VERIFIED BUILDER' | 'OG HACKER' | 'GOA VIP 2026' | 'VIBE CODER' | 'SOLANA BUILDER' | 'NONE';

export interface PhotoTransform {
  zoom: number; // 0.5 to 3.0
  panX: number; // pixels offset
  panY: number; // pixels offset
  rotation: number; // degrees 0-360
  flipH: boolean;
}

export interface BuilderCardData {
  fullName: string;
  stackRole: string;
  builderTitle: string;
  ticketId: string;
  badgeSticker: BadgeSticker;
  customHashtag: string;
}

export interface GeneratorState {
  format: GraphicFormat;
  photoUrl: string | null;
  photoTransform: PhotoTransform;
  frameTheme: FrameTheme;
  cardTheme: CardTheme;
  cardData: BuilderCardData;
  isProcessing: boolean;
}
