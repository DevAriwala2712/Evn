import { useState } from 'react';
import { UploadCloud, CheckCircle2, Factory, TreePine, Leaf, DollarSign } from 'lucide-react';
import { useMarket, type Project } from '../contexts/MarketContext';

export default function SellerHub() {
  const { projects, addProject } = useMarket();

  // Metrics Logic
  const myProjects = projects.filter(p => p.seller === 'Agri-Owner / Coop');
  const activeCount = myProjects.length;
  // Let's assume total payouts is some fake calculation based on a static string or we leave it 0.00 since this demo doesn't track sales history.

  const [formData, setFormData] = useState({
    title: '',
    seller: 'Agri-Owner / Coop',
    location: '',
    type: 'Forestry',
    price: '',
    available: '',
    impactDepth: '',
  });

  const [isListed, setIsListed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const newProject: Project = {
        id: Date.now(),
        title: formData.title,
        seller: formData.seller,
        location: formData.location,
        type: formData.type,
        price: parseFloat(formData.price),
        available: parseInt(formData.available),
        img: 'https://images.unsplash.com/photo-1592982537447-6f272a81878f?auto=format&fit=crop&q=80&w=600', // Mock agricultural image
        standard: 'GCC (Pending)',
        vintage: new Date().getFullYear().toString(),
        sdg: ['13', '15', '8'],
        impactDepth: formData.impactDepth,
        riskRating: 'A (Provisional)',
      };

      await addProject(newProject);
      setIsUploading(false);
      setIsListed(true);

      setTimeout(() => setIsListed(false), 5000);
      setFormData({...formData, title: '', location: '', price: '', available: '', impactDepth: ''});
    } catch (e) {
      console.error("Upload failed", e);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full text-white bg-zinc-900 overflow-y-auto relative custom-scrollbar flex flex-col items-center">
      
      <div className="w-full bg-black/40 border-b border-white/5 py-12 px-6">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-mono tracking-wider flex items-center gap-3 mb-4">
              <UploadCloud size={36} className="text-primary" /> SELLER HUB
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg">List your verified environmental projects directly on the marketplace. Open to farmers, co-ops, and green energy startups globally.</p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
               <h3 className="text-xl font-bold mb-6 font-mono border-b border-white/10 pb-4">Create New Listing</h3>
               
               {isListed && (
                 <div className="bg-green-500/20 text-green-400 border border-green-500/50 p-4 rounded-lg flex items-center gap-3 mb-6 animate-fade-in shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                   <CheckCircle2 size={24} />
                   <div>
                     <p className="font-bold">Listing Approved & Live!</p>
                     <p className="text-sm">Your project is now visible to all marketplace buyers.</p>
                   </div>
                 </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Project Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Punjab Crop Residue Biochar" className="w-full bg-black/50 border border-white/10 p-3 rounded focus:outline-none focus:border-primary text-sm" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Location / State</label>
                      <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Punjab, India" className="w-full bg-black/50 border border-white/10 p-3 rounded focus:outline-none focus:border-primary text-sm" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Category</label>
                      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 rounded focus:outline-none focus:border-primary text-sm text-gray-300">
                         <option>Forestry</option>
                         <option>Community</option>
                         <option>Renewable</option>
                         <option>Tech/CCS</option>
                      </select>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Volume (tCO₂e)</label>
                      <input required type="number" value={formData.available} onChange={e => setFormData({...formData, available: e.target.value})} placeholder="e.g. 50000" className="w-full bg-black/50 border border-white/10 p-3 rounded focus:outline-none focus:border-primary text-sm" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Price per Ton ($)</label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 15.50" className="w-full bg-black/50 border border-white/10 p-3 pl-9 rounded focus:outline-none focus:border-primary text-sm" />
                      </div>
                   </div>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider">Impact Depth & Co-benefits</label>
                    <textarea required value={formData.impactDepth} onChange={e => setFormData({...formData, impactDepth: e.target.value})} placeholder="Describe community benefits, soil health improvements, etc." className="w-full bg-black/50 border border-white/10 p-3 rounded focus:outline-none focus:border-primary text-sm h-24 resize-none" />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-400 py-1 uppercase tracking-wider mb-2">Audit & Verification Files</label>
                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors bg-black/20">
                      <UploadCloud size={32} className="text-gray-500 mb-2" />
                      <p className="text-sm font-bold text-white mb-1">Drag and drop PDFs</p>
                      <p className="text-xs text-gray-500 mb-4">Satellite imagery, VVB Audit Reports, Proof of Ownership</p>
                      <button type="button" className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md font-bold transition-all">Browse Files</button>
                    </div>
                 </div>

                 <button 
                   disabled={isUploading}
                   className="w-full bg-primary hover:bg-white text-black font-bold uppercase tracking-wider py-4 mt-4 rounded-md transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50 flex justify-center items-center gap-2"
                 >
                   {isUploading ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> Processing...</> : 'List on Marketplace'}
                 </button>
               </form>
            </div>
         </div>

         <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-white/10">
               <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Seller Metrics</h4>
               <p className="text-3xl font-mono text-white mb-1">$0.00</p>
               <p className="text-xs text-green-400 mb-6">Total Payouts (YTD)</p>

               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                   <div className="flex items-center gap-2"><Factory size={16} className="text-primary"/> <span className="text-sm">Active Listings</span></div>
                   <span className="font-mono font-bold">{activeCount}</span>
                 </div>
                 <div className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5">
                   <div className="flex items-center gap-2"><TreePine size={16} className="text-blue-400"/> <span className="text-sm">Tons Sold</span></div>
                   <span className="font-mono font-bold">0</span>
                 </div>
               </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/10 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase mb-4 tracking-wider">
                  <Leaf size={16} className="text-primary" /> Standards Accepted
               </h4>
               <div className="space-y-3">
                 <p className="text-xs text-gray-400">• Verra (VCS)</p>
                 <p className="text-xs text-gray-400">• Gold Standard</p>
                 <p className="text-xs text-gray-400">• Global Carbon Council (GCC)</p>
                 <p className="text-xs text-gray-400">• Puro.earth</p>
               </div>
            </div>
         </div>
      </div>

      {/* Your Active Listings Table */}
      <div className="max-w-4xl mx-auto w-full px-6 pb-12">
         <h3 className="text-xl font-bold mb-4 font-mono flex items-center gap-2">
           <TreePine className="text-primary" size={24} /> YOUR ACTIVE LISTINGS
         </h3>
         
         <div className="glass-panel border border-white/10 rounded-xl overflow-hidden">
            {myProjects.length === 0 ? (
               <div className="p-8 text-center text-gray-500 font-mono text-sm">
                 No active projects found. Submit a listing above.
               </div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-white/5 text-xs uppercase font-bold text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Project Title</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Volume</th>
                        <th className="px-6 py-4">Price / Ton</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {myProjects.map(proj => (
                        <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{proj.title}</td>
                          <td className="px-6 py-4">{proj.type}</td>
                          <td className="px-6 py-4 font-mono">{proj.available.toLocaleString()} tCO₂e</td>
                          <td className="px-6 py-4 font-mono text-primary">${proj.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-xs">Live</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
