// import { useEffect, useState ,Fragment } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { getVendors, deleteVendor } from "../../services/api";

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

// const VendorManagement = () => {
//   const [vendors, setVendors] = useState([]);
//   const [search, setSearch] = useState("");
//   const [openRow, setOpenRow] = useState(null);
//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const res = await getVendors();
//       console.log("Vendors:", res.data);
//       setVendors(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this vendor?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteVendor(id);
//       fetchVendors();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Search filter
//   const filteredVendors = vendors.filter((v) =>
//     v.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
//     v.email?.toLowerCase().includes(search.toLowerCase())
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
//         <h2 className="text-2xl font-bold mb-6">Manage Vendors</h2>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 mb-4 w-full"
//         />
//           <div className="overflow-x-auto">
//             {/* Vendor Table */}
//             <table className="w-full border">
//               <thead  className="bg-gray-100 sticky top-0">
//                 <tr className="bg-gray-100">
//                   <th className="p-3 text-left">Vendor Name</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-left">Brand</th>
//                   {/* <th className="p-3 text-left">Owner Name</th>
//                   <th className="p-3 text-left">Gender</th>
//                   <th className="p-3 text-left">Mobile No</th>
//                   <th className="p-3 text-left">City</th>
//                   <th className="p-3 text-left">State</th>
//                   <th className="p-3 text-left">Specialization</th>
//                   <th className="p-3 text-left">Approved By Admin</th> */}

//                   <th className="p-3 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//   {filteredVendors.length === 0 ? (
//     <tr>
//       <td colSpan="4" className="text-center p-4">
//         No vendors found
//       </td>
//     </tr>
//   ) : (
//     filteredVendors.map((v) => (
//       <Fragment key={v.vid}>
//         <tr className="border-t">
//           <td className="p-3">{v.vendorname}</td>
//           <td className="p-3">{v.email}</td>
//           <td className="p-3">{v.brandname}</td>

//           <td className="p-3 text-center space-x-2">
//             <button
//               onClick={() =>
//                 setOpenRow(openRow === v.vid ? null : v.vid)
//               }
//               className="text-blue-500"
//             >
//               View
//             </button>

//             <button
//               onClick={() => handleDelete(v.vid)}
//               className="text-red-500"
//             >
//               Delete
//             </button>
//           </td>
//         </tr>

//         {/* Expand Row */}
//         {openRow === v.vid && (
//           <tr className="bg-gray-50">
//             <td colSpan="4" className="p-4">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <p><b>Owner:</b> {v.ownername}</p>
//                 <p><b>Gender:</b> {v.gender}</p>
//                 <p><b>Mobile:</b> {v.mobileno}</p>
//                 <p><b>City:</b> {v.city}</p>
//                 <p><b>State:</b> {v.state}</p>
//                 <p><b>Specialization:</b> {v.specialization}</p>
//                 <p><b>Approved:</b> {v.approvedByAdmin ? "Yes" : "No"}</p>
//               </div>
//             </td>
//           </tr>
//         )}
//       </Fragment>
//     ))
//   )}
// </tbody>

//               {/* <tbody >
//                 {filteredVendors.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center p-4">
//                       No vendors found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredVendors.map((v) => (
//                     <tr key={v.vid} className="border-t">
//                       <td className="p-3">{v.vendorname}</td>
//                       <td className="p-3">{v.email}</td>
//                       <td className="p-3">{v.brandname}</td>
//                       {/* <td className="p-3">{v.ownername}</td>
//                       <td className="p-3">{v.gender}</td>
//                       <td className="p-3">{v.mobileno}</td>
//                       <td className="p-3">{v.city}</td>
//                       <td className="p-3">{v.state}</td>
//                       <td className="p-3">{v.specialization}</td>
//                       <td className="p-3">{v.approvedByAdmin ? "Yes" : "No"}</td> */}
//                       {/* <td className="p-3 text-center space-x-2">

//                          <button
//                             onClick={() => setOpenRow(openRow === v.vid ? null : v.vid)}
//                             className="text-blue-500"
//                           >
//                             View
//                           </button>
//                         <button
//                           onClick={() => handleDelete(v.vid)} //  correct id
//                           className="text-red-500"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>



//                   ))
//                 )}
//               </tbody> */} 
//             </table>
//           </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default VendorManagement;



