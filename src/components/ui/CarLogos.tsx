// Map brand names (lowercase) to the vector logos with ?tr=orig-true to ensure authentic SVG delivery
export const defaultLogos: Record<string, string> = {
  porsche: 'https://ik.imagekit.io/e555n7nqt/brands/porsche-logo.svg?tr=orig-true',
  ferrari: 'https://ik.imagekit.io/e555n7nqt/brands/ferrari-logo.svg?tr=orig-true',
  'rolls-royce': 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg?tr=orig-true',
  rollsroyce: 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg?tr=orig-true',
  'rolls royce': 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg?tr=orig-true',
  lamborghini: 'https://ik.imagekit.io/e555n7nqt/brands/lamborghini-logo.svg?tr=orig-true',
  bentley: 'https://ik.imagekit.io/e555n7nqt/brands/bentley-logo.svg?tr=orig-true',
  mercedes: 'https://ik.imagekit.io/e555n7nqt/brands/mercedes-benz-logo.svg?tr=orig-true',
  'mercedes-benz': 'https://ik.imagekit.io/e555n7nqt/brands/mercedes-benz-logo.svg?tr=orig-true',
  'aston-martin': 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg?tr=orig-true',
  astonmartin: 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg?tr=orig-true',
  'aston martin': 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg?tr=orig-true',
  maserati: 'https://ik.imagekit.io/e555n7nqt/brands/maserati-logo.svg?tr=orig-true',
  bmw: 'https://ik.imagekit.io/e555n7nqt/brands/bmw-logo.svg?tr=orig-true',
  audi: 'https://ik.imagekit.io/e555n7nqt/brands/audi-logo.svg?tr=orig-true',
  jaguar: 'https://ik.imagekit.io/e555n7nqt/brands/jaguar-logo.svg?tr=orig-true',
  citroen: 'https://ik.imagekit.io/e555n7nqt/brands/citroen-logo.svg?tr=orig-true',
  'citroën': 'https://ik.imagekit.io/e555n7nqt/brands/citroen-logo.svg?tr=orig-true',
  renault: 'https://ik.imagekit.io/e555n7nqt/brands/renault-logo.svg?tr=orig-true',
  peugeot: 'https://ik.imagekit.io/e555n7nqt/brands/peugeot-logo.svg?tr=orig-true',
  volkswagen: 'https://ik.imagekit.io/e555n7nqt/brands/volkswagen-logo.svg?tr=orig-true',
  vw: 'https://ik.imagekit.io/e555n7nqt/brands/volkswagen-logo.svg?tr=orig-true',
  toyota: 'https://ik.imagekit.io/e555n7nqt/brands/toyota-logo.svg?tr=orig-true',
  hyundai: 'https://ik.imagekit.io/e555n7nqt/brands/hyundai-logo.svg?tr=orig-true',
  kia: 'https://ik.imagekit.io/e555n7nqt/brands/kia-logo.svg?tr=orig-true',
  dacia: 'https://ik.imagekit.io/e555n7nqt/brands/dacia-logo.svg?tr=orig-true',
  fiat: 'https://ik.imagekit.io/e555n7nqt/brands/fiat-logo.svg?tr=orig-true',
  nissan: 'https://ik.imagekit.io/e555n7nqt/brands/nissan-logo.svg?tr=orig-true',
  mclaren: 'https://ik.imagekit.io/e555n7nqt/brands/mclaren-logo.svg?tr=orig-true',
  chevrolet: 'https://ik.imagekit.io/e555n7nqt/brands/chevrolet-logo.svg?tr=orig-true',
  honda: 'https://ik.imagekit.io/e555n7nqt/brands/honda-logo.svg?tr=orig-true',
  infiniti: 'https://ik.imagekit.io/e555n7nqt/brands/infiniti-logo.svg?tr=orig-true',
  mazda: 'https://ik.imagekit.io/e555n7nqt/brands/mazda-logo.svg?tr=orig-true',
  suzuki: 'https://ik.imagekit.io/e555n7nqt/brands/suzuki-logo.svg?tr=orig-true',
  seat: 'https://ik.imagekit.io/e555n7nqt/brands/seat-logo.svg?tr=orig-true',
  skoda: 'https://ik.imagekit.io/e555n7nqt/brands/skoda-logo.svg?tr=orig-true',
  'škoda': 'https://ik.imagekit.io/e555n7nqt/brands/skoda-logo.svg?tr=orig-true',
};

// Normalized helper to get logo URL for any brand name
export const getBrandLogoUrl = (name: string): string | null => {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  const url = defaultLogos[key] || null;
  if (url && url.includes('ik.imagekit.io') && url.includes('.svg') && !url.includes('tr=')) {
    return `${url}?tr=orig-true`;
  }
  return url;
};
