// import { useEffect, useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import {
//   getCoupons,
//   createCoupon,
//   deleteCoupon,
// } from "../../services/api";

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

// const CouponManagement = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState("");

//   const [form, setForm] = useState({
//     coupon_code: "",
//     discount_type: "",
//     minimum_order_amount: "",
//     maximum_order_amount: "",
//   });

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   const fetchCoupons = async () => {
//     try {
//       const res = await getCoupons();
//       console.log("Coupons:", res.data);
//       setCoupons(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAdd = async () => {
//     const { coupon_code, discount_type } = form;

//     if (!coupon_code || !discount_type) return;

//     try {
//       const payload = {
//         couponCode: form.coupon_code,
//         discountType: form.discount_type,
//         minimumOrderAmount: Number(form.minimum_order_amount),
//         maximumOrderAmount: Number(form.maximum_order_amount),
//       };

//       await createCoupon(payload);

//       setForm({
//         coupon_code: "",
//         discount_type: "",
//         minimum_order_amount: "",
//         maximum_order_amount: "",
//       });

//       fetchCoupons();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//         "Are you sure you want to delete this coupon?"
//       );

//     if (!confirmDelete) return;

//     try {
//       await deleteCoupon(id);
//       fetchCoupons();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const items = [
//     { label: "Overview", to: "/admin", icon: LayoutDashboard },
//     { label: "Customers", to: "/admin/customers", icon: Users },
//     { label: "Vendors", to: "/admin/vendors", icon: Store },
//     { label: "Products", to: "/admin/products", icon: Package },
//     { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
//     { label: "Categories", to: "/admin/categories", icon: Tag },
//     { label: "Coupons", to: "/admin/coupons", icon: Tag }, // current page
//     { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
//     { label: "Settings", to: "/admin/settings", icon: Settings },
//   ];

//   //filter coupons based on search
//    const filteredCoupons = coupons.filter((c) =>
//     c.couponCode?.toLowerCase().includes(search.toLowerCase())
//   );


//   return (
//     <DashboardLayout role="Admin" userName="Admin" items={items}>
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-6">Manage Coupons</h2>

//         {/* Add Coupon */}
//         <div className="grid grid-cols-4 gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Coupon Code"
//             value={form.coupon_code}
//             onChange={(e) =>
//               setForm({ ...form, coupon_code: e.target.value })
//             }
//             className="border px-4 py-2"
//           />

//           <input
//             type="text"
//             placeholder="Discount Type (%, flat)"
//             value={form.discount_type}
//             onChange={(e) =>
//               setForm({ ...form, discount_type: e.target.value })
//             }
//             className="border px-4 py-2"
//           />

//           <input
//             type="number"
//             placeholder="Min Amount"
//             value={form.minimum_order_amount}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 minimum_order_amount: e.target.value,
//               })
//             }
//             className="border px-4 py-2"
//           />

//           <input
//             type="number"
//             placeholder="Max Amount"
//             value={form.maximum_order_amount}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 maximum_order_amount: e.target.value,
//               })
//             }
//             className="border px-4 py-2"
//           />
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-primary text-white px-4 py-2 mb-6"
//         >
//           Add Coupon
//         </button>


//         {showForm && (
//           <section className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="w-full max-w-md bg-white p-8 shadow-sm">

//               <h2 className="text-2xl font-bold mb-6 text-center">
//                 Add Coupon
//               </h2>

//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleAdd();
//                   setShowForm(false);
//                 }}
//                 className="space-y-5"
//               >

//                 <input
//                   type="text"
//                   placeholder="Coupon Code"
//                   value={form.coupon_code}
//                   onChange={(e) =>
//                     setForm({ ...form, coupon_code: e.target.value })
//                   }
//                   className="w-full border p-3 text-sm outline-none"
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Discount Type (percentage / flat)"
//                   value={form.discount_type}
//                   onChange={(e) =>
//                     setForm({ ...form, discount_type: e.target.value })
//                   }
//                   className="w-full border p-3 text-sm outline-none"
//                   required
//                 />

//                 <input
//                   type="number"
//                   placeholder="Minimum Order Amount"
//                   value={form.minimum_order_amount}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       minimum_order_amount: e.target.value,
//                     })
//                   }
//                   className="w-full border p-3 text-sm outline-none"
//                 />

//                 <input
//                   type="number"
//                   placeholder="Maximum Order Amount"
//                   value={form.maximum_order_amount}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       maximum_order_amount: e.target.value,
//                     })
//                   }
//                   className="w-full border p-3 text-sm outline-none"
//                 />

//                 <button className="w-full bg-[hsl(var(--accent))] text-white py-3 text-xs uppercase tracking-widest">
//                   Create Coupon
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="w-full border py-3 text-xs uppercase"
//                 >
//                   Cancel
//                 </button>

//               </form>
//             </div>
//           </section>
//         )}


//         <input
//           type="text"
//           placeholder="Search by coupon code..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 mb-4 w-full"
//         />
//         {/* Coupon List */}
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">Code</th>
//               <th className="p-3 text-left">Type</th>
//               <th className="p-3 text-left">Min Amount</th>
//               <th className="p-3 text-left">Max Amount</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCoupons.map((c) => (
//               <tr key={c.coupon_id} className="border-t">
//                 <td className="p-3">{c.couponCode}</td>
//                 <td className="p-3">{c.discountType}</td>
//                 <td className="p-3">{c.minimumOrderAmount}</td>
//                 <td className="p-3">{c.maximumOrderAmount}</td>
//                 <td className="p-3 text-center">
//                   <button
//                     onClick={() => handleDelete(c.couponId)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CouponManagement;



import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import { adminItems } from "../../components/admin/adminNav";

import {
  Tag,
  Percent,
  Trash2,
  Pencil,
  CheckCircle2,
} from "lucide-react";

import {
  getCoupons,
  createCoupon,
  deleteCoupon,
  updateCoupon
} from "../../services/api";

const emptyForm = {
  couponCode: "",
  discountType: "",
  minimumOrderAmount: "",
  maximumOrderAmount: "",
};

const CouponManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    fetchCoupons();
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        setAdminName(user.username || user.name);
      }
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();

      const formatted = res.data.map((c) => ({
        id: c.couponId,
        couponCode: c.couponCode,
        discountType: c.discountType,
        min: c.minimumOrderAmount,
        max: c.maximumOrderAmount,
        updated: new Date().toLocaleDateString(),
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return rows.filter((c) =>
      c.couponCode.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
    };
  }, [rows]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      couponCode: c.couponCode,
      discountType: c.discountType,
      minimumOrderAmount: c.min,
      maximumOrderAmount: c.max,
    });
    setModalOpen(true);
  };


