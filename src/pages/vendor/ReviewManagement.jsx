import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import { Star, MessageSquare, Trash2 } from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import { getVendorReviews, deleteReview ,  getCurrentUser
} from "../../services/api";

const ReviewManagement = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [vendorName, setVendorName] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const vendorId = user?.vid;
    // GET CURRENT VENDOR
    const userRes = await getCurrentUser();

    const currentVendor = userRes.data;

    // SET OWNER NAME
    setVendorName(currentVendor.ownername);

    // GET VENDOR ID
    const vendorId =
      currentVendor.vid ||
      currentVendor.Vid;

    const res = await getVendorReviews(vendorId);

    const formatted = res.data.map((r) => ({
      id: r.rid,
      product:  r.productName,
      rating: r.rating,
      feedback: r.feedback,
    }));

    setRows(formatted);
  };

  const filtered = useMemo(() => {
    return rows.filter((r) =>{
       if (!search) return true;
        return r.product?.toLowerCase().includes(search.toLowerCase());
      // r.product?.toLowerCase().includes(search.toLowerCase())
  });
  }, [rows, search]);

  const stats = useMemo(() => {
    return {
      total: rows.length,
      avg: (
        rows.reduce((acc, r) => acc + (r.rating || 0), 0) / rows.length || 0
      ).toFixed(1),
    };
  }, [rows]);

  const handleDelete = async () => {
    await deleteReview(confirmDelete.id);
    fetchReviews();
    setConfirmDelete(null);
  };

  return (
    // <DashboardLayout role="Vendor" userName="Vendor" items={vendorItems}>
    <DashboardLayout
        role="Vendor"
        userName={vendorName}
        items={vendorItems}
      >
      <div className="p-6 lg:p-12">

        <DashHeader
          eyebrow="Feedback"
          title="Customer"
          titleAccent="Reviews"
          description="See what customers are saying about your products."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          <StatCard label="Total Reviews" value={stats.total} icon={MessageSquare} />
          <StatCard label="Avg Rating" value={stats.avg} icon={Star} />
        </div>

        {/* Search */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          addLabel="Refresh"
          onAdd={fetchReviews}
        />

        {/* Table */}
        <div className="bg-card border rounded-sm overflow-hidden mt-6">
          <table className="w-full">
            <thead>
              <tr>
                {["Product", "Rating", "Feedback"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4">{r.product}</td>
                  <td className="px-6 py-4"> {r.rating} Star</td>
                  <td className="px-6 py-4">{r.feedback}</td>
                  {/* <td className="px-6 py-4">
                    <button onClick={() => setConfirmDelete(r)}>
                      <Trash2 size={16} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Delete Modal */}
      {/* <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Review?"
        footer={
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        }
      >
        Are you sure you want to delete this review?
      </Modal> */}
    </DashboardLayout>
  );
};

export default ReviewManagement;