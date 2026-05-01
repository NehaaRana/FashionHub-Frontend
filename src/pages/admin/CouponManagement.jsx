import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  getCoupons,
  createCoupon,
  deleteCoupon,
} from "../../services/api";

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

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);

  const [form, setForm] = useState({
    coupon_code: "",
    discount_type: "",
    minimum_order_amount: "",
    maximum_order_amount: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();
      console.log("Coupons:", res.data);
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    const { coupon_code, discount_type } = form;

    if (!coupon_code || !discount_type) return;

    try {
      await createCoupon(form);
      setForm({
        coupon_code: "",
        discount_type: "",
        minimum_order_amount: "",
        maximum_order_amount: "",
      });
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const items = [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Customers", to: "/admin/customers", icon: Users },
    { label: "Vendors", to: "/admin/vendors", icon: Store },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { label: "Categories", to: "/admin/categories", icon: Tag },
    { label: "Coupons", to: "/admin/coupons", icon: Tag }, // current page
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ];

  return (
    <DashboardLayout role="Admin" userName="Admin" items={items}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Coupons</h2>

        {/* Add Coupon */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <input
            type="text"
            placeholder="Coupon Code"
            value={form.coupon_code}
            onChange={(e) =>
              setForm({ ...form, coupon_code: e.target.value })
            }
            className="border px-4 py-2"
          />

          <input
            type="text"
            placeholder="Discount Type (%, flat)"
            value={form.discount_type}
            onChange={(e) =>
              setForm({ ...form, discount_type: e.target.value })
            }
            className="border px-4 py-2"
          />

          <input
            type="number"
            placeholder="Min Amount"
            value={form.minimum_order_amount}
            onChange={(e) =>
              setForm({
                ...form,
                minimum_order_amount: e.target.value,
              })
            }
            className="border px-4 py-2"
          />

          <input
            type="number"
            placeholder="Max Amount"
            value={form.maximum_order_amount}
            onChange={(e) =>
              setForm({
                ...form,
                maximum_order_amount: e.target.value,
              })
            }
            className="border px-4 py-2"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 mb-6"
        >
          Add Coupon
        </button>

        {/* Coupon List */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Min Amount</th>
              <th className="p-3 text-left">Max Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.coupon_id} className="border-t">
                <td className="p-3">{c.couponCode}</td>
                <td className="p-3">{c.discountType}</td>
                <td className="p-3">{c.minimumOrderAmount}</td>
                <td className="p-3">{c.maximumOrderAmount}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(c.coupon_id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CouponManagement;