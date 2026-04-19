import { useState, useEffect } from 'react';
import { type User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './components/Login';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Shield, Leaf, Factory, Zap, TrendingDown, Layers, Activity, AlertTriangle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDIA_MOCK_DATA } from './data/mockData';

// Subcomponents
import AISimulator from './components/AISimulator';
import CarbonMarket from './components/CarbonMarket';
import ImpactDashboard from './components/ImpactDashboard';
import SellerHub from './components/SellerHub';
import { MarketProvider } from './contexts/MarketContext';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon Helpers
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}"></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createRiskIcon = (risk: string) => {
  const iconHtml = risk === 'Flood' ? '🌊' : risk === 'Heatwave' ? '🔥' : '🏜️';
  return L.divIcon({
    className: 'custom-div-icon bg-transparent border-0',
    html: `<div class="text-xl drop-shadow-md">${iconHtml}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createTechIcon = (tech: string) => {
  const isSolar = tech === 'Solar';
  const isWind = tech === 'Wind';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="background-color: #111; width: 24px; height: 24px; border-radius: 6px; border: 1px solid #39FF14; display:flex; align-items:center; justify-content:center; color:#39FF14; font-size:12px; font-weight:bold;">
        ${isSolar ? '☀️' : isWind ? '🌪️' : '🔋'}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

const createRegulationIcon = (status: string) => {
  const isLocked = status.includes('Locked');
  return L.divIcon({
    className: 'custom-div-icon bg-transparent border-0',
    html: `<div style="font-size: 24px; filter: drop-shadow(0 0 5px ${isLocked ? 'red' : 'yellow'});">${isLocked ? '⛔' : '🚧'}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function MapZoomController() {
  const map = useMap();
  useEffect(() => {
    // Start wide, zoom into India
    setTimeout(() => {
      map.flyTo([22.5937, 78.9629], 5, { duration: 2.5 });
    }, 500);
  }, [map]);
  return null;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'map' | 'simulate' | 'market' | 'dashboard' | 'seller'>('map');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Layer states
  const [showEmissions, setShowEmissions] = useState(true);
  const [showAQI, setShowAQI] = useState(false);
  const [showRisks, setShowRisks] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [showRegulations, setShowRegulations] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Global AQI calculation simply for the top bar based on mock data
  const avgAqi = Math.round(INDIA_MOCK_DATA.reduce((acc, curr) => acc + curr.aqi, 0) / INDIA_MOCK_DATA.length);

  if (authChecking) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(57,255,20,0.5)]"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <MarketProvider>
      <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="w-72 glass-panel border-r border-white/10 flex flex-col z-50 absolute md:relative h-full"
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <Shield className="w-8 h-8 text-primary shadow-[0_0_10px_rgba(57,255,20,0.5)] rounded-full" />
          <div>
            <h1 className="text-xl font-bold tracking-wider neon-text font-mono">CLIMATEGUARD</h1>
            <p className="text-xs text-primary/70 tracking-widest uppercase">Planetary Command</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<Activity size={18} />} label="Eco-Map Data" />
          <NavButton active={activeTab === 'simulate'} onClick={() => setActiveTab('simulate')} icon={<Factory size={18} />} label="AI Simulator" />
          <NavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Leaf size={18} />} label="Carbon Market" />
          <NavButton active={activeTab === 'seller'} onClick={() => setActiveTab('seller')} icon={<Briefcase size={18} />} label="Seller Hub" />
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<TrendingDown size={18} />} label="Impact Dashboard" />

          {activeTab === 'map' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider flex items-center gap-2">
                <Layers size={14} /> Map Layers
              </h3>
              <div className="space-y-3 bg-black/30 p-4 rounded-lg border border-white/5">
                <ToggleSwitch label="Industrial Emissions" active={showEmissions} onChange={() => setShowEmissions(!showEmissions)} />
                <ToggleSwitch label="Air Quality Index (AQI)" active={showAQI} onChange={() => setShowAQI(!showAQI)} />
                <ToggleSwitch label="Climate Risks" active={showRisks} onChange={() => setShowRisks(!showRisks)} />
                <ToggleSwitch label="Green Tech Suitability" active={showTech} onChange={() => setShowTech(!showTech)} />
                <ToggleSwitch label="Regulations / Restricted" active={showRegulations} onChange={() => setShowRegulations(!showRegulations)} />
              </div>
            </motion.div>
          )}

          <div className="mt-auto pt-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-primary mb-1">Global Offset</h4>
              <div className="text-2xl font-mono font-bold text-white">12.4M <span className="text-sm text-gray-400">Tons</span></div>
            </div>
            <button 
              onClick={() => signOut(auth)}
              className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-wider py-3 rounded-md hover:bg-red-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col min-w-0">

        {/* Top bar overlay for Map */}
        {activeTab === 'map' && (
          <div className="absolute top-4 left-4 right-4 z-[400] flex justify-between items-start pointer-events-none">
            <button
              className="md:hidden glass-panel p-2 rounded-md pointer-events-auto border border-white/20"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Layers className="text-primary" />
            </button>
            <div className="glass-panel px-6 py-3 rounded-full flex gap-8 pointer-events-auto shadow-2xl border border-white/10 ml-auto backdrop-blur-md bg-black/60">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase text-gray-400 font-bold">India Avg AQI</span>
                <span className={`text-sm font-mono font-bold ${avgAqi > 200 ? 'text-red-400' : 'text-yellow-400'}`}>{avgAqi}</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10 pl-6">
              <span className="text-[10px] uppercase text-gray-400 font-bold">Active Nodes</span>
              <span className="text-sm font-mono font-bold text-primary">{INDIA_MOCK_DATA.length}</span>
            </div>
          </div>
          </div>
        )}

        <div className="flex-1 bg-zinc-900 relative overflow-hidden">
          <AnimatePresence mode="wait">
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full absolute inset-0"
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
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapZoomController />

                {INDIA_MOCK_DATA.map((loc) => {
                  // Emissions Layer Logic (Grey if Locked)
                  const isLocked = loc.permissionStatus?.includes('Locked');
                  const emColor = isLocked 
                      ? '#6b7280' 
                      : loc.emission === 'High' || loc.emission === 'Critical' ? '#ef4444' : loc.emission === 'Medium' ? '#eab308' : '#39FF14';

                  // AQI Layer Logic
                  const aqiColor = loc.aqi > 300 ? '#7f1d1d' : loc.aqi > 200 ? '#b91c1c' : loc.aqi > 100 ? '#d97706' : '#15803d';

                  return (
                    <div key={loc.id}>
                      {/* 1. AQI Heatmap Simulation Layer */}
                      {showAQI && (
                        <CircleMarker
                          center={loc.position}
                          radius={Math.min(loc.aqi / 5, 80)}
                          pathOptions={{ fillColor: aqiColor, fillOpacity: 0.3, color: 'transparent' }}
                        />
                      )}

                      {/* 2. Primary Emissions Marker Layer */}
                      {(showEmissions || (!showAQI && !showRisks && !showTech && !showRegulations)) && (
                        <Marker position={loc.position} icon={createCustomIcon(emColor)}>
                          <SharedPopup loc={loc} emColor={emColor} />
                        </Marker>
                      )}

                      {/* 3. Climate Risks Layer */}
                      {showRisks && loc.climateRiskLevel !== 'Safe' && loc.climateRiskType !== 'None' && (
                        <Marker position={[loc.position[0] - 0.1, loc.position[1] + 0.1]} icon={createRiskIcon(loc.climateRiskType)}>
                          <SharedPopup loc={loc} emColor={emColor} />
                        </Marker>
                      )}

                      {/* 4. Green Tech Suitability Layer */}
                      {showTech && loc.suitability === 'Optimal' && (
                        <Marker position={[loc.position[0] + 0.1, loc.position[1] - 0.1]} icon={createTechIcon(loc.bestGreenTech)}>
                          <SharedPopup loc={loc} emColor={emColor} />
                        </Marker>
                      )}

                      {/* 5. Regulations Layer */}
                      {showRegulations && loc.permissionStatus && (
                        <Marker position={[loc.position[0] - 0.1, loc.position[1] - 0.1]} icon={createRegulationIcon(loc.permissionStatus)}>
                          <SharedPopup loc={loc} emColor={emColor} />
                        </Marker>
                      )}
                    </div>
                  )
                })}
              </MapContainer>
            </motion.div>
          )}

          {activeTab === 'simulate' && (
            <motion.div key="simulate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
              <AISimulator />
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
              <CarbonMarket />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
              <ImpactDashboard />
            </motion.div>
          )}

          {activeTab === 'seller' && (
            <motion.div key="seller" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
              <SellerHub />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
    </div>
    </MarketProvider>
  );
}

