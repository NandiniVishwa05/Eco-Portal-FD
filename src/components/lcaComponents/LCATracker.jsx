// LCATracker.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

// Recharts
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

// Icons
import { Leaf, Sparkles, Factory, Truck, Recycle } from 'lucide-react';
import { PRODUCTS_DATA } from '../../constants/PRODUCTS_DATA';

/* ---------- Helper for Blockchain Stage Icons ---------- */
const getIconForStage = (stageName) => {
    if (stageName.toLowerCase().includes('manufact')) return <Factory />;
    if (stageName.toLowerCase().includes('transport')) return <Truck />;
    if (stageName.toLowerCase().includes('recycl')) return <Recycle />;
    return <Leaf />;
};

const LCATracker = () => {
    const { productId } = useParams();

    // ✅ single source of truth
    const selectedProduct = PRODUCTS_DATA.find(p => p.id === productId);

    if (!selectedProduct) {
        return (
            <div className="text-center py-20 text-red-600 font-bold">
                Product not found!
            </div>
        );
    }

    return (
        <div className="space-y-10">

            {/* ---------- Product Info ---------- */}
            <h2 className="text-3xl font-extrabold text-eco-800">
                {selectedProduct.title}
            </h2>

            <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />

            <p className="text-lg font-semibold text-eco-700">
                Cost: ₹{selectedProduct.cost}
            </p>

            <div>
                <h3 className="text-xl font-bold text-eco-800 mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-eco-700">
                    {selectedProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            {/* ---------- Charts & Savings ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-lg">
                    <h3 className="text-sm font-bold text-center mb-4">
                        Lifecycle Impact Analysis (CO₂)
                    </h3>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={selectedProduct.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis hide />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey="Conventional" fill="#fb7185" />
                            <Bar dataKey="EcoFriendly" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Savings */}
                <div className="bg-gradient-to-br from-eco-600 to-sky-700 text-white p-8 rounded-3xl shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <Leaf />
                        <h3 className="font-bold uppercase">Total Savings</h3>
                    </div>

                    <p className="mb-6 opacity-90">
                        {selectedProduct.savings.description}
                    </p>

                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-6xl font-black">
                            {selectedProduct.savings.value}
                        </span>
                        <span className="text-xl font-bold">
                            {selectedProduct.savings.unit}
                        </span>
                    </div>

                    <p className="italic text-sm opacity-80">
                        "{selectedProduct.savings.statement}"
                    </p>
                </div>
            </div>

            {/* ---------- Blockchain Lifecycle ---------- */}
            <div className="space-y-6">
                {selectedProduct.stages.map((stage, index) => (
                    <div
                        key={stage.id}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            {getIconForStage(stage.name)}
                            <h4 className="font-bold text-lg">
                                Step {index + 1}: {stage.name}
                            </h4>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-rose-600 font-bold">
                                Conventional: {stage.conventionalValue}
                            </div>
                            <div className="text-eco-600 font-bold">
                                Eco-Friendly: {stage.ecoValue}
                            </div>
                            <div className="text-slate-500">
                                {stage.insight}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default LCATracker;
