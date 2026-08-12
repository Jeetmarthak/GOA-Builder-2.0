import type { GeneratorState } from '../types';

/**
 * Draws the entire graphic (Format A: Frame or Format B: Builder Card) onto an HTML5 Canvas element.
 */
export function renderGraphicToCanvas(
  canvas: HTMLCanvasElement,
  state: GeneratorState,
  userImage: HTMLImageElement | null
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (state.format === 'FRAME') {
    renderPfpFrame(canvas, ctx, state, userImage);
  } else {
    renderBuilderCard(canvas, ctx, state, userImage);
  }
}

/**
 * FORMAT A: PFP FRAME / OVERLAY (1080x1080 square canvas)
 */
function renderPfpFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: GeneratorState,
  userImage: HTMLImageElement | null
) {
  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  const { photoTransform, frameTheme, cardData } = state;
  const cx = width / 2;
  const cy = height / 2;

  // Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // Background base based on frame theme
  if (frameTheme === 'classic') {
    ctx.fillStyle = '#0E3C28';
  } else if (frameTheme === 'neon') {
    ctx.fillStyle = '#0B0F19';
  } else if (frameTheme === 'retro') {
    ctx.fillStyle = '#FAF8EE';
  } else if (frameTheme === 'sunset') {
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#2D0B33');
    bgGradient.addColorStop(0.5, '#9C1D54');
    bgGradient.addColorStop(1, '#FF5722');
    ctx.fillStyle = bgGradient;
  } else {
    // minimal
    ctx.fillStyle = '#121E17';
  }
  ctx.fillRect(0, 0, width, height);

  // Halftone Dot Matrix Overlay in Background Ring
  drawHalftonePattern(ctx, width, height, frameTheme);

  // 1. Draw User Avatar Photo in Central Circle Area
  const avatarRadius = 380; // Large central avatar

  ctx.save();
  // Create Circular Clip path for Avatar
  ctx.beginPath();
  ctx.arc(cx, cy, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Draw Avatar Image or Placeholder
  if (userImage) {
    drawTransformedImage(ctx, userImage, cx, cy, photoTransform, avatarRadius * 2);
  } else {
    drawAvatarPlaceholder(ctx, cx, cy, avatarRadius * 2);
  }

  ctx.restore(); // Remove avatar clip

  // 2. Draw Outer Branding Ring / Frame Borders
  ctx.save();

  // Outer Border Ring
  ctx.lineWidth = 40;
  if (frameTheme === 'classic') {
    ctx.strokeStyle = '#EFFD30';
  } else if (frameTheme === 'neon') {
    ctx.strokeStyle = '#00F0FF';
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 25;
  } else if (frameTheme === 'retro') {
    ctx.strokeStyle = '#0E3C28';
  } else if (frameTheme === 'sunset') {
    ctx.strokeStyle = '#FFD700';
  } else {
    ctx.strokeStyle = '#2D6A4F';
  }

  ctx.beginPath();
  ctx.arc(cx, cy, avatarRadius + 20, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Accent Ring
  ctx.lineWidth = 10;
  ctx.strokeStyle = frameTheme === 'neon' ? '#FF007F' : '#FF1493';
  ctx.beginPath();
  ctx.arc(cx, cy, avatarRadius + 42, 0, Math.PI * 2);
  ctx.stroke();

  // Outer Edge Frame Border (1080x1080 canvas frame)
  ctx.lineWidth = 24;
  ctx.strokeStyle = frameTheme === 'classic' ? '#062C1D' : '#1A1A1A';
  ctx.strokeRect(12, 12, width - 24, height - 24);

  // Corner Accents (4 corner ticks)
  const cornerLen = 60;
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#EFFD30';
  // Top-left
  ctx.beginPath(); ctx.moveTo(30, 30 + cornerLen); ctx.lineTo(30, 30); ctx.lineTo(30 + cornerLen, 30); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(width - 30 - cornerLen, 30); ctx.lineTo(width - 30, 30); ctx.lineTo(width - 30, 30 + cornerLen); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(30, height - 30 - cornerLen); ctx.lineTo(30, height - 30); ctx.lineTo(30 + cornerLen, height - 30); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(width - 30 - cornerLen, height - 30); ctx.lineTo(width - 30, height - 30); ctx.lineTo(width - 30, height - 30 - cornerLen); ctx.stroke();

  // Top Curved / Arc Text "HACKER HOUSE GOA 2026"
  drawCurvedText(ctx, "HACKER HOUSE GOA 2026", cx, cy, avatarRadius + 70, Math.PI * 1.5, '#EFFD30', 'bold 42px Cinzel, serif');

  // Bottom Curved Text "#FRAMEINGOA • GOA INDIA"
  drawCurvedText(ctx, "#FRAMEINGOA • AUG 28-31, 2026", cx, cy, avatarRadius + 70, Math.PI * 0.5, '#FFFFFF', 'bold 30px "Space Grotesk", sans-serif', true);

  // 3. Draw Neon Pink Hindi "गोवा" Script Sticker Overlay (Bottom Right of Avatar)
  drawHindiGoaBadge(ctx, width - 290, height - 210, 1.1);

  // 4. Draw Studio Branding Stamp Top Left
  drawStudioBadge(ctx, 60, 55);

  // 5. Draw Optional Sticker Badge (e.g. "VERIFIED BUILDER") on Avatar Top Right
  if (cardData.badgeSticker && cardData.badgeSticker !== 'NONE') {
    drawStickerBadge(ctx, cardData.badgeSticker, width - 280, 160);
  }

  ctx.restore();
}

/**
 * FORMAT B: BUILDER ID CARD / PASS (1200x675 landscape canvas)
 */
function renderBuilderCard(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: GeneratorState,
  userImage: HTMLImageElement | null
) {
  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const { photoTransform, cardTheme, cardData } = state;

  ctx.clearRect(0, 0, width, height);

  // Outer Canvas Background
  if (cardTheme === 'official_dark') {
    ctx.fillStyle = '#0E3C28';
  } else if (cardTheme === 'retro_paper') {
    ctx.fillStyle = '#FAF8EE';
  } else if (cardTheme === 'cyber_hologram') {
    ctx.fillStyle = '#0B0F19';
  } else {
    // executive_gold
    ctx.fillStyle = '#141414';
  }
  ctx.fillRect(0, 0, width, height);

  // Draw Halftone or Grid Background Pattern
  drawHalftonePattern(ctx, width, height, cardTheme === 'retro_paper' ? 'retro' : 'classic');

  // Card Main Container Box (1120 x 595, centered with 40px margin)
  const cardX = 40;
  const cardY = 40;
  const cardW = 1120;
  const cardH = 595;
  const cardRadius = 24;

  ctx.save();
  // Round rect for main card
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, cardRadius);

  if (cardTheme === 'official_dark') {
    ctx.fillStyle = '#062C1D';
    ctx.strokeStyle = '#EFFD30';
    ctx.lineWidth = 5;
  } else if (cardTheme === 'retro_paper') {
    ctx.fillStyle = '#F5F1DF';
    ctx.strokeStyle = '#0E3C28';
    ctx.lineWidth = 5;
  } else if (cardTheme === 'cyber_hologram') {
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 4;
  } else {
    ctx.fillStyle = '#1D1D1D';
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
  }
  ctx.fill();
  ctx.stroke();

  // Diagonal Candy Stripe Top Banner Bar (matching 2:47PM Studio yellow & pink accent)
  ctx.save();
  ctx.clip(); // Clip inside card container
  drawTopBannerStripe(ctx, cardX, cardY, cardW, 16);
  ctx.restore();

  // Header Title Text
  ctx.fillStyle = cardTheme === 'retro_paper' ? '#0E3C28' : '#EFFD30';
  ctx.font = 'bold 38px Cinzel, serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE', cardX + 50, cardY + 75);

  // Neon Pink Hindi "गोवा" badge overlay next to header
  drawHindiGoaBadge(ctx, cardX + 440, cardY + 32, 0.7);

  // Event Details Sub-header Bar
  ctx.fillStyle = cardTheme === 'retro_paper' ? '#2D6A4F' : '#00E5FF';
  ctx.font = '600 18px "Space Grotesk", sans-serif';
  ctx.fillText('OFFICIAL BUILDER PASS • GOA, INDIA • AUG 28-31, 2026', cardX + 50, cardY + 110);

  // Decorative Divider Line
  ctx.strokeStyle = cardTheme === 'retro_paper' ? 'rgba(14, 60, 40, 0.2)' : 'rgba(239, 253, 48, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 50, cardY + 130);
  ctx.lineTo(cardX + cardW - 50, cardY + 130);
  ctx.stroke();

  // LEFT COLUMN: Avatar Frame (Size 280x280)
  const avatarX = cardX + 60;
  const avatarY = cardY + 165;
  const avatarSize = 270;
  const avatarCx = avatarX + avatarSize / 2;
  const avatarCy = avatarY + avatarSize / 2;
  const avatarR = avatarSize / 2;

  // Avatar Border Ring
  ctx.save();
  ctx.lineWidth = 8;
  ctx.strokeStyle = cardTheme === 'cyber_hologram' ? '#FF007F' : '#EFFD30';
  ctx.beginPath();
  ctx.arc(avatarCx, avatarCy, avatarR + 6, 0, Math.PI * 2);
  ctx.stroke();

  // Avatar Image Clip Circle
  ctx.beginPath();
  ctx.arc(avatarCx, avatarCy, avatarR, 0, Math.PI * 2);
  ctx.clip();

  if (userImage) {
    drawTransformedImage(ctx, userImage, avatarCx, avatarCy, photoTransform, avatarSize);
  } else {
    drawAvatarPlaceholder(ctx, avatarCx, avatarCy, avatarSize);
  }
  ctx.restore();

  // Sticker Badge on Avatar (if selected)
  if (cardData.badgeSticker && cardData.badgeSticker !== 'NONE') {
    drawStickerBadge(ctx, cardData.badgeSticker, avatarX - 10, avatarY + avatarSize - 30);
  }

  // RIGHT COLUMN: User Builder Information
  const infoX = cardX + 380;
  let infoY = cardY + 175;

  // 1. FULL NAME
  ctx.fillStyle = cardTheme === 'retro_paper' ? '#0E3C28' : '#FFFFFF';
  ctx.font = '800 44px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  const nameText = (cardData.fullName || 'SATOSHI NAKAMOTO').toUpperCase();
  ctx.fillText(nameText, infoX, infoY + 35);

  infoY += 55;

  // 2. BUILDER TITLE BADGE PILL
  const titleText = (cardData.builderTitle || 'VIBE CODER EXTRAORDINAIRE').toUpperCase();
  ctx.font = '700 18px "Space Grotesk", sans-serif';
  const titleMetrics = ctx.measureText(`⚡ ${titleText}`);
  const pillW = titleMetrics.width + 36;
  const pillH = 38;

  // Fill Pill Box
  ctx.fillStyle = '#FF007F';
  drawRoundedRectPath(ctx, infoX, infoY, pillW, pillH, 19);
  ctx.fill();

  // Text inside Pill Box
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`⚡ ${titleText}`, infoX + 18, infoY + 25);

  infoY += 60;

  // 3. STACK / ROLE
  ctx.fillStyle = cardTheme === 'retro_paper' ? '#555555' : '#A3E635';
  ctx.font = '600 16px "Space Grotesk", sans-serif';
  ctx.fillText('STACK & SPECIALTY', infoX, infoY);

  ctx.fillStyle = cardTheme === 'retro_paper' ? '#1A1A1A' : '#E2E8F0';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(cardData.stackRole || 'Full-Stack / Rust / AI', infoX, infoY + 30);

  infoY += 75;

  // 4. PASS ID & EVENT HASHTAG
  ctx.fillStyle = cardTheme === 'retro_paper' ? '#555555' : '#94A3B8';
  ctx.font = '600 15px "Space Grotesk", sans-serif';
  const ticketCode = cardData.ticketId || 'HH-GOA-2026-8942';
  ctx.fillText(`PASS ID: ${ticketCode}`, infoX, infoY);
  ctx.fillText(`#FrameInGoa`, infoX + 320, infoY);

  // FOOTER BAR OF CARD: Barcode, Studio Stamp, Hologram Accent
  const footerY = cardY + cardH - 85;

  // Barcode Graphic simulation
  drawBarcodeGraphic(ctx, cardX + 60, footerY, 270, 45, cardTheme === 'retro_paper' ? '#0E3C28' : '#EFFD30');

  // Studio Logo on Right
  drawStudioBadge(ctx, cardX + cardW - 200, footerY);

  // Holographic Foil Strip Accent (middle of footer)
  const holoGradient = ctx.createLinearGradient(cardX + 380, footerY, cardX + 680, footerY);
  holoGradient.addColorStop(0, '#00F0FF');
  holoGradient.addColorStop(0.33, '#FF007F');
  holoGradient.addColorStop(0.66, '#EFFD30');
  holoGradient.addColorStop(1, '#00F0FF');

  ctx.fillStyle = holoGradient;
  drawRoundedRectPath(ctx, cardX + 380, footerY + 10, 300, 24, 6);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 12px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GOA 2026 VERIFIED', cardX + 530, footerY + 27);
}

