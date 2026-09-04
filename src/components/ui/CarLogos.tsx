// Map brand names (lowercase) to the vector logos
export const defaultLogos: Record<string, string> = {
  porsche: 'https://ik.imagekit.io/e555n7nqt/brands/porsche-logo.svg',
  ferrari: 'https://ik.imagekit.io/e555n7nqt/brands/ferrari-logo.svg',
  'rolls-royce': 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg',
  rollsroyce: 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg',
  'rolls royce': 'https://ik.imagekit.io/e555n7nqt/brands/rolls-royce-logo.svg',
  lamborghini: 'https://ik.imagekit.io/e555n7nqt/brands/lamborghini-logo.svg',
  bentley: 'https://ik.imagekit.io/e555n7nqt/brands/bentley-logo.svg',
  'mercedes-maybach': 'https://ik.imagekit.io/e555n7nqt/brands/mercedes-maybach-logo.svg',
  mercedes: 'https://ik.imagekit.io/e555n7nqt/brands/mercedes-benz-logo.svg',
  'mercedes-benz': 'https://ik.imagekit.io/e555n7nqt/brands/mercedes-benz-logo.svg',
  'aston-martin': 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg',
  astonmartin: 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg',
  'aston martin': 'https://ik.imagekit.io/e555n7nqt/brands/aston-martin-logo.svg',
  maserati: 'https://ik.imagekit.io/e555n7nqt/brands/maserati-logo.svg',
  bmw: 'https://ik.imagekit.io/e555n7nqt/brands/bmw-logo.svg',
  audi: 'https://ik.imagekit.io/e555n7nqt/brands/audi-logo.svg',
  jaguar: 'https://ik.imagekit.io/e555n7nqt/brands/jaguar-logo.svg',
  citroen: 'https://ik.imagekit.io/e555n7nqt/brands/citroen-logo.svg',
  'citroën': 'https://ik.imagekit.io/e555n7nqt/brands/citroen-logo.svg',
  renault: 'https://ik.imagekit.io/e555n7nqt/brands/renault-logo.svg',
  peugeot: 'https://ik.imagekit.io/e555n7nqt/brands/peugeot-logo.svg',
  volkswagen: 'https://ik.imagekit.io/e555n7nqt/brands/volkswagen-logo.svg',
  vw: 'https://ik.imagekit.io/e555n7nqt/brands/volkswagen-logo.svg',
  toyota: 'https://ik.imagekit.io/e555n7nqt/brands/toyota-logo.svg',
  hyundai: 'https://ik.imagekit.io/e555n7nqt/brands/hyundai-logo.svg',
  kia: 'https://ik.imagekit.io/e555n7nqt/brands/kia-logo.svg',
  dacia: 'https://ik.imagekit.io/e555n7nqt/brands/dacia-logo.svg',
  fiat: 'https://ik.imagekit.io/e555n7nqt/brands/fiat-logo.svg',
  nissan: 'https://ik.imagekit.io/e555n7nqt/brands/nissan-logo.svg',
  mclaren: 'https://ik.imagekit.io/e555n7nqt/brands/mclaren-logo.svg',
  bugatti: 'https://ik.imagekit.io/e555n7nqt/brands/bugatti-logo.svg',
  chevrolet: 'https://ik.imagekit.io/e555n7nqt/brands/chevrolet-logo.svg',
  honda: 'https://ik.imagekit.io/e555n7nqt/brands/honda-logo.svg',
  infiniti: 'https://ik.imagekit.io/e555n7nqt/brands/infiniti-logo.svg',
  mazda: 'https://ik.imagekit.io/e555n7nqt/brands/mazda-logo.svg',
  suzuki: 'https://ik.imagekit.io/e555n7nqt/brands/suzuki-logo.svg',
  seat: 'https://ik.imagekit.io/e555n7nqt/brands/seat-logo.svg',
  skoda: 'https://ik.imagekit.io/e555n7nqt/brands/skoda-logo.svg',
  'škoda': 'https://ik.imagekit.io/e555n7nqt/brands/skoda-logo.svg',
};

// Normalized helper to get logo URL for any brand name
export const getBrandLogoUrl = (name: string): string | null => {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  return defaultLogos[key] || null;
};
