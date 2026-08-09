// Map brand names (lowercase) to local logo images in public/brands/.
// Only the brands that exist in the database need entries here.
//
// Stored as 240px WebP: the sources were 1024x1024 PNGs (~350KB each) for a
// logo that renders at 80px, which cost 3.3MB of repo and a full-size decode
// on every image-optimizer cold miss.
export const defaultLogos: Record<string, string> = {
  bentley: '/brands/bentley.webp',
  ferrari: '/brands/ferrari.webp',
  lamborghini: '/brands/lamborghini.webp',
  'mercedes-maybach': '/brands/mercedes-maybach.webp',
  polo: '/brands/polo.webp',
  porsche: '/brands/porsche.webp',
  'rolls-royce': '/brands/rolls-royce.webp',
  // Legacy entries (Audi, BMW, Mercedes logos)
  audi: '/brands/audi.webp',
  mercedes: '/brands/mercedes.webp',
  'mercedes-benz': '/brands/mercedes.webp',
  bmw: '/brands/bmw.webp',
};