//   const handleSave = async () => {
//   try {
//     if (!form.couponCode || !form.discountType) return;

//     const payload = {
//       couponId: editing.id,
//       couponCode: form.couponCode,
//       discountType: form.discountType,
//       minimumOrderAmount: Number(form.minimumOrderAmount),
//       maximumOrderAmount: Number(form.maximumOrderAmount),
//     };

//     if (editing) {
//       //  EDIT MODE
//       await updateCoupon(editing.id, payload);
//     } else {
//       //  CREATE MODE
//       await createCoupon(payload);
//     }

//     fetchCoupons();
//     setModalOpen(false);
//   } catch (err) {
//     console.error(err);
//   }
// };


const handleSave = async () => {
  try {

    if (!form.couponCode || !form.discountType) return;

    const payload = {
      couponCode: form.couponCode,
      discountType: form.discountType,
      minimumOrderAmount: Number(form.minimumOrderAmount),
      maximumOrderAmount: Number(form.maximumOrderAmount),
    };

    if (editing) {

      payload.couponId = editing.id;

      await updateCoupon(editing.id, payload);

    } else {

      await createCoupon(payload);

    }

    fetchCoupons();

    setModalOpen(false);

  } catch (err) {

    console.error(err);

  }
};
  const handleDelete = async () => {
    try {
      if (!confirmDelete) return;

      await deleteCoupon(confirmDelete.id);

      fetchCoupons();
      setConfirmDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <DashboardLayout role="Admin" userName="Admin" items={adminItems}>
    <DashboardLayout
        role="Admin"
        userName={adminName}
        items={adminItems}
      >
      <div className="p-6 lg:p-12">
        
        {/* Header */}
        <DashHeader
          eyebrow="Marketing"
          title="Manage"
          titleAccent="Coupons"
          description="Create and manage discount coupons for your store."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Coupons" value={String(stats.total)} icon={Tag} />
        </div>

        {/* Toolbar */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search coupons..."
          onAdd={openAdd}
          addLabel="Add Coupon"
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="bg-secondary/40">
                <tr>
                  {["Code", "Percentage", "Min", "Max", "Updated", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs uppercase text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-secondary/30">
                    <td className="px-6 py-4 font-semibold">{c.couponCode}</td>
                    <td className="px-6 py-4">{c.discountType}%</td>
                    <td className="px-6 py-4">{c.min}</td>
                    <td className="px-6 py-4">{c.max}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {c.updated}
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-2 hover:bg-accent rounded"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => setConfirmDelete(c)}
                        className="p-2 hover:bg-destructive rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-muted-foreground">
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Coupon" : "New Coupon"}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={handleSave}>
              {editing ? "Save Changes" : "Create Coupon"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <input
            placeholder="Coupon Code"
            value={form.couponCode}
            onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
            className="w-full border px-3 py-2"
          />

          <input
            placeholder="Discount Percentage"
            value={form.discountType}
            onChange={(e) => setForm({ ...form, discountType: e.target.value })}
            className="w-full border px-3 py-2"
          />

          <input
            type="number"
            placeholder="Minimum Amount"
            value={form.minimumOrderAmount}
            onChange={(e) =>
              setForm({ ...form, minimumOrderAmount: e.target.value })
            }
            className="w-full border px-3 py-2"
          />

          <input
            type="number"
            placeholder="Maximum Amount"
            value={form.maximumOrderAmount}
            onChange={(e) =>
              setForm({ ...form, maximumOrderAmount: e.target.value })
            }
            className="w-full border px-3 py-2"
          />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete coupon?"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">
          You're about to delete{" "}
          <span className="font-semibold">{confirmDelete?.couponCode}</span>
        </p>
      </Modal>
    </DashboardLayout>
  );
};

export default CouponManagement;