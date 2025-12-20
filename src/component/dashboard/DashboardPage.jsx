"use client";
import { useRequireAdmin } from "../auth/useRequireAdmin";

export default function DashboardPage() {
    useRequireAdmin();
 return (
    <div className="space-y-6">
      {/* 1. Top KPIs */}
      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard
          label="Today’s Orders"
          value="128"
          trend="+12% vs yesterday"
          trendType="up"
        />
        <KpiCard
          label="Revenue (Today)"
          value="₹42,350"
          trend="+8% vs yesterday"
          trendType="up"
        />
        <KpiCard
          label="Active Users (24h)"
          value="542"
          trend="Store visitors"
          trendType="neutral"
        />
        <KpiCard
          label="Avg Order Value"
          value="₹660"
          trend="Store‑wide"
          trendType="neutral"
        />
      </section>

      {/* 2. Sales & top products */}
      <section className="grid gap-4 lg:grid-cols-[3fr,2fr]">
        {/* Recent orders */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Recent Orders
          </h2>
          <OrdersTable />
        </div>

        {/* Top products */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3">
            Top Products (This Week)
          </h2>
          <TopProductsList />
        </div>
      </section>

      {/* 3. Package / shipment tracking */}
      <section className="grid gap-4 lg:grid-cols-[2fr,3fr]">
        {/* Summary cards */}
        <div className="space-y-4">
          <KpiCard
            label="Packages in Transit"
            value="27"
            trend="5 delayed"
            trendType="down"
          />
          <KpiCard
            label="Delivered (Today)"
            value="92"
            trend="On‑time rate 94%"
            trendType="up"
          />
        </div>

        {/* Package tracking table */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-100">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-zinc-900">
              Package Tracking
            </h2>
            <input
              type="text"
              placeholder="Search by tracking ID or name"
              className="w-48 rounded-full border border-zinc-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>
          <PackageTrackingTable />
        </div>
      </section>
    </div>
  );
}

/* Small KPI card */
function KpiCard({ label, value, trend, trendType }) {
  const trendColor =
    trendType === "up"
      ? "text-emerald-600"
      : trendType === "down"
      ? "text-red-500"
      : "text-zinc-500";

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-100">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
      <p className={`mt-1 text-[11px] ${trendColor}`}>{trend}</p>
    </div>
  );
}

/* Static orders table (mock) */
function OrdersTable() {
  const orders = [
    { id: "#1023", customer: "lionel suresh khan", total: "₹1,250", status: "Paid" },
    { id: "#1022", customer: "Arfat yadav", total: "₹890", status: "Pending" },
    { id: "#1021", customer: "Rahul", total: "₹2,430", status: "Shipped" },
  ];

  const statusClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Shipped":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <div className="overflow-x-auto text-xs">
      <table className="min-w-full text-left">
        <thead className="text-[11px] text-zinc-500">
          <tr>
            <th className="py-2 pr-4">Order</th>
            <th className="py-2 pr-4">Customer</th>
            <th className="py-2 pr-4">Total</th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-zinc-700">
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-zinc-100">
              <td className="py-2 pr-4">{o.id}</td>
              <td className="py-2 pr-4">{o.customer}</td>
              <td className="py-2 pr-4">{o.total}</td>
              <td className="py-2 pr-4">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${statusClass(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Top products (mock) */
function TopProductsList() {
  const products = [
    { name: "Vitamin C Serum", sold: 86 },
    { name: "Gentle Face Wash", sold: 63 },
    { name: "Night Repair Cream", sold: 41 },
  ];

  return (
    <div className="space-y-2 text-xs text-zinc-700">
      {products.map((p) => (
        <div
          key={p.name}
          className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2"
        >
          <span>{p.name}</span>
          <span className="text-zinc-500">{p.sold} sold</span>
        </div>
      ))}
    </div>
  );
}

/* Package tracking table (mock) */
function PackageTrackingTable() {
  const packages = [
    {
      trackingId: "PKG-2025-001",
      customer: "Suresh",
      carrier: "Delhivery",
      status: "Out for Delivery",
      eta: "Today, 7 PM",
    },
    {
      trackingId: "PKG-2025-002",
      customer: "Arfat yadav",
      carrier: "BlueDart",
      status: "In Transit",
      eta: "Tomorrow",
    },
    {
      trackingId: "PKG-2025-003",
      customer: "Rahul",
      carrier: "DTDC",
      status: "Delayed",
      eta: "2 days",
    },
  ];

  const statusClass = (status) => {
    if (status === "Out for Delivery")
      return "bg-sky-100 text-sky-700";
    if (status === "In Transit") return "bg-amber-100 text-amber-700";
    if (status === "Delayed") return "bg-red-100 text-red-600";
    return "bg-zinc-100 text-zinc-700";
  };

  return (
    <div className="overflow-x-auto text-xs">
      <table className="min-w-full text-left">
        <thead className="text-[11px] text-zinc-500">
          <tr>
            <th className="py-2 pr-4">Tracking ID</th>
            <th className="py-2 pr-4">Customer</th>
            <th className="py-2 pr-4">Carrier</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">ETA</th>
          </tr>
        </thead>
        <tbody className="text-zinc-700">
          {packages.map((pkg) => (
            <tr key={pkg.trackingId} className="border-t border-zinc-100">
              <td className="py-2 pr-4">{pkg.trackingId}</td>
              <td className="py-2 pr-4">{pkg.customer}</td>
              <td className="py-2 pr-4">{pkg.carrier}</td>
              <td className="py-2 pr-4">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${statusClass(
                    pkg.status
                  )}`}
                >
                  {pkg.status}
                </span>
              </td>
              <td className="py-2 pr-4">{pkg.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}