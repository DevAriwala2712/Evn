import React, { createContext, useContext, useState } from 'react';

export type Project = {
  id: number;
  title: string;
  seller: string;
  location: string;
  type: string;
  price: number;
  available: number;
  img: string;
  standard: string;
  vintage: string;
  sdg: string[];
  impactDepth: string;
  riskRating: string;
};

const INITIAL_PROJECTS: Project[] = [
  { 
    id: 1, title: 'Bhadla Solar Park Expansion', seller: 'GreenPower India Ltd.', 
    location: 'Rajasthan', type: 'Renewable', price: 12.50, available: 45000, 
    img: 'https://images.unsplash.com/photo-1509391366360-128c52081577?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2024', sdg: ['7', '13'],
    impactDepth: 'Displaces 150k tons of coal usage per year. Creates 200 clean energy jobs.',
    riskRating: 'AAA',
  },
  { 
    id: 2, title: 'Sundarbans Mangrove Protection', seller: 'EcoCoast NGO', 
    location: 'West Bengal', type: 'Forestry', price: 18.20, available: 12000, 
    img: 'https://images.unsplash.com/photo-1615555437887-b95b8ddb2935?auto=format&fit=crop&q=80&w=600', 
    standard: 'Gold Standard', vintage: '2023', sdg: ['13', '14', '15'],
    impactDepth: 'Protects 500+ endangered species. Enhances coastal resilience against cyclones.',
    riskRating: 'A+',
  },
  { 
    id: 3, title: 'Muppandal Wind Farm Direct A', seller: 'Suzlon Energy Group', 
    location: 'Tamil Nadu', type: 'Renewable', price: 11.00, available: 89000, 
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2024', sdg: ['7', '9', '13'],
    impactDepth: 'Powers 1.2M households. 0% land conflict footprint.',
    riskRating: 'AA+',
  },
  { 
    id: 4, title: 'Bihar Biomass Cooking Stoves', seller: 'Rural Uplift Org', 
    location: 'Bihar', type: 'Community', price: 8.50, available: 150000, 
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', 
    standard: 'Gold Standard', vintage: '2022', sdg: ['3', '5', '13'],
    impactDepth: 'Improves respiratory health for 50,000 women. Saves 30 hours of firewood collection/month.',
    riskRating: 'A-',
  },
  { 
    id: 5, title: 'Direct Air Capture Plant 01', seller: 'AtmosTech Startups', 
    location: 'Gujarat', type: 'Tech/CCS', price: 245.00, available: 1200, 
    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600', 
    standard: 'Puro.earth', vintage: '2025', sdg: ['9', '13'],
    impactDepth: 'Direct removal from atmosphere with absolute permanence (geological storage).',
    riskRating: 'AAA',
  },
  { 
    id: 6, title: 'Western Ghats Afforestation', seller: 'Kerala Forest Dev Co.', 
    location: 'Kerala', type: 'Forestry', price: 15.75, available: 34000, 
    img: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2023', sdg: ['13', '15'],
    impactDepth: 'Restores critical elephant corridors. Plants 30+ native species of high biodiversity.',
    riskRating: 'AA',
  },
];

interface MarketContextType {
  projects: Project[];
  addProject: (p: Project) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  const addProject = (p: Project) => {
    // We unshift/prepend so it shows up first!
    setProjects(prev => [p, ...prev]);
  };

  return (
    <MarketContext.Provider value={{ projects, addProject }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within MarketProvider");
  return context;
}
