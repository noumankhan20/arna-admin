'use client';

import { MapPin, Calendar, Eye, Package, Search, CreditCard, ClipboardCheck, ArrowRight } from 'lucide-react';
import { getStatusStyle, formatStatus } from './statusUtils';

const TrackingTable = ({ shipments = [], totalCount = 0, onViewMore }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Shipment Log</h3>
                    <p className="text-slate-500 text-xs mt-1">Found {shipments.length} matching entries</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 border border-emerald-200">
                        {shipments.length} Results
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-700">
                            <th className="px-8 py-4">Shipment & Carrier</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Shipment Status</th>
                            <th className="px-8 py-4">Last Sync</th>
                            <th className="px-8 py-4 text-right">More Info</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {shipments.length > 0 ? (
                            shipments.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/80 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                                                <Package className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-slate-800">{item.id}</p>
                                                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm text-slate-600 font-medium">{item.customer}</p>
                                                    <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">{item.courier}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <ClipboardCheck className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Order: <span className="text-slate-700 font-semibold">{formatStatus(item.orderStatus)}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Payment: <span className={`font-semibold ${item.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-500'}`}>{formatStatus(item.paymentStatus)}</span></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${getStatusStyle(item.status)}`}>
                                            {formatStatus(item.status)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                {item.lastUpdate}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => onViewMore(item.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-150 ml-auto cursor-pointer"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            More Info
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                            <Search className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-slate-800 font-semibold">No shipments found</p>
                                        <p className="text-slate-500 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                    Showing <span className="text-slate-800 font-bold">{shipments.length}</span> of {totalCount} total shipments
                </p>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed bg-white border border-slate-200 rounded-lg">Previous</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95">Next Segment</button>
                </div>
            </div>
        </div>
    );
};

export default TrackingTable;



