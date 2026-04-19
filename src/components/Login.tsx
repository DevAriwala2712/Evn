import { useState } from 'react';
import { Sprout, Zap, Lock, MapPin, Database } from 'lucide-react';
import { processDummyLogin } from '../services/firebase';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoAccess = async () => {
    setLoading(true);
    setError(null);
    try {
      await processDummyLogin();
    } catch (e: any) {
      setError(e.message || "Failed to authenticate.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden text-white font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md z-10 animate-fade-in relative">
         <div className="flex justify-center mb-8">
            <div className="relative">
              <Sprout className="w-20 h-20 text-primary shadow-[0_0_30px_rgba(16,185,129,0.5)] rounded-full bg-black/50 backdrop-blur-md" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
                <Zap size={24} className="text-white" />
              </div>
            </div>
         </div>

         <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-mono tracking-widest uppercase mb-2">Climate<span className="text-primary">Guard</span></h1>
            <p className="text-sm text-gray-400 tracking-wider">SECURE PLATFORM AUTHENTICATION</p>
         </div>

         <div className="glass-panel border-white/10 rounded-2xl p-8 backdrop-blur-xl bg-black/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <div className="space-y-4">
              <div className="mb-6">
                 <label className="block text-xs font-bold text-gray-500 py-1 uppercase tracking-wider mb-1 flex items-center gap-2"><Lock size={12}/> Credentials</label>
                 <input disabled type="email" placeholder="admin@climateguard.io" className="w-full bg-black/50 border border-white/5 p-3 rounded-t focus:outline-none focus:border-primary/50 text-sm text-gray-500 cursor-not-allowed" />
                 <input disabled type="password" placeholder="••••••••" className="w-full bg-black/50 border-x border-b border-white/5 p-3 rounded-b focus:outline-none focus:border-primary/50 text-sm text-gray-500 cursor-not-allowed" />
              </div>

              <button disabled className="w-full bg-white/5 text-gray-500 font-bold uppercase tracking-wider py-3 rounded-md cursor-not-allowed border border-white/5">
                System Administrator Login
              </button>

              <div className="flex items-center gap-4 py-4">
                 <div className="flex-1 h-px bg-white/5"></div>
                 <span className="text-xs text-gray-600 font-mono">OR</span>
                 <div className="flex-1 h-px bg-white/5"></div>
              </div>

              <button 
                onClick={handleDemoAccess}
                disabled={loading}
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-wider py-4 rounded-md transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-primary/30 flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {loading ? <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin border-black"></span> : <Database size={18} />}
                ACCESS DEMO WORKSPACE
              </button>
            </div>
            
            {error && (
              <div className="mt-6 text-xs text-red-400 bg-red-400/10 p-3 rounded border border-red-400/20 text-center animate-shake">
                {error}
                <p className="mt-1 text-[10px] text-gray-500">Ensure Authentication is enabled in the Firebase Console.</p>
              </div>
            )}
         </div>

         <div className="mt-8 text-center text-xs text-gray-600 font-mono tracking-widest uppercase flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><MapPin size={10} /> Node: AP-SOUTH-1</span>
            <span>v2.4.1</span>
         </div>
      </div>
    </div>
  );
}
