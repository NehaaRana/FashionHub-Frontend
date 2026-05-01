import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getCategories, createCategory, deleteCategory } from "../../services/api";
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
const CategoryManagement = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      console.log("Categories:", res.data);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!name) return;

    try {
      await createCategory({ name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
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
  { label: "Categories", to: "/admin/categories", icon: Tag }, // 👈 ADD THIS
  { label: "Coupons", to: "/admin/coupons", icon: Tag },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];
  return (
    <DashboardLayout role="Admin" userName="Admin">

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

        {/* Add Category */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full"
          />
          <button onClick={handleAdd} className="bg-primary text-white px-4 py-2">
            Add
          </button>
        </div>

        {/* Category List */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
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

export default CategoryManagement;