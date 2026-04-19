import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot, addDoc, query, orderBy, writeBatch, doc } from 'firebase/firestore';

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
    id: 15, title: 'Gujarati Marine Blue Carbon', seller: 'Oceanic Renewables Co.', 
    location: 'Gujarat', type: 'Forestry', price: 28.50, available: 18000, 
    img: 'https://images.unsplash.com/photo-1582967205106-931665a3962b?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2025', sdg: ['13', '14'],
    impactDepth: 'Restoration of 400 hectares of seagrass meadows. Absorbs carbon 35x faster than tropical forests.',
    riskRating: 'AAA'
  },
  { 
    id: 14, title: 'Punjab Crop Residue Biochar', seller: 'Agri-Owner / Coop', 
    location: 'Punjab', type: 'Tech/CCS', price: 45.00, available: 5000, 
    img: 'https://images.unsplash.com/photo-1592982537447-6f272a81878f?auto=format&fit=crop&q=80&w=600', 
    standard: 'Puro.earth', vintage: '2024', sdg: ['2', '13', '15'],
    impactDepth: 'Converts 20,000 tons of stubble burning waste into stable biochar, permanently locking carbon into the soil for 100+ years.',
    riskRating: 'A+'
  },
  { 
    id: 13, title: 'Jharkhand Steel Waste-Heat Recovery', seller: 'Tata Energy Efficiencies', 
    location: 'Jharkhand', type: 'Renewable', price: 9.80, available: 125000, 
    img: 'https://images.unsplash.com/photo-1587578278276-8f3fe7b875ea?auto=format&fit=crop&q=80&w=600', 
    standard: 'Gold Standard', vintage: '2023', sdg: ['7', '9', '12'],
    impactDepth: 'Captures factory exhaust heat to generate 40MW of clean electricity. Displaces massive local grid coal consumption.',
    riskRating: 'AA+'
  },
  { 
    id: 12, title: 'Himalayan Hydropower Upgrades', seller: 'Uttarakhand Rivers Auth', 
    location: 'Uttarakhand', type: 'Renewable', price: 11.20, available: 95000, 
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2025', sdg: ['7', '13'],
    impactDepth: 'Upgrades 3 existing hydro facilities to increase output efficiency without any new dam constructions.',
    riskRating: 'AA'
  },
  { 
    id: 11, title: 'Madhya Pradesh Reforestation Grid', seller: 'Global Green Forests', 
    location: 'Madhya Pradesh', type: 'Forestry', price: 14.00, available: 62000, 
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600', 
    standard: 'Gold Standard', vintage: '2022', sdg: ['15', '13'],
    impactDepth: 'Rehabilitates 12,000 acres of degraded mining land. Employs 800+ locals in conservation tracking.',
    riskRating: 'A'
  },
  { 
    id: 10, title: 'Delhi EV Fleet Transition', seller: 'Urban Delivery Logistics', 
    location: 'Delhi NCR', type: 'Tech/CCS', price: 32.50, available: 8500, 
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2025', sdg: ['11', '13'],
    impactDepth: 'Transitions 5,000 diesel delivery trucks to electric, drastically improving local AQI.',
    riskRating: 'AAA'
  },
  { 
    id: 9, title: 'Arunachal Bamboo Carbon Sink', seller: 'NE AgriTech Consortium', 
    location: 'Arunachal Pradesh', type: 'Forestry', price: 7.50, available: 200000, 
    img: 'https://images.unsplash.com/photo-1492534513006-3a5e86c12c75?auto=format&fit=crop&q=80&w=600', 
    standard: 'GCC', vintage: '2023', sdg: ['1', '8', '15'],
    impactDepth: 'Cultivates giant bamboo varieties that sequester carbon 4x faster than hardwoods. Creates scalable handicraft economy.',
    riskRating: 'A-'
  },
  { 
    id: 8, title: 'Maharashtra Plasma Gasification', seller: 'Mumbai Waste Boards', 
    location: 'Maharashtra', type: 'Tech/CCS', price: 85.00, available: 3000, 
    img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600', 
    standard: 'Puro.earth', vintage: '2026', sdg: ['9', '11', '12'],
    impactDepth: 'Turns unrecyclable municipal landfill waste into synthetic gas and glassy slag without atmospheric emissions.',
    riskRating: 'AA'
  },
  { 
    id: 7, title: 'Odisha Community Biogas', seller: 'Rural Uplift Org', 
    location: 'Odisha', type: 'Community', price: 5.50, available: 320000, 
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600', 
    standard: 'Gold Standard', vintage: '2021', sdg: ['3', '7'],
    impactDepth: 'Installs family-sized biogas digesters using cow dung. Replaces harmful indoor wood cooking entirely.',
    riskRating: 'A+'
  },
  { 
    id: 6, title: 'Western Ghats Afforestation', seller: 'Kerala Forest Dev Co.', 
    location: 'Kerala', type: 'Forestry', price: 15.75, available: 34000, 
    img: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2023', sdg: ['13', '15'],
    impactDepth: 'Restores critical elephant corridors. Plants 30+ native species of high biodiversity.',
    riskRating: 'AA',
  },
  { 
    id: 5, title: 'Direct Air Capture Plant 01', seller: 'AtmosTech Startups', 
    location: 'Gujarat', type: 'Tech/CCS', price: 245.00, available: 1200, 
    img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?auto=format&fit=crop&q=80&w=600', 
    standard: 'Puro.earth', vintage: '2025', sdg: ['9', '13'],
    impactDepth: 'Direct removal from atmosphere with absolute permanence (geological storage).',
    riskRating: 'AAA',
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
    id: 3, title: 'Muppandal Wind Farm Direct A', seller: 'Suzlon Energy Group', 
    location: 'Tamil Nadu', type: 'Renewable', price: 11.00, available: 89000, 
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2024', sdg: ['7', '9', '13'],
    impactDepth: 'Powers 1.2M households. 0% land conflict footprint.',
    riskRating: 'AA+',
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
    id: 1, title: 'Bhadla Solar Park Expansion', seller: 'GreenPower India Ltd.', 
    location: 'Rajasthan', type: 'Renewable', price: 12.50, available: 45000, 
    img: 'https://images.unsplash.com/photo-1509391366360-128c52081577?auto=format&fit=crop&q=80&w=600', 
    standard: 'Verra', vintage: '2024', sdg: ['7', '13'],
    impactDepth: 'Displaces 150k tons of coal usage per year. Creates 200 clean energy jobs.',
    riskRating: 'AAA',
  }
];

interface MarketContextType {
  projects: Project[];
  addProject: (p: Project) => Promise<void>;
  dbReady: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('id', 'desc'));
    
    let isSeeding = false;
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty && !isSeeding) {
        // Seed initial data if the database happens to be completely empty
        isSeeding = true;
        try {
          const batch = writeBatch(db);
          const colRef = collection(db, 'projects');
          INITIAL_PROJECTS.forEach(p => {
            const newDoc = doc(colRef);
            batch.set(newDoc, p);
          });
          await batch.commit();
        } catch (e) {
          console.error("Failed seeding database:", e);
        }
      } else {
        const liveProjects = snapshot.docs.map(doc => doc.data() as Project);
        setProjects(liveProjects);
        setDbReady(true);
      }
    }, (err) => {
      console.error("Firestore sync error:", err);
    });

    return () => unsubscribe();
  }, []);
  
  const addProject = async (p: Project) => {
    try {
      await addDoc(collection(db, 'projects'), p);
    } catch (e) {
      console.error("Failed adding to Firestore:", e);
      throw e;
    }
  };

  return (
    <MarketContext.Provider value={{ projects, addProject, dbReady }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within MarketProvider");
  return context;
}
