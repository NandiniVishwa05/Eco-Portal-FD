import React from 'react'
import img from "./bag.jpg"
import { Award, Leaf, ShoppingBag, Trash2, RefreshCw, Smartphone, TrendingUp, Sparkles } from 'lucide-react';

function LCATracker({ data }) {
    console.log(data);

    return (
        <div className="w-full mb-10 flex flex-col lg:flex-row gap-10">
            {/* ---------- Product Info ---------- */}
            <div className="flex flex-col gap-6 lg:gap-10 lg:w-1/2">
                <h2 className="text-3xl font-extrabold text-eco-800">
                    {data?.name}
                    {/* Reusable Bamboo Water Bottle */}
                </h2>

                <img
                    src={data?.image}
                    alt={data?.name}
                    className="
                        w-full
                        max-w-xs
                        sm:max-w-sm
                        md:max-w-md
                        mx-auto
                        rounded-2xl
                        shadow-lg
                    "
                />


                <p className="text-lg font-semibold text-eco-700">
                    Cost: ₹{data?.price}
                    {/* Cost: ₹500 */}
                </p>

                <div>
                    <h3 className="text-xl font-bold text-eco-800 mb-2">Features</h3>
                    <ul className="list-disc pl-5 space-y-1 text-eco-700">
                        {data?.features?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="lg:w-1/2 flex justify-center items-start">
                <div className="
                    bg-gradient-to-br
                    from-eco-800 via-eco-700 to-slate-900
                    text-white
                    p-6 sm:p-8 md:p-10
                    rounded-[2rem]
                    shadow-2xl
                    relative
                    overflow-hidden
                    ">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-solar-500/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-solar-500/30 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-sky-500/30 transition-colors"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-md shadow-inner ring-1 ring-white/20 animate-float">
                            <Award className="w-10 h-10 text-solar-400" />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-widest text-eco-200 mb-2">EcoPoints Earned</h3>
                        <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-solar-300 to-solar-500 drop-shadow-sm mb-4">
                            {data?.ecopoints}
                            {/* 500 */}
                        </div>
                        <span className="text-2xl font-bold text-white/90">SP</span>
                        <div className="mt-6">
                            <p className="text-xs font-bold text-eco-900 bg-solar-400 inline-block px-4 py-1.5 rounded-full shadow-lg shadow-solar-500/20 uppercase tracking-wide">
                                Redeemable at Certified Retailers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LCATracker