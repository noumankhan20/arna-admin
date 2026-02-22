export const getStatusStyle = (status) => {
    switch (status) {
        // Shipment Statuses
        case 'delivered': 
            return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-4 ring-emerald-500/5';
        case 'in_transit': 
        case 'out_for_delivery':
        case 'shipped':
            return 'bg-blue-50 text-blue-700 border-blue-100 ring-4 ring-blue-500/5';
        case 'created':
        case 'booked':
        case 'processing':
        case 'pending': 
            return 'bg-amber-50 text-amber-700 border-amber-100 ring-4 ring-amber-500/5';
        case 'failed': 
        case 'cancelled':
            return 'bg-rose-50 text-rose-700 border-rose-100 ring-4 ring-rose-500/5';
        
        // Payment Statuses
        case 'paid':
            return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        case 'refunded':
            return 'bg-purple-50 text-purple-700 border-purple-100';
            
        default: 
            return 'bg-gray-50 text-gray-700 border-gray-100';
    }
};

export const formatStatus = (status) => {
    if (!status) return 'N/A';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
