'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const RecentOrders = () => {
    const router = useRouter();
    const orders = [
        { id: '#ORD-7234', customer: 'Priya Sharma', amount: '₹2,499', status: 'Shipped', date: 'Oct 24, 2023' },
        { id: '#ORD-7235', customer: 'Rahul Verma', amount: '₹1,250', status: 'Processing', date: 'Oct 24, 2023' },
        { id: '#ORD-7236', customer: 'Ananya Iyer', amount: '₹4,890', status: 'Delivered', date: 'Oct 23, 2023' },
        { id: '#ORD-7237', customer: 'Vikram Singh', amount: '₹999', status: 'Cancelled', date: 'Oct 23, 2023' },
        { id: '#ORD-7238', customer: 'Sneha Kapur', amount: '₹3,150', status: 'Shipped', date: 'Oct 22, 2023' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-amber-100 text-amber-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
                <button
                    onClick={() => router.push('/admin/tracking')}
                    className="text-emerald-600 text-sm font-semibold hover:underline flex items-center gap-1 transition-all"
                >
                    View All <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
