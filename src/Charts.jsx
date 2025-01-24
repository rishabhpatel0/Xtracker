import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FFB6C1', '#ADD8E6', '#90EE90'];  
const RADIAN = Math.PI / 180;

const DEFAULT_CATEGORIES = [
    { name: 'Entertainment', value: 0 },
    { name: 'Food', value: 0 },
    { name: 'Traveling', value: 0 },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#36454F"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize="10px"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function PieChartComponent({ data }) {
    // Aggregate the total values for each category
    const aggregatedData = DEFAULT_CATEGORIES.map((category) => {
        const total = data
            .filter((item) => item.category === category.name)
            .reduce((sum, item) => sum + item.amount, 0);
        return { name: category.name, value: total };
    });

    const hasData = aggregatedData.some((item) => item.value > 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={aggregatedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={hasData ? renderCustomizedLabel : undefined} // Only render labels if data exists
                    outerRadius="80%"
                    dataKey="value"
                >
                    {aggregatedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend iconType="circle" verticalAlign="bottom" />
            </PieChart>
        </ResponsiveContainer>
    );
}
