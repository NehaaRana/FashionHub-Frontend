import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import { adminItems } from "../../components/admin/adminNav";

import {
  Users,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import { getUsers, deleteUser ,getCurrentUser } from "../../services/api";

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const res = await getUsers();

      const formatted = res.data.map((u) => ({
        id: u.uid,
        name: u.username,
        email: u.email,
        role: u.roleName,
        mobile: u.mobileno,
        city: u.city,
        state: u.state,
        dob: u.dob,
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search
  const filtered = useMemo(() => {
    return rows.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = rows.length;
    const admins = rows.filter((u) => u.role === "Admin").length;
    const customers = rows.filter((u) => u.role === "Customer").length;

    return { total, admins, customers };
  }, [rows]);

  const handleDelete = async () => {
    try {
      if (!confirmDelete) return;

      await deleteUser(confirmDelete.id);
      fetchUsers();
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
          eyebrow="Accounts"
          title="Manage"
          titleAccent="Users"
          description="View and manage all registered users on the platform."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Users" value={String(stats.total)} icon={Users} />
          <StatCard label="Admins" value={String(stats.admins)} icon={Mail} />
          <StatCard label="Customers" value={String(stats.customers)} icon={Users} />
        </div>

        {/* Toolbar */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search users by name or email..."
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-secondary/40">
                <tr>
                  {[
                    "User",
                    "Email",
                    "Role",
                    "Mobile",
                    "City",
                    "State",
                    "DOB",
                    "Actions",
                  ].map((h) => (
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
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-secondary/30">

                    {/* Name with avatar style */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center font-semibold">
                          {u.name?.charAt(0)}
                        </div>
                        <span className="font-semibold">{u.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {u.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] uppercase font-semibold bg-secondary rounded-sm">
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">{u.mobile}</td>
                    <td className="px-6 py-4">{u.city}</td>
                    <td className="px-6 py-4">{u.state}</td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {u.dob}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmDelete(u)}
                          className="p-2 hover:bg-destructive rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-muted-foreground">
                      No users found.
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
        title="Delete user?"
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

export default UserManagement;