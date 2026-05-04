// import { useEffect, useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { getCategories, createCategory, deleteCategory } from "../../services/api";
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
// const CategoryManagement = () => {

//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await getCategories();
//       console.log("Categories:", res.data);
//       setCategories(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAdd = async () => {
//     if (!name) return;

//     try {
//       await createCategory({ name });
//       setName("");
//       fetchCategories();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteCategory(id);
//       fetchCategories();
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
//     { label: "Categories", to: "/admin/categories", icon: Tag }, // 👈 ADD THIS
//     { label: "Coupons", to: "/admin/coupons", icon: Tag },
//     { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
//     { label: "Settings", to: "/admin/settings", icon: Settings },
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   const [form, setForm] = useState({
//     categoryName: "",
//     occasion: "",
//     season: "",
//     isActive: true,
//   });
//   return (
//     <DashboardLayout role="Admin" userName="Admin" items={items}>

//       <div className="p-6">

//         <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

//         {/* Add Category */}
//         <div className="flex gap-3 mb-6">

//           {/* <button onClick={handleAdd} className="bg-primary text-white px-4 py-2">
//             Add
//           </button> */}
//           <div className="mb-6 flex justify-end">
//             <button
//               onClick={() => setIsOpen(true)}
//               className="bg-primary text-white px-5 py-2 rounded-sm"
//             >
//               + Add Category
//             </button>
//           </div>
//         </div>

//         {/* Category List */}
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((c) => (
//               <tr key={c.id} className="border-t">
//                 <td className="p-3">{c.categoryName}</td>
//                 <td className="p-3 text-center">
//                   <button
//                     onClick={() => handleDelete(c.id)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {isOpen && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-md p-6 rounded-sm shadow-lg">

//               <h2 className="text-xl font-semibold mb-4">Add Category</h2>

//               {/* Category Name */}
//               <input
//                 type="text"
//                 placeholder="Category Name"
//                 value={form.categoryName}
//                 onChange={(e) =>
//                   setForm({ ...form, categoryName: e.target.value })
//                 }
//                 className="w-full border px-3 py-2 mb-3"
//               />

//               {/* Occasion */}
//               <input
//                 type="text"
//                 placeholder="Occasion"
//                 value={form.occasion}
//                 onChange={(e) =>
//                   setForm({ ...form, occasion: e.target.value })
//                 }
//                 className="w-full border px-3 py-2 mb-3"
//               />

//               {/* Season */}
//               <input
//                 type="text"
//                 placeholder="Season"
//                 value={form.season}
//                 onChange={(e) =>
//                   setForm({ ...form, season: e.target.value })
//                 }
//                 className="w-full border px-3 py-2 mb-3"
//               />

//               {/* Is Active */}
//               <label className="flex items-center gap-2 mb-4">
//                 <input
//                   type="checkbox"
//                   checked={form.isActive}
//                   onChange={(e) =>
//                     setForm({ ...form, isActive: e.target.checked })
//                   }
//                 />
//                 Active
//               </label>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 border"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={async () => {
//                     try {
//                       await createCategory(form);
//                       setIsOpen(false);
//                       setForm({
//                         categoryName: "",
//                         occasion: "",
//                         season: "",
//                         isActive: true,
//                       });
//                       fetchCategories();
//                     } catch (err) {
//                       console.error(err);
//                     }
//                   }}
//                   className="bg-primary text-white px-4 py-2"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>

//     </DashboardLayout>
//   );
// };

// export default CategoryManagement;


import { useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { adminItems } from "../../components/admin/adminNav";
import { Button } from "../../components/ui/button";
// import { toast } from "../hooks/use-toast";
import {
  FolderTree,
  Layers,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/api";

const emptyForm = {
  categoryName: "",
  occasion: "",
  season: "",
  isActive: true,
};

const AdminCategories = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({ ...emptyForm });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      // map API → UI
      const formatted = res.data.map((item) => ({
        id: item.cid,
        categoryName: item.categoryName,
        occasion: item.occasion,
        season: item.season,
        isActive: item.isActive,
        updated: new Date().toLocaleDateString(),
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesSearch =
        r.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        r.occasion.toLowerCase().includes(search.toLowerCase()) ||
        r.season.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && r.isActive) ||
        (filter === "Hidden" && !r.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [rows, search, filter]);

  const stats = useMemo(() => {
    const total = rows.length;
    // const active = rows.filter((r) => r.status === "Active").length;
    const active = rows.filter((r) => r.isActive).length;
    return { total, active };
  }, [rows]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };


  const openEdit = (c) => {
    setEditing(c);
    setForm({
      categoryName: c.categoryName,
      occasion: c.occasion,
      season: c.season,
      isActive: c.isActive,
    });
    setModalOpen(true);
  };
  const handleSave = async () => {
    try {
      if (!form.categoryName.trim()) return;

      if (editing) {
        // await updateCategory(editing.id, form);
        await updateCategory(editing.id, {
          cid: editing.id,   // 👈 VERY IMPORTANT
          ...form,
        });

      } else {
        await createCategory(form);
      }

      fetchCategories(); // refresh list
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    const item = rows.find((r) => r.id === id);

    await updateCategory(id, {
      ...item,
      isActive: !item.isActive,
    });

    fetchCategories();
  };
  const handleDelete = async () => {
    try {
      if (!confirmDelete) return;

      await deleteCategory(confirmDelete.id);

      fetchCategories();
      setConfirmDelete(null);
    } catch (err) {
      console.error(err);
    }
  };
  const filterChips = ["All", "Active", "Hidden"];

  return (
    <DashboardLayout role="Admin" userName="Anika Malhotra" items={adminItems}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Catalogue"
          title="Manage"
          titleAccent="Categories"
          description="Create, edit and organise the categories that power discovery across FashionHub."
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Categories" value={String(stats.total)} icon={FolderTree} delay={0} />
          <StatCard label="Active" value={String(stats.active)} icon={CheckCircle2} delay={0.05} />
          {/* <StatCard label="Featured" value={String(stats.featured)} icon={Layers} delay={0.1} /> */}
          {/* <StatCard label="Linked Products" value={stats.products.toLocaleString()} icon={ImageIcon} delay={0.15} /> */}
          {/* <StatCard label="Total Categories" value={stats.total} />
<StatCard label="Active" value={stats.active} /> */}
        </div>

        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search categories, parent or slug..."
          onAdd={openAdd}
          addLabel="Add Category"
        />

        <div className="flex flex-wrap gap-2 mb-5">
          {filterChips.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-[11px] uppercase tracking-[0.18em] font-semibold px-4 py-2 rounded-sm border transition-colors ${filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-accent hover:text-foreground"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="bg-secondary/40">
                <tr>
                  {["Category", "Occasion", "Season", "Status", "Updated", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center font-display font-semibold">
                          {c.categoryName.charAt(0)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-foreground">{c.occasion}</td>
                    <td className="px-6 py-4 font-body text-xs text-muted-foreground">/{c.season}</td>
                    {/* <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">{c.products}</td> */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${c.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {c.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-muted-foreground">{c.updated}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleStatus(c.id)}
                          title={c.isActive ? "Hide" : "Show"}
                          className="h-8 w-8 flex items-center justify-center rounded-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          {c.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(c)}
                          title="Edit"
                          className="h-8 w-8 flex items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(c)}
                          title="Delete"
                          className="h-8 w-8 flex items-center justify-center rounded-sm text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center font-body text-sm text-muted-foreground">
                      No categories match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Category" : "New Category"}
        // subtitle={editing ? `Updating ${editing.name}` : "Add a new category to the catalogue"}
        subtitle={editing ? `Updating ${editing.categoryName}` : "Add a new category"}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={handleSave}>
              {editing ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        }
      >
        {/* <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">
                Name *
              </label>
              <input
                value={form.categoryName}
                onChange={(e) => setForm({ ...form, categoryName: e.target.value, slug: form.slug || slugify(e.target.value) })}
                className="w-full bg-background border border-border rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-accent"
                placeholder="e.g. Anarkali Suits"
              />
            </div>
          </div>
        </div> */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Category Name */}
            <div>
              <label className="block text-xs font-semibold mb-2">Name *</label>
              <input
                value={form.categoryName}
                onChange={(e) =>
                  setForm({ ...form, categoryName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Anarkali Suits"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs font-semibold mb-2">Occasion</label>
              <input
                value={form.occasion}
                onChange={(e) =>
                  setForm({ ...form, occasion: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Party, Wedding"
              />
            </div>

            {/* Season */}
            <div>
              <label className="block text-xs font-semibold mb-2">Season</label>
              {/* <input
        value={form.season}
        onChange={(e) =>
          setForm({ ...form, season: e.target.value })
        }
        className="w-full border rounded px-3 py-2"
        placeholder="e.g. Summer, Winter"
      /> */}
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>

            {/* isActive Toggle */}
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />
              <label className="text-sm">Active</label>
            </div>

          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete category?"
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
        <p className="font-body text-sm text-muted-foreground">
          You're about to permanently delete{" "}
          <span className="font-semibold text-foreground">{confirmDelete?.categoryName}</span>. Linked products
          ({confirmDelete?.products}) will be moved to "Uncategorised".
        </p>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminCategories;
