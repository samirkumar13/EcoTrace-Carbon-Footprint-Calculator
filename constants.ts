
import { EmissionFactors, FootprintData } from './types';

export const REGIONAL_FACTORS: Record<'Global' | 'India', EmissionFactors> = {
  Global: {
    electricity: 0.417,
    gas: 0.202,
    car: 0.17,
    flight: 150,
    transit: 0.05,
    diet: {
      'meat-heavy': 3300,
      'balanced': 2500,
      'vegetarian': 1700,
      'vegan': 1100,
    },
    avgPerCapita: 4700
  },
  India: {
    electricity: 0.71, // Higher due to coal-heavy grid in India
    gas: 0.202,
    car: 0.14, // Slightly lower due to smaller average car engine sizes
    flight: 150,
    transit: 0.03, // Efficient rail/bus network usage
    diet: {
      'meat-heavy': 2800, // Indian meat consumption patterns differ from West
      'balanced': 1900,
      'vegetarian': 1200,
      'vegan': 900,
    },
    avgPerCapita: 1900 // India's national average is ~1.9 tonnes
  }
};

export const INITIAL_DATA: FootprintData = {
  region: 'India',
  energy: { electricity: 150, gas: 50, renewable: false },
  transport: { carKm: 50, flightHours: 2, publicTransitHours: 10 },
  diet: 'vegetarian',
  waste: { recycles: true, composts: true }
};