/**
 * HELPER: Draws the user image with pan, zoom, rotation, and horizontal flip applied.
 */
function drawTransformedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  transform: { zoom: number; panX: number; panY: number; rotation: number; flipH: boolean },
  containerSize: number
) {
  ctx.save();
  ctx.translate(cx + transform.panX, cy + transform.panY);
  ctx.rotate((transform.rotation * Math.PI) / 180);
  if (transform.flipH) {
    ctx.scale(-1, 1);
  }

  // Cover math for scaling image to fit container size * zoom
  const imgAspect = img.width / img.height;
  let drawW = containerSize * transform.zoom;
  let drawH = containerSize * transform.zoom;

  if (imgAspect > 1) {
    drawW = drawH * imgAspect;
  } else {
    drawH = drawW / imgAspect;
  }

  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

/**
 * HELPER: Draws stylish fallback avatar placeholder when no photo is uploaded yet.
 */
function drawAvatarPlaceholder(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  const r = size / 2;
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
  grad.addColorStop(0, '#1E4D3B');
  grad.addColorStop(1, '#082117');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Draw Camera & User silhouette icon
  ctx.fillStyle = '#EFFD30';
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.2, r * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.6, r * 0.5, Math.PI, 0);
  ctx.fill();
}

/**
 * HELPER: Draws Neon Pink Hindi "गोवा" Script Sticker (exact style from reference images!)
 */
