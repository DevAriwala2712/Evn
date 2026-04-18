export type EmissionLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ClimateRiskLevel = 'Safe' | 'Moderate' | 'Severe';
export type SuitabilityLevel = 'Optimal' | 'Viable' | 'Poor';

export interface LocationData {
  id: number;
  position: [number, number];
  name: string;
  type: string;
  
  // Industrial Layer
  emission: EmissionLevel;
  impact: string;
  
  // AQI Layer
  aqi: number;
  
  // Climate Risk Layer
  climateRiskType: 'Drought' | 'Flood' | 'Heatwave' | 'None';
  climateRiskLevel: ClimateRiskLevel;
  
  // Green Tech Suitability Layer
  bestGreenTech: 'Solar' | 'Wind' | 'Hydro' | 'Geothermal' | 'Carbon Capture';
  suitability: SuitabilityLevel;
  
  suggestions: string[];
}
