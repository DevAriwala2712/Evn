import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Shield, Leaf, Wind, Sun, AlertTriangle, Layers, Activity, Factory, Zap, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Node Icon (Futuristic)
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}"></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const MOCK_DATA = [
  {
    id: 1, position: [28.6139, 77.2090] as [number, number], name: "Delhi Ind. Zone A",
    emission: "High", impact: "Severe Red", aqi: 350, type: "Heavy Manufacturing",
    suggestions: ["Install Electrostatic Precipitators", "Plant Neem & Banyan (PM2.5 Absorbers)", "Deploy Solar Array (Est. ROI: 2.3y)"]
  },
  {
    id: 2, position: [19.0760, 72.8777] as [number, number], name: "Mumbai Petro-Chem Hub",
    emission: "Critical", impact: "Red", aqi: 180, type: "Chemical Processing",
    suggestions: ["Implement Carbon Capture (CCS)", "Mangrove buffer zone restoration", "Wind turbine auxiliary power"]
  },
  {
    id: 3, position: [12.9716, 77.5946] as [number, number], name: "Bengaluru Tech Park",
    emission: "Low", impact: "Green", aqi: 65, type: "IT / Electronics",
    suggestions: ["Expand Green Roofs", "Rainwater Harvesting mandates", "100% LED transitioning"]
  },
  {
    id: 4, position: [23.0225, 72.5714] as [number, number], name: "Ahmedabad Textile Mills",
    emission: "Medium", impact: "Yellow", aqi: 210, type: "Textile",
    suggestions: ["Effluent Treatment Plant Upgrade", "Solar thermal for heating", "Plant Peepal trees"]
  }
];

function MapZoomController() {
  const map = useMap();
  useEffect(() => {
    // Start wide, zoom into India after a short delay
    setTimeout(() => {
      map.flyTo([22.5937, 78.9629], 5, {
        duration: 3
      });
    }, 1000);
  }, [map]);
  return null;
}

function App() {
  const [activeTab, setActiveTab] = useState<'map'|'simulate'|'market'|'dashboard'>('map');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="w-72 glass-panel border-r border-white/10 flex flex-col z-50 absolute md:relative h-full"
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold tracking-wider neon-text font-mono">CLIMATEGUARD</h1>
            <p className="text-xs text-primary/70 tracking-widest uppercase">Planetary Command</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<Activity size={18}/>} label="Eco-Map Data" />
          <NavButton active={activeTab === 'simulate'} onClick={() => setActiveTab('simulate')} icon={<Factory size={18}/>} label="AI Simulator" />
          <NavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Leaf size={18}/>} label="Carbon Market" />
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<TrendingDown size={18}/>} label="Impact Dashboard" />

          <div className="mt-8">
            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">Map Layers</h3>
            <div className="space-y-3">
              <ToggleSwitch label="Industrial Emissions" active />
              <ToggleSwitch label="Air Quality Index (AQI)" active={false} />
              <ToggleSwitch label="Climate Risks (Drought)" active={false} />
              <ToggleSwitch label="Green Tech Suitability" active={false} />
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-primary mb-1">Total Offset</h4>
              <div className="text-2xl font-mono font-bold">12.4M Tons</div>
              <p className="text-xs text-gray-400 mt-1">CO₂ equivalent recovered</p>
            </div>
            <button className="w-full bg-primary text-black font-bold uppercase tracking-wider py-3 rounded-md hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(57,255,20,0.4)]">
              Get Started
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Top bar overlay for Map */}
        {activeTab === 'map' && (
          <div className="absolute top-4 left-4 right-4 z-[400] flex justify-between items-start pointer-events-none">
            <button 
              className="md:hidden glass-panel p-2 rounded-md pointer-events-auto"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Layers className="text-primary" />
            </button>
            <div className="glass-panel px-6 py-3 rounded-full flex gap-8 pointer-events-auto shadow-2xl border border-white/5 ml-auto">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase text-gray-400 font-bold">Global AQI</span>
                <span className="text-sm font-mono font-bold text-yellow-400">Moderate</span>
              </div>
              <div className="flex flex-col items-center border-l border-white/10 pl-6">
                <span className="text-[10px] uppercase text-gray-400 font-bold">Active Sensors</span>
                <span className="text-sm font-mono font-bold text-primary">14,392</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 bg-zinc-900 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <MapContainer 
                  center={[20, 0]} 
                  zoom={2} 
                  className="w-full h-full z-0 font-sans"
                  zoomControl={false}
                  maxBounds={[[-90, -180], [90, 180]]}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <MapZoomController />
                  
                  {MOCK_DATA.map((loc) => {
                    const color = loc.emission === 'High' || loc.emission === 'Critical' ? '#ef4444' : loc.emission === 'Medium' ? '#eab308' : '#39FF14';
                    return (
                      <Marker 
                        key={loc.id} 
                        position={loc.position}
                        icon={createCustomIcon(color)}
                      >
                        <Popup className="custom-popup" minWidth={280}>
                          <div className="p-1">
                            <h3 className="font-bold text-lg mb-1">{loc.name}</h3>
                            <div className="flex gap-2 mb-3">
                              <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: color, color: color }}>
                                Impact: {loc.impact}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-500 text-gray-300">
                                AQI: {loc.aqi}
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-xs text-gray-400 mb-1">Area Type</p>
                              <p className="text-sm border-l-2 pl-2" style={{ borderColor: color }}>{loc.type}</p>
                            </div>

                            <div>
                              <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
                                <Zap size={10} /> AI Recommendations
                              </p>
                              <ul className="text-xs space-y-1 text-gray-300">
                                {loc.suggestions.map((sug, i) => (
                                  <li key={i} className="flex gap-2 items-start">
                                    <span className="text-primary mt-0.5">•</span> {sug}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    )
                  })}
                </MapContainer>
              </motion.div>
            )}

            {activeTab !== 'map' && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-full overflow-y-auto p-12"
              >
                <div className="max-w-4xl mx-auto space-y-8">
                  <h2 className="text-4xl font-bold font-mono uppercase tracking-wider">
                    {activeTab === 'simulate' ? 'Industrial AI Simulator' : 
                     activeTab === 'market' ? 'Carbon Credit Marketplace' : 
                     'Impact Dashboard'}
                  </h2>
                  <div className="glass-panel p-8 rounded-xl border border-white/10 text-gray-300">
                    <p className="mb-4">This view maps to the Phase 2 implementation of the feature: <strong className="text-white uppercase">{activeTab}</strong>.</p>
                    <p>Current plan matches prompt specs:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li><strong>AI Simulator:</strong> Select regions to see optimal new factory zones or upgrade ROI.</li>
                      <li><strong>Marketplace:</strong> List available credits, integrated with GetBags SDK for crypto/card purchases.</li>
                      <li><strong>Dashboards:</strong> Gamified logic for personal users and footprint tracking for enterprises.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left ${
        active 
          ? 'bg-white/10 text-primary border border-primary/30 shadow-[inset_0_0_10px_rgba(57,255,20,0.1)]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

function ToggleSwitch({ label, active }: { label: string, active: boolean }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={active} readOnly />
        <div className={`block w-10 h-6 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-gray-700'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-black w-4 h-4 rounded-full transition-transform ${active ? 'transform translate-x-4' : ''}`}></div>
      </div>
      <div className="ml-3 text-xs font-medium text-gray-300">{label}</div>
    </label>
  );
}

export default App;
