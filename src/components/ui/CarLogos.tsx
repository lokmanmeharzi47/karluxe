// Map brand names (lowercase) to the SVG vector logos placed in /public
export const defaultLogos: Record<string, string> = {
  porsche: '/porsche-svgrepo-com.svg',
  ferrari: '/ferrari-svgrepo-com.svg',
  'rolls-royce': '/rolls-royce-svgrepo-com.svg',
  rollsroyce: '/rolls-royce-svgrepo-com.svg',
  'rolls royce': '/rolls-royce-svgrepo-com.svg',
  lamborghini: '/lamborghini-alt-svgrepo-com.svg',
  bentley: '/bentley-svgrepo-com.svg',
  'mercedes-maybach': '/mercedes-benz-alt-svgrepo-com.svg',
  maybach: '/mercedes-benz-alt-svgrepo-com.svg',
  mercedes: '/mercedes-benz-alt-svgrepo-com.svg',
  'mercedes-benz': '/mercedes-benz-alt-svgrepo-com.svg',
  polo: '/volkswagen-svgrepo-com.svg',
  volkswagen: '/volkswagen-svgrepo-com.svg',
  vw: '/volkswagen-svgrepo-com.svg',
  bmw: '/bmw-svgrepo-com.svg',
  audi: '/audi-svgrepo-com.svg',
  'aston-martin': '/aston-martin-svgrepo-com.svg',
  astonmartin: '/aston-martin-svgrepo-com.svg',
  jaguar: '/jaguar-alt-svgrepo-com.svg',
};

// Normalized helper to get logo URL for any brand name
export const getBrandLogoUrl = (name: string): string | null => {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  return defaultLogos[key] || null;
};
