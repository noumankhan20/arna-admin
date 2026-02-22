'use client';

import React, { useState, useMemo } from 'react';
import TrackingHeader from './TrackingHeader';
import TrackingStats from './TrackingStats';
import TrackingFilters from './TrackingFilters';
import TrackingTable from './TrackingTable';
import { useGetAllOrdersQuery } from '@/component/redux/slice/ordersApiSlice';

const Tracking = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        page: 1,
        limit: 100,
        shipmentStatus: '',
        status: '',
        paymentStatus: '',
    });

    // RTK Query hook using the filters pattern
    const { data: ordersData, isLoading, error } = useGetAllOrdersQuery(filters);

    // API returns { orders, pagination } or { data, pagination }
    const orders = ordersData?.orders || ordersData?.data || [];

    const shipments = useMemo(() => {
        return orders.map(order => ({
            id: order.orderId || order._id,
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
                : (order.estDeliveryDate ? new Date(order.estDeliveryDate).toLocaleDateString() : 'TBD')
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-bold">
                    Error loading shipments: {error?.data?.message || error?.error || 'Something went wrong'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
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
            />
        </div>
    );
};

export default Tracking;
