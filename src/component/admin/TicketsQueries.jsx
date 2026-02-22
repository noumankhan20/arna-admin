'use client';

import { useState } from 'react';
import { Ticket, CheckCircle, XCircle, Clock, Mail, Calendar, Eye, X } from 'lucide-react';
import {
    useGetAllTicketsQuery,
    useUpdateTicketStatusMutation,
} from '../redux/slice/ticketsApiSlice';

export default function TicketsAndQueries() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetAllTicketsQuery();
    const [updateTicketStatusMutation] = useUpdateTicketStatusMutation();

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tickets = data?.tickets || [];

    // Toggle ticket status between open and resolved
    const updateTicketStatus = async (ticketId, newStatus) => {
        try {
            await updateTicketStatusMutation({
                id: ticketId,
                status: newStatus,
            }).unwrap();
        } catch (err) {
            console.error("Failed to update ticket status", err);
        }
    };

    // Open modal to view full message
    const viewTicketMessage = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTicket(null), 200); // Clear after animation
    };

    // Format date to be more readable
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Count statistics
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-600">Loading tickets...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">
                    {error?.data?.message || "Failed to load tickets"}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-600 rounded-lg">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Tickets and Queries</h1>
                    </div>
                    <p className="text-slate-600 ml-14">Manage and resolve customer support tickets</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Tickets</p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">{tickets.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Ticket className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Open Tickets</p>
                                <p className="text-2xl font-bold text-amber-600 mt-1">{openTickets}</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Resolved Tickets</p>
                                <p className="text-2xl font-bold text-emerald-600 mt-1">{resolvedTickets}</p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Table Header - Hidden on mobile, shown on tablet+ */}
                    <div className="hidden md:grid md:grid-cols-11 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-700">
                        <div className="col-span-3">User</div>
                        <div className="col-span-4">Message</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-200">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                className="px-6 py-4 hover:bg-slate-50 transition-colors duration-150"
                            >
                                {/* Desktop Layout */}
                                <div className="hidden md:grid md:grid-cols-11 gap-4 items-center">
                                    {/* User */}
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-sm text-slate-700 truncate">{ticket.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(ticket.createdAt)}
                                        </div>
                                    </div>

                                    {/* Message Preview with View Button */}
                                    <div className="col-span-4">
                                        <p className="text-sm text-slate-800 font-medium mb-1 line-clamp-1">
                                            {ticket.subject}
                                        </p>
                                        <p className="text-sm text-slate-600 line-clamp-2 mb-1">
                                            {ticket.message}
                                        </p>
                                        <button
                                            onClick={() => viewTicketMessage(ticket)}
                                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            View Full
                                        </button>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2">
                                        {ticket.status === 'resolved' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Resolved
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                <Clock className="w-3.5 h-3.5" />
                                                Open
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions - Only show Resolve button for open tickets */}
                                    <div className="col-span-2">
                                        {ticket.status === 'open' && (
                                            <button
                                                onClick={() => updateTicketStatus(ticket._id, 'resolved')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-150 w-full justify-center cursor-pointer"
                                                aria-label="Mark as resolved"
                                            >
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Resolve
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Layout */}
                                <div className="md:hidden space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-800 font-medium line-clamp-2">
                                                {ticket.subject}
                                            </p>
                                        </div>
                                        {ticket.status === 'resolved' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                                                <CheckCircle className="w-3 h-3" />
                                                Resolved
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
                                                <Clock className="w-3 h-3" />
                                                Open
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="truncate">{ticket.user}</span>
                                    </div>

                                    <div className="text-sm text-slate-600 line-clamp-2">
                                        {ticket.message}
                                    </div>

                                    <button
                                        onClick={() => viewTicketMessage(ticket)}
                                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        View Full Message
                                    </button>

                                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(ticket.createdDate)}
                                        </div>

                                        {ticket.status === 'open' && (
                                            <button
                                                onClick={() => updateTicketStatus(ticket._id, 'resolved')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-150"
                                            >
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Resolve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State (shown when no tickets) */}
                {tickets.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                        <div className="max-w-sm mx-auto">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No tickets yet</h3>
                            <p className="text-sm text-slate-600">
                                When users submit support tickets, they will appear here.
                            </p>
                        </div>
                    </div>
                )}

                {/* Modal for viewing full ticket message */}
                {isModalOpen && selectedTicket && (
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={closeModal}
                    >

                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">Ticket Details</h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-4 overflow-y-auto flex-1">
                                <div className="space-y-4">
                                    {/* User Info */}
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">User</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <p className="text-sm text-slate-700">{selectedTicket.email}</p>
                                        </div>
                                    </div>

                                    {/* Created Date */}
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <p className="text-sm text-slate-700">{formatDate(selectedTicket.createdAt)}</p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</label>
                                        <div className="mt-1">
                                            {selectedTicket.status === 'resolved' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Resolved
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    <Clock className="w-4 h-4" />
                                                    Open
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Full Message */}
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Message</label>
                                        <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                {selectedTicket.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer with Action Button */}
                            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150"
                                >
                                    Close
                                </button>
                                {selectedTicket.status === 'open' && (
                                    <button
                                        onClick={() => {
                                            updateTicketStatus(selectedTicket.id, 'resolved');
                                            closeModal();
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-150"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Mark as Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}