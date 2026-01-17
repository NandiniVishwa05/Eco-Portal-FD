// import React, { useState, useEffect } from 'react';
// import { Award, Leaf, ShoppingBag, Trash2, RefreshCw, Smartphone, TrendingUp, Sparkles } from 'lucide-react';
// import { getSimulatedAdvice } from '../services/geminiService';

// const EcoPointsSimulator = () => {
//     const [uses, setUses] = useState(10);
//     const [scrubbers, setScrubbers] = useState(2);
//     const [results, setResults] = useState({ co2: 0, plastic: 0, points: 0 });
//     const [aiFeedback, setAiFeedback] = useState("");
//     const [loadingAi, setLoadingAi] = useState(false);

//     useEffect(() => {
//         calculateSavings();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [uses, scrubbers]);

//     const calculateSavings = () => {
//         const co2PerReuse = 0.005;
//         const plasticAvertedPerScrubber = 0.075;
//         const co2SavedPerScrubber = 0.85;
//         const pointsPerKgCo2 = 100;

//         let totalCo2Savings = 0;

//         if (uses > 131) {
//             totalCo2Savings += (uses - 131) * co2PerReuse;
//         }

//         totalCo2Savings += scrubbers * co2SavedPerScrubber;
//         const totalPlasticAverted = scrubbers * plasticAvertedPerScrubber;
//         const totalPoints = Math.round(totalCo2Savings * pointsPerKgCo2);

//         setResults({
//             co2: totalCo2Savings,
//             plastic: totalPlasticAverted,
//             points: totalPoints
//         });
//     };

//     const handleGetFeedback = async () => {
//         setLoadingAi(true);
//         const feedback = await getSimulatedAdvice(uses, scrubbers);
//         setAiFeedback(feedback);
//         setLoadingAi(false);
//     };

//     return (
//         <div className="animate-fadeIn space-y-8">
//             {/* Hero Section */}
//             <div className="text-center md:text-left space-y-3 relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-solar-100/30 to-eco-100/30 border border-solar-100/50 backdrop-blur-sm">
//                 <h2 className="text-3xl font-extrabold text-eco-900 inline-block">
//                     Your Impact. <span className="text-solar-500">Your Rewards.</span>
//                 </h2>
//                 <p className="text-eco-700/80 max-w-3xl text-lg">
//                     The <strong>Reward-Based Mechanism</strong> converts your positive behaviour into measurable EcoPoints.
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//                 {/* Input Form */}
//                 <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white ring-1 ring-eco-50 flex flex-col justify-center relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-eco-100/50 rounded-full blur-3xl -mr-10 -mt-10"></div>

//                     <h3 className="text-xl font-bold text-eco-800 mb-8 flex items-center gap-3 relative z-10">
//                         <div className="p-2 bg-gradient-to-br from-eco-100 to-eco-200 rounded-xl text-eco-700 shadow-sm">
//                             <RefreshCw className="w-5 h-5" />
//                         </div>
//                         Input Your Activity
//                     </h3>

//                     <div className="space-y-8 relative z-10">
//                         <div className="group">
//                             <label className="block text-sm font-bold text-eco-700 mb-3 uppercase tracking-wider" htmlFor="uses">
//                                 Reusable Bag Uses
//                             </label>
//                             <div className="relative transform transition-all group-hover:scale-[1.01]">
//                                 <ShoppingBag className="absolute left-4 top-3.5 text-eco-400 w-6 h-6" />
//                                 <input
//                                     type="number"
//                                     id="uses"
//                                     min="0"
//                                     value={uses}
//                                     onChange={(e) => setUses(Number(e.target.value))}
//                                     className="w-full pl-12 pr-4 py-4 bg-white border-2 border-eco-100 rounded-2xl focus:ring-4 focus:ring-eco-500/10 focus:border-eco-500 outline-none transition-all shadow-sm text-lg font-bold text-eco-900"
//                                 />
//                             </div>
//                             {uses < 131 ? (
//                                 <div className="mt-3 flex items-start gap-2 text-xs font-medium text-solar-600 bg-solar-50 p-2 rounded-lg border border-solar-100">
//                                     <TrendingUp className="w-4 h-4 flex-shrink-0" />
//                                     <span>You need {131 - uses} more uses to reach carbon breakeven!</span>
//                                 </div>
//                             ) : (
//                                 <div className="mt-3 flex items-start gap-2 text-xs font-medium text-eco-600 bg-eco-50 p-2 rounded-lg border border-eco-100">
//                                     <Sparkles className="w-4 h-4 flex-shrink-0" />
//                                     <span>You are generating pure carbon savings now!</span>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="group">
//                             <label className="block text-sm font-bold text-eco-700 mb-3 uppercase tracking-wider" htmlFor="scrubbers">
//                                 Coir Scrubbers Purchased
//                             </label>
//                             <div className="relative transform transition-all group-hover:scale-[1.01]">
//                                 <Leaf className="absolute left-4 top-3.5 text-eco-400 w-6 h-6" />
//                                 <input
//                                     type="number"
//                                     id="scrubbers"
//                                     min="0"
//                                     value={scrubbers}
//                                     onChange={(e) => setScrubbers(Number(e.target.value))}
//                                     className="w-full pl-12 pr-4 py-4 bg-white border-2 border-eco-100 rounded-2xl focus:ring-4 focus:ring-eco-500/10 focus:border-eco-500 outline-none transition-all shadow-sm text-lg font-bold text-eco-900"
//                                 />
//                             </div>
//                         </div>

