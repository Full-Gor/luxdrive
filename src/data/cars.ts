import { Car } from '../types';
import { getCars, initializeCars } from './mockCars';

// Adapter pour convertir le format mockCars vers l'ancien format utilisé par CarShowcase
interface LegacyCar {
  id: string;
  name: string;
  brand: string;
  image: string;
  pollutionQuota: string;
  pricePerMonth: number;
  category: 'standard' | 'electric' | 'used';
  description: string;
}

// Initialiser les voitures
initializeCars();

// Récupérer et convertir les voitures au format legacy
export const cars: LegacyCar[] = getCars().map((car: Car) => ({
  id: car.id,
  name: car.name,
  brand: car.brand,
  image: car.image_url,
  pollutionQuota: car.pollution_quota,
  pricePerMonth: car.price_per_month,
  category: car.category,
  description: car.description
}));