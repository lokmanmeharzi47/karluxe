'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { LuxuryModal } from '@/components/ui/LuxuryModal';

interface VehicleGalleryProps {
  images: { id: string; url: string; is_primary?: boolean }[];
  featuredImage: string;
  title: string;
}

export const VehicleGallery: React.FC<VehicleGalleryProps> = ({
  images,
  featuredImage,
  title,
}) => {
  const allImages = images.length > 0 ? images.map((i) => i.url) : [featuredImage];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image Banner */}
      <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden glass-panel border border-[rgba(212,175,55,0.3)] bg-black group">
        <img
          src={selectedImage}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-95 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-3 rounded-full glass-panel text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer z-10"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {allImages.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(imgUrl)}
              className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                selectedImage === imgUrl ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <LuxuryModal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="full" title={title}>
        <div className="relative max-h-[80vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden">
          <img src={selectedImage} alt={title} className="max-h-[75vh] w-auto object-contain mx-auto" />
        </div>
      </LuxuryModal>
    </div>
  );
};
