import DashboardLayout from "../components/DashboardLayout";
import DashHeader from "../components/dashboard/DashHeader";
import StatCard from "../components/dashboard/StatCard";
import { useEffect, useState } from "react";
import {
  getUsers,
  getVendors,
  getAllProducts,
  getOrders,
} from "../services/api";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tag,
  Store,
  BarChart3,
  Settings,
  DollarSign,
  TrendingUp,
  List,
} from "lucide-react";

const items = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Vendors", to: "/admin/vendors", icon: Store },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: List },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Coupons", to: "/admin/coupons", icon: Tag },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

// const recentOrders = [
//   { id: "#FH-10248", customer: "Aanya Sharma", date: "May 01, 2026", total: "₹4,890", status: "Delivered" },
//   { id: "#FH-10247", customer: "Priya Iyer", date: "Apr 30, 2026", total: "₹2,150", status: "Shipped" },
//   { id: "#FH-10246", customer: "Mehak Kapoor", date: "Apr 30, 2026", total: "₹7,320", status: "Processing" },
//   { id: "#FH-10245", customer: "Riya Verma", date: "Apr 29, 2026", total: "₹1,490", status: "Delivered" },
//   { id: "#FH-10244", customer: "Sana Khan", date: "Apr 29, 2026", total: "₹3,675", status: "Cancelled" },
// ];


// const topVendors = [
//   { name: "Saanjh Couture", products: 124, sales: "₹3,42,800" },
//   { name: "Mira & Co.", products: 86, sales: "₹2,18,450" },
//   { name: "Indo Threads", products: 71, sales: "₹1,96,220" },
//   { name: "Velvet Atelier", products: 53, sales: "₹1,42,910" },
// ];


const statusColor = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-accent/15 text-accent",
  Cancelled: "bg-destructive/15 text-destructive",
};
const user = JSON.parse(localStorage.getItem("user"));
const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    vendors: 0,
  });

  const recentOrders = orders.slice(0, 5);
  const topVendors = vendors.slice(0, 5);

  useEffect(() => {

    const loadAdminData = async () => {

      try {

        const [
          usersRes,
          vendorsRes,
          productsRes,
          ordersRes,
        ] = await Promise.all([
          getUsers(),
          getVendors(),
          getAllProducts(),
          getOrders(),
        ]);

        setUsers(usersRes.data);
        setVendors(vendorsRes.data);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);

        // TOTAL REVENUE
        const totalRevenue = ordersRes.data.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setStats({
          revenue: totalRevenue,
          orders: ordersRes.data.length,
          customers: usersRes.data.length,
          vendors: vendorsRes.data.length,
        });

      } catch (err) {

        console.log(err);

      }
    };

    loadAdminData();

  }, []);

  return (
    <DashboardLayout role="Admin" userName={user?.name || "Admin"} items={items}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Admin Console"
          title="Platform"
          titleAccent="Overview"
          description="Monitor sales, vendors, customers and orders across the FashionHub marketplace."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Revenue"
            value={`₹${stats.revenue}`}
            icon={DollarSign}
          />

          <StatCard
            label="Orders"
            value={stats.orders}
            icon={ShoppingCart}
          />

          <StatCard
            label="Customers"
            value={stats.customers}
            icon={Users}
          />

          <StatCard
            label="Active Vendors"
            value={stats.vendors}
            icon={Store}
          />
          {/* <StatCard label="Total Revenue" value="₹18.4L" delta="12.5%" icon={DollarSign} delay={0} />
          <StatCard label="Orders" value="2,847" delta="8.2%" icon={ShoppingCart} delay={0.05} />
          <StatCard label="Customers" value="14,920" delta="5.7%" icon={Users} delay={0.1} />
          <StatCard label="Active Vendors" value="186" delta="2.1%" trend="down" icon={Store} delay={0.15} /> */}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="xl:col-span-2 bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Recent Orders</h2>
                <p className="font-body text-xs text-muted-foreground mt-1">Latest 5 transactions</p>
              </div>
              <button className="font-body text-xs uppercase tracking-[0.15em] text-accent font-semibold hover:underline">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/40">
                  <tr>
                    {["Order", "Customer", "Date", "Total", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-6 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">{o.id}</td>
                      <td className="px-6 py-4 font-body text-sm text-foreground">{o.customer}</td>
                      <td className="px-6 py-4 font-body text-xs text-muted-foreground">{o.date}</td>
                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">{o.total}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${statusColor[o.status]}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                <tbody>
                  {recentOrders.map((o) => (
                    <tr
                      key={o.oid}
                      className="border-t border-border hover:bg-secondary/30 transition-colors"
                    >

                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                        #{o.oid}
                      </td>

                      <td className="px-6 py-4 font-body text-sm text-foreground">
                        {o.username}
                      </td>

                      <td className="px-6 py-4 font-body text-xs text-muted-foreground">
                        {o.orderDate?.split("T")[0]}
                      </td>

                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                        ₹{o.amount}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${
                            statusColor[o.orderStatus]
                          }`}
                        >
                          {o.orderStatus}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Vendors */}
          <div className="bg-card border border-border rounded-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-6 border-b border-border flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <h2 className="font-display text-xl font-semibold text-foreground">Top Vendors</h2>
            </div>
            <ul className="p-2">
              {/* {topVendors.map((v, i) => (
                <li
                  key={v.name}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/40 rounded-sm transition-colors"
                >
                  <span className="font-display text-2xl font-bold text-accent w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-foreground truncate">{v.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{v.products} products</p>
                  </div>
                  <p className="font-body text-sm font-semibold text-foreground">{v.sales}</p>
                </li>
              ))} */}
              {topVendors.map((v, i) => (
                <li
                  key={v.vid}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/40 rounded-sm transition-colors"
                >

                  <span className="font-display text-2xl font-bold text-accent w-6">
                    {i + 1}
                  </span>

                  <div className="flex-1 min-w-0">

                    <p className="font-body text-sm font-semibold text-foreground truncate">
                      {v.vendorname}
                    </p>

                    <p className="font-body text-xs text-muted-foreground">
                      {v.specialization}
                    </p>

                  </div>

                  <p className="font-body text-sm font-semibold text-foreground">
                    {v.city}
                  </p>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
