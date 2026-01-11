import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

/* Generate pleasant random color */
const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`;

export default function CategoryTrendsChart({ data }) {
    if (!data || data.length === 0) return null;

    /* ----------------------------------
       Collect all category keys
    ---------------------------------- */
    const categorySet = new Set();
    data.forEach(d => {
        Object.keys(d.categories || {}).forEach(c =>
            categorySet.add(c)
        );
    });

    const categories = Array.from(categorySet);

    /* ----------------------------------
       Flatten data for recharts
    ---------------------------------- */
    const chartData = data.map(d => ({
        week: d.week,
        ...d.categories
    }));

    /* ----------------------------------
       Compute Y max dynamically
    ---------------------------------- */
    const maxValue = Math.max(
        ...chartData.flatMap(d =>
            categories.map(c => d[c] || 0)
        ),
        0
    );

    const yMax = Math.ceil(maxValue / 20) * 20 || 20;

    return (
        <ResponsiveContainer width="48%" height={320}>
            <BarChart data={chartData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis
                    domain={[0, yMax]}
                    tickCount={yMax / 20 + 1}
                />
                <Tooltip />
                <Legend />

                {categories.map(cat => (
                    <Bar
                        key={cat}
                        dataKey={cat}
                        stackId="a"
                        fill={randomColor()}
                        radius={[4, 4, 0, 0]}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
