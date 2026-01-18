export const PRODUCTS_DATA = [
  {
    id: 'cloth-bag',
    title: 'Cloth Bag',
    image: '/images/bag.jpg',
    cost: 30,
    features: [
      'Reusable 50–70 times, replacing single-use plastic bags.',
      'Lower carbon footprint, earning higher EcoPoints.',
      'Strong, washable, and durable.',
      'Reduces plastic waste with every use.',
      'Long-term economic and environmental benefit.'
    ],
    chartData: [
      { name: 'Raw Material', Conventional: 40, EcoFriendly: 18 },
      { name: 'Manufacturing', Conventional: 30, EcoFriendly: 14 },
      { name: 'Transport', Conventional: 20, EcoFriendly: 9 },
      { name: 'Usage', Conventional: 15, EcoFriendly: 4 },
      { name: 'Disposal', Conventional: 25, EcoFriendly: 8 }
    ],
    savings: {
      description: 'Significant reduction in carbon emissions by replacing single-use plastic bags.',
      value: 65,
      unit: '%',
      statement: 'Every reusable choice compounds into environmental savings.'
    },
    stages: [
      { id: 'cb-1', name: 'Raw Material Sourcing', conventionalValue: 40, ecoValue: 18, insight: 'Natural fibers reduce fossil fuel dependency.' },
      { id: 'cb-2', name: 'Manufacturing', conventionalValue: 30, ecoValue: 14, insight: 'Low-energy stitching replaces plastic molding.' },
      { id: 'cb-3', name: 'Transportation', conventionalValue: 20, ecoValue: 9, insight: 'Local sourcing reduces logistics emissions.' },
      { id: 'cb-4', name: 'Usage Phase', conventionalValue: 15, ecoValue: 4, insight: 'Multiple reuses eliminate repeated production.' },
      { id: 'cb-5', name: 'End of Life', conventionalValue: 25, ecoValue: 8, insight: 'Biodegradable disposal avoids microplastic pollution.' }
    ]
  },

  {
    id: 'steel-bottle',
    title: 'Steel Water Bottle',
    image: '/images/steel-bottle.jpg',
    cost: 450,
    features: [
      'Reusable for years.',
      'Eliminates plastic bottles.',
      'High EcoPoints reward.',
      'Safe and durable.'
    ],
    chartData: [
      { name: 'Raw Material', Conventional: 60, EcoFriendly: 35 },
      { name: 'Manufacturing', Conventional: 45, EcoFriendly: 25 },
      { name: 'Transport', Conventional: 30, EcoFriendly: 18 },
      { name: 'Usage', Conventional: 50, EcoFriendly: 5 },
      { name: 'Disposal', Conventional: 35, EcoFriendly: 15 }
    ],
    savings: {
      description: 'Massive plastic waste avoidance through long-term reuse.',
      value: 80,
      unit: '%',
      statement: 'One steel bottle can replace thousands of plastic bottles.'
    },
    stages: [
      { id: 'sb-1', name: 'Raw Material Extraction', conventionalValue: 60, ecoValue: 35, insight: 'Steel has higher initial impact but long lifecycle.' },
      { id: 'sb-2', name: 'Manufacturing', conventionalValue: 45, ecoValue: 25, insight: 'Modern furnaces reduce per-unit emissions.' },
      { id: 'sb-3', name: 'Transportation', conventionalValue: 30, ecoValue: 18, insight: 'Bulk logistics lowers carbon per bottle.' },
      { id: 'sb-4', name: 'Usage Phase', conventionalValue: 50, ecoValue: 5, insight: 'Years of reuse offset production impact.' },
      { id: 'sb-5', name: 'Recycling', conventionalValue: 35, ecoValue: 15, insight: 'Steel is highly recyclable with minimal waste.' }
    ]
  },

  {
    id: 'wooden-ruler',
    title: 'Wooden Ruler',
    image: '/images/ruler.jpg',
    cost: 40,
    features: [
      'Made from natural, renewable wood, not plastic or chemicals.',
'Lower CO₂ emissions → more EcoPoints whenever purchased.',
'Sturdy and long-lasting, does not crack easily like plastic scales.',
'Safe for children, no sharp edges or harmful materials.',
'Cost recovered through durability + EcoPoints, making it cheaper in the long run'
    ],
    chartData: [
      { name: 'Raw Material', Conventional: 30, EcoFriendly: 12 },
      { name: 'Manufacturing', Conventional: 20, EcoFriendly: 10 },
      { name: 'Transport', Conventional: 15, EcoFriendly: 8 },
      { name: 'Usage', Conventional: 10, EcoFriendly: 3 },
      { name: 'Disposal', Conventional: 20, EcoFriendly: 5 }
    ],
    savings: {
      description: 'Reduces plastic waste and microplastic pollution.',
      value: 55,
      unit: '%',
      statement: 'Choosing wood supports renewable material cycles.'
    },
    stages: [
      { id: 'wr-1', name: 'Wood Sourcing', conventionalValue: 30, ecoValue: 12, insight: 'Sustainably sourced wood lowers emissions.' },
      { id: 'wr-2', name: 'Manufacturing', conventionalValue: 20, ecoValue: 10, insight: 'Simple cutting and polishing process.' },
      { id: 'wr-3', name: 'Transportation', conventionalValue: 15, ecoValue: 8, insight: 'Lightweight reduces fuel consumption.' },
      { id: 'wr-4', name: 'Usage Phase', conventionalValue: 10, ecoValue: 3, insight: 'Long-lasting classroom use.' },
      { id: 'wr-5', name: 'Biodegradation', conventionalValue: 20, ecoValue: 5, insight: 'Naturally decomposes without toxic residue.' }
    ]
  },

  {
    id: 'plastic-ruler',
    title: 'Plastic Ruler',
    image: '/images/plastic-ruler.jpg',
    cost: 20,
    features: [
     'Cheap initially, but breaks easily, requiring frequent repurchase.',
'Higher CO₂ footprint, so EcoPoints earned are very low.',
'Made from non-biodegradable plastic, adding to landfill waste',
'Can bend, warp, or crack under pressure',
'No long-term value, because cost is repeated + very low reward return.'

    ],
    chartData: [
      { name: 'Raw Material', Conventional: 45, EcoFriendly: 45 },
      { name: 'Manufacturing', Conventional: 35, EcoFriendly: 35 },
      { name: 'Transport', Conventional: 20, EcoFriendly: 20 },
      { name: 'Usage', Conventional: 15, EcoFriendly: 15 },
      { name: 'Disposal', Conventional: 40, EcoFriendly: 40 }
    ],
    savings: {
      description: 'Minimal environmental savings due to plastic composition.',
      value: 10,
      unit: '%',
      statement: 'Plastic rulers contribute to long-term waste accumulation.'
    },
    stages: [
      { id: 'pr-1', name: 'Petroleum Extraction', conventionalValue: 45, ecoValue: 45, insight: 'Derived from fossil fuels.' },
      { id: 'pr-2', name: 'Plastic Molding', conventionalValue: 35, ecoValue: 35, insight: 'Energy-intensive manufacturing.' },
      { id: 'pr-3', name: 'Transportation', conventionalValue: 20, ecoValue: 20, insight: 'Mass distribution increases emissions.' },
      { id: 'pr-4', name: 'Usage Phase', conventionalValue: 15, ecoValue: 15, insight: 'Short lifespan due to breakage.' },
      { id: 'pr-5', name: 'Disposal', conventionalValue: 40, ecoValue: 40, insight: 'Remains in environment for centuries.' }
    ]
  }
];