import { useEffect, useMemo, useState, Fragment } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import { adminItems } from "../../components/admin/adminNav";

import {
  Store,
  Trash2,
  Eye,
  CheckCircle2,
} from "lucide-react";

import {
  getVendors, deleteVendor, getCurrentUser,
} from "../../services/api";

const VendorManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    fetchVendors();
    loadAdmin();

  }, []);

  const loadAdmin = async () => {
    try {
      const res = await getCurrentUser();

      setAdminName(
        res.data?.username ||
        res.data?.name ||
        "Admin"
      );
    } catch (err) {
      console.log(err);
    }
  };
  const fetchVendors = async () => {
    try {
      const res = await getVendors();

      const formatted = res.data.map((v) => ({
        id: v.vid,
        name: v.vendorname,
        email: v.email,
        brand: v.brandname,
        owner: v.ownername,
        gender: v.gender,
        mobile: v.mobileno,
        city: v.city,
        state: v.state,
        specialization: v.specialization,
        // approved: v.approvedByAdmin,
        approvedStatus: v.approvedByAdmin,
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  //  Search
  const filtered = useMemo(() => {
    return rows.filter(
      (v) =>
        v.name?.toLowerCase().includes(search.toLowerCase()) ||
        v.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  //  Stats
  const stats = useMemo(() => {
    const total = rows.length;
    // const approved = rows.filter((v) => v.approved).length;
    // const pending = rows.filter((v) => !v.approved).length;

    const approved = rows.filter(
      (v) => v.approvedStatus === "Approved"
    ).length;

    const pending = rows.filter(
      (v) => v.approvedStatus === "Pending"
    ).length;
    return { total, approved, pending };
  }, [rows]);

  const handleDelete = async () => {
    try {
      if (!confirmDelete) return;

      await deleteVendor(confirmDelete.id);
      fetchVendors();
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
          eyebrow="Marketplace"
          title="Manage"
          titleAccent="Vendors"
          description="Manage vendor profiles, approvals and business details."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Vendors" value={String(stats.total)} icon={Store} />
          <StatCard label="Approved" value={String(stats.approved)} icon={CheckCircle2} />
          <StatCard label="Pending" value={String(stats.pending)} icon={Eye} />
        </div>

        {/* Toolbar */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search vendors by name or email..."
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-secondary/40">
                <tr>
                  {["Vendor", "Email", "Brand", "Status", "Actions"].map((h) => (
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
                {filtered.map((v) => (
                  <Fragment key={v.id}>

                    {/* Main Row */}
                    <tr className="border-t hover:bg-secondary/30">

                      {/* Vendor Name with Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center font-semibold">
                            {v.name?.charAt(0)}
                          </div>
                          <span className="font-semibold">{v.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {v.email}
                      </td>

                      <td className="px-6 py-4">{v.brand}</td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase font-semibold rounded-sm ${
                            // v.approved
                            //   ? "bg-emerald-100 text-emerald-700"
                            //   : "bg-yellow-100 text-yellow-700"
                            v.approvedStatus === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : v.approvedStatus === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {/* {v.approved ? "Approved" : "Pending"} */}
                          {v.approvedStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setOpenRow(openRow === v.id ? null : v.id)
                            }
                            className="p-2 hover:bg-secondary rounded"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => setConfirmDelete(v)}
                            className="p-2 hover:bg-destructive rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expand Row */}
                    {openRow === v.id && (
                      <tr className="bg-secondary/20">
                        <td colSpan={5} className="px-6 py-5">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <p><b>Owner:</b> {v.owner}</p>
                            <p><b>Gender:</b> {v.gender}</p>
                            <p><b>Mobile:</b> {v.mobile}</p>
                            <p><b>City:</b> {v.city}</p>
                            <p><b>State:</b> {v.state}</p>
                            <p><b>Specialization:</b> {v.specialization}</p>
                          </div>
                        </td>
                      </tr>
                    )}

                  </Fragment>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground">
                      No vendors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete vendor?"
        subtitle="This action cannot be undone."
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
          <span className="font-semibold">{confirmDelete?.name}</span>.
        </p>
      </Modal>

    </DashboardLayout>
  );
};

export default VendorManagement;

