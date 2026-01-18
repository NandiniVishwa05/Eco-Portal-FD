import React from 'react';
import { Sparkles } from 'lucide-react';

const LcaHeader = () => {
    return (
        <header className="bg-white/70 backdrop-blur-xl text-eco-900 shadow-lg shadow-eco-100/20 sticky top-0 z-50 border-b border-white/50 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left group cursor-pointer">
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-eco-700 via-eco-600 to-sky-600 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-[1.01] transition-transform">
                            EcoPortal LCA Tracker
                        </h1>
                        <p className="text-eco-700/80 text-xs md:text-sm mt-1 font-medium tracking-wide flex items-center justify-center md:justify-start gap-2">
                            <Sparkles className="w-3 h-3 text-solar-500 animate-pulse" />
                            An Incentive-Powered Digital Framework
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LcaHeader;
