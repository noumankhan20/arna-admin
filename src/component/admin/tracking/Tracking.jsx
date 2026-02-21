'use client';

import React, { useState } from 'react';
import TrackingHeader from './TrackingHeader';
import TrackingStats from './TrackingStats';
import TrackingFilters from './TrackingFilters';
import TrackingTable from './TrackingTable';
import { shipments } from './mockData';

const Tracking = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Centralized filtering logic for both Stats and Table
    const filteredShipments = shipments.filter(item => {
        const matchesSearch =
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.courier.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <TrackingHeader />
            <TrackingStats shipments={filteredShipments} />
            <TrackingFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <TrackingTable
                shipments={filteredShipments}
                totalCount={shipments.length}
            />
        </div>
    );
};

export default Tracking;
