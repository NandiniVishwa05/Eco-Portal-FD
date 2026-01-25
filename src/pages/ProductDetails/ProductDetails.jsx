import React, { useEffect } from 'react'
import LCATracker from './LCATracker'
// import EcoPointsSimulator from './EcoPointsSimulator'
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
import logo from "../../assets/avani_logo.png";
import { CheckCircle2, XCircle, BookOpen, QrCode, ArrowRight, ExternalLink } from 'lucide-react';
import img from "./bag.jpg"
import { useParams } from 'react-router-dom';
import { getProductById, getRecommendedProducts } from '../../services/productService';
import { Box } from "@mui/material";
import FullScreenLoader from '../../components/common/FullScreenLoader';
import EcoAlert from '../../components/common/EcoAlertDialog';

function ProductDetails() {
    const { product_id } = useParams();
    const [productData, setProductData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingMessage, setLoadingMessage] = React.useState("Getting Product Details...");
    const [recommendedProducts, setRecommendedProducts] = React.useState([]);
    const [alert, setAlert] = React.useState({
        open: false,
        type: "success",
        message: ""
    });
    const chartData = [
        { name: 'Raw Material', Conventional: 40, EcoFriendly: 18 },
        { name: 'Manufacturing', Conventional: 30, EcoFriendly: 14 },
        { name: 'Transport', Conventional: 20, EcoFriendly: 9 },
        { name: 'Usage', Conventional: 15, EcoFriendly: 4 },
        { name: 'Disposal', Conventional: 25, EcoFriendly: 8 }
    ];

    const QR_PRODUCTS = [
        { name: 'Cloth Bag (Cotton)', id: 'bag-comparison', uniqueId: '4820193746' },
        { name: 'Coir Scrubber', id: 'scrubber-comparison', uniqueId: '9283746102' },
        { name: 'Metal Bottle', id: 'bottle-comparison', uniqueId: '1029384756' },
        { name: 'Cloth Bag (Jute)', id: 'carry-bag-comparison', uniqueId: '5647382910' }
    ];

    const BASE_URL = "https://aistudio.google.com/apps/drive/1TVfWiQ3bjfR2Hkr6ElPr1Xl2w5DN2axe?showPreview=true&showAssistant=true";

    useEffect(() => {
        console.log("Product ID:", product_id);
        setLoading(true);
        setLoadingMessage("Getting Product Details...");
        getProductById(product_id).then((data) => {
            console.log("Product data:", data);
            setProductData(data.data.data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setAlert({
                open: true,
                type: "error",
                message: "Error getting product data"
            });
            console.error("Error fetching product data:", error);
        });

        getRecommendedProducts(product_id).then((data) => {
            console.log("Recommended products:", data.data);
            setRecommendedProducts(data.data.data.recommended_products);
        }).catch((error) => {
            setAlert({
                open: true,
                type: "error",
                message: "Error getting recommended products"
            });
            console.error("Error fetching recommended products:", error);
        });
    }, [product_id]);

    const lifecycleChartData = React.useMemo(() => {
        if (!productData?.lifecycle) return [];

        const l = productData.lifecycle;
        if (productData.lifecycle.is_reusable) {
            return [
                {
                    name: "Raw Material",
                    eco_friendly: l.raw_material_weight * l.emission_factor
                },
                {
                    name: "Manufacturing",
                    eco_friendly: l.manufacturing_co2
                },
                {
                    name: "Transport",
                    eco_friendly: l.transport_co2
                },
                {
                    name: "Washing",
                    eco_friendly: l.washing_co2
                },
                {
                    name: "End of Life",
                    eco_friendly: l.end_of_life_co2
                }
            ];
        }
        return [
            {
                name: "Raw Material",
                eco_friendly: l.raw_material_weight * l.emission_factor
            },
            {
                name: "Manufacturing",
                eco_friendly: l.manufacturing_co2
            },
            {
                name: "Transport",
                eco_friendly: l.transport_co2
            },
            {
                name: "End of Life",
                eco_friendly: l.end_of_life_co2
            }
        ];
    }, [productData]);

    return (
        <div>
            <FullScreenLoader
                open={loading}
                message={loadingMessage}
            />
            <EcoAlert
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />
            <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-gradient-to-br from-eco-100 via-sky-50 to-eco-50 selection:bg-eco-200">
                {/* Header */}
                <header className="bg-white/70 backdrop-blur-xl text-eco-900 shadow-lg shadow-eco-100/20 sticky top-0 z-50 border-b border-white/50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">

                        {/* MOBILE HEADER */}
                        <div className="flex items-center  sm:hidden">
                            <Box
                                sx={{
                                    width: 72,
                                    height: 52,
                                    borderRadius: "12px",
                                    // background: "linear-gradient(180deg,#e7fff3,#d1fbec)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // boxShadow: "0 6px 16px rgba(10,60,50,0.08)",
                                    flexShrink: 0,
                                }}
                            >
                                <img src={logo} alt="AVANI-C" className="w-18 h-14" />
                            </Box>

                            <div className="leading-tight">
                                <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-eco-700 via-eco-600 to-sky-600 bg-clip-text text-transparent">
                                    AVANI-C LCA Tracker
                                </h1>
                                <p className="text-[11px] text-eco-700/80 font-medium">
                                    An Incentive-Powered Digital Framework
                                </p>
                            </div>
                        </div>

                        {/* DESKTOP HEADER (UNCHANGED DESIGN) */}
                        <div className="hidden sm:flex flex-row justify-start items-center gap-4">
                            <Box
                                sx={{
                                    width: "100px",
                                    height: "80px",
                                    borderRadius: "14px",
                                    background: "linear-gradient(180deg,#e7fff3,#d1fbec)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "26px",
                                    boxShadow: "0 12px 30px rgba(10,60,50,0.06)",
                                    flexShrink: 0,
                                }}
                            >
                                <img src={logo} alt="AVANI-C" />
                            </Box>

                            <div className="text-left group cursor-pointer">
                                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-eco-700 via-eco-600 to-sky-600 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-[1.01] transition-transform">
                                    AVANI-C LCA Tracker
                                </h1>
                                <p className="text-eco-700/80 text-sm mt-1 font-medium tracking-wide">
                                    An Incentive-Powered Digital Framework
                                </p>
                            </div>
                        </div>

                    </div>
                </header>


                {/* Navigation (Manual Tabs for Simulator & Research) */}
                {/* <nav className="bg-white/30 backdrop-blur-md shadow-sm z-40 border-b border-white/20 sticky top-[85px] md:top-[96px]">
                    <div className="max-w-6xl mx-auto px-4 py-2">
                        <div className="flex justify-center md:justify-start gap-2 md:gap-4 overflow-x-auto no-scrollbar p-1">
                            <button
                                // onClick={() => setActiveTab(Tab.SIMULATOR)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 whitespace-nowrap border bg-gradient-to-r from-eco-600 to-emerald-600 text-white shadow-lg shadow-eco-600/30 border-transparent`}
                            >
                                <Calculator className={"w-4 h-4 text-solar-300"} />
                                Simulator
                            </button>
                        </div>
                    </div>
                </nav> */}

                {/* Main Content */}
                <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 transition-all duration-500 ease-in-out">
                    <div className="animate-fadeIn space-y-6 sm:space-y-8 mb-8">
                        <div className="text-center md:text-left space-y-3 relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-solar-100/30 to-eco-100/30 border border-solar-100/50 backdrop-blur-sm">
                            <h2 className="text-3xl font-extrabold text-eco-900 inline-block">
                                Your Impact. <span className="text-solar-500">Your Rewards.</span>
                            </h2>
                            <p className="text-eco-700/80 max-w-3xl text-lg">
                                The <strong>Reward-Based Mechanism</strong> converts your positive behaviour into measurable EcoPoints.
                            </p>
                        </div>
                    </div>

                    <LCATracker data={productData} />

                    <div className="">
                        {/* Chart */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg">
                            <h3 className="text-sm font-bold text-center mb-4">
                                Blockchain Chart (CO₂)
                            </h3>

                            <div className="h-[220px] sm:h-[260px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={lifecycleChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="eco_friendly" fill="#34d399" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mt-10">
                        <div
                            className="bg-white p-6 rounded-2xl shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <h4 className="font-bold text-lg">
                                    Step 1: Raw Material Extraction
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="text-eco-600 font-bold">
                                    Eco-Friendly: {productData?.lifecycle?.raw_material_weight * productData?.lifecycle?.emission_factor}
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white p-6 rounded-2xl shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <h4 className="font-bold text-lg">
                                    Step 2: Manufacturing
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="text-eco-600 font-bold">
                                    Eco-Friendly: {productData?.lifecycle?.manufacturing_co2}
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-white p-6 rounded-2xl shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <h4 className="font-bold text-lg">
                                    Step 3: Transportation
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="text-eco-600 font-bold">
                                    Eco-Friendly: {productData?.lifecycle?.transport_co2}
                                </div>
                            </div>
                        </div>
                        {productData?.lifecycle?.washing_co2 &&
                            <div
                                className="bg-white p-6 rounded-2xl shadow-md"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <h4 className="font-bold text-lg">
                                        Step 4: Washing
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                    <div className="text-eco-600 font-bold">
                                        Eco-Friendly: {productData?.lifecycle?.washing_co2}
                                    </div>
                                </div>
                            </div>
                        }
                        <div
                            className="bg-white p-6 rounded-2xl shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <h4 className="font-bold text-lg">
                                    Step {productData?.lifecycle?.washing_co2 ? 5 : 4}: End of life
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="text-eco-600 font-bold">
                                    Eco-Friendly: {productData?.lifecycle?.end_of_life_co2}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-54 pt-16 border-t border-eco-200/50">
                        <div className="text-center mb-12 relative">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eco-200 to-transparent -z-10"></div>
                            <div className="inline-block bg-gradient-to-b from-eco-50 to-white px-8 py-4 rounded-3xl border border-eco-100 shadow-sm">
                                <div className="flex flex-col items-center gap-2">
                                    {/* <div className="p-3 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full text-sky-700 shadow-inner">
                                        <QrCode className="w-8 h-8" />
                                    </div> */}
                                    <h3 className="text-3xl font-extrabold text-eco-900">
                                        Other Substitues
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {recommendedProducts.map((product) => {
                                // Ensure we append parameters correctly to the existing query string
                                // const productUrl = `${BASE_URL}&product=${product.id}&title=${encodeURIComponent(product.name)}&id=${product.uniqueId}`;
                                // const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(productUrl)}&color=064e3b&bgcolor=ecfdf5`; // Dark Green QR on Eco Bg

                                return (
                                    <div key={product?._id} className="bg-gradient-to-b from-white to-eco-50/50 p-6 rounded-[2rem] shadow-lg shadow-eco-100/30 border border-white ring-1 ring-eco-100 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl hover:shadow-eco-200/50 transition-all duration-500 group relative overflow-hidden">

                                        {/* Decorative background blob */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-eco-100 to-sky-100 rounded-bl-[4rem] -mr-8 -mt-8 opacity-50 transition-all group-hover:scale-110"></div>

                                        <h4 className="font-bold text-eco-900 text-lg mb-1">{product?.name}</h4>
                                        <div className="relative z-10 bg-white p-4 rounded-2xl border border-eco-100 mb-5 shadow-sm group-hover:shadow-md transition-all">
                                            <img src={product?.image} alt={`Image for ${product?.name}`} className="w-40 h-40 object-contain mix-blend-multiply opacity-90 group-hover:opacity-100" />
                                        </div>

                                        <div className="relative z-10 w-full">
                                            {/* <div className="text-[10px] text-eco-600 font-mono mb-3 opacity-70">{product.id}</div> */}

                                            <a href={`${window.location.origin}/product-details/${product?._id}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 w-full py-2 bg-white border border-eco-200 rounded-xl text-xs font-bold text-eco-700 hover:bg-eco-50 hover:text-eco-800 transition-colors shadow-sm">
                                                <ExternalLink className="w-3 h-3" /> View Product
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* LCA Tracker Routes (Dedicated URLs) */}
                    {/* <Routes>
                        <Route path="/lca/:productId" element={<LCATracker />} />
                    </Routes> */}
                </main>

                {/* Footer */}
                <footer className="bg-gradient-to-b from-eco-900 via-emerald-950 to-slate-950 text-eco-100/60 py-12 text-center text-sm mt-12 border-t border-eco-800 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-eco-500 to-transparent opacity-50"></div>
                    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
                        <p className="tracking-wide text-base">
                            &copy; {new Date().getFullYear()} EcoPortal Project. <span className="text-solar-500 font-bold">Innovating for Earth.</span>
                        </p>
                        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/10">
                            {/* <Github className="w-4 h-4 group-hover:text-white transition-colors" /> */}
                            <span className="group-hover:text-white transition-colors font-medium">Open Source Initiative</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ProductDetails