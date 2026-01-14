
export type Region = 'Global' | 'India';

export interface FootprintData {
  region: Region;
  energy: {
    electricity: number; // kWh/month
    gas: number; // kWh/month
    renewable: boolean;
  };
  transport: {
    carKm: number; // km/week
    flightHours: number; // hours/year
    publicTransitHours: number; // hours/week
  };
  diet: 'meat-heavy' | 'balanced' | 'vegetarian' | 'vegan';
  waste: {
    recycles: boolean;
    composts: boolean;
  };
}

export interface EmissionFactors {
  electricity: number; 
  gas: number; 
  car: number; 
  flight: number; 
  transit: number; 
  diet: Record<string, number>;
  avgPerCapita: number;
}

export interface CalculationResult {
  total: number;
  breakdown: {
    energy: number;
    transport: number;
    diet: number;
    waste: number;
  };
  comparison: {
    average: number;
    status: 'low' | 'average' | 'high';
  };
}

export interface Recommendation {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  category: string;
}
