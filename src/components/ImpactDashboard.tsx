import { TrendingDown, Shield, Award, BarChart2 } from 'lucide-react';

export default function ImpactDashboard() {
  return (
    <div className="w-full h-full text-white bg-zinc-900 overflow-y-auto p-8 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full border-2 border-primary bg-zinc-800 p-1">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-mono tracking-wider">Acme Corp Global</h2>
              <p className="text-gray-400 text-sm">Enterprise Account • Tier 1</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Total Carbon Score</p>
            <p className="text-4xl font-mono text-primary font-bold">A+</p>
          </div>
        </div>

        {/* Top KPI row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <TrendingDown size={18} className="text-primary" />
              <span className="text-[10px] text-primary bg-primary/20 px-2 py-1 rounded-full">+12% WoW</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Offsets Purchased</p>
            <p className="text-2xl font-mono font-bold">12,450 t</p>
          </div>
          
          <div className="glass-panel p-5 rounded-xl border border-white/5">
             <div className="flex justify-between items-start mb-2">
              <Shield size={18} className="text-blue-400" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Active Projects</p>
            <p className="text-2xl font-mono font-bold">8</p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/5 md:col-span-2 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/10 rounded-tl-full"></div>
            <p className="text-sm text-gray-400 mb-1">Virtual Forest Status</p>
            <p className="text-2xl font-mono font-bold text-primary mb-2">Thriving</p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-primary w-[75%] h-full"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 text-right">3,450 Trees Planted / 5,000 Goal</p>
          </div>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-white/5">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2"><BarChart2 size={18} className="text-primary"/> Emissions vs Offsets</h3>
                <select className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-gray-400">
                  <option>2024 (YTD)</option>
                  <option>2023</option>
                </select>
             </div>
             
             {/* Fake Bar Chart Container */}
             <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-white/10 pb-2 pl-2">
                {[45, 60, 30, 80, 50, 90, 70, 40, 60, 100, 80, 65].map((val, i) => (
                  <div key={i} className="w-full flex justify-center items-end group relative h-full">
                     <div className="w-full max-w-[20px] bg-red-500/20 rounded-t-sm absolute bottom-0" style={{ height: `${val}%` }}></div>
                     <div className="w-full max-w-[20px] bg-primary rounded-t-sm absolute bottom-0 z-10 transition-all group-hover:bg-green-400" style={{ height: `${val * 0.7}%` }}></div>
                     <span className="absolute -bottom-6 text-[10px] text-gray-600">
                       {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                     </span>
                  </div>
                ))}
             </div>
             <div className="flex gap-4 mt-8 justify-center text-xs text-gray-400">
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500/20 rounded-sm"></div> Gross Emissions</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-primary rounded-sm"></div> Offsets Applied</span>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 mb-6"><Award size={18} className="text-yellow-400"/> Recent Badges</h3>
            <div className="flex-1 space-y-4">
              {[
                { icon: '🌞', title: 'Solar Pioneer', desc: '1000 MWh Solar Deployed' },
                { icon: '💧', title: 'Water Saver', desc: 'Zero Liquid Discharge' },
                { icon: '🌳', title: 'Forest Guardian', desc: '1000+ Trees Sponsored' }
              ].map((badge, i) => (
                <div key={i} className="flex gap-3 items-center bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-2xl bg-black/40 w-12 h-12 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{badge.title}</h4>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border border-white/10 hover:border-white/30 text-xs py-2 rounded transition-colors text-gray-400">View All Achievements</button>
          </div>
        </div>
      </div>
    </div>
  );
}
