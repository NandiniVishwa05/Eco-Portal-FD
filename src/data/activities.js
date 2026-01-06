// Sample activity data with seed generation
export const initialActivities = [
    { id: '#1001', user: 'DELL College', type: 'Institution', category: 'Paper', ep: 30, co2: 1.2, status: 'Approved', date: '12 Nov 2025', lat: 19.0760, lon: 72.8777 },
    { id: '#1002', user: 'R. Kumar', type: 'Citizen', category: 'Plastic', ep: 12, co2: 0.4, status: 'Pending', date: '14 Nov 2025', lat: 19.0890, lon: 72.8650 },
    { id: '#1003', user: 'SHREE College', type: 'Institution', category: 'Reuse', ep: 45, co2: 2.1, status: 'Approved', date: '16 Nov 2025', lat: 19.0650, lon: 72.8810 },
    { id: '#1004', user: 'A. Singh', type: 'Citizen', category: 'Energy Saving', ep: 8, co2: 0.8, status: 'Flagged', date: '17 Nov 2025', lat: 28.7041, lon: 77.1025 },
    { id: '#1005', user: 'M. Fernandes', type: 'Citizen', category: 'Plantation', ep: 20, co2: 1.0, status: 'Approved', date: '18 Nov 2025', lat: 12.9716, lon: 77.5946 },
    { id: '#1006', user: 'SHREE College', type: 'Institution', category: 'Plastic', ep: 25, co2: 1.1, status: 'Pending', date: '19 Nov 2025', lat: 19.0400, lon: 72.8800 },
    { id: '#1007', user: 'S. Shah', type: 'Citizen', category: 'Metal', ep: 15, co2: 0.6, status: 'Approved', date: '20 Nov 2025', lat: 19.2000, lon: 72.8500 }
];

// Generate random seed data for heatmap visibility
export function generateSeedActivities(count = 80) {
    const categories = ['Paper', 'Metal', 'Plastic', 'Energy Saving', 'Plantation', 'Reuse', 'Glass', 'Organic', 'Cloth'];
    const activities = [];

    for (let i = 0; i < count; i++) {
        const lat = 8 + Math.random() * 22;
        const lon = 68 + Math.random() * 20;
        const cat = categories[Math.floor(Math.random() * categories.length)];

        activities.push({
            id: '#R' + (3000 + i),
            user: 'User' + i,
            type: Math.random() > 0.6 ? 'Citizen' : 'Institution',
            category: cat,
            ep: Math.floor(Math.random() * 60) + 5,
            co2: +(Math.random() * 2).toFixed(2),
            status: Math.random() > 0.6 ? 'Approved' : 'Pending',
            date: 'Nov 2025',
            lat,
            lon
        });
    }

    return activities;
}

// Get all activities (initial + seed)
export function getAllActivities() {
    return [...initialActivities, ...generateSeedActivities()];
}
