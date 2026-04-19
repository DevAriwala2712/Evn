import type { LocationData } from '../types';

export const INDIA_MOCK_DATA: LocationData[] = [
  // North India
  {
    id: 1, position: [28.6139, 77.2090], name: "Delhi & NCR Ind. Zone",
    emission: "Critical", impact: "Severe Red", aqi: 410, type: "Heavy Manufacturing",
    climateRiskType: "Heatwave", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Install Electrostatic Precipitators", "Deploy Utility-scale Solar Array", "Mandate BS-VI transport"],
    permissionStatus: "Locked (Critically Polluted Area)"
  },
  {
    id: 2, position: [29.9457, 78.1642], name: "Haridwar SIDCUL",
    emission: "Medium", impact: "Yellow", aqi: 180, type: "FMCG / Manufacturing",
    climateRiskType: "Flood", climateRiskLevel: "Moderate",
    bestGreenTech: "Hydro", suitability: "Optimal",
    suggestions: ["Effluent recycle loop", "Transition to biomass boilers", "Run-of-river hydro integration"]
  },
  {
    id: 3, position: [30.9010, 75.8573], name: "Ludhiana Textile Hub",
    emission: "High", impact: "Red", aqi: 310, type: "Textile & Dyeing",
    climateRiskType: "Drought", climateRiskLevel: "Moderate",
    bestGreenTech: "Solar", suitability: "Viable",
    suggestions: ["Zero Liquid Discharge (ZLD) plant", "Solar thermal for dye heating", "Groundwater recharge pits"]
  },
  {
    id: 22, position: [30.7333, 76.7794], name: "Chandigarh IT Park",
    emission: "Low", impact: "Green", aqi: 110, type: "IT Services",
    climateRiskType: "None", climateRiskLevel: "Safe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["100% EV campus fleet", "Rooftop solar expansion", "Smart grid integration"]
  },

  // West India
  {
    id: 4, position: [19.0760, 72.8777], name: "Mumbai Petrochem Hub",
    emission: "Critical", impact: "Severe Red", aqi: 190, type: "Chemical Processing",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Carbon Capture", suitability: "Optimal",
    suggestions: ["Implement Carbon Capture (CCS)", "Mangrove buffer zone restoration", "Offshore wind feasibility study"],
    permissionStatus: "Requires Clearance (CRZ)"
  },
  {
    id: 5, position: [23.0225, 72.5714], name: "Ahmedabad Mills",
    emission: "High", impact: "Red", aqi: 240, type: "Textile",
    climateRiskType: "Heatwave", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Upgrade Effluent Treatment ETP", "Rooftop Solar mandate", "Micro-fogging systems for cooling"]
  },
  {
    id: 6, position: [21.1702, 72.8311], name: "Surat Diamond & Textile",
    emission: "Medium", impact: "Yellow", aqi: 165, type: "Light Manufacturing",
    climateRiskType: "Flood", climateRiskLevel: "Moderate",
    bestGreenTech: "Wind", suitability: "Viable",
    suggestions: ["Energy efficient cutting lasers", "Waste to energy reactor", "Coastal wind deployment"]
  },
  {
    id: 7, position: [18.5204, 73.8567], name: "Pune Auto Cluster",
    emission: "Medium", impact: "Yellow", aqi: 130, type: "Automotive",
    climateRiskType: "None", climateRiskLevel: "Safe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Transition to EV manufacturing", "Supply chain carbon tracking", "EV Charging micro-grids"]
  },
  {
    id: 8, position: [22.4707, 70.0577], name: "Jamnagar Refinery Complex",
    emission: "Critical", impact: "Severe Red", aqi: 220, type: "Petro Refining",
    climateRiskType: "None", climateRiskLevel: "Safe",
    bestGreenTech: "Carbon Capture", suitability: "Optimal",
    suggestions: ["Direct Air Capture (DAC) scale-up", "Green Hydrogen blending", "Flaring reduction protocols"]
  },

  // South India
  {
    id: 9, position: [12.9716, 77.5946], name: "Bengaluru Tech & Aerospace",
    emission: "Low", impact: "Green", aqi: 85, type: "IT / Electronics",
    climateRiskType: "Drought", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Deep Rainwater Harvesting", "100% LED phase-in", "AI-optimized HVAC systems"],
    permissionStatus: "Locked (Water Depleted Zone)"
  },
  {
    id: 10, position: [13.0827, 80.2707], name: "Chennai Auto & Port Hub",
    emission: "High", impact: "Red", aqi: 150, type: "Automotive / Logis",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Wind", suitability: "Optimal",
    suggestions: ["Coastal wind turbines", "Flood resilient electricals", "Ship-shore power adaptation"]
  },
  {
    id: 11, position: [17.3850, 78.4867], name: "Hyderabad Pharma City",
    emission: "High", impact: "Red", aqi: 140, type: "Pharmaceuticals",
    climateRiskType: "Heatwave", climateRiskLevel: "Moderate",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Solvent Recovery Systems", "Hazardous Waste Incinerator Upgrades", "Large-scale solar parks"]
  },
  {
    id: 12, position: [11.0168, 76.9558], name: "Coimbatore Foundries",
    emission: "Medium", impact: "Yellow", aqi: 125, type: "Metal Casting",
    climateRiskType: "None", climateRiskLevel: "Safe",
    bestGreenTech: "Wind", suitability: "Optimal",
    suggestions: ["Induction furnace transition", "Palghat Gap wind power sourcing", "Scrap recycling optimization"]
  },
  {
    id: 13, position: [9.9312, 76.2673], name: "Kochi Port & Refinery",
    emission: "Medium", impact: "Yellow", aqi: 95, type: "Marine / Petro",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Hydro", suitability: "Viable",
    suggestions: ["Shore-to-ship power", "Wave energy pilot project", "Mangrove afforestation"],
    permissionStatus: "Locked (Eco-Sensitive Zone)"
  },

  // East India
  {
    id: 14, position: [22.5726, 88.3639], name: "Kolkata Heavy Eng. & Tannery",
    emission: "High", impact: "Red", aqi: 290, type: "Heavy Mfg / Leather",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Viable",
    suggestions: ["Chrome recovery plants", "River water quality sensors", "Electric logistics fleet"]
  },
  {
    id: 15, position: [22.8046, 86.2029], name: "Jamshedpur Steel City",
    emission: "Critical", impact: "Severe Red", aqi: 320, type: "Steel Production",
    climateRiskType: "Heatwave", climateRiskLevel: "Moderate",
    bestGreenTech: "Carbon Capture", suitability: "Optimal", // Optional fix typo later if needed, leaving as is. Actually fixing: "Optimal"
    suggestions: ["Electric Arc Furnaces (EAF)", "Carbon Capture utilization", "Slag recycling initiatives"]
  },
  {
    id: 16, position: [21.2514, 81.6296], name: "Raipur Power & Cement Hub",
    emission: "Critical", impact: "Severe Red", aqi: 340, type: "Coal Power / Cement",
    climateRiskType: "None", climateRiskLevel: "Safe",
    bestGreenTech: "Carbon Capture", suitability: "Optimal",
    suggestions: ["Flue Gas Desulfurization (FGD)", "Biomass co-firing", "Transition to renewable mix"]
  },
  {
    id: 17, position: [20.2961, 85.8245], name: "Bhubaneswar & Paradip Port",
    emission: "High", impact: "Red", aqi: 200, type: "Logistics / Mining",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Wind", suitability: "Optimal",
    suggestions: ["Cyclone resistant wind arrays", "Dust suppression at port", "Automated mineral conveyors"],
    permissionStatus: "Locked (CRZ-I Highly Sensitive)"
  },
  {
    id: 18, position: [26.1445, 91.7362], name: "Guwahati Refinery & Tea",
    emission: "Medium", impact: "Yellow", aqi: 150, type: "Agro / Petro",
    climateRiskType: "Flood", climateRiskLevel: "Severe",
    bestGreenTech: "Hydro", suitability: "Optimal",
    suggestions: ["Micro-hydro deployment", "Biomass gasification from tea waste", "Flood monitoring sensors"]
  },

  // Central India
  {
    id: 19, position: [21.1458, 79.0882], name: "Nagpur Logistics & Mining",
    emission: "High", impact: "Red", aqi: 170, type: "Mining / Logistics",
    climateRiskType: "Heatwave", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Reclaim mined land for solar", "Electrify heavy machinery", "Water stress management"]
  },
  {
    id: 20, position: [23.2599, 77.4126], name: "Bhopal Electrical & Manuf.",
    emission: "Medium", impact: "Yellow", aqi: 140, type: "Manufacturing",
    climateRiskType: "Drought", climateRiskLevel: "Moderate",
    bestGreenTech: "Solar", suitability: "Viable",
    suggestions: ["Solar rooftop industrial parks", "Groundwater conservation rules", "IoT energy metering"]
  },
  {
    id: 21, position: [26.2183, 78.1828], name: "Gwalior Stone & Mining",
    emission: "High", impact: "Red", aqi: 260, type: "Mining Extraction",
    climateRiskType: "Heatwave", climateRiskLevel: "Severe",
    bestGreenTech: "Solar", suitability: "Optimal",
    suggestions: ["Dust control mist cannons", "Renewable grid power for crushers", "Dry processing methods"],
    permissionStatus: "Locked (Aravalli Range Mining Ban)"
  }
];
