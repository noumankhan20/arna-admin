export const getStatusStyle = (status) => {
    switch (status) {
        case 'Delivered': 
            return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-4 ring-emerald-500/5';
        case 'In Transit': 
            return 'bg-blue-50 text-blue-700 border-blue-100 ring-4 ring-blue-500/5';
        case 'Pending': 
            return 'bg-amber-50 text-amber-700 border-amber-100 ring-4 ring-amber-500/5';
        case 'Exception': 
            return 'bg-rose-50 text-rose-700 border-rose-100 ring-4 ring-rose-500/5';
        default: 
            return 'bg-gray-50 text-gray-700 border-gray-100';
    }
};

