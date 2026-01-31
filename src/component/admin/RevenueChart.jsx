'use client';
import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import { TrendingUp, Target, Activity } from 'lucide-react';

const velocityData = [
    { name: 'Mon', revenue: 4000, target: 4400 },
    { name: 'Tue', revenue: 3000, target: 3200 },
    { name: 'Wed', revenue: 2000, target: 2400 },
    { name: 'Thu', revenue: 2780, target: 2900 },
    { name: 'Fri', revenue: 1890, target: 2100 },
    { name: 'Sat', revenue: 2390, target: 2500 },
    { name: 'Sun', revenue: 3490, target: 3800 },
];

const historyData = [
    { name: 'Week 1', current: 15000, previous: 12000 },
    { name: 'Week 2', current: 18000, previous: 19000 },
    { name: 'Week 3', current: 22000, previous: 17000 },
    { name: 'Week 4', current: 25000, previous: 21000 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border-none rounded-2xl p-4 shadow-2xl ring-1 ring-white/10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 border-b border-white/5 pb-2">{label} Performance</p>
                <div className="space-y-2">
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{entry.name}</p>
                            </div>
                            <p className="text-sm font-black text-white">
                                ₹{entry.value.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const RevenueChart = () => {
    const [activeTab, setActiveTab] = useState('velocity');

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 relative overflow-hidden group">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h3 className="font-black text-gray-900 text-xl tracking-tight flex items-center gap-2">
                        Performance Insights
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Live</span>
                    </h3>
                    <p className="text-sm text-gray-400 font-medium tracking-tight">
                        {activeTab === 'velocity' ? 'Comparing current actuals against daily benchmark targets' : 'Growth analysis vs. historical performance baselines'}
                    </p>
                </div>
                <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
                    <button
                        onClick={() => setActiveTab('velocity')}
                        className={`px-6 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl flex items-center gap-2 ${activeTab === 'velocity'
                                ? 'bg-white shadow-md text-emerald-700 scale-105'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Activity className="w-3.5 h-3.5" />
                        Velocity
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl flex items-center gap-2 ${activeTab === 'history'
                                ? 'bg-white shadow-md text-emerald-700 scale-105'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Target className="w-3.5 h-3.5" />
                        History
                    </button>
                </div>
            </div>

            <div className="h-80 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 'velocity' ? (
                        <AreaChart data={velocityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                dy={15}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                name="Actual Sales"
                                stroke="#059669"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRev)"
                                animationDuration={1500}
                            />
                            <Area
                                type="monotone"
                                dataKey="target"
                                name="Benchmark Target"
                                stroke="#2dd4bf"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="transparent"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    ) : (
                        <LineChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                dy={15}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="stepAfter"
                                dataKey="current"
                                name="Current Period"
                                stroke="#059669"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#fff', stroke: '#059669', strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                            <Line
                                type="stepAfter"
                                dataKey="previous"
                                name="Previous Baseline"
                                stroke="#cbd5e1"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                animationDuration={1500}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            {activeTab === 'velocity' ? 'Actual Sales' : 'Current Period'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 ${activeTab === 'velocity' ? 'bg-teal-300' : 'bg-gray-300'} rounded-full border border-dashed border-gray-400`} />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {activeTab === 'velocity' ? 'Benchmark Target' : 'Previous Baseline'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-black tracking-tight">+₹12,400 above benchmark</span>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
