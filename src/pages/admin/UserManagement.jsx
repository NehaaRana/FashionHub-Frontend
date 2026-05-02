import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getUsers, deleteUser } from "../../services/api";

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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      console.log("Users:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    console.log(
      "Delete User ID:", id
    )
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter
  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const items = [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Customers", to: "/admin/customers", icon: Users },
    { label: "Vendors", to: "/admin/vendors", icon: Store },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { label: "Categories", to: "/admin/categories", icon: Tag },
    { label: "Coupons", to: "/admin/coupons", icon: Tag },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ];

  return (
    <DashboardLayout role="Admin" userName="Admin" items={items}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

        {/*  Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 mb-4 w-full"
        />

        {/* 👥 User Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Mobile No</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">DOB</th>
              <th className="p-3 text-left">State</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.userId} className="border-t">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.roleName}</td>
                  <td className="p-3">{u.mobileno}</td>
                  <td className="p-3">{u.city}</td>
                  <td className="p-3">{u.dob}</td>
                  <td className="p-3">{u.state}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(u.uid)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;