// Extracted popup to avoid repeating code
function SharedPopup({ loc, emColor }: { loc: any, emColor: string }) {
  return (
    <Popup className="custom-popup" minWidth={300}>
      <div className="p-1">
        <h3 className="font-bold text-lg mb-1">{loc.name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded border bg-black/40" style={{ borderColor: emColor, color: emColor }}>
            Emissions: {loc.emission}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded border bg-black/40 ${loc.aqi > 200 ? 'border-red-500 text-red-500' : 'border-yellow-500 text-yellow-500'}`}>
          AQI: {loc.aqi}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 bg-black/30 p-2 rounded border border-white/5">
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Industry</p>
          <p className="text-xs font-semibold">{loc.type}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Climate Risk</p>
          <p className="text-xs font-semibold">{loc.climateRiskType} ({loc.climateRiskLevel})</p>
        </div>
      </div>

      {loc.permissionStatus && (
         <div className={`mb-3 flex items-center justify-center p-1.5 rounded text-[10px] font-bold uppercase tracking-wider text-center ${loc.permissionStatus.includes('Locked') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
           <AlertTriangle size={12} className="mr-1" />
           {loc.permissionStatus}
         </div>
      )}

      <div className="mb-2">
        <p className="text-[10px] text-primary font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
          <Zap size={12} /> AI Gen Recommendations
        </p>
        <ul className="text-xs space-y-1.5 text-gray-300 bg-white/5 p-2 rounded">
          {loc.suggestions.map((sug: string, i: number) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-primary mt-0.5">•</span> {sug}
            </li>
          ))}
        </ul>
      </div>

      {loc.suitability === 'Optimal' && (
        <div className="mt-3 text-[10px] text-green-400 bg-green-400/10 p-2 rounded text-center border border-green-400/20">
          Optimal Zone for <strong className="uppercase">{loc.bestGreenTech}</strong> Deployment
        </div>
      )}
    </div>
    </Popup >
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left ${
        active 
          ? 'bg-primary/10 text-primary border border-primary/30 shadow-[inset_0_0_10px_rgba(57,255,20,0.1)]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      {icon}
      <span className="font-semibold text-sm tracking-wide">{label}</span>
      {active && <div className="ml-auto w-1.5 h-4 bg-primary rounded-full shadow-[0_0_5px_rgba(57,255,20,0.8)]"></div>}
    </button>
  );
}

function ToggleSwitch({ label, active, onChange }: { label: string, active: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{label}</div>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={active} onChange={onChange} />
        <div className={`block w-9 h-5 rounded-full transition-colors border ${active ? 'bg-primary/30 border-primary' : 'bg-gray-800 border-gray-600'}`}></div>
        <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${active ? 'transform translate-x-4 bg-primary shadow-[0_0_5px_rgba(57,255,20,0.8)]' : 'bg-gray-400'}`}></div>
      </div>
    </label>
  );
}

export default App;
