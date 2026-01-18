import React from 'react';
import { CheckCircle2, XCircle, BookOpen, QrCode, ArrowRight, ExternalLink } from 'lucide-react';
import { RESEARCH_FINDINGS } from '../../constants/constants';

const QR_PRODUCTS = [
    { name: 'Cloth Bag (Cotton)', id: 'bag-comparison', uniqueId: '4820193746' },
    { name: 'Coir Scrubber', id: 'scrubber-comparison', uniqueId: '9283746102' },
    { name: 'Metal Bottle', id: 'bottle-comparison', uniqueId: '1029384756' },
    { name: 'Cloth Bag (Jute)', id: 'carry-bag-comparison', uniqueId: '5647382910' },
    { name: 'Paper Plates', id: 'plate-comparison', uniqueId: '7382910465' },
    { name: 'Bamboo Toothbrush', id: 'toothbrush-comparison', uniqueId: '6473829102' },
    { name: 'Steel Straw', id: 'straw-comparison', uniqueId: '8392017465' },
    { name: 'Reusable Cup', id: 'cup-comparison', uniqueId: '2938475610' },
];

const BASE_URL = "https://aistudio.google.com/apps/drive/1TVfWiQ3bjfR2Hkr6ElPr1Xl2w5DN2axe?showPreview=true&showAssistant=true";

const ResearchFindings = () => {
    return (
        <div className="animate-slideUp space-y-10 pb-20">
            {/* Header */}
            <div className="text-center md:text-left space-y-3 relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-eco-50/80 to-sky-50/80 border border-white/40 shadow-sm backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-eco-900 inline-block border-b-4 border-solar-400 pb-1">
                    An Incentive-Powered Framework
                </h2>
                <p className="text-eco-800/80 max-w-3xl text-lg font-medium">
                    Evidence-based strategies supporting the <span className="text-eco-600 font-bold">EcoPortal</span> methodology.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Hypotheses List */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-eco-100 to-eco-200 rounded-xl text-eco-700 shadow-sm">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-eco-800">Research Findings</h3>
                    </div>

                    {RESEARCH_FINDINGS.map((finding) => (
                        <div key={finding.id} className="bg-gradient-to-b from-white to-eco-50/30 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60 hover:shadow-xl hover:shadow-eco-100/50 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 bottom-0 w-2 ${finding.hypothesisStatus === 'Accepted' ? 'bg-gradient-to-b from-eco-400 to-eco-600' : 'bg-gradient-to-b from-red-400 to-red-600'}`}></div>

                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-eco-700 transition-colors">{finding.title}</h4>
                                {finding.hypothesisStatus === 'Accepted' ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-eco-100 text-eco-700 text-xs font-bold rounded-full uppercase tracking-wide border border-eco-200 shadow-sm">
                                        <CheckCircle2 className="w-4 h-4" /> Accepted
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wide border border-red-100 shadow-sm">
                                        <XCircle className="w-4 h-4" /> Rejected
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-600 leading-relaxed text-base mb-4">
                                {finding.content.split('**').map((part, index) =>
                                    index % 2 === 1 ? <strong key={index} className="text-eco-800 bg-eco-100/50 px-1 rounded">{part}</strong> : part
                                )}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-eco-100/50">
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                    Citations: {finding.citations.map(c => `[${c}]`).join(', ')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Conclusion Block */}
                <div className="lg:sticky lg:top-28 h-fit">
                    <div className="bg-gradient-to-br from-eco-900 via-emerald-900 to-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden ring-4 ring-eco-50/50 group">
                        {/* Background Accents */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-eco-600/40 rounded-full blur-3xl group-hover:bg-eco-500/50 transition-colors duration-1000"></div>
                        <div className="absolute -left-10 -top-10 w-48 h-48 bg-sky-600/30 rounded-full blur-3xl group-hover:bg-sky-500/40 transition-colors duration-1000"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                        <h3 className="text-2xl font-bold mb-8 relative z-10 flex items-center gap-3">
                            Conclusion & Implication
                            <div className="h-1 flex-grow bg-gradient-to-r from-eco-500 to-transparent rounded-full opacity-50"></div>
                        </h3>

                        <div className="space-y-8 relative z-10">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
                                <p className="text-eco-50 leading-relaxed mb-3 text-lg font-light">
                                    The study highlights the urgent need for an integrated digital solution such as <strong className="text-solar-400 font-bold">EcoPoints</strong> that combines rewards, behavioural insights, and technology.
                                </p>
                                <div className="text-xs text-eco-300 opacity-60 font-mono">[cite: 94]</div>
                            </div>

                            <div>
                                <h4 className="font-bold text-sky-400 mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4" /> Problem Solved
                                </h4>
                                <div className="pl-4 border-l-2 border-solar-500">
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        We provide a <strong className="text-white">Functional Prototype</strong> that uses the Blockchain metaphor to provide transparent product information and a <strong className="text-solar-300">Reward Mechanism</strong> to drive positive behaviour.
                                    </p>
                                    <div className="text-xs text-slate-500 mt-2 font-mono">[cite: 25, 51, 93]</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* NEW QR CODES SECTION */}
            <div className="mt-24 pt-16 border-t border-eco-200/50">
                <div className="text-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eco-200 to-transparent -z-10"></div>
                    <div className="inline-block bg-gradient-to-b from-eco-50 to-white px-8 py-4 rounded-3xl border border-eco-100 shadow-sm">
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full text-sky-700 shadow-inner">
                                <QrCode className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-eco-900 mt-2">
                                Product QR Codes
                            </h3>
                            <p className="text-eco-600 font-medium">Scan with your camera to view the full Life Cycle Assessment</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {QR_PRODUCTS.map((product) => {
                        // Ensure we append parameters correctly to the existing query string
                        const productUrl = `${BASE_URL}&product=${product.id}&title=${encodeURIComponent(product.name)}&id=${product.uniqueId}`;
                        const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(productUrl)}&color=064e3b&bgcolor=ecfdf5`; // Dark Green QR on Eco Bg

                        return (
                            <div key={product.id} className="bg-gradient-to-b from-white to-eco-50/50 p-6 rounded-[2rem] shadow-lg shadow-eco-100/30 border border-white ring-1 ring-eco-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl hover:shadow-eco-200/50 transition-all duration-500 group relative overflow-hidden">

                                {/* Decorative background blob */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-eco-100 to-sky-100 rounded-bl-[4rem] -mr-8 -mt-8 opacity-50 transition-all group-hover:scale-110"></div>

                                <div className="relative z-10 bg-white p-4 rounded-2xl border border-eco-100 mb-5 shadow-sm group-hover:shadow-md transition-all">
                                    <img src={qrImage} alt={`QR for ${product.name}`} className="w-40 h-40 object-contain mix-blend-multiply opacity-90 group-hover:opacity-100" />
                                </div>

                                <div className="relative z-10 w-full">
                                    <h4 className="font-bold text-eco-900 text-lg mb-1">{product.name}</h4>
                                    <div className="text-[10px] text-eco-600 font-mono mb-3 opacity-70">{product.id}</div>

                                    <a href={productUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 w-full py-2 bg-white border border-eco-200 rounded-xl text-xs font-bold text-eco-700 hover:bg-eco-50 hover:text-eco-800 transition-colors shadow-sm">
                                        <ExternalLink className="w-3 h-3" /> Open Link
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default ResearchFindings;
