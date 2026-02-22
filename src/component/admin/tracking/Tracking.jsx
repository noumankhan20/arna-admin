'use client';

import React, { useState, useMemo } from 'react';
import { X, Mail, Phone, MapPin, CreditCard, Hash, Receipt, Percent, Truck, Wallet, Tag } from 'lucide-react';
import TrackingHeader from './TrackingHeader';
import TrackingStats from './TrackingStats';
import TrackingFilters from './TrackingFilters';
import TrackingTable from './TrackingTable';
import { useGetAllOrdersQuery } from '@/component/redux/slice/ordersApiSlice';

const Tracking = () => {
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 100,
        shipmentStatus: '',
        status: '',
        paymentStatus: '',
    });

    const { data: ordersData, isLoading, error } = useGetAllOrdersQuery(filters);

    // ✅ Using data from getAllOrders directly
    const orders = ordersData?.data || ordersData?.orders || [];

    const shipments = useMemo(() => {
        return orders.map(order => ({
            id: order.orderId || order._id,
            databaseId: order._id,
            customer: order.shippingAddress?.fullName || order.user?.name || 'Unknown Customer',
            location: order.shippingAddress
                ? `${order.shippingAddress.city}, ${order.shippingAddress.state}`
                : 'N/A',
            status: order.shipmentStatus || 'created',
            orderStatus: order.orderStatus || 'processing',
            paymentStatus: order.paymentStatus || 'pending',
            lastUpdate: order.updatedAt ? new Date(order.updatedAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'N/A',
            courier: order.courierName || order.shippingInfo?.carrier || 'Standard Shipping',
            awbNumber: order.awbNumber || null,
            trackingUrl: order.trackingUrl || null,
            estDelivery: order.deliveredAt
                ? new Date(order.deliveredAt).toLocaleDateString()
                : (order.estDeliveryDate ? new Date(order.estDeliveryDate).toLocaleDateString() : 'TBD'),
            // ✅ Store full order data for modal
            raw: order,
        }));
    }, [orders]);

    const filteredShipments = useMemo(() => {
        if (!search.trim()) return shipments;
        const q = search.toLowerCase();
        return shipments.filter(item =>
            item.id?.toLowerCase().includes(q) ||
            item.customer?.toLowerCase().includes(q) ||
            item.courier?.toLowerCase().includes(q) ||
            item.location?.toLowerCase().includes(q) ||
            item.awbNumber?.toLowerCase().includes(q)
        );
    }, [shipments, search]);

    // ✅ No API call — just find from existing data
    const handleViewMore = (orderId) => {
        const shipment = shipments.find(s => s.id === orderId);
        if (shipment?.raw) {
            setSelectedOrder(shipment.raw);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-red-500 font-bold">
                        Error loading shipments: {error?.data?.message || error?.error || 'Something went wrong'}
                    </p>
                </div>
            </div>
        );
    }

    // ✅ Use selectedOrder directly from orders array
    const detail = selectedOrder || null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                <TrackingHeader />
                <TrackingStats shipments={shipments} />
                <TrackingFilters
                    search={search}
                    setSearch={setSearch}
                    filters={filters}
                    setFilters={setFilters}
                />
                <TrackingTable
                    shipments={filteredShipments}
                    totalCount={ordersData?.pagination?.totalRecords || shipments.length}
                    onViewMore={handleViewMore}
                />
            </div>

            {/* Modal for viewing order details */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Receipt className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                            >
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6 overflow-y-auto flex-1">
                            {detail ? (
                                <div className="space-y-8">
                                    {/* Shipping Address Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Truck className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                Shipping Address
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Full Name
                                                </label>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {detail.shippingAddress?.fullName}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Phone
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                    <p className="text-sm text-slate-700 font-medium">
                                                        {detail.shippingAddress?.phone}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Full Address
                                                </label>
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                        {detail.shippingAddress?.houseNo}, {detail.shippingAddress?.area},<br />
                                                        {detail.shippingAddress?.city}, {detail.shippingAddress?.state} - {detail.shippingAddress?.pincode},<br />
                                                        {detail.shippingAddress?.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipment Info Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Truck className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                Shipment Info
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Courier
                                                </label>
                                                <p className="text-sm font-semibold text-slate-800 capitalize">
                                                    {detail.courierName || 'N/A'}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    AWB Number
                                                </label>
                                                <p className="text-sm font-mono font-bold text-slate-800">
                                                    {detail.awbNumber || 'N/A'}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Payment Method
                                                </label>
                                                <p className="text-sm font-semibold text-slate-800 capitalize">
                                                    {detail.paymentMethod || 'N/A'}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                    Order Status
                                                </label>
                                                <span
                                                    className={`text-xs font-bold px-2 py-1 rounded-full ${detail.orderStatus === 'confirmed'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : detail.orderStatus === 'cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                        }`}
                                                >
                                                    {detail.orderStatus?.toUpperCase() || 'N/A'}
                                                </span>
                                            </div>

                                            {detail.trackingUrl && (
                                                <div className="col-span-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                        Tracking Link
                                                    </label>
                                                    <a
                                                        href={detail.trackingUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 font-medium underline underline-offset-2 hover:text-blue-800 transition-colors"
                                                    >
                                                        Track Shipment →
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financial Details Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Wallet className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Financial Overview</span>
                                        </div>
                                        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
                                            <div className="p-4 grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Transaction ID</label>
                                                    <div className="flex items-center gap-1.5 text-slate-700">
                                                        <Hash className="w-3.5 h-3.5 text-slate-300" />
                                                        <span className="text-sm font-mono font-bold truncate">{detail.transactionId || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Currency</label>
                                                    <div className="flex items-center gap-1.5 text-slate-700">
                                                        <CreditCard className="w-3.5 h-3.5 text-slate-300" />
                                                        <span className="text-sm font-bold">{detail.currency || 'INR'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-3 bg-slate-50/50">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                                    <span className="text-slate-800 font-bold">{detail.subtotal?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium">Shipping Charge</span>
                                                    <span className="text-slate-800 font-bold">+{detail.shippingCharge?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                                        Tax
                                                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">GST</span>
                                                    </span>
                                                    <span className="text-slate-800 font-bold">+{detail.tax?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                                                        <Percent className="w-3.5 h-3.5" />
                                                        Discount
                                                    </span>
                                                    <span className="text-emerald-600 font-bold">-{detail.discount?.toLocaleString()}</span>
                                                </div>
                                                {detail.appliedPromo && (
                                                    <div className="flex justify-between items-center text-sm pt-1 border-t border-slate-100">
                                                        <span className="text-indigo-600 font-semibold flex items-center gap-1.5">
                                                            <Tag className="w-3.5 h-3.5" />
                                                            Promo Used
                                                        </span>
                                                        <span className="text-indigo-600 font-black tracking-wider text-xs bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                                                            {detail.appliedPromo}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 bg-emerald-600 flex justify-between items-center">
                                                <span className="text-white font-black uppercase text-xs tracking-widest">Total Amount</span>
                                                <span className="text-white text-xl font-black">{detail.totalAmount?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-slate-500 font-medium">
                                        Failed to load order details. Please try again.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tracking;