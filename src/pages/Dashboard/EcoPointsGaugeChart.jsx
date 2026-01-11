import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const ECOPOINTS_RANGES = [
    { range: '0-500', color: '#DC2626', status: 'Very Poor', value: 500 },
    { range: '501-1500', color: '#DC2626', status: 'Poor', value: 1000 },
    { range: '1501-2500', color: '#F97316', status: 'Low', value: 1000 },
    { range: '2501-3500', color: '#FBBF24', status: 'Medium', value: 1000 },
    { range: '3501-4500', color: '#86EFAC', status: 'Good', value: 1000 },
    { range: '4501-5000', color: '#22C55E', status: 'Very Good', value: 500 },
    { range: '5000+', color: '#15803D', status: 'Excellent', value: 500 }
];

const TOTAL_MAX = 5500;

const EcoPointsGaugeChart = ({ ecoPoints = 0 }) => {
    const cx = 100;
    const cy = 100;
    const iR = 42;
    const oR = 80;


    const getStatus = (points) => {
        if (points <= 500) return 'Very Poor';
        if (points <= 1500) return 'Poor';
        if (points <= 2500) return 'Low';
        if (points <= 3500) return 'Medium';
        if (points <= 4500) return 'Good';
        if (points <= 5000) return 'Very Good';
        return 'Excellent';
    };

    const getStatusColor = (points) => {
        if (points <= 500) return '#DC2626';
        if (points <= 1500) return '#DC2626';
        if (points <= 2500) return '#F97316';
        if (points <= 3500) return '#FBBF24';
        if (points <= 4500) return '#86EFAC';
        if (points <= 5000) return '#22C55E';
        return '#15803D';
    };

    const value = Math.min(ecoPoints, TOTAL_MAX);
    const angle = 180 - (value / TOTAL_MAX) * 180;
    const needleLength = oR + 10;

    const needleX = cx + needleLength * Math.cos(-angle * Math.PI / 180);
    const needleY = cy + needleLength * Math.sin(-angle * Math.PI / 180);

    const currentStatus = getStatus(ecoPoints);
    const currentColor = getStatusColor(ecoPoints);

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '12px',
            }}>


                <div style={{ position: 'relative', width: '200px' }}>
                    <PieChart width={200} height={130}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={ECOPOINTS_RANGES}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            stroke="none"
                        >
                            {ECOPOINTS_RANGES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>

                    <div style={{
                        position: 'absolute',
                        top: cy,
                        left: cx,
                        width: '0',
                        height: '0',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <svg
                            width="200"
                            height="200"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >


                            <line
                                x1={cx}
                                y1={cy}
                                x2={needleX}
                                y2={needleY}
                                stroke="#374151"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <circle cx={cx} cy={cy} r="8" fill="#374151" />
                            <circle cx={cx} cy={cy} r="4" fill="#fff" />
                        </svg>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: '#6B7280',
                        fontWeight: '500',
                        letterSpacing: '0.6px',
                        marginTop: '-4px'
                    }}>
                        CO₂ METER
                    </div>

                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '12px',
                    width: '100%'
                }}>
                    <div style={{
                        fontSize: '34px',
                        fontWeight: '800',
                        color: currentColor,
                        marginBottom: '6px',
                        letterSpacing: '0.5px'
                    }}>
                        {ecoPoints.toLocaleString()}
                    </div>

                    <div style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        backgroundColor: `${currentColor}20`, // soft background
                        color: currentColor,
                        fontSize: '15px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                    }}>
                        {currentStatus}
                    </div>

                </div>




            </div>

        </>
    );
};

export default EcoPointsGaugeChart;