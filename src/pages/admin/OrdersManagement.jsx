// import { useEffect, useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { getOrders } from "../../services/api";

// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   ShoppingCart,
//   Tag,
//   Store,
//   BarChart3,
//   Settings,
// } from "lucide-react";

// const OrdersManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await getOrders();
//       console.log("Orders:", res.data);
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };




//   //  Search filter
  
//   const filteredOrders = orders.filter((o) =>
//     o.deliveryAddress?.toLowerCase().includes(search.toLowerCase()) ||
//     o.orderStatus?.toLowerCase().includes(search.toLowerCase())
//   );

//   const items = [
//     { label: "Overview", to: "/admin", icon: LayoutDashboard },
//     { label: "Customers", to: "/admin/customers", icon: Users },
//     { label: "Vendors", to: "/admin/vendors", icon: Store },
//     { label: "Products", to: "/admin/products", icon: Package },
//     { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
//     { label: "Categories", to: "/admin/categories", icon: Tag },
//     { label: "Coupons", to: "/admin/coupons", icon: Tag },
//     { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
//     { label: "Settings", to: "/admin/settings", icon: Settings },
//   ];

//   return (
//     <DashboardLayout role="Admin" userName="Admin" items={items}>
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

//         {/* 🔍 Search */}
//         <input
//           type="text"
//           placeholder="Search by user or product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 mb-4 w-full"
//         />

//         {/* 📦 Orders Table */}
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">Order ID</th>
//               <th className="p-3 text-left">Cart Id</th>
//               <th className="p-3 text-left">Order Date</th>
//               {/* <th className="p-3 text-left">Product</th> */}
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Oreder Status</th>
//               <th className="p-3 text-left">Payment Status</th>
//               <th className="p-3 text-left">Delivery Address</th>
//               {/* <th className="p-3 text-left">Date</th> */}
//               {/* <th className="p-3 text-center">Action</th> */}
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center p-4">
//                   No orders found
//                 </td>
//               </tr>
//             ) : (
//               filteredOrders.map((o) => (
//                 <tr key={o.oid} className="border-t">
//                   <td className="p-3">{o.oid}</td>
//                   <td className="p-3">{o.cartId}</td>
//                   <td className="p-3">{o.orderDate}</td>
//                   {/* <td className="p-3">{o.productName}</td> */}
//                   <td className="p-3">₹{o.amount}</td>
//                   <td className="p-3">{o.orderStatus}</td>
//                   <td className="p-3">{o.paymentStatus}</td>
//                   <td className="p-3">{o.deliveryAddress}</td>

//                   {/* <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDelete(o.orderId)}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </button>
//                   </td> */}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default OrdersManagement;


import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import { adminItems } from "../../components/admin/adminNav";

import {
  ShoppingCart,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { getOrders } from "../../services/api";

const OrdersManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();

      const formatted = res.data.map((o) => ({
        id: o.oid,
        cartId: o.cartId,
        orderDate: new Date(o.orderDate).toLocaleDateString(),
        amount: o.amount,
        orderStatus: o.orderStatus,
        paymentStatus: o.paymentStatus,
        address: o.deliveryAddress,
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search
  const filtered = useMemo(() => {
    return rows.filter((o) =>
      o.address?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderStatus?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((o) => o.orderStatus === "pending").length;
    const completed = rows.filter((o) => o.orderStatus === "completed").length;

    return { total, pending, completed };
  }, [rows]);

  return (
    <DashboardLayout role="Admin" userName="Admin" items={adminItems}>
      <div className="p-6 lg:p-12">

        {/* Header */}
        <DashHeader
          eyebrow="Sales"
          title="Manage"
          titleAccent="Orders"
          description="Track and manage all customer orders in one place."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Orders" value={String(stats.total)} icon={ShoppingCart} />
          <StatCard label="Pending" value={String(stats.pending)} icon={Clock} />
          <StatCard label="Completed" value={String(stats.completed)} icon={CheckCircle2} />
        </div>

        {/* Toolbar */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search by address or status..."
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-secondary/40">
                <tr>
                  {[
                    "Order ID",
                    "Cart ID",
                    "Date",
                    "Amount",
                    "Order Status",
                    "Payment",
                    "Address",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-t hover:bg-secondary/30">
                    <td className="px-6 py-4 font-semibold">#{o.id}</td>
                    <td className="px-6 py-4">{o.cartId}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {o.orderDate}
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{o.amount}</td>

                    {/* Order Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-[10px] uppercase font-semibold rounded-sm ${
                          o.orderStatus === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-[10px] uppercase font-semibold rounded-sm ${
                          o.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {o.address}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-muted-foreground">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersManagement;