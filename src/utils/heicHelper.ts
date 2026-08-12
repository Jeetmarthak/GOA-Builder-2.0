import heic2any from 'heic2any';

/**
 * Reads a File object and converts it to a Data URL string.
 * Handles HEIC/HEIF images by converting them to PNG blob first.
 */
export async function fileToDataUrl(file: File): Promise<string> {
  const isHeic = file.type.toLowerCase().includes('heic') || 
                 file.type.toLowerCase().includes('heif') || 
                 file.name.toLowerCase().endsWith('.heic') || 
                 file.name.toLowerCase().endsWith('.heif');

  if (isHeic) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/png',
        quality: 0.9,
      });

      const singleBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(singleBlob);
      });
    } catch (err) {
      console.warn('HEIC conversion failed, trying standard FileReader fallback', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Loads an HTMLImageElement from a URL string asynchronously.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image from ${src}: ${e}`));
    img.src = src;
  });
}
