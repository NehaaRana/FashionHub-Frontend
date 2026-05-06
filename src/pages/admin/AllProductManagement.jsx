import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import { adminItems } from "../../components/admin/adminNav";
import { Package, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { getAllProducts } from "../../services/api";


const AllProductManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("https://localhost:7106/api/Products");

  //     const formatted = res.data.map((item) => ({
  //       id: item.pid,
  //       productName: item.productName,
  //       price: item.price,
  //       discount: item.discount,
  //       stock: item.stock,
  //       color: item.color,
  //       size: item.size,
  //       image: item.productImage,
  //       isActive: item.isActive,
  //       created: new Date(item.createdAt).toLocaleDateString(),
  //     }));

  //     setRows(formatted);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // Search + Filter
 
 
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      const formatted = res.data.map((item) => ({
        id: item.pid,
        productName: item.productName,
        price: item.price,
        discount: item.discount,
        stock: item.stock,
        color: item.color,
        size: item.size,
        image: item.productImage,
        isActive: item.isActive,
        created: new Date(item.createdAt).toLocaleDateString(),
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };
  
  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesSearch =
        r.productName.toLowerCase().includes(search.toLowerCase()) ||
        r.color.toLowerCase().includes(search.toLowerCase()) ||
        r.size.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && r.isActive) ||
        (filter === "Hidden" && !r.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [rows, search, filter]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((r) => r.isActive).length;
    return { total, active };
  }, [rows]);

  const filterChips = ["All", "Active", "Hidden"];

  return (
    <DashboardLayout role="Admin" userName="Anika Malhotra" items={adminItems}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Catalogue"
          title="All"
          titleAccent="Products"
          description="View and monitor all products in FashionHub."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Products" value={String(stats.total)} icon={Package} />
          <StatCard label="Active" value={String(stats.active)} icon={CheckCircle2} />
        </div>

        {/* Toolbar */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search products..."
          onAdd={null}   // ❌ No add button
          addLabel=""
        />

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {filterChips.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 border rounded ${
                filter === f ? "bg-primary text-white" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-secondary/40">
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Price",
                    "Discount",
                    "Stock",
                    "Color",
                    "Size",
                    "Status",
                    "Created",
                  ].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-secondary/30">
                    
                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={`https://localhost:7106${p.image}`}
                        alt={p.productName}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">{p.productName}</td>

                    {/* Price */}
                    <td className="px-6 py-4">₹{p.price}</td>

                    {/* Discount */}
                    <td className="px-6 py-4">{p.discount}%</td>

                    {/* Stock */}
                    <td className="px-6 py-4">{p.stock}</td>

                    {/* Color */}
                    <td className="px-6 py-4">{p.color}</td>

                    {/* Size */}
                    <td className="px-6 py-4">{p.size}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          p.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200"
                        }`}
                      >
                        {p.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-xs">{p.created}</td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-10">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllProductManagement;