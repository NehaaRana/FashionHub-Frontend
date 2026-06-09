import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DashHeader from "../components/dashboard/DashHeader";
import StatCard from "../components/dashboard/StatCard";
import { getVendorProducts, getOrders ,getCurrentUser,getVendorOrders,getVendorReviews} from "../services/api";
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
  { label: "Overview", to: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "My Products", to: "/vendor/products", icon: Package },
  { label: "Orders", to: "/vendor/orders", icon: ShoppingCart },
  // { label: "Earnings", to: "/vendor/earnings", icon: DollarSign },
  { label: "Reviews", to: "/vendor/reviews", icon: Star },
  // { label: "Messages", to: "/vendor/messages", icon: MessageSquare },
  { label: "Store Settings", to: "/vendor/settings", icon: Settings },
];





const VendorDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    earnings: 0,
    orders: 0,
    products: 0,
    rating: 4.8,
  });
  // const incoming = orders.map((o) => ({
  //   id: o.orderNo,
  //   product: o.productName,
  //   qty: o.quantity,
  //   customer: o.customerName,
  //   total: `₹${o.totalAmount}`,
  // }));


  const incoming = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5)
    .map((o) => ({
      id: o.oid,
      product: o.productName,
      qty: o.quantity,
      customer: o.customerName,
      total: `₹${o.amount}`,
    }));

  const statusColor = {
    Active: "bg-emerald-100 text-emerald-700",
    "Low Stock": "bg-accent/15 text-accent",
    "Out of Stock": "bg-destructive/15 text-destructive",
  };

  // const [app, setApp] = useState<VendorApplication | undefined>(() => vendorStore.current());
  const [app, setApp] = useState(() => vendorStore.current());
  // useEffect(() => subscribeVendors(() => setApp(vendorStore.current())), []);

  // useEffect(() => {
  //   const vendorId = localStorage.getItem("vendorId");

  //   const fetchData = async () => {
  //     try {

  //       // CURRENT LOGGED IN USER
  //       const userRes = await getCurrentUser();
  //       setUser(userRes.data);

  //       // PRODUCTS
  //       const prodRes = await getVendorProducts(vendorId);
  //       setProducts(prodRes.data);

  //       // ORDERS (you may need filter backend later)
  //       const vendorOrders = await getVendorOrders(vendorId);
  //       // const vendorOrders = orderRes.data.filter(
  //       //   (o) => o.vendorId === Number(vendorId)
  //       // );

  //       setOrders(vendorOrders);

  //       // STATS
  //       setStats({
  //         products: prodRes.data.length,
  //         orders: vendorOrders.length,
  //         earnings: vendorOrders.reduce((sum, o) => sum + o.totalAmount, 0),
  //         rating: 4.8,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const loadVendorData = async () => {
      try {

        // CURRENT LOGGED IN VENDOR
        const userRes = await getCurrentUser();
        const currentVendor = userRes.data;

        // console.log(currentVendor);
        console.log("CURRENT VENDOR:", JSON.stringify(currentVendor, null, 2));
console.log("VID:", currentVendor?.vid);
console.log("ID:", currentVendor?.id);
console.log("EMAIL:", currentVendor?.email);

        setUser(currentVendor);


        const vendorId = currentVendor.vid || currentVendor.Vid;

          // FETCH PRODUCTS + VENDOR ORDERS
          const [productsRes, ordersRes,reviewsRes] = await Promise.all([
            getVendorProducts(vendorId),
            getVendorOrders(vendorId),
            getVendorReviews(vendorId),

          ]);

          const vendorOrders = ordersRes.data;
          console.log("Vendor Orders:", vendorOrders);
          console.log("First Order:", vendorOrders[0]);
        setProducts(productsRes.data);
        setOrders(vendorOrders);
        // ONLY PAID ORDERS
        const paidOrders = vendorOrders.filter(
          (o) =>
            o.paymentStatus?.toLowerCase() === "paid"
        );


        //avg review
        const reviews = reviewsRes.data;

        const averageRating =
          reviews.length > 0
            ? (
                reviews.reduce(
                  (sum, r) => sum + Number(r.rating || 0),
                  0
                ) / reviews.length
              ).toFixed(1)
            : 0;
        // STATS
        setStats({
          products: productsRes.data.length,
          orders: vendorOrders.length,
         
           earnings: paidOrders.reduce(
              (sum, o) => sum + Number(o.amount || 0),
              0
            ),
            rating: averageRating,

        });

      } catch (err) {
        console.log(err);
      }
    };

    loadVendorData();
  }, []);
  const isApproved = !app || app.status === "Approved";
  // const vendorName = user?.vendorname || user?.brandname||"Vendor";
 const vendorName =
  user?.ownername ||
  user?.Vendorname ||
  user?.brandname ||
  user?.Brandname ||
  "Vendor";
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
         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

          <StatCard label="Total Earnings" value={`₹${stats.earnings}`} icon={DollarSign} />
          <StatCard label="Orders" value={stats.orders} icon={ShoppingCart} />
          <StatCard label="Active Products" value={stats.products} icon={Package} />
          <StatCard label="Avg. Rating" value={stats.rating} icon={Star} />
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
                    {["Product", "Price", "Stock", "Image", "Status"].map((h) => (
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
                    <tr
                      key={p.pid || p.id}
                      className="border-t border-border hover:bg-secondary/30 transition-colors"
                    >
                      {/* PRODUCT */}
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-semibold text-foreground">
                          {p.productName || p.name}
                        </p>

                        <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
                          {p.sku}
                        </p>
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                        ₹{p.price}
                      </td>

                      {/* STOCK */}
                      <td className="px-6 py-4 font-body text-sm text-foreground">
                        {p.stock}
                      </td>

                      {/* IMAGE */}
                      <td className="px-6 py-4">
                        <img
                          src={`https://localhost:7106${p.productImage}`} // Assuming your backend can handle these query params for resizing
                          alt={p.productName || p.name}
                          className="w-14 h-14 object-cover rounded-md border"
                        />
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${
                            p.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {p.isActive ? "Active" : "Hidden"}
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