//                         <div className="pt-4">
//                             <button
//                                 onClick={handleGetFeedback}
//                                 disabled={loadingAi}
//                                 className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-sky-500/20 transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
//                             >
//                                 {loadingAi ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Sparkles className="w-5 h-5 text-solar-300" />}
//                                 {loadingAi ? 'Thinking...' : 'Get AI Encouragement'}
//                             </button>
//                             {aiFeedback && (
//                                 <div className="mt-4 p-5 bg-gradient-to-br from-eco-500 to-eco-600 text-white rounded-2xl text-sm shadow-lg border border-eco-400 italic animate-fadeIn relative">
//                                     <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
//                                     "{aiFeedback}"
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Results Card */}
//                 <div className="space-y-6">
//                     <div className="bg-gradient-to-br from-eco-800 via-eco-700 to-slate-900 text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
//                         {/* Decorative Elements */}
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-solar-500/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-solar-500/30 transition-colors"></div>
//                         <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-sky-500/30 transition-colors"></div>
//                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

//                         <div className="relative z-10 text-center">
//                             <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-md shadow-inner ring-1 ring-white/20 animate-float">
//                                 <Award className="w-10 h-10 text-solar-400" />
//                             </div>
//                             <h3 className="text-lg font-bold uppercase tracking-widest text-eco-200 mb-2">EcoPoints Earned</h3>
//                             <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-solar-300 to-solar-500 drop-shadow-sm mb-4">
//                                 {results.points}
//                             </div>
//                             <span className="text-2xl font-bold text-white/90">SP</span>
//                             <div className="mt-6">
//                                 <p className="text-xs font-bold text-eco-900 bg-solar-400 inline-block px-4 py-1.5 rounded-full shadow-lg shadow-solar-500/20 uppercase tracking-wide">
//                                     Redeemable at Certified Retailers
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-gradient-to-b from-white/80 to-eco-50/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-white/60">
//                         <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
//                             <Smartphone className="w-6 h-6 text-sky-500" />
//                             Your Environmental Impact
//                         </h4>
//                         <div className="space-y-4">
//                             <div className="flex items-center justify-between p-5 bg-gradient-to-r from-eco-50 to-white rounded-2xl border border-eco-100 shadow-sm hover:shadow-md transition-shadow">
//                                 <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-eco-100 rounded-xl text-eco-600">
//                                         <Leaf className="w-6 h-6" />
//                                     </div>
//                                     <span className="text-slate-600 font-bold">Est. CO₂ Savings</span>
//                                 </div>
//                                 <span className="text-2xl font-black text-eco-600">{results.co2.toFixed(2)} <span className="text-sm text-eco-400 font-medium">kg</span></span>
//                             </div>

//                             <div className="flex items-center justify-between p-5 bg-gradient-to-r from-sky-50 to-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
//                                 <div className="flex items-center gap-4">
//                                     <div className="p-3 bg-sky-100 rounded-xl text-sky-600">
//                                         <Trash2 className="w-6 h-6" />
//                                     </div>
//                                     <span className="text-slate-600 font-bold">Plastic Averted</span>
//                                 </div>
//                                 <span className="text-2xl font-black text-sky-600">{results.plastic.toFixed(2)} <span className="text-sm text-sky-400 font-medium">kg</span></span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default EcoPointsSimulator;