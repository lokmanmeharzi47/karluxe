// Map brand names (lowercase) to local logo images in public/brands/.
// Only the brands that exist in the database need entries here.
export const defaultLogos: Record<string, string> = {
  bentley: '/brands/bentley.png',
  ferrari: '/brands/ferrari.png',
  lamborghini: '/brands/lamborghini.png',
  'mercedes-maybach': '/brands/mercedes-maybach.png',
  polo: '/brands/polo.png',
  porsche: '/brands/porsche.png',
  'rolls-royce': '/brands/rolls-royce.png',
  // Legacy entries (Audi, BMW, Mercedes PNG logos)
  audi: '/brands/audi.png',
  mercedes: '/brands/mercedes.png',
  'mercedes-benz': '/brands/mercedes.png',
  bmw: '/brands/bmw.png',
};
