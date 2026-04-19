import { useState, useMemo } from 'react';
import { Leaf, Search, Filter, ShoppingCart, Wallet, ShieldCheck, TreePine, Droplets, Zap, CheckSquare, Square, X, BarChart2, ShieldAlert } from 'lucide-react';
import { useCompare } from '../hooks/useCompare';
import { useCart } from '../hooks/useCart';

import { useMarket } from '../contexts/MarketContext';

export default function CarbonMarket() {
  const { projects } = useMarket();
  const { cartItems, addToCart, getTotalCredits, getTotalCost } = useCart();
  const { compareList, toggleCompare, clearCompare } = useCompare();

  const [walletConnected, setWalletConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filters
  const displayedProjects = useMemo(() => {
    return projects.filter(p => 
      (activeCategory === 'All' || p.type === activeCategory) &&
      p.price <= maxPrice &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, activeCategory, maxPrice, searchTerm]);

  // Comparison logic
  const comparedProjects = projects.filter(p => compareList.includes(p.id));
  const cheapestComparePrice = comparedProjects.length > 0 ? Math.min(...comparedProjects.map(p => p.price)) : 0;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Forestry': return <TreePine size={12} className="mr-1" />;
      case 'Renewable': return <Zap size={12} className="mr-1" />;
      default: return <Droplets size={12} className="mr-1" />;
    }
  };

  const handleCheckoutAggregate = () => {
     alert(`Simulated checkout for ${getTotalCredits().toLocaleString()} tCO2e across ${cartItems.length} organizations. Total Cost: $${getTotalCost().toFixed(2)}\n\n(A real checkout would span GetBags SDK or Stripe Web3 infrastructure here)`);
  };

  return (
    <div className="w-full h-full text-white bg-zinc-900 overflow-y-auto relative custom-scrollbar flex flex-col">
      
      {/* Top Banner & Wallet Widget */}
      <div className="flex-none p-4 md:p-8 pb-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center bg-black/40 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-md">
           <div>
              <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-wider flex items-center gap-3">
                <Leaf size={28} className="text-primary" /> MULTI-VENDOR MARKETPLACE
              </h2>
              <p className="text-gray-400 mt-2 text-sm">Compare and aggregate credits from verified global sellers.</p>
           </div>
           <div className="mt-4 md:mt-0 flex gap-4 items-center">
              <div className="glass-panel px-4 py-2 rounded-full border border-white/10 flex items-center gap-4">
                 <div className="flex flex-col items-end border-r border-white/10 pr-4">
                     <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Offset Cart</span>
                     <span className="text-lg font-mono text-white flex items-center gap-2">
                       {getTotalCredits().toLocaleString()} <span className="text-xs text-primary">tCO₂e</span>
                     </span>
                 </div>
                 <div className="flex flex-col items-start">
                     <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Due</span>
                     <span className="text-lg font-mono text-white flex items-center gap-2">
                       ${getTotalCost().toFixed(2)}
                     </span>
                 </div>
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
      </div>

      {/* Main Layout (Sidebar + Grid) */}
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto px-4 md:px-8 pb-24 gap-6">
         
         {/* Filter Sidebar */}
         <div className="hidden md:flex flex-col w-64 flex-none glass-panel rounded-xl border border-white/5 p-5 bg-black/20 h-max sticky top-4">
            <h3 className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm text-primary mb-6">
              <Filter size={16} /> Discovery Filters
            </h3>

            <div className="mb-6">
               <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Search Listing</label>
               <div className="relative">
                 <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                 <input 
                    type="text" 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search projects..." 
                    className="bg-black/50 border border-white/10 rounded-md py-2 pl-8 pr-3 text-xs w-full focus:outline-none focus:border-primary" 
                 />
               </div>
            </div>

            <div className="mb-6">
               <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Category</label>
               <div className="space-y-2">
                 {['All', 'Renewable', 'Forestry', 'Tech/CCS', 'Community'].map(cat => (
                   <div 
                     key={cat} 
                     onClick={() => setActiveCategory(cat)}
                     className={`text-sm cursor-pointer px-2 py-1.5 rounded transition-all ${activeCategory === cat ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:text-white'}`}
                   >
                     {cat}
                   </div>
                 ))}
               </div>
            </div>

            <div className="mb-6">
               <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex justify-between">
                 Max Price/Ton <span>${maxPrice}</span>
               </label>
               <input 
                  type="range" min="5" max="300" step="5"
                  value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary" 
               />
            </div>
         </div>

         {/* Product Grid */}
         <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProjects.map((proj) => {
                const isComparing = compareList.includes(proj.id);
                return (
                  <div key={proj.id} className={`glass-panel border rounded-xl overflow-hidden transition-all group flex flex-col bg-zinc-900/80 ${isComparing ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/5 hover:border-primary/50'}`}>
                    <div className="h-40 overflow-hidden relative">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                      
                      {/* Compare Checkbox */}
                      <div 
                        onClick={() => toggleCompare(proj.id)}
                        className={`absolute top-2 right-2 p-1.5 rounded cursor-pointer backdrop-blur-md transition-all flex items-center justify-center ${isComparing ? 'bg-blue-500 text-white' : 'bg-black/50 text-gray-400 hover:text-white border border-white/20'}`}
                      >
                         {isComparing ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>

                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 flex items-center">
                        {getIconForType(proj.type)} {proj.type}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 mb-2">
                         <ShieldCheck size={12} className="text-blue-400" />
                         <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{proj.standard}</span>
                         <span className="text-[10px] text-gray-500 ml-auto border border-gray-700 px-1.5 rounded bg-black/30">VINTAGE {proj.vintage}</span>
                      </div>

                      <h3 className="font-bold text-md mb-1 leading-tight text-white group-hover:text-primary transition-colors line-clamp-1">{proj.title}</h3>
                      <p className="text-xs text-gray-400 mb-0.5"><span className="text-gray-500">Seller:</span> {proj.seller}</p>
                      <p className="text-[10px] text-gray-500 mb-4">{proj.location}</p>
                      
                      <div className="flex justify-between items-center mb-5 mt-auto bg-black/40 p-2 rounded-lg border border-white/5">
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Price / tCO₂e</p>
                          <p className="text-lg font-mono text-white leading-none">${proj.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Available</p>
                          <p className="text-sm font-mono text-primary leading-none">{proj.available.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input 
                           type="number" 
                           defaultValue={10} 
                           id={`qty-${proj.id}`}
                           className="w-16 bg-black/50 border border-white/10 rounded-md text-xs text-center focus:outline-none focus:border-primary"
                        />
                        <button 
                          onClick={() => {
                            const qty = parseInt((document.getElementById(`qty-${proj.id}`) as HTMLInputElement)?.value || '0');
                            if(qty > 0) addToCart(proj.id, qty, proj.price);
                          }}
                          className="flex-1 bg-white/5 hover:bg-primary hover:text-black text-white py-2 rounded border border-white/10 hover:border-primary transition-all font-bold text-xs tracking-wider flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                        >
                          <ShoppingCart size={14} /> ADD
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
         </div>
      </div>

      {/* Floating Compare & Checkout Bar */}
      {(compareList.length > 0 || cartItems.length > 0) && (
         <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-40 animate-slide-up flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="max-w-[1400px] w-full flex items-center justify-between">
               <div className="flex items-center gap-4">
                  {compareList.length > 0 && (
                    <div className="flex items-center gap-3">
                       <span className="text-sm text-gray-300"><span className="text-blue-400 font-bold">{compareList.length}</span> items selected to compare</span>
                       <button 
                         onClick={() => setIsCompareModalOpen(true)}
                         className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all text-xs font-bold tracking-wider flex items-center gap-2"
                       >
                         <BarChart2 size={14} /> COMPARE NOW
                       </button>
                       <button onClick={clearCompare} className="text-xs text-gray-500 hover:text-red-400 ml-2">Clear</button>
                    </div>
                  )}
               </div>

               {cartItems.length > 0 && (
                  <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                     <div className="text-right">
                       <p className="text-[10px] text-gray-500 uppercase tracking-wider">Goal Reached</p>
                       <p className="text-lg font-mono text-primary font-bold">{getTotalCredits().toLocaleString()} tCO₂e</p>
                     </div>
                     <button 
                       onClick={handleCheckoutAggregate}
                       className="bg-primary text-black font-bold tracking-wider uppercase text-sm px-8 py-3 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                     >
                       Checkout Bulk
                     </button>
                  </div>
               )}
            </div>
         </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
           <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/40">
                <h2 className="text-2xl font-mono font-bold flex items-center gap-3">
                   <BarChart2 className="text-blue-400" /> SIDE-BY-SIDE ANALYSIS
                </h2>
                <button onClick={() => setIsCompareModalOpen(false)} className="text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-6 custom-scrollbar flex gap-4">
                 {comparedProjects.map(proj => {
                    const isLowestCost = proj.price === cheapestComparePrice;
                    return (
                      <div key={proj.id} className={`flex-1 min-w-[300px] border rounded-xl overflow-hidden bg-black/30 flex flex-col ${isLowestCost ? 'border-primary/50 shadow-[0_0_20px_rgba(57,255,20,0.1)]' : 'border-white/5'}`}>
                         <div className="h-32 relative overflow-hidden">
                           <img src={proj.img} className="w-full h-full object-cover opacity-50" />
                           {isLowestCost && (
                              <div className="absolute top-0 right-0 bg-primary text-black font-bold text-[10px] uppercase px-3 py-1 rounded-bl-lg tracking-wider">
                                Most Cost Effective
                              </div>
                           )}
                           <div className="absolute bottom-2 left-2 right-2">
                             <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md">{proj.title}</h3>
                             <p className="text-xs text-gray-300">{proj.seller}</p>
                           </div>
                         </div>
                         
                         <div className="p-5 flex-1 flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Price/Ton</p>
                                 <p className={`text-xl font-mono font-bold ${isLowestCost ? 'text-primary' : 'text-gray-300'}`}>${proj.price.toFixed(2)}</p>
                               </div>
                               <div>
                                 <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Supply Risk</p>
                                 <p className="text-md font-mono text-blue-400 flex items-center gap-1"><ShieldAlert size={14}/> {proj.riskRating}</p>
                               </div>
                            </div>
                            
                            <hr className="border-white/5" />
                            
                            <div>
                               <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Impact Depth</p>
                               <p className="text-sm text-gray-300 leading-relaxed">{proj.impactDepth}</p>
                            </div>

                            <div>
                               <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Co-Benefits (SDGs)</p>
                               <div className="flex gap-2">
                                  {proj.sdg.map(s => <span key={s} className="bg-white/10 text-white text-xs px-2 py-1 rounded border border-white/20">SDG {s}</span>)}
                               </div>
                            </div>
                            
                            <div className="mt-auto pt-4 flex gap-2">
                              <input id={`modal-qty-${proj.id}`} type="number" defaultValue={20} className="w-16 bg-black text-center border border-white/10 rounded focus:border-primary focus:outline-none" />
                              <button 
                                onClick={() => {
                                  const q = parseInt((document.getElementById(`modal-qty-${proj.id}`) as HTMLInputElement)?.value || '0');
                                  if (q > 0) addToCart(proj.id, q, proj.price);
                                }}
                                className="flex-1 bg-white/5 hover:bg-primary hover:text-black transition-all border border-white/10 py-2 rounded text-xs font-bold tracking-wider"
                              >
                                BUY NOW
                              </button>
                            </div>
                         </div>
                      </div>
                    )
                 })}
                 {comparedProjects.length === 0 && (
                   <div className="w-full h-[300px] flex items-center justify-center text-gray-500 text-sm">
                     No projects selected. Please select at least two projects from the grid to compare.
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
