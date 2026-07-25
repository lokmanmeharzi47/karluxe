'use client';

import React from 'react';
import { ImageKitProvider } from '@imagekit/next';

interface ImageKitProviderWrapperProps {
  children: React.ReactNode;
}

export const ImageKitProviderWrapper: React.FC<ImageKitProviderWrapperProps> = ({
  children,
}) => {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

  if (!urlEndpoint) {
    // Graceful fallback if env vars are missing, allows app to run without ImageKit initialized fully
    return <>{children}</>;
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {children}
    </ImageKitProvider>
  );
};
