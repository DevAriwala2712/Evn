import { useState } from 'react';
import { Factory, Zap, Building, ChevronRight, Activity, MapPin, AlertTriangle, Briefcase } from 'lucide-react';
import { generateSimulatorResults } from '../services/aiService';

export default function AISimulator() {
  const [analyzing, setAnalyzing] = useState(false);
  const [resultsData, setResultsData] = useState<any>(null);
  
  const [region, setRegion] = useState('Western India (Gujarat/MH)');
  const [industry, setIndustry] = useState('Textile & Dyeing');
  const [budget, setBudget] = useState('50');

  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setAnalyzing(true);
    setError(null);
    try {
      // Send dynamic constraints to the Gemini API
      const aiResponse = await generateSimulatorResults(region, industry, `₹${budget} Crores`);
      setResultsData(aiResponse);
    } catch (e) {
      console.error(e);
      setError("AI Generation Failed. Make sure you set VITE_GEMINI_API_KEY in .env.local.");
    } finally {
      setAnalyzing(false);
    }
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
            <select 
              value={region} onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-primary"
            >
              <option>Western India (Gujarat/MH)</option>
              <option>Northern India (NCR)</option>
              <option>Southern Tech Hubs</option>
              <option>Eastern Mining Zone</option>
              <option>Punjab / Haryana</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Industry Type</label>
            <select 
              value={industry} onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:border-primary"
            >
              <option>Textile & Dyeing</option>
              <option>Food Processing / Dairy</option>
              <option>Pharmaceuticals</option>
              <option>Steel / Heavy Manufacturing</option>
              <option>Agro-based</option>
              <option>Chemical Processing</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Budget Cap: ₹{budget} Crores</label>
            <input 
              type="range" min="1" max="100" 
              value={budget} onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-primary" 
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>₹1 Cr</span>
              <span>₹100+ Cr</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSimulate}
          disabled={analyzing}
          className="mt-4 w-full bg-primary/20 border border-primary text-primary font-bold uppercase tracking-wider py-3 rounded-md hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {analyzing ? (
            <><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> Generating...</>
          ) : 'Run Simulation'}
        </button>

        {error && <div className="text-red-400 text-xs mt-2 bg-red-400/10 p-2 rounded">{error}</div>}
      </div>

      {/* Main Results Area */}
      <div className="flex-1 p-8 pb-24 overflow-y-auto custom-scrollbar">
        {!resultsData && !analyzing && (
           <div className="h-full flex flex-col items-center justify-center text-gray-500">
             <Activity size={48} className="mb-4 opacity-20" />
             <p className="font-mono tracking-widest text-sm uppercase">Awaiting Parameters</p>
           </div>
        )}

        {analyzing && (
          <div className="h-full flex flex-col items-center justify-center text-primary">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <p className="font-mono tracking-widest text-sm animate-pulse">Running Generative Model...</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">Analyzing land-use policies & constraints...</p>
          </div>
        )}

        {resultsData && !analyzing && (
          <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-3xl font-bold font-mono tracking-wider">Optimal Strategy Generated</h3>
                <p className="text-gray-400 mt-1">Confidence Score: <span className="text-primary font-bold">{resultsData.confidenceScore}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Projected Est. ROI</p>
                <p className="text-2xl font-bold text-green-400">{resultsData.currentLocationAnalysis?.roiTimeline}</p>
              </div>
            </div>

            {/* Emission Reduction Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase mb-4">
                  <Building size={16} className="text-red-400" /> Current Trajectory
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Annual Emissions (Est)</p>
                    <p className="text-xl font-mono text-red-400">{resultsData.currentLocationAnalysis?.annualEmissionsEst}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Regulatory Risk</p>
                    <p className="text-md text-red-400">{resultsData.currentLocationAnalysis?.regulatoryRisk}</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-primary/20 relative overflow-hidden shadow-[inset_0_0_40px_rgba(16,185,129,0.05)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase mb-4">
                  <Zap size={16} className="text-primary" /> AI Optimized Path
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Target Emissions</p>
                    <p className="text-xl font-mono text-primary">{resultsData.currentLocationAnalysis?.optimizedEmissionsEst}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Suggested Action</p>
                    <p className="text-md text-white">{resultsData.currentLocationAnalysis?.suggestedActionSummary}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5 mb-8">
              <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wider">Step-by-Step Mitigation</h4>
              <div className="space-y-3">
                {resultsData.currentLocationAnalysis?.steps.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4 p-3 bg-black/40 rounded-lg items-center border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex flex-col items-center justify-center text-xs text-primary font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-300">{step}</p>
                    <ChevronRight size={16} className="text-gray-600 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ranked Locations Output */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 mb-8">
              <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wider flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> Ranked Alternative Locations
              </h4>
              <p className="text-xs text-gray-400 mb-4">Based on logistics, water/power availability, and environmental clearances.</p>
              
              <div className="space-y-4">
                 {resultsData.alternativeLocations?.map((loc: any, i: number) => {
                     const isLocked = loc.permissionStatus.includes('Locked');
                     const reqClearance = loc.permissionStatus.includes('Requires');
                     
                     let bgClass = "bg-green-500/10 border-green-500/20";
                     let dotClass = "bg-green-500 shadow-[0_0_5px_#22c55e]";
                     let textClass = "text-green-400";
                     
                     if (isLocked) {
                         bgClass = "bg-red-500/10 border-red-500/20";
                         dotClass = ""; textClass = "text-red-400";
                     } else if (reqClearance) {
                         bgClass = "bg-yellow-500/10 border-yellow-500/20";
                         dotClass = "bg-yellow-500 shadow-[0_0_5px_#eab308]";
                         textClass = "text-yellow-400";
                     }

                     return (
                       <div key={i} className={`bg-black/40 p-4 rounded-lg border relative overflow-hidden ${i === 0 ? 'border-primary/30 shadow-[0_0_15px_rgba(57,255,20,0.05)]' : 'border-white/5'}`}>
                          <div className="absolute top-0 right-0 p-2">
                             <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded ${i === 0 ? 'bg-primary/20 text-primary' : (isLocked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-gray-300')}`}>
                                Rank {loc.rank}
                             </span>
                          </div>
                          <h5 className="font-bold text-lg text-white mb-1">{loc.name}</h5>
                          <p className="text-sm text-gray-400 mb-4">{loc.reasoning}</p>
                          <div className={`flex items-center gap-2 px-3 py-2 rounded border w-max ${bgClass}`}>
                             {isLocked ? <AlertTriangle size={14} className="text-red-500" /> : <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>}
                             <span className={`text-xs font-mono uppercase tracking-wider font-bold ${textClass}`}>{loc.permissionStatus}</span>
                          </div>
                       </div>
                     )
                 })}
              </div>
            </div>

            {/* Alternative Industry Suggestions */}
            {(resultsData.alternativeIndustries && resultsData.alternativeIndustries.length > 0) && (
              <div className="glass-panel p-6 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-gray-300 uppercase mb-4 tracking-wider flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> Alternative Industry Synergy
                </h4>
                <p className="text-sm text-gray-400 mb-4">Based on the raw materials, ports, and power availability in the recommended regions, consider expanding or pivoting to:</p>
                <div className="flex flex-wrap gap-4">
                   {resultsData.alternativeIndustries.map((ind: any, i: number) => (
                      <div key={i} className="bg-primary/10 px-4 py-3 rounded-lg border border-primary/30 flex-1 min-w-[200px]">
                        <h6 className="font-bold text-white mb-1">{ind.name}</h6>
                        <p className="text-xs text-gray-400">{ind.reason}</p>
                      </div>
                   ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
