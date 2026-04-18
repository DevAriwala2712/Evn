import { useState } from 'react';
import { Factory, Zap, Building, ChevronRight, Activity } from 'lucide-react';

export default function AISimulator() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const handleSimulate = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 2000);
  };

  return (
    <div className="flex w-full h-full text-white bg-zinc-900 overflow-hidden text-left relative">
      {/* Sidebar config */}
      <div className="w-80 border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto z-10 glass-panel">
        <div>
          <h2 className="text-xl font-bold font-mono tracking-wider mb-1 flex items-center gap-2">
            <Factory size={20} className="text-primary" /> SIMULATOR
          </h2>
          <p className="text-xs text-gray-400">Configure AI prediction parameters</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Region Target</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-primary">
              <option>Western India (Gujarat/MH)</option>
              <option>Northern India (NCR)</option>
              <option>Southern Tech Hubs</option>
              <option>Eastern Mining Zone</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Industry Type</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-primary">
              <option>Heavy Manufacturing</option>
              <option>Textile & Dyeing</option>
              <option>Petrochemicals</option>
              <option>Logistics & Supply</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Budget Cap (USD)</label>
            <input type="range" min="1" max="100" className="w-full accent-primary" />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>$1M</span>
              <span>$100M+</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSimulate}
          disabled={analyzing}
          className="mt-4 w-full bg-primary/20 border border-primary text-primary font-bold uppercase tracking-wider py-3 rounded-md hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] disabled:opacity-50"
        >
          {analyzing ? 'Processing...' : 'Run Simulation'}
        </button>
      </div>

      {/* Main Results Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!results && !analyzing && (
           <div className="h-full flex flex-col items-center justify-center text-gray-500">
             <Activity size={48} className="mb-4 opacity-20" />
             <p className="font-mono tracking-widest text-sm uppercase">Awaiting Parameters</p>
           </div>
        )}

        {analyzing && (
          <div className="h-full flex flex-col items-center justify-center text-primary">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(57,255,20,0.5)]"></div>
            <p className="font-mono tracking-widest text-sm animate-pulse">Running Generative Model...</p>
          </div>
        )}

        {results && !analyzing && (
          <div className="max-w-4xl animate-fade-in">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-3xl font-bold font-mono tracking-wider">Optimal Strategy Generated</h3>
                <p className="text-gray-400 mt-1">Confidence Score: <span className="text-primary font-bold">92.4%</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Projected Est. ROI</p>
                <p className="text-2xl font-bold text-green-400">3.4 Years</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase mb-4">
                  <Building size={16} className="text-red-400" /> Current Trajectory
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Annual Emissions (Est)</p>
                    <p className="text-xl font-mono text-red-400">450k Tons CO₂e</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Regulatory Risk</p>
                    <p className="text-md text-red-400">High / Penalties Likely</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-primary/20 relative overflow-hidden shadow-[inset_0_0_40px_rgba(57,255,20,0.05)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase mb-4">
                  <Zap size={16} className="text-primary" /> AI Optimized Path
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Annual Emissions (Est)</p>
                    <p className="text-xl font-mono text-primary">120k Tons CO₂e <span className="text-sm">(-73%)</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Suggested Action</p>
                    <p className="text-md text-white">CCS Integration + 50MW Solar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wider">Step-by-Step Implementation</h4>
              <div className="space-y-3">
                {[
                  "Phase 1: Retrofit existing exhaust stacks with modular Carbon Capture units.",
                  "Phase 2: Transition 40% of grid dependency to off-site utility solar PPAs.",
                  "Phase 3: Electrify forklift and internal logistics fleet."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-3 bg-black/40 rounded-lg items-center">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex flex-col items-center justify-center text-xs text-primary font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-300">{step}</p>
                    <ChevronRight size={16} className="text-gray-600 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
