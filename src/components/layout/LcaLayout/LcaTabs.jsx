import React from 'react';
import { Calculator, FlaskConical } from 'lucide-react';

// Enum for Tabs - keeping it here or can be imported if defined elsewhere
export const Tab = {
    SIMULATOR: 'simulator',
    RESEARCH: 'research',
};

const LcaTabs = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="bg-white/30 backdrop-blur-md shadow-sm z-40 border-b border-white/20 sticky top-[85px] md:top-[96px]">
            <div className="max-w-6xl mx-auto px-4 py-2">
                <div className="flex justify-center md:justify-start gap-2 md:gap-4 overflow-x-auto no-scrollbar p-1">
                    <button
                        onClick={() => setActiveTab(Tab.SIMULATOR)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 whitespace-nowrap border ${activeTab === Tab.SIMULATOR
                                ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white shadow-lg shadow-eco-600/30 border-transparent'
                                : 'bg-white/60 text-eco-800 hover:bg-white hover:text-eco-900 border-white/50 hover:border-white shadow-sm'
                            }`}
                    >
                        <Calculator className={`w-4 h-4 ${activeTab === Tab.SIMULATOR ? 'text-solar-300' : 'text-eco-600'}`} />
                        Simulator
                    </button>
                    <button
                        onClick={() => setActiveTab(Tab.RESEARCH)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 whitespace-nowrap border ${activeTab === Tab.RESEARCH
                                ? 'bg-gradient-to-r from-eco-600 to-emerald-600 text-white shadow-lg shadow-eco-600/30 border-transparent'
                                : 'bg-white/60 text-eco-800 hover:bg-white hover:text-eco-900 border-white/50 hover:border-white shadow-sm'
                            }`}
                    >
                        <FlaskConical className={`w-4 h-4 ${activeTab === Tab.RESEARCH ? 'text-solar-300' : 'text-eco-600'}`} />
                        Research
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default LcaTabs;
