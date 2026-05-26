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
    getCurrentUser,

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
  const [adminName, setAdminName] = useState("");
  const [form, setForm] = useState({ ...emptyForm });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
      fetchAdmin();

  }, []);

  const fetchAdmin = async () => {
  try {

    const res = await getCurrentUser();

    const admin = res.data;

    setAdminName(
      admin.adminName ||
      admin.name ||
      admin.fullName ||
      "Admin"
    );

  } catch (err) {
    console.log(err);
  }
};
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
    <DashboardLayout
        role="Admin"
        userName={adminName}
        items={adminItems}
      >
    {/*  <DashboardLayout role="Admin" userName="Anika Malhotra" items={adminItems}> */}
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
                        {/* <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center font-display font-semibold">
                          {c.categoryName.charAt(0)}
                        </div> */}
                        {/* First Letter Circle */}
                        <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center font-display font-semibold">
                          {c.categoryName.charAt(0)}
                        </div>

                        {/* Full Category Name */}
                        <div>
                          <p className="font-body text-sm font-semibold text-foreground">
                            {c.categoryName}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {c.occasion}
                          </p>
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
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Season</option>
                <option value="All Seasons">All Seasons</option>
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
