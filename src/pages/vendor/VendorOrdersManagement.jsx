import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import { ShoppingBag, PackageCheck, Clock } from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import { getVendorOrders,getCurrentUser  } from "../../services/api";

const VendorOrdersManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [vendorName, setVendorName] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // const user = JSON.parse(localStorage.getItem("user"));
      // const vendorId = user?.vid;

          const userRes = await getCurrentUser();

          const currentVendor = userRes.data;

          // SET OWNER NAME
          setVendorName(currentVendor.ownername);
       // GET VENDOR ID
    const vendorId =
      currentVendor.vid ||
      currentVendor.Vid;


      const res = await getVendorOrders(vendorId);

      const formatted = res.data.map((o) => ({
        id: o.oid,
        product: o.productName,
        amount: o.amount,
        orderStatus: o.orderStatus,
        paymentStatus: o.paymentStatus,
        quantity: o.cartQuantity,
        size: o.selectedSize,
        color: o.selectedColor,
        address: o.deliveryAddress,
        estimatedDelivery: o.estimatedDelivery,
        orderDate: o.orderDate,
      }));

      setRows(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = useMemo(() => {
    return rows.filter((o) => {
      if (!search) return true;

      return (
        o.product?.toLowerCase().includes(search.toLowerCase()) ||
        o.orderStatus?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [rows, search]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      delivered: rows.filter(
        (o) => o.orderStatus?.toLowerCase() === "delivered"
      ).length,
      pending: rows.filter(
        (o) => o.orderStatus?.toLowerCase() === "pending"
      ).length,
    };
  }, [rows]);

  return (
    // <DashboardLayout role="Vendor" userName="Vendor" items={vendorItems}>
    <DashboardLayout
        role="Vendor"
        userName={vendorName}
        items={vendorItems}
      >
      <div className="p-6 lg:p-12">

        <DashHeader
          eyebrow="Orders"
          title="Vendor"
          titleAccent="Orders"
          description="Manage and track all customer orders."
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          <StatCard
            label="Total Orders"
            value={stats.total}
            icon={ShoppingBag}
          />

          <StatCard
            label="Delivered"
            value={stats.delivered}
            icon={PackageCheck}
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            icon={Clock}
          />
        </div>

        {/* Search */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          addLabel="Refresh"
          onAdd={fetchOrders}
        />

        {/* Table */}
        <div className="bg-card border rounded-sm overflow-hidden mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Product",
                  "Amount",
                  "Quantity",
                  "Size",
                  "Color",
                  "Order Status",
                  "Payment",
                  "Address",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.product}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹ {o.amount}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.quantity}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.size}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.color}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.orderStatus}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.paymentStatus}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {o.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default VendorOrdersManagement;