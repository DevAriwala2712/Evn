import { useState } from 'react';
import { Leaf, Search, Filter, ShoppingCart, Wallet, ShieldCheck, TreePine, Droplets, Zap } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'Bhadla Solar Park Expansion', location: 'Rajasthan, India', type: 'Renewable', price: 12.50, available: 45000, img: 'https://images.unsplash.com/photo-1509391366360-128c52081577?auto=format&fit=crop&q=80&w=600', standard: 'Verra Verified', vintage: '2024', sdg: ['7', '13'] },
  { id: 2, title: 'Sundarbans Mangrove Protection', location: 'West Bengal, India', type: 'Forestry', price: 18.20, available: 12000, img: 'https://images.unsplash.com/photo-1615555437887-b95b8ddb2935?auto=format&fit=crop&q=80&w=600', standard: 'Gold Standard', vintage: '2023', sdg: ['13', '14', '15'] },
  { id: 3, title: 'Muppandal Wind Farm Direct A', location: 'Tamil Nadu, India', type: 'Renewable', price: 11.00, available: 89000, img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600', standard: 'Verra Verified', vintage: '2024', sdg: ['7', '9', '13'] },
  { id: 4, title: 'Bihar Biomass Cooking Stoves', location: 'Bihar, India', type: 'Community', price: 8.50, available: 150000, img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', standard: 'Gold Standard', vintage: '2022', sdg: ['3', '5', '13'] },
  { id: 5, title: 'Direct Air Capture Plant 01', location: 'Gujarat, India', type: 'Tech/CCS', price: 245.00, available: 1200, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600', standard: 'Puro.earth', vintage: '2025', sdg: ['9', '13'] },
  { id: 6, title: 'Western Ghats Afforestation', location: 'Kerala, India', type: 'Forestry', price: 15.75, available: 34000, img: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600', standard: 'Verra Verified', vintage: '2023', sdg: ['13', '15'] },
  { id: 7, title: 'Rewa Ultra Mega Solar', location: 'Madhya Pradesh, India', type: 'Renewable', price: 10.50, available: 115000, img: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=600', standard: 'Gold Standard', vintage: '2024', sdg: ['7', '8', '13'] },
  { id: 8, title: 'Jamshedpur Slag Recycling', location: 'Jharkhand, India', type: 'Industrial', price: 22.00, available: 18000, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', standard: 'Verra Verified', vintage: '2023', sdg: ['9', '12', '13'] },
  { id: 9, title: 'Andhra Geothermal Pilot', location: 'Andhra Pradesh, India', type: 'Renewable', price: 14.80, available: 5400, img: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600', standard: 'Gold Standard', vintage: '2025', sdg: ['7', '13'] }
];

export default function CarbonMarket() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [walletConnected, setWalletConnected] = useState(false);
  const [cart, setCart] = useState(0);

  const filters = ['All', 'Renewable', 'Forestry', 'Tech/CCS', 'Community', 'Industrial'];
  const displayedProjects = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === activeFilter);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Forestry': return <TreePine size={12} className="mr-1" />;
      case 'Renewable': return <Zap size={12} className="mr-1" />;
      default: return <Droplets size={12} className="mr-1" />;
    }
  };

  return (
    <div className="w-full h-full text-white bg-zinc-900 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
      
      {/* Top Banner & Wallet Widget */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-black/40 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-md">
         <div>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-wider flex items-center gap-3">
              <Leaf size={28} className="text-primary" /> VERIFIED CREDITS
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Invest in high-quality, verified carbon offset projects.</p>
         </div>
         <div className="mt-4 md:mt-0 flex gap-4 items-center">
            <div className="glass-panel px-4 py-2 rounded-full border border-white/10 flex flex-col items-end">
               <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Cart Balance</span>
               <span className="text-lg font-mono text-white flex items-center gap-2">
                 <ShoppingCart size={14} className="text-primary" /> {cart} <span className="text-xs text-gray-500">tCO₂e</span>
               </span>
            </div>
            <button 
              onClick={() => setWalletConnected(!walletConnected)}
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 border ${walletConnected ? 'bg-primary/20 text-primary border-primary shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'}`}
            >
              <Wallet size={16} />
              {walletConnected ? '0x8A...3F9' : 'Connect Wallet'}
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-full border border-white/5 overflow-x-auto w-full lg:w-auto scrollbar-hide">
            {filters.map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${activeFilter === filter ? 'bg-primary text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Search projects..." className="bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm w-full lg:w-64 focus:outline-none focus:border-primary" />
            </div>
            <button className="glass-panel px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm hover:border-primary transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {displayedProjects.map((proj) => (
            <div key={proj.id} className="glass-panel border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] group flex flex-col bg-zinc-900/80">
              <div className="h-40 overflow-hidden relative">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 flex items-center">
                  {getIconForType(proj.type)} {proj.type}
                </div>
                {/* SDG badging */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {proj.sdg.map(num => (
                     <span key={num} className="w-5 h-5 flex items-center justify-center bg-white text-black font-bold text-[8px] rounded-sm">
                       SDG{num}
                     </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                   <ShieldCheck size={12} className="text-blue-400" />
                   <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{proj.standard}</span>
                   <span className="text-[10px] text-gray-500 ml-auto border border-gray-700 px-1.5 rounded bg-black/30">VINTAGE {proj.vintage}</span>
                </div>

                <h3 className="font-bold text-md mb-1 leading-tight text-white group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-xs text-gray-400 mb-4">{proj.location}</p>
                
                <div className="flex justify-between items-center mb-5 mt-auto bg-black/40 p-2 rounded-lg border border-white/5">
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Price / tCO₂e</p>
                    <p className="text-xl font-mono text-white leading-none">${proj.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Available</p>
                    <p className="text-sm font-mono text-primary leading-none">{proj.available.toLocaleString()}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setCart(cart + Math.floor(Math.random() * 50) + 10)}
                  className="w-full bg-white/5 hover:bg-primary hover:text-black text-white py-2.5 rounded border border-white/10 hover:border-primary transition-all font-bold text-xs tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                >
                  <ShoppingCart size={14} /> ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
