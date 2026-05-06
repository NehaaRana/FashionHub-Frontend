import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import {
  Package,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories 
} from "../../services/api";

const emptyForm = {
   productName: "",
  description: "",
  price: "",
  discount: "",
  fabric: "",
  color: "",
  size: "",
  stock: "",
  cid: "",
  image: null,
  isActive: true,
};



const ProductManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
      fetchCategories();

  }, []);

  // const fetchProducts = async () => {
  //   const res = await getVendorProducts();
  //   const formatted = res.data.map((p) => ({
  //     id: p.pid,
  //     productName: p.productName,
  //     price: p.price,
  //     stock: p.stock,
  //     isActive: p.isActive,
  //     updated: new Date().toLocaleDateString(),
  //   }));
  //   setRows(formatted);
  // };

  const fetchProducts = async () => {
    // const vendorId = Number(localStorage.getItem("vendorId"));
    const user = JSON.parse(localStorage.getItem("user"));
    const vendorId = user?.vid;
    const res = await getVendorProducts(vendorId);

    // const formatted = res.data.map((p) => ({
    //   id: p.pid,
    //   productName: p.productName,
    //   price: p.price,
    //   stock: p.stock,
    //   isActive: p.isActive,
    //   // image: p.productImage,
    //   image: `https://localhost:7106${p.productImage}`, 
    //   created: new Date(p.createdAt).toLocaleDateString(),
    // }));

    const formatted = res.data.map((p) => ({
        id: p.pid,
        productName: p.productName,
        description: p.description,
        price: p.price,
        discount: p.discount,
        fabric: p.fabric,
        color: p.color,
        size: p.size,
        stock: p.stock,
        cid: p.cid,
        isActive: p.isActive,
        image: `https://localhost:7106${p.productImage}`,
      }));

    setRows(formatted);
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
       console.log("CATEGORIES:", res.data)
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch = r.productName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ||
        (filter === "Active" && r.isActive) ||
        (filter === "Hidden" && !r.isActive);

      return matchSearch && matchFilter;
    });
  }, [rows, search, filter]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      active: rows.filter((r) => r.isActive).length,
    };
  }, [rows]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    // setForm(p);
     setForm({
    ...p,
    image: null, // important (file input reset)
  });
    setModalOpen(true);
  };

  // const handleSave = async () => {
  //   if (!form.productName.trim()) return;

  //   if (editing) {
  //     await updateProduct(editing.id, { pid: editing.id, ...form });
  //   } else {
  //     await createProduct(form);
  //   }

  //   fetchProducts();
  //   setModalOpen(false);
  // };


  const handleSave = async () => {
     try {
    if (!form.productName.trim()) {
      alert("Product name required");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const vendorId = user?.vid;

    const formData = new FormData();

    formData.append("Vid", vendorId);
    formData.append("Cid",Number(form.cid)); // ⚠️ must not be empty
    formData.append("ProductName", form.productName);
    formData.append("Description", form.description);
    formData.append("Price", form.price);
    formData.append("Discount", form.discount);
    formData.append("Fabric", form.fabric);
    formData.append("Color", form.color);
    formData.append("Size", form.size); 
    formData.append("Stock", form.stock);
    formData.append("IsActive", form.isActive);

    if (form.image) {
      formData.append("Image", form.image);
    }

    if (editing) {
      await updateProduct(editing.id, formData);
    } else {
      await createProduct(formData);
    }

    alert("Product saved successfully ");

    fetchProducts();
    setModalOpen(false);
  } catch (err) {
    console.error(err);
    alert("Error while saving product ");
  }
  };

  const handleDelete = async () => {
    await deleteProduct(confirmDelete.id);
    fetchProducts();
    setConfirmDelete(null);
  };

  return (
    <DashboardLayout role="Vendor" userName="Vendor" items={vendorItems}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Catalogue"
          title="Manage"
          titleAccent="Products"
          description="Add, edit and manage your store products."
        />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Products" value={stats.total} icon={Package} />
          <StatCard label="Active" value={stats.active} icon={CheckCircle2} />
        </div>

        <AdminToolbar
          search={search}
          onSearch={setSearch}
          onAdd={openAdd}
          addLabel="Add Product"
        />

        <div className="bg-card border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {["Product", "Price", "Stock", "Image", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.productName}</td>
                  {/* <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {p.productName}
                  </td> */}
                  <td className="px-6 py-4">₹{p.price}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4">
                    <img
                      src={p.image}
                      alt={p.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {p.isActive ? "Active" : "Hidden"}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEdit(p)}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => setConfirmDelete(p)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Product" : "New Product"}
        subtitle={
          editing
            ? `Updating ${editing.productName}`
            : "Add a new product"
        }
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editing ? "Update Product" : "Create Product"}
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Product Name *
              </label>
              <input
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Kurti"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Price
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-2">
                Description
              </label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Discount
              </label>
              <input
                type="number"
                value={form.discount}
                onChange={(e) =>
                  setForm({ ...form, discount: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Stock
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Fabric */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Fabric
              </label>
              <input
                value={form.fabric}
                onChange={(e) =>
                  setForm({ ...form, fabric: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Color
              </label>
              <input
                value={form.color}
                onChange={(e) =>
                  setForm({ ...form, color: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Size
              </label>
              <input
                value={form.size}
                onChange={(e) =>
                  setForm({ ...form, size: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Category
              </label>
              <select
                value={form.cid || ""}
                onChange={(e) =>
                  setForm({ ...form, cid: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.cid} value={cat.cid}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
                className="w-full"
              />
            </div>

            {/* Active Status */}
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

      {/* Delete */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete?"
        footer={
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        }
      >
        Are you sure?
      </Modal>
    </DashboardLayout>
  );
};

export default ProductManagement;