'use client';

import React from 'react';
import { MapPin, Calendar, MoreHorizontal, ArrowRight, Package, Search, CreditCard, ClipboardCheck } from 'lucide-react';
import { getStatusStyle, formatStatus } from './statusUtils';

const TrackingTable = ({ shipments = [], totalCount = 0 }) => {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden text-[#1a1a1a]">
            <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-black text-[#1a1a1a] tracking-tight">Shipment Log</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Found {shipments.length} matching entries</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-emerald-50 rounded-xl text-[11px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                        {shipments.length} Results
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/30">
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Shipment & Carrier</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Secondary Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Shipment Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Last Sync</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {shipments.length > 0 ? (
                            shipments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/80 transition-all group group/row">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover/row:bg-white group-hover/row:shadow-md transition-all duration-500 border border-transparent group-hover/row:border-gray-100">
                                                <Package className="w-5 h-5 text-gray-400 group-hover/row:text-emerald-500 transition-colors" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-[#1a1a1a] tracking-tight">{item.id}</p>
                                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover/row:translate-x-1 transition-transform" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-[13px] text-gray-500 font-medium">{item.customer}</p>
                                                    <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">{item.courier}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
                                                <ClipboardCheck className="w-3 h-3 text-gray-400" />
                                                <span>Order: <span className="text-[#1a1a1a]">{formatStatus(item.orderStatus)}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
                                                <CreditCard className="w-3 h-3 text-gray-400" />
                                                <span>Payment: <span className={item.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-500'}>{formatStatus(item.paymentStatus)}</span></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(item.status)}`}>
                                            {formatStatus(item.status)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {item.lastUpdate}
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-gray-100 group/btn ml-auto">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover/btn:text-[#1a1a1a]" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-gray-50 rounded-[2rem] flex items-center justify-center">
                                            <Search className="w-6 h-6 text-gray-300" />
                                        </div>
                                        <p className="text-[#1a1a1a] font-bold tracking-tight">No shipments found</p>
                                        <p className="text-gray-400 text-sm font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[13px] text-gray-500 font-medium">
                    Showing <span className="text-[#1a1a1a] font-bold">{shipments.length}</span> of {totalCount} total shipments
                </p>
                <div className="flex items-center gap-2">
                    <button className="px-6 py-3 text-[13px] font-bold text-gray-300 cursor-not-allowed bg-white border border-gray-100 rounded-2xl">Previous</button>
                    <button className="px-6 py-3 bg-white border border-gray-100 text-[#1a1a1a] rounded-2xl text-[13px] font-bold hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95">Next Segment</button>
                </div>
            </div>
        </div>
    );
};

export default TrackingTable;



