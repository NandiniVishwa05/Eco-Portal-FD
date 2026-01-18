import React from 'react';
import { Github } from 'lucide-react';

const LcaFooter = () => {
    return (
        <footer className="bg-gradient-to-b from-eco-900 via-emerald-950 to-slate-950 text-eco-100/60 py-12 text-center text-sm mt-12 border-t border-eco-800 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-eco-500 to-transparent opacity-50"></div>
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
                <p className="tracking-wide text-base">
                    &copy; {new Date().getFullYear()} EcoPortal Project. <span className="text-solar-500 font-bold">Innovating for Earth.</span>
                </p>
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10">
                    <Github className="w-4 h-4 group-hover:text-white transition-colors" />
                    <span className="group-hover:text-white transition-colors font-medium">Open Source Initiative</span>
                </div>
            </div>
        </footer>
    );
};

export default LcaFooter;
