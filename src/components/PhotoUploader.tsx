import React, { useRef, useState } from 'react';
import { Upload, Loader2, Check } from 'lucide-react';
import { fileToDataUrl } from '../utils/heicHelper';

interface PhotoUploaderProps {
  onPhotoSelected: (dataUrl: string) => void;
  currentPhotoUrl: string | null;
  onRemovePhoto: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onPhotoSelected,
  currentPhotoUrl,
  onRemovePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      onPhotoSelected(dataUrl);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process image. Please try another JPG, PNG or HEIC file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full space-y-4">
      
      <div className="flex items-center justify-between">
        <label className="block text-base font-bold text-[#0E3C28] font-sans-hh">
          Builder Photo
        </label>
        {currentPhotoUrl && (
          <button
            onClick={onRemovePhoto}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
          >
            Remove Photo
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Dropzone (matching reference image 2 & 3) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[160px] ${
          isDragging
            ? 'border-[#FF007F] bg-[#FF007F]/10 scale-[1.01]'
            : currentPhotoUrl
            ? 'border-[#2D6A4F] bg-[#1E4D3B]/5'
            : 'border-[#2D6A4F]/40 bg-white hover:border-[#0E3C28] hover:bg-[#0E3C28]/5'
        }`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center space-y-3 py-4">
            <Loader2 className="w-10 h-10 text-[#0E3C28] animate-spin" />
            <p className="text-sm font-semibold text-[#0E3C28]">
              Converting & Processing Photo (Supports HEIC)...
            </p>
          </div>
        ) : currentPhotoUrl ? (
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0E3C28] shadow-md flex-shrink-0">
              <img src={currentPhotoUrl} alt="Uploaded builder" className="w-full h-full object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center space-x-1.5 bg-[#0E3C28] text-[#EFFD30] text-xs font-bold px-3 py-1 rounded-full mb-1">
                <Check className="w-3.5 h-3.5" />
                <span>Photo Loaded Successfully</span>
              </div>
              <p className="text-xs text-stone-600">
                Click or drop another file to replace photo
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#0E3C28]/10 text-[#0E3C28] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-[#0E3C28]">
                Drop your photo here or click to browse
              </p>
              <p className="text-xs text-stone-500 font-mono-hh mt-1">
                Supports JPG, PNG, WEBP or HEIC (from iPhone) • Max 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-600 font-semibold text-center">{errorMsg}</p>
      )}

    </div>
  );
};
