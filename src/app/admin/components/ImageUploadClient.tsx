'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadClientProps {
  label?: string;
  recommendedSize?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
}

export default function ImageUploadClient({ label = "Cliquez pour uploader les photos", recommendedSize = "PNG, JPG.", multiple = false, onChange }: ImageUploadClientProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      let updatedFiles: File[];
      if (multiple) {
        updatedFiles = [...selectedFiles, ...newFiles];
        setPreviews(prev => [...prev, ...newPreviews]);
      } else {
        updatedFiles = newFiles;
        setPreviews(newPreviews);
      }
      setSelectedFiles(updatedFiles);
      if (onChange) onChange(updatedFiles);
    }
  };

  const removePreview = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {previews.length > 0 && (
        <div className={`grid gap-4 ${multiple ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'}`}>
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant group">
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); removePreview(index); }}
                className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {(!previews.length || multiple) && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-variant/30 transition-colors"
        >
          <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center text-secondary mb-4">
            <ImageIcon size={24} />
          </div>
          <p className="font-bold text-primary mb-1">{label}</p>
          <p className="text-xs text-secondary">{recommendedSize}</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp" 
            multiple={multiple}
          />
        </div>
      )}
    </div>
  );
}
