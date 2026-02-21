import { Package, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export const trackingStats = [
    { label: 'Total Shipments', value: '1,284', icon: Package, color: 'bg-emerald-50 text-emerald-600', trend: '+12%' },
    { label: 'In Transit', value: '142', icon: Truck, color: 'bg-blue-50 text-blue-600', trend: '+5%' },
    { label: 'Delivered', value: '1,120', icon: CheckCircle2, color: 'bg-teal-50 text-teal-600', trend: '+18%' },
    { label: 'Exceptions', value: '22', icon: AlertCircle, color: 'bg-rose-50 text-rose-600', trend: '-2%' },
];

export const shipments = [
    { id: 'ORD-99281', customer: 'Aarav Mehta', location: 'Mumbai, MH', status: 'In Transit', lastUpdate: '2 hours ago', courier: 'BlueDart', estDelivery: 'Oct 26, 2023' },
    { id: 'ORD-99282', customer: 'Ishani Rai', location: 'Bangalore, KA', status: 'Delivered', lastUpdate: '5 hours ago', courier: 'Delhivery', estDelivery: 'Oct 24, 2023' },
    { id: 'ORD-99283', customer: 'Kabir Singh', location: 'New Delhi, DL', status: 'In Transit', lastUpdate: '1 hour ago', courier: 'Ecom Express', estDelivery: 'Oct 25, 2023' },
    { id: 'ORD-99284', customer: 'Meera Kapoor', location: 'Pune, MH', status: 'Pending', lastUpdate: '12 hours ago', courier: 'FedEx', estDelivery: 'Oct 27, 2023' },
    { id: 'ORD-99285', customer: 'Rohan Gupta', location: 'Hyderabad, TS', status: 'Exception', lastUpdate: '30 mins ago', courier: 'BlueDart', estDelivery: 'Oct 25, 2023' },
    { id: 'ORD-99286', customer: 'Zoya Khan', location: 'Chennai, TN', status: 'Delivered', lastUpdate: '1 day ago', courier: 'Delhivery', estDelivery: 'Oct 23, 2023' },
];
