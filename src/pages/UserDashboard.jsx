import DashboardLayout from "../components/DashboardLayout";
import DashHeader from "../components/dashboard/DashHeader";
import StatCard from "../components/dashboard/StatCard";
import { useEffect, useState } from "react";
import { getCurrentUser,getCoupons,getOrders,getWishlist ,getUserOrders,
getUserWishlist} from "../services/api";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Tag,
  MapPin,
  User,
  Package,
  Star,
  Gift,
} from "lucide-react";
import { userNav } from "./user/userNav";

const items = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", to: "/dashboard/orders", icon: ShoppingBag },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
  { label: "Coupons", to: "/dashboard/coupons", icon: Tag },
  { label: "Addresses", to: "/dashboard/addresses", icon: MapPin },
  { label: "Profile", to: "/dashboard/profile", icon: User },
];

const statusColor = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-accent/15 text-accent",
};

const UserDashboard = () => {

  const [orders, setOrders] = useState([]);
const [coupons, setCoupons] = useState([]);
const [wishlist, setWishlist] = useState([]);

  const [user, setUser] = useState(null);


//   useEffect(() => {
//   const loadUserAndData = async () => {
//     try {
//       const userRes = await getCurrentUser();
//       const currentUser = userRes.data;
//       setUser(currentUser);

//       // fetch all data in parallel
//       const [ordersRes, couponsRes, wishlistRes] = await Promise.all([
//         getOrders(),
//         getCoupons(),
//         getWishlist()
//       ]);

//       // FILTER BY USER (VERY IMPORTANT)
//       const userOrders = ordersRes.data.filter(
//         (o) => o.userId === currentUser.uid
//       );

//       const userWishlist = wishlistRes.data.filter(
//         (w) => w.userId === currentUser.uid
//       );

//       setOrders(userOrders);
//       setCoupons(couponsRes.data);
//       setWishlist(userWishlist);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   loadUserAndData();
// }, []);
  useEffect(() => {

  const loadUserAndData = async () => {

    try {

      // current logged-in user
      const userRes = await getCurrentUser();

      const currentUser = userRes.data;

      setUser(currentUser);

      // fetch user-specific data
      const [ordersRes, couponsRes, wishlistRes] =
        await Promise.all([
          getUserOrders(currentUser.uid),
          getCoupons(),
          getUserWishlist(currentUser.uid),
        ]);

      setOrders(ordersRes.data);
      setCoupons(couponsRes.data);
      setWishlist(wishlistRes.data);

    } catch (err) {

      console.log(err);

    }

  };

  loadUserAndData();

}, []);
  if (!user) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    // <DashboardLayout role="User" userName="Priya Iyer" items={items}>
    <DashboardLayout
      role={user?.role || "User"}
      userName={user?.username || user?.name || "User"}
      items={userNav}
    >      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="My Account"
          title="Welcome back,"
          // titleAccent="Priya"
          titleAccent={user.username || user.name}
          description="Track orders, manage your wishlist and unlock exclusive member coupons."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Orders" value={orders.length} delta="2 this month" icon={Package} delay={0} />
          <StatCard label="Wishlist" value={wishlist.length} icon={Heart} delay={0.05} />
          <StatCard label="Coupons" value={coupons.length} icon={Tag} delay={0.1} />
          <StatCard label="Reward Points" value="1,240" delta="180 earned" icon={Star} delay={0.15} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="xl:col-span-2 bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Recent Orders</h2>
                <p className="font-body text-xs text-muted-foreground mt-1">Your latest purchases</p>
              </div>
              <button className="font-body text-xs uppercase tracking-[0.15em] text-accent font-semibold hover:underline">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/40">
                  <tr>
                    {["Order", "Date", "Items", "Total", "Status"].map((h) => (
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
                  {orders.map((o) => (
                    <tr key={o.oid} className="border-t border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">{o.oid}</td>
                      <td className="px-6 py-4 font-body text-xs text-muted-foreground">{o.date}</td>
                      <td className="px-6 py-4 font-body text-sm text-foreground">{o.items}</td>
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
                  {orders.map((o) => (
                    <tr
                      key={o.oid}
                      className="border-t border-border hover:bg-secondary/30 transition-colors"
                    >

                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                        #{o.oid}
                      </td>

                      <td className="px-6 py-4 font-body text-xs text-muted-foreground">
                        {o.orderDate?.split("T")[0]}
                      </td>

                      <td className="px-6 py-4 font-body text-sm text-foreground">
                        {o.deliveryAddress}
                      </td>

                      <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                        ₹{o.amount}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${
                            statusColor[o.orderStatus] || "bg-gray-100 text-gray-700"
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

          {/* Coupons */}
          <div className="bg-card border border-border rounded-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-6 border-b border-border flex items-center gap-2">
              <Gift className="h-4 w-4 text-accent" />
              <h2 className="font-display text-xl font-semibold text-foreground">Your Coupons</h2>
            </div>
            <ul className="p-4 space-y-3">
              {coupons.map((c) => (
                <li
                  key={c.code}
                  className="border border-dashed border-accent/50 bg-accent/5 rounded-sm p-4 hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-lg font-bold text-foreground">{c.off}</span>
                    <span className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Exp {c.expires}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mb-3">{c.desc}</p>
                  <div className="flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2">
                    <code className="font-body text-sm font-semibold text-foreground tracking-wider">
                      {c.code}
                    </code>
                    <button className="font-body text-[10px] uppercase tracking-[0.15em] text-accent font-semibold hover:underline">
                      Copy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
