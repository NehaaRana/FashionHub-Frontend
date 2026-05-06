// import DashboardCard from "../components/ui/DashboardCard";

// const VendorDashboard = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Vendor Dashboard</h1>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
//         <DashboardCard title="My Products" value="30" />
//         <DashboardCard title="Orders Received" value="80" />
//         <DashboardCard title="Earnings" value="₹25,000" />
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DashHeader from "../components/dashboard/DashHeader";
import StatCard from "../components/dashboard/StatCard";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  MessageSquare,
  Settings,
  TrendingUp,
  Plus,
  AlertTriangle,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { vendorStore, subscribeVendors } from "../lib/vendorStore";

const items = [
  { label: "Overview", to: "/vendor", icon: LayoutDashboard },
  { label: "My Products", to: "/vendor/products", icon: Package },
  { label: "Orders", to: "/vendor/orders", icon: ShoppingCart },
  { label: "Earnings", to: "/vendor/earnings", icon: DollarSign },
  { label: "Reviews", to: "/vendor/reviews", icon: Star },
  { label: "Messages", to: "/vendor/messages", icon: MessageSquare },
  { label: "Store Settings", to: "/vendor/settings", icon: Settings },
];

const products = [
  { name: "Ivory Silk Anarkali", sku: "FH-AN-204", stock: 12, price: "₹4,890", sold: 38, status: "Active" },
  { name: "Onyx Velvet Saree", sku: "FH-SR-118", stock: 4, price: "₹7,250", sold: 22, status: "Low Stock" },
  { name: "Gold Mirror Lehenga", sku: "FH-LH-091", stock: 0, price: "₹12,400", sold: 17, status: "Out of Stock" },
  { name: "Pastel Linen Kurti", sku: "FH-KR-045", stock: 28, price: "₹1,490", sold: 64, status: "Active" },
];

const incoming = [
  { id: "#FH-10248", product: "Ivory Silk Anarkali", qty: 1, customer: "Aanya S.", total: "₹4,890" },
  { id: "#FH-10247", product: "Pastel Linen Kurti", qty: 2, customer: "Priya I.", total: "₹2,980" },
  { id: "#FH-10246", product: "Onyx Velvet Saree", qty: 1, customer: "Mehak K.", total: "₹7,250" },
];

const statusColor = {
  Active: "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-accent/15 text-accent",
  "Out of Stock": "bg-destructive/15 text-destructive",
};

const VendorDashboard = () => {
  // const [app, setApp] = useState<VendorApplication | undefined>(() => vendorStore.current());
  const [app, setApp] = useState(() => vendorStore.current());
  useEffect(() => subscribeVendors(() => setApp(vendorStore.current())), []);

  const isApproved = !app || app.status === "Approved";
  const vendorName = app?.storeName || "Saanjh Couture";

  const fetchProducts = async () => {
    const vendorId = Number(localStorage.getItem("vendorId"));

    const res = await getVendorProducts(vendorId);

    setProducts(res.data);
  };

  return (
    <DashboardLayout role="Vendor" userName={vendorName} items={items}>
      <div className="p-6 lg:p-12">
        {app && app.status !== "Approved" && <StatusBanner app={app} />}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <DashHeader
            eyebrow="Vendor Studio"
            title="Store"
            titleAccent="Performance"
            description="Manage your catalogue, fulfil orders and track your earnings on FashionHub."
          />
          <button
            disabled={!isApproved}
            title={!isApproved ? "Available once your store is approved" : undefined}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-body text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-sm shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Earnings" value="₹3,42,800" delta="14.8%" icon={DollarSign} delay={0} />
          <StatCard label="Orders" value="312" delta="9.4%" icon={ShoppingCart} delay={0.05} />
          <StatCard label="Active Products" value="124" delta="6 added" icon={Package} delay={0.1} />
          <StatCard label="Avg. Rating" value="4.8" delta="0.2" icon={Star} delay={0.15} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Products */}
          <div className="xl:col-span-2 bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">My Products</h2>
                <p className="font-body text-xs text-muted-foreground mt-1">Inventory snapshot</p>
              </div>
              <button className="font-body text-xs uppercase tracking-[0.15em] text-accent font-semibold hover:underline">
                Manage
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/40">
                  <tr>
                    {["Product", "Price", "Stock", "Sold", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-6 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.sku} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
                          {p.sku}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">{p.price}</td>
                      <td className="px-6 py-4 font-body text-sm text-foreground">{p.stock}</td>
                      <td className="px-6 py-4 font-body text-sm text-muted-foreground">{p.sold}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${statusColor[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side panels */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="p-6 border-b border-border flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">Incoming Orders</h2>
              </div>
              <ul className="divide-y divide-border">
                {incoming.map((o) => (
                  <li key={o.id} className="p-5 hover:bg-secondary/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm font-semibold text-foreground">{o.id}</span>
                      <span className="font-body text-sm font-semibold text-accent">{o.total}</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground truncate">
                      {o.product} × {o.qty} • {o.customer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-sm p-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Low Stock Alert</h3>
                  <p className="font-body text-xs text-muted-foreground mb-3">
                    2 products are running low. Restock to avoid losing sales during the summer rush.
                  </p>
                  <button className="font-body text-[10px] uppercase tracking-[0.15em] text-accent font-semibold hover:underline">
                    Review Inventory →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatusBanner = ({ app }) => {
  if (app.status === "Pending") {
    return (
      <div className="mb-8 bg-accent/10 border border-accent/30 rounded-sm p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in-up">
        <div className="h-12 w-12 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
          <Clock className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
            Application Under Review
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">
            Your store is awaiting admin approval
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Adding products and accepting orders unlocks once your application is approved (24-48 hrs).
          </p>
        </div>
        <Link
          to="/vendor/pending"
          className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] text-accent font-semibold hover:underline shrink-0"
        >
          View status <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }
  if (app.status === "Rejected") {
    return (
      <div className="mb-8 bg-destructive/5 border border-destructive/30 rounded-sm p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in-up">
        <div className="h-12 w-12 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
          <XCircle className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-destructive font-semibold">
            Application Not Approved
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">
            Your application needs revision
          </h3>
          {app.rejectionReason && (
            <p className="font-body text-xs text-muted-foreground mt-1 italic">
              "{app.rejectionReason}"
            </p>
          )}
        </div>
        <Link
          to="/vendor/register"
          className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-[0.15em] text-destructive font-semibold hover:underline shrink-0"
        >
          Re-apply <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }
  return null;
};

export default VendorDashboard;
