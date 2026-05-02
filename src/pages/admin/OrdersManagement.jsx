import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getOrders } from "../../services/api";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tag,
  Store,
  BarChart3,
  Settings,
} from "lucide-react";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      console.log("Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this order?"
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     await deleteOrder(id);
  //     fetchOrders();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };




  //  Search filter
  
  const filteredOrders = orders.filter((o) =>
    o.deliveryAddress?.toLowerCase().includes(search.toLowerCase()) ||
    o.orderStatus?.toLowerCase().includes(search.toLowerCase())
  );

  const items = [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Customers", to: "/admin/customers", icon: Users },
    { label: "Vendors", to: "/admin/vendors", icon: Store },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { label: "Categories", to: "/admin/categories", icon: Tag },
    { label: "Coupons", to: "/admin/coupons", icon: Tag },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ];

  return (
    <DashboardLayout role="Admin" userName="Admin" items={items}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by user or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 mb-4 w-full"
        />

        {/* 📦 Orders Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Cart Id</th>
              <th className="p-3 text-left">Order Date</th>
              {/* <th className="p-3 text-left">Product</th> */}
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Oreder Status</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Delivery Address</th>
              {/* <th className="p-3 text-left">Date</th> */}
              {/* <th className="p-3 text-center">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.oid} className="border-t">
                  <td className="p-3">{o.oid}</td>
                  <td className="p-3">{o.cartId}</td>
                  <td className="p-3">{o.orderDate}</td>
                  {/* <td className="p-3">{o.productName}</td> */}
                  <td className="p-3">₹{o.amount}</td>
                  <td className="p-3">{o.orderStatus}</td>
                  <td className="p-3">{o.paymentStatus}</td>
                  <td className="p-3">{o.deliveryAddress}</td>

                  {/* <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(o.orderId)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default OrdersManagement;