// Tab constants - replacement for TypeScript enum
export const TAB = {
    SIMULATOR: 'SIMULATOR',
    RESEARCH_FINDINGS: 'RESEARCH'
};

export const LCA_DATA = {
    'bag-comparison': {
        id: 'bag-comparison',
        title: 'Cloth Bag (Cotton) vs. Plastic Bag (HDPE)',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Plastic+Bag+(HDPE)',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Cotton+Cloth+Bag',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 0.70,
                ecoValue: 2.50,
                insight: 'Plastic wins on initial carbon. Cotton has a high upfront cost due to intensive farming and fertilizer.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 0.05,
                ecoValue: 0.50,
                insight: 'Processing heavy cotton fiber requires significantly more energy than light plastic film.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 0.01,
                ecoValue: 0.05,
                insight: 'Transport cost is low for both, but the plastic bag’s lightness provides an advantage.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '1 Use',
                ecoValue: '131 Uses',
                insight: 'THE BEHAVIOR BLOCK: The cloth bag must be reused 131 times to make its CO₂ per-use impact lower than the single-use plastic bag.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: '+0.05',
                ecoValue: '-0.10',
                insight: 'Plastic releases fossil CO₂ if incinerated. Cotton is 100% compostable.'
            }
        ],
        savings: {
            value: 0.74,
            unit: 'kg CO₂',
            description: 'Total CO₂ saving is calculated by comparing one Plastic Bag (0.76 kg) to the amortized per-use impact of the Cotton Bag after 131 uses (0.02 kg).',
            statement: 'By making the Eco-Conscious decision to reuse your Cloth Bag 131 times, you generate a total lifecycle CO₂ saving of 0.74 kg compared to choosing 131 plastic bags.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.70, EcoFriendly: 2.50 },
            { name: 'Mfg', Conventional: 0.05, EcoFriendly: 0.50 },
            { name: 'Logistics', Conventional: 0.01, EcoFriendly: 0.05 },
            { name: 'Disposal', Conventional: 0.05, EcoFriendly: 0.00 },
        ]
    },
    'scrubber-comparison': {
        id: 'scrubber-comparison',
        title: 'Coir Scrubber vs. Synthetic Sponge',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Synthetic+Sponge',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Coir+Scrubber',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 'High CO₂',
                ecoValue: 'Near Zero',
                insight: 'Coir is a waste byproduct of the coconut industry, giving it a massive "zero-cost" head-start over fossil-fuel based sponges.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 'High Heat',
                ecoValue: 'Low Energy',
                insight: 'The Coir process is much less energy-intensive, avoiding high-temperature chemical reactions.'
            },
            {
                id: 3,
                name: 'Usage (Micro-Pollution Block)',
                conventionalValue: 'Microplastics',
                ecoValue: 'Natural Fibers',
                insight: 'The Synthetic Sponge releases plastic fibers down the drain. The Coir Scrubber releases biodegradable fibers.'
            },
            {
                id: 4,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Persistent',
                ecoValue: 'Compostable',
                insight: 'The Coir Scrubber closes the supply loop, returning to the earth with zero landfill burden.'
            }
        ],
        savings: {
            value: 0.85,
            unit: 'kg CO₂',
            description: 'This comparison highlights a shift from a linear (Plastic) to a circular (Coir) economy.',
            statement: 'Choosing the Coir Scrubber eliminates microplastic pollution and landfill waste, generating an estimated 0.85 kg of CO₂ savings per unit replaced.'
        },
        chartData: [
            { name: 'Material', Conventional: 2.0, EcoFriendly: 0.1 },
            { name: 'Mfg', Conventional: 1.5, EcoFriendly: 0.3 },
            { name: 'Usage', Conventional: 0.5, EcoFriendly: 0.1 },
            { name: 'Disposal', Conventional: 1.0, EcoFriendly: 0.0 },
        ]
    },
    'bottle-comparison': {
        id: 'bottle-comparison',
        title: 'Metal Bottle (Steel) vs. Plastic Bottle',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Disposable+Plastic+Bottle',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Steel+Metal+Bottle',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 0.08,
                ecoValue: 1.20,
                insight: 'Steel extraction is energy-intensive compared to the small amount of petroleum required for one thin plastic bottle.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 0.02,
                ecoValue: 0.40,
                insight: 'Molding a plastic bottle is fast and low-energy. Forging steel requires high heat and processing.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 0.01,
                ecoValue: 0.15,
                insight: 'Steel bottles are heavy, increasing transport emissions significantly compared to lightweight plastic.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '1 Use',
                ecoValue: '50 Uses',
                insight: 'BEHAVIOR BLOCK: You must use the steel bottle ~50 times to offset its higher initial carbon footprint.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: '+0.04',
                ecoValue: '-0.50',
                insight: 'Plastic persists for 450+ years. Steel is 100% recyclable and has high scrap value.'
            }
        ],
        savings: {
            value: 12.5,
            unit: 'kg CO₂',
            description: 'Savings calculated over a 1-year period assuming 1 refill per day (365 plastic bottles avoided).',
            statement: 'By switching to a Steel Bottle, you prevent hundreds of plastic bottles from entering the ocean and save over 12kg of CO₂ annually.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.08, EcoFriendly: 1.2 },
            { name: 'Mfg', Conventional: 0.02, EcoFriendly: 0.4 },
            { name: 'Logistics', Conventional: 0.01, EcoFriendly: 0.15 },
            { name: 'Disposal', Conventional: 0.04, EcoFriendly: -0.1 },
        ]
    },
    'carry-bag-comparison': {
        id: 'carry-bag-comparison',
        title: 'Plastic Carry Bag vs. Cloth Bag (Jute)',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Single+Use+Polybag',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Jute+Carry+Bag',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 0.30,
                ecoValue: 0.50,
                insight: 'Jute is a natural crop (carbon sink) but requires water/land. LDPE is a fossil fuel byproduct.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 0.10,
                ecoValue: 0.20,
                insight: 'Weaving jute fibers is more mechanical and energy consuming than blowing thin plastic film.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 0.02,
                ecoValue: 0.10,
                insight: 'Jute bags are bulky and heavier to transport than ultra-thin LDPE bags.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '1 Use',
                ecoValue: '25 Uses',
                insight: 'BEHAVIOR BLOCK: Jute is durable. Using it just 25 times beats the carbon cost of 25 disposable bags.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Microplastics',
                ecoValue: 'Biodegradable',
                insight: 'Soft plastic (LDPE) is hard to recycle and becomes microplastics. Jute composts naturally.'
            }
        ],
        savings: {
            value: 1.5,
            unit: 'kg CO₂',
            description: 'Comparison based on replacing 100 plastic bags with a single durable Jute bag over its lifetime.',
            statement: 'A single Jute bag can replace hundreds of plastic bags, preventing fossil fuel extraction and marine pollution.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.3, EcoFriendly: 0.5 },
            { name: 'Mfg', Conventional: 0.1, EcoFriendly: 0.2 },
            { name: 'Logistics', Conventional: 0.02, EcoFriendly: 0.1 },
            { name: 'Disposal', Conventional: 0.1, EcoFriendly: 0.0 },
        ]
    },
    'plate-comparison': {
        id: 'plate-comparison',
        title: 'Thermocol Plates vs. Paper Plates',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Thermocol+Plate',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Recycled+Paper+Plate',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 'Fossil Fuels',
                ecoValue: 'Wood Pulp',
                insight: 'Thermocol starts as petroleum. Paper starts as trees or agricultural waste (renewable).'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 'Chemicals',
                ecoValue: 'Pulping',
                insight: 'Thermocol production uses blowing agents (historically CFCs). Paper involves pulping and pressing.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 'High Volume',
                ecoValue: 'Compact',
                insight: 'Thermocol is 95% air but very bulky, making transport inefficient per unit of weight.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: 'Toxic Leaching',
                ecoValue: 'Food Safe',
                insight: 'HEALTH BLOCK: Thermocol can leach styrene (a carcinogen) into hot food. Paper is generally safer.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Non-degradable',
                ecoValue: 'Compostable',
                insight: 'Thermocol takes 500+ years to decompose. Paper plates decompose in months.'
            }
        ],
        savings: {
            value: 0.15,
            unit: 'kg CO₂',
            description: 'Per 10-pack comparison. The main saving is waste volume and toxicity avoidance.',
            statement: 'Switching to paper eliminates a non-recyclable, bulky waste stream that clogs landfills for centuries.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 1.2, EcoFriendly: 0.8 },
            { name: 'Mfg', Conventional: 0.8, EcoFriendly: 0.5 },
            { name: 'Logistics', Conventional: 0.5, EcoFriendly: 0.3 },
            { name: 'Disposal', Conventional: 1.0, EcoFriendly: 0.1 },
        ]
    },
    'toothbrush-comparison': {
        id: 'toothbrush-comparison',
        title: 'Bamboo Toothbrush vs. Plastic Toothbrush',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Plastic+Toothbrush',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Bamboo+Toothbrush',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 'Petroleum',
                ecoValue: 'Bamboo',
                insight: 'Plastic relies on drilling oil. Bamboo is the fastest growing plant on earth and absorbs CO₂.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 'Molding',
                ecoValue: 'Carving',
                insight: 'Plastic is injection molded. Bamboo is shaped and carved, often with less chemical input.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 'Standard',
                ecoValue: 'Lightweight',
                insight: 'Both are light, but bamboo packaging is often plastic-free, reducing overall logistics weight.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '3 Months',
                ecoValue: '3 Months',
                insight: 'USAGE BLOCK: Both last the same amount of time. The difference is entirely in the waste footprint.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Landfill',
                ecoValue: 'Compost',
                insight: '5 billion plastic brushes are thrown away yearly. Bamboo handles can be composted in your garden.'
            }
        ],
        savings: {
            value: 0.03,
            unit: 'kg CO₂',
            description: 'Per unit savings. The aggregate impact of billions of brushes is massive.',
            statement: 'A simple switch prevents a piece of indestructible plastic from sitting in a landfill for 400 years.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.5, EcoFriendly: 0.1 },
            { name: 'Mfg', Conventional: 0.3, EcoFriendly: 0.2 },
            { name: 'Logistics', Conventional: 0.1, EcoFriendly: 0.1 },
            { name: 'Disposal', Conventional: 0.4, EcoFriendly: 0.0 },
        ]
    },
    'straw-comparison': {
        id: 'straw-comparison',
        title: 'Steel Straw vs. Plastic Straw',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Plastic+Straws',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Steel+Straw',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 0.02,
                ecoValue: 0.30,
                insight: 'Steel extraction is high-impact compared to the tiny amount of oil needed for a disposable straw.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 0.01,
                ecoValue: 0.15,
                insight: 'Extruding plastic requires very little heat. Steel forming requires significantly more energy.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 'Lightweight',
                ecoValue: 'Heavy',
                insight: 'You can ship thousands of plastic straws for the weight of a few dozen steel ones.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '1 Use',
                ecoValue: '100 Uses',
                insight: 'BEHAVIOR BLOCK: You must use the steel straw about 100 times to break even on emissions.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Ocean Waste',
                ecoValue: 'Recyclable',
                insight: 'Plastic straws are top ocean pollutants. Steel is durable and 100% recyclable.'
            }
        ],
        savings: {
            value: 0.04,
            unit: 'kg CO₂',
            description: 'Savings calculated per 1000 uses compared to 1000 disposable straws.',
            statement: 'While the steel straw has a high initial cost, using it for years prevents thousands of plastic straws from entering the ocean.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.02, EcoFriendly: 0.3 },
            { name: 'Mfg', Conventional: 0.01, EcoFriendly: 0.15 },
            { name: 'Logistics', Conventional: 0.01, EcoFriendly: 0.05 },
            { name: 'Disposal', Conventional: 0.05, EcoFriendly: 0.0 },
        ]
    },
    'cup-comparison': {
        id: 'cup-comparison',
        title: 'Reusable Cup vs. Disposable Cup',
        conventionalImage: 'https://placehold.co/400x300/e2e8f0/64748b?text=Paper+Coffee+Cup',
        ecoImage: 'https://placehold.co/400x300/f0fdf4/15803d?text=Reusable+Tumbler',
        stages: [
            {
                id: 1,
                name: 'Raw Material Sourcing',
                conventionalValue: 'Paper/Plastic',
                ecoValue: 'Ceramic/Steel',
                insight: 'Disposable cups require cutting trees or pumping oil. Reusable materials are mined once.'
            },
            {
                id: 2,
                name: 'Manufacturing & Processing',
                conventionalValue: 'Bleaching',
                ecoValue: 'Firing/Molding',
                insight: 'Paper cups undergo intense bleaching and plastic lining. Reusables are fired or molded once.'
            },
            {
                id: 3,
                name: 'Distribution & Logistics',
                conventionalValue: 'High Volume',
                ecoValue: 'One-Time',
                insight: 'Disposables require constant shipping of new stock. Reusables are shipped once.'
            },
            {
                id: 4,
                name: 'The Tipping Point (Usage)',
                conventionalValue: '15 Mins',
                ecoValue: '30 Uses',
                insight: 'BEHAVIOR BLOCK: Just 30 coffees in a reusable cup offsets its manufacturing impact.'
            },
            {
                id: 5,
                name: 'End-of-Life (Disposal)',
                conventionalValue: 'Landfill',
                ecoValue: 'Durable',
                insight: 'Disposable cups are rarely recycled due to linings. Reusables last for years.'
            }
        ],
        savings: {
            value: 3.5,
            unit: 'kg CO₂',
            description: 'Annual savings for a daily coffee drinker switching to a reusable cup.',
            statement: 'Switching to a reusable cup for your daily coffee saves over 3kg of CO₂ and prevents 365 cups from piling up in landfills every year.'
        },
        chartData: [
            { name: 'Sourcing', Conventional: 0.2, EcoFriendly: 0.8 },
            { name: 'Mfg', Conventional: 0.1, EcoFriendly: 0.4 },
            { name: 'Logistics', Conventional: 0.1, EcoFriendly: 0.1 },
            { name: 'Disposal', Conventional: 0.3, EcoFriendly: 0.0 },
        ]
    }
};

export const COMPANY_DATA = {
    // Bag Comparison Companies
    'tata-cotton-bag': {
        id: 'tata-cotton-bag',
        name: 'TATA Eco Fibre',
        logo: 'https://placehold.co/100x100/115e59/ffffff?text=TATA',
        productType: 'bag-comparison',
        co2Total: 2.2,
        ecoPoints: 50,
        description: 'Made from 100% regeneratively farmed cotton.',
        features: ['Solar Powered Loom', 'Natural Dyes']
    },
    'reliance-eco-cotton-bag': {
        id: 'reliance-eco-cotton-bag',
        name: 'Reliance R|Elan',
        logo: 'https://placehold.co/100x100/1e293b/ffffff?text=R|Elan',
        productType: 'bag-comparison',
        co2Total: 2.8,
        ecoPoints: 40,
        description: 'Recycled polyester blend for high durability.',
        features: ['Recycled PET', 'Zero Water Waste']
    },

    // Scrubber Companies
    'coir-board-india': {
        id: 'coir-board-india',
        name: 'Coir Board India',
        logo: 'https://placehold.co/100x100/d97706/ffffff?text=Coir+Bd',
        productType: 'scrubber-comparison',
        co2Total: 0.1,
        ecoPoints: 30,
        description: 'Government certified rural artisan product.',
        features: ['Hand Woven', 'No Chemicals']
    },
    'scotch-brite': {
        id: 'scotch-brite',
        name: 'Standard Synthetic',
        logo: 'https://placehold.co/100x100/ef4444/ffffff?text=Brand+X',
        productType: 'scrubber-comparison',
        co2Total: 4.5,
        ecoPoints: 5,
        description: 'Standard mass-manufactured polyurethane sponge.',
        features: ['High Durability', 'Plastic Based']
    },
    
    // Bottle Companies
    'milton-steel': {
        id: 'milton-steel',
        name: 'Milton Thermosteel',
        logo: 'https://placehold.co/100x100/3b82f6/ffffff?text=Milton',
        productType: 'bottle-comparison',
        co2Total: 3.5,
        ecoPoints: 120,
        description: 'High grade 304 stainless steel, vacuum insulated.',
        features: ['Lifetime Warranty', 'BPA Free']
    },
    'bisleri-plastic': {
        id: 'bisleri-plastic',
        name: 'Bisleri (Standard)',
        logo: 'https://placehold.co/100x100/22c55e/ffffff?text=Bisleri',
        productType: 'bottle-comparison',
        co2Total: 12.0, // Aggregated over usage
        ecoPoints: 0,
        description: 'Single use PET bottle.',
        features: ['Convenient', 'Recyclable']
    },

    // Carry Bag (Jute vs Plastic)
    'jute-cottage': {
        id: 'jute-cottage',
        name: 'Jute Smart',
        logo: 'https://placehold.co/100x100/a16207/ffffff?text=Jute',
        productType: 'carry-bag-comparison',
        co2Total: 0.5,
        ecoPoints: 45,
        description: 'Handcrafted jute bags supporting local artisans.',
        features: ['Handcrafted', '100% Biodegradable']
    },
    'generic-polybag': {
        id: 'generic-polybag',
        name: 'EasyPoly',
        logo: 'https://placehold.co/100x100/64748b/ffffff?text=Poly',
        productType: 'carry-bag-comparison',
        co2Total: 3.0,
        ecoPoints: 0,
        description: 'Standard single-use plastic carry bags.',
        features: ['Waterproof', 'Cheap']
    },

    // Plates (Paper vs Thermocol)
    'chuk-eco': {
        id: 'chuk-eco',
        name: 'Chuk',
        logo: 'https://placehold.co/100x100/84cc16/ffffff?text=Chuk',
        productType: 'plate-comparison',
        co2Total: 0.2,
        ecoPoints: 25,
        description: 'Compostable tableware made from bagasse agro-waste.',
        features: ['Bagasse Based', 'Microwavable']
    },
    'thermoking': {
        id: 'thermoking',
        name: 'ThermoKing',
        logo: 'https://placehold.co/100x100/f87171/ffffff?text=TK',
        productType: 'plate-comparison',
        co2Total: 2.5,
        ecoPoints: 5,
        description: 'Standard expanded polystyrene foam plates.',
        features: ['Lightweight', 'Insulated']
    },

    // Toothbrush (Bamboo vs Plastic)
    'bamboo-india': {
        id: 'bamboo-india',
        name: 'Bamboo India',
        logo: 'https://placehold.co/100x100/22c55e/ffffff?text=Bamboo',
        productType: 'toothbrush-comparison',
        co2Total: 0.05,
        ecoPoints: 15,
        description: 'Ergonomic handle made from neem wood and charcoal bristles.',
        features: ['Charcoal Bristles', 'Neem Wood']
    },
    'dentalpro': {
        id: 'dentalpro',
        name: 'DentalPro',
        logo: 'https://placehold.co/100x100/3b82f6/ffffff?text=Dental',
        productType: 'toothbrush-comparison',
        co2Total: 0.8,
        ecoPoints: 0,
        description: 'Mass-market plastic handle toothbrush.',
        features: ['Grip Handle', 'Nylon Bristles']
    },

    // Straw (Steel vs Plastic)
    'steelo': {
        id: 'steelo',
        name: 'Steelo',
        logo: 'https://placehold.co/100x100/94a3b8/ffffff?text=Steelo',
        productType: 'straw-comparison',
        co2Total: 0.1,
        ecoPoints: 20,
        description: 'Food grade stainless steel straws with cleaning kit.',
        features: ['Rust Proof', 'Cleaning Brush']
    },
    'quicksip': {
        id: 'quicksip',
        name: 'QuickSip',
        logo: 'https://placehold.co/100x100/ef4444/ffffff?text=Sip',
        productType: 'straw-comparison',
        co2Total: 1.5,
        ecoPoints: 0,
        description: 'Disposable colored plastic straws.',
        features: ['Bendable', 'Disposable']
    },

    // Cup (Reusable vs Disposable)
    'ecotumbler': {
        id: 'ecotumbler',
        name: 'EcoTumbler',
        logo: 'https://placehold.co/100x100/14b8a6/ffffff?text=EcoT',
        productType: 'cup-comparison',
        co2Total: 1.5,
        ecoPoints: 80,
        description: 'Double-wall insulated reusable coffee cup.',
        features: ['Double Wall', 'Leak Proof']
    },
    'dailybrew': {
        id: 'dailybrew',
        name: 'Daily Brew',
        logo: 'https://placehold.co/100x100/f59e0b/ffffff?text=Brew',
        productType: 'cup-comparison',
        co2Total: 25.0,
        ecoPoints: 0,
        description: 'Single-use paper cup with plastic lining.',
        features: ['Plastic Lined', 'Heat Sleeve']
    }
};

export const RESEARCH_FINDINGS = [
    {
        id: 'h1',
        title: 'H1: Awareness & Purchase',
        hypothesisStatus: 'Rejected',
        content: 'Environmental awareness alone showed a **negative link** with green purchase decisions, confirming that knowledge doesn\'t guarantee action.',
        citations: [50, 92]
    },
    {
        id: 'h2',
        title: 'H2: Reward Motivation',
        hypothesisStatus: 'Accepted',
        content: 'Rewards and incentives **positively encouraged** consumers to choose eco-friendly products, demonstrating the strong influence of a **Reward-Based Mechanism**.',
        citations: [51, 93]
    },
    {
        id: 'h3',
        title: 'H3: Environmental Attitude',
        hypothesisStatus: 'Accepted',
        content: 'A positive environmental attitude **strongly increased** the intention to buy sustainable products, which forms the basis for sustained green behaviour.',
        citations: [52, 93]
    }
];