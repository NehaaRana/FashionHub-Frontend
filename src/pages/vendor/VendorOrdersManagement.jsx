import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import { ShoppingBag, PackageCheck, Clock } from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import { getVendorOrders,getCurrentUser,  updateOrderStatus
  } from "../../services/api";

const VendorOrdersManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [vendorName, setVendorName] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);
  const tabs = ["All", "Pending", "Processing", "Delivered"];
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

  const handleStatusChange = async (orderId, status) => {
    try {

      await updateOrderStatus(orderId, {
        orderStatus: status
      });

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

  // const filtered = useMemo(() => {
  //   return rows.filter((o) => {
  //     if (!search) return true;

  //     return (
  //       o.product?.toLowerCase().includes(search.toLowerCase()) ||
  //       o.orderStatus?.toLowerCase().includes(search.toLowerCase())
  //     );
  //   });
  // }, [rows, search]);
const filtered = useMemo(() => {
  return rows.filter((o) => {
    const matchesTab =
      tab === "All" ||
      o.orderStatus?.toLowerCase() === tab.toLowerCase();

    const matchesSearch =
      !search ||
      o.product?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderStatus?.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });
}, [rows, search, tab]);


  // const stats = useMemo(() => {
  //   return {
  //     total: rows.length,
  //     delivered: rows.filter(
  //       (o) => o.orderStatus?.toLowerCase() === "delivered"
  //     ).length,
  //     pending: rows.filter(
  //       (o) => o.orderStatus?.toLowerCase() === "pending"
  //     ).length,
  //   };
  // }, [rows]);
  const stats = useMemo(() => {
  return {
    total: rows.length,

    pending: rows.filter(
      (o) => o.orderStatus === "Pending"
    ).length,

    processing: rows.filter(
      (o) => o.orderStatus === "Processing"
    ).length,

    delivered: rows.filter(
      (o) => o.orderStatus === "Delivered"
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
        <div className="grid grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Orders"
            value={stats.total}
            icon={ShoppingBag}
          />
            <StatCard
            label="Pending"
            value={stats.pending}
            icon={Clock}
          />
          <StatCard label="Processing" 
            value={stats.processing} 
            icon={PackageCheck} />


          <StatCard
            label="Delivered"
            value={stats.delivered}
            icon={PackageCheck}
          />

        
        </div>

        <div className="bg-card border border-border rounded-sm overflow-hidden mb-6">
          <div className="p-5 border-b border-border flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-body text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-sm border transition-colors ${
                    tab === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-accent hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search + Refresh */}
            <div className="flex gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product or status..."
                className="px-4 py-2.5 border border-border rounded-sm w-72 focus:outline-none focus:border-accent"
              />

              <button
                onClick={fetchOrders}
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-sm"
              >
                Refresh
              </button>
            </div>

          </div>
        </div>


        {/* Search */}
        {/* <AdminToolbar
          search={search}
          onSearch={setSearch}
          addLabel="Refresh"
          onAdd={fetchOrders}
        /> */}

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
                  "Action"
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
                  <td className="px-6 py-4 whitespace-nowrap">

                    {o.orderStatus === "Pending" && (
                      <button
                        onClick={() => handleStatusChange(o.id, "Processing")}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Accept
                      </button>
                    )}

                    {o.orderStatus === "Processing" && (
                      <button
                        onClick={() => handleStatusChange(o.id, "Delivered")}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Mark Delivered
                      </button>
                    )}

                    {o.orderStatus === "Delivered" && (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    )}

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