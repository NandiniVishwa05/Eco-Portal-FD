import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

export default function ProgressChart({ data }) {
    const maxValue = Math.max(...data.map(d => d.ecopoints), 0);

    // Round up to nearest 20
    const yMax = Math.ceil(maxValue / 20) * 20;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis
                    domain={[0, yMax]}
                    tickCount={yMax / 20 + 1}
                />
                <Tooltip />
                <Bar
                    dataKey="ecopoints"
                    fill="#1f8f6a"
                    radius={[6, 6, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