function drawHindiGoaBadge(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate((-6 * Math.PI) / 180);

  const w = 180;
  const h = 75;

  // Drop Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  drawRoundedRectPath(ctx, 4, 6, w, h, 14);
  ctx.fill();

  // Pink Badge Container
  ctx.fillStyle = '#FF007F';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  drawRoundedRectPath(ctx, 0, 0, w, h, 14);
  ctx.fill();
  ctx.stroke();

  // Hindi "गोवा" text in bold bright white with subtle glow
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 50px "Rozha One", serif';
  ctx.textAlign = 'center';
  ctx.fillText('गोवा', w / 2, h / 2 + 16);

  ctx.restore();
}

/**
 * HELPER: Draws 2:47PM STUDIO logo badge
 */
function drawStudioBadge(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = '#EFFD30';
  ctx.font = '900 20px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('2:47PM', x, y + 20);
  ctx.font = '700 14px "Press Start 2P", monospace';
  ctx.fillText('STUDIO', x, y + 42);
  ctx.restore();
}

/**
 * HELPER: Draws Sticker Badges (e.g. VERIFIED BUILDER)
 */
function drawStickerBadge(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((4 * Math.PI) / 180);

  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  const metrics = ctx.measureText(text);
  const w = metrics.width + 30;
  const h = 36;

  ctx.fillStyle = '#EFFD30';
  ctx.strokeStyle = '#0E3C28';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, 0, 0, w, h, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0E3C28';
  ctx.textAlign = 'center';
  ctx.fillText(text, w / 2, h / 2 + 6);
  ctx.restore();
}

/**
 * HELPER: Simulated Barcode Graphic
 */
function drawBarcodeGraphic(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  const barCount = 36;
  const barWidth = w / barCount;

  for (let i = 0; i < barCount; i++) {
    if (i % 3 !== 0) {
      const bw = (i % 5 === 0 ? 1.8 : 1) * barWidth * 0.7;
      ctx.fillRect(x + i * barWidth, y, bw, h);
    }
  }
  ctx.restore();
}

/**
 * HELPER: Top Banner Candy Stripe
 */
function drawTopBannerStripe(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  const stripeW = 20;
  for (let i = -w; i < w * 2; i += stripeW * 2) {
    ctx.fillStyle = '#EFFD30';
    ctx.fillRect(x + i, y, stripeW, h);
    ctx.fillStyle = '#FF007F';
    ctx.fillRect(x + i + stripeW, y, stripeW, h);
  }
  ctx.restore();
}

/**
 * HELPER: Draw Text curved around a radius
 */
function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  color: string,
  fontStr: string,
  reversed: boolean = false
) {
  ctx.save();
  ctx.font = fontStr;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const len = text.length;
  const anglePerChar = 0.045;
  const totalAngle = len * anglePerChar;
  let currentAngle = startAngle - (reversed ? -totalAngle / 2 : totalAngle / 2);

  for (let i = 0; i < len; i++) {
    const char = text[i];
    ctx.save();
    const charX = cx + radius * Math.cos(currentAngle);
    const charY = cy + radius * Math.sin(currentAngle);

    ctx.translate(charX, charY);
    ctx.rotate(currentAngle + (reversed ? -Math.PI / 2 : Math.PI / 2));
    ctx.fillText(char, 0, 0);
    ctx.restore();

    currentAngle += reversed ? -anglePerChar : anglePerChar;
  }
  ctx.restore();
}

/**
 * HELPER: Draw Halftone background dots onto Canvas
 */
function drawHalftonePattern(ctx: CanvasRenderingContext2D, w: number, h: number, theme: string) {
  ctx.save();
  ctx.fillStyle = theme === 'retro' ? 'rgba(212, 206, 176, 0.5)' : 'rgba(204, 255, 0, 0.08)';
  const step = 24;
  for (let x = step / 2; x < w; x += step) {
    for (let y = step / 2; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/**
 * HELPER: Canvas rounded rectangle path helper
 */
function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
