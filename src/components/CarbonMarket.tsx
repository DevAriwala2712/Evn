import { Leaf, Search, Filter, ShoppingCart } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'Bhadla Solar Park Expansion', location: 'Rajasthan, India', type: 'Renewable', price: 12.50, available: 45000, img: 'https://images.unsplash.com/photo-1509391366360-128c52081577?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Sundarbans Mangrove Protection', location: 'West Bengal, India', type: 'Nature/Forestry', price: 18.20, available: 12000, img: 'https://images.unsplash.com/photo-1615555437887-b95b8ddb2935?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Muppandal Wind Farm Direct A', location: 'Tamil Nadu, India', type: 'Renewable', price: 11.00, available: 89000, img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Bihar Biomass Cooking Stoves', location: 'Bihar, India', type: 'Community', price: 8.50, available: 150000, img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Direct Air Capture Plant 01', location: 'Gujarat, India', type: 'Tech/CCS', price: 245.00, available: 1200, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600' },
  { id: 6, title: 'Western Ghats Afforestation', location: 'Kerala, India', type: 'Nature/Forestry', price: 15.75, available: 34000, img: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600' }
];

export default function CarbonMarket() {
  return (
    <div className="w-full h-full text-white bg-zinc-900 overflow-y-auto p-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-bold font-mono tracking-wider flex items-center gap-3">
              <Leaf size={28} className="text-primary" /> VERIFIED CREDITS
            </h2>
            <p className="text-gray-400 mt-2">Invest in high-quality, verified carbon offset projects.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Search projects..." className="bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-primary" />
            </div>
            <button className="glass-panel px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm hover:border-primary transition-colors">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="glass-panel border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30">
                  {proj.type}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{proj.title}</h3>
                <p className="text-xs text-gray-400 mb-4">{proj.location}</p>
                
                <div className="flex justify-between items-center mb-6 mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Price per Ton</p>
                    <p className="text-xl font-mono text-white">${proj.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Available</p>
                    <p className="text-sm font-mono text-primary">{proj.available.toLocaleString()} tCO₂e</p>
                  </div>
                </div>

                <button className="w-full bg-white/5 hover:bg-primary hover:text-black text-white py-2 rounded border border-white/10 hover:border-primary transition-all font-bold text-sm tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                  <ShoppingCart size={16} /> BUY CREDITS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
