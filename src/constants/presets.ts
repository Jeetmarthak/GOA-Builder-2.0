import type { FrameTheme, CardTheme, BadgeSticker } from '../types';

export const SAMPLE_AVATARS = [
  {
    id: 'dev1',
    name: 'Fullstack Dev',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dev2',
    name: 'Hacker',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dev3',
    name: 'Builder',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dev4',
    name: 'Engineer',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  },
];

export const BUILDER_TITLES = [
  'Vibe Coder Extraordinaire',
  'Solana Alchemist',
  'Zero-Knowledge Ninja',
  'DeFi Liquidity Wizard',
  'Full-Stack Architect',
  'Rust Shader Mage',
  'Goa Sun-Code Chaser',
  'Bytecode Surfer',
  'AI Agent Whisperer',
  'Protocol Specialist',
  'Kernel Hacker',
  'Front-End Maestro',
  'Smart Contract Auditor',
  'Wasm Enchanter',
  'Meme Engineer & Builder',
  'L2 Scaling Wizard',
  'Prompt Architect',
  'Autonomous Agent Craftsperson',
  'Hackathon Veteran',
];

export const STACK_SUGGESTIONS = [
  'Full-Stack / Rust / AI',
  'Solana / Anchor / React',
  'Ethereum / ZK / Next.js',
  'AI / Python / PyTorch',
  'Design / UI / Web3',
  'DevOps / Kubernetes / Go',
  'iOS / Swift / Mobile',
  'TypeScript / Node / GraphQL',
];

export const FRAME_THEMES: { id: FrameTheme; name: string; tag: string; description: string; primaryColor: string }[] = [
  {
    id: 'classic',
    name: 'Goa Matrix',
    tag: 'Official',
    description: 'Emerald green halftone ring with golden typography and pink Hindi "गोवा" script',
    primaryColor: '#0E3C28',
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    tag: 'Popular',
    description: 'Dark futuristic ring with glowing cyan and hot pink LED rim accents',
    primaryColor: '#FF007F',
  },
  {
    id: 'retro',
    name: 'Vintage Studio',
    tag: 'Retro',
    description: '2:47PM Studio diagonal candy-stripe border with event badge stamps',
    primaryColor: '#EFFD30',
  },
  {
    id: 'sunset',
    name: 'Sunset Beach',
    tag: 'Vibes',
    description: 'Warm tropical sunset gradient ring with palm outlines and bright typography',
    primaryColor: '#FF5722',
  },
  {
    id: 'minimal',
    name: 'Hacker Minimal',
    tag: 'Sleek',
    description: 'Subtle emerald ring with gold foil corner accents & #FrameInGoa badge',
    primaryColor: '#2D6A4F',
  },
];

export const CARD_THEMES: { id: CardTheme; name: string; description: string; badgeColor: string }[] = [
  {
    id: 'official_dark',
    name: 'Official Dark Matrix',
    description: 'Deep forest green pass with halftone dots, yellow stencil title & holographic bar',
    badgeColor: '#EFFD30',
  },
  {
    id: 'retro_paper',
    name: 'Retro Beach Pass',
    description: 'Cream textured event ticket with dark green ink, serial barcode & stamp tags',
    badgeColor: '#0E3C28',
  },
  {
    id: 'cyber_hologram',
    name: 'Cyberpunk VIP Card',
    description: 'Futuristic glassmorphism card with glowing neon grid and verified badge',
    badgeColor: '#FF007F',
  },
  {
    id: 'executive_gold',
    name: 'Hacker Gold Edition',
    description: 'Luxury obsidian card with metallic gold text and emerald avatar border',
    badgeColor: '#FFD700',
  },
];

export const STICKER_BADGES: { id: BadgeSticker; label: string; icon: string }[] = [
  { id: 'VERIFIED BUILDER', label: '✓ VERIFIED BUILDER', icon: '⚡' },
  { id: 'OG HACKER', label: '🔥 OG HACKER', icon: '🔥' },
  { id: 'GOA VIP 2026', label: '🌴 GOA VIP 2026', icon: '🌴' },
  { id: 'VIBE CODER', label: '✨ VIBE CODER', icon: '✨' },
  { id: 'SOLANA BUILDER', label: '🚀 SOLANA BUILDER', icon: '🚀' },
  { id: 'NONE', label: 'None', icon: '🚫' },
];
