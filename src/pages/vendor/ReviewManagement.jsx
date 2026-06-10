import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolBar";
import Modal from "../../components/admin/Modal";
import { Button } from "../../components/ui/button";
import { Star, MessageSquare, Trash2 } from "lucide-react";
import { vendorItems } from "../../components/vendor/vendorNav";

import {
  getVendorReviews, deleteReview, getCurrentUser
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
      product: r.productName,
      rating: r.rating,
      feedback: r.feedback,
    }));

    setRows(formatted);
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
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

  const ratingCounts = {
    5: rows.filter(r => r.rating === 5).length,
    4: rows.filter(r => r.rating === 4).length,
    3: rows.filter(r => r.rating === 3).length,
    2: rows.filter(r => r.rating === 2).length,
    1: rows.filter(r => r.rating === 1).length,
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
        {/* <div className="grid grid-cols-2 gap-5 mb-10"> */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Reviews" value={stats.total} icon={MessageSquare} />
          <StatCard label="Avg Rating" value={stats.avg} icon={Star} />
        </div> */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <StatCard
            label="Total Reviews"
            value={stats.total}
            icon={MessageSquare}
          />

          <StatCard
            label="Average Rating"
            value={stats.avg}
            icon={Star}
          />

          <StatCard
            label="Positive Reviews"
            value={rows.filter(r => r.rating >= 4).length}
            icon={Star}
          />

          <StatCard
            label="Low Ratings"
            value={rows.filter(r => r.rating <= 2).length}
            icon={Star}
          />

        </div>
        {/* Search */}
        <AdminToolbar
          search={search}
          onSearch={setSearch}
          addLabel="Refresh"
          onAdd={fetchReviews}
        />
        <div className="bg-white border rounded-xl p-6 mt-6">

          <h3 className="font-semibold text-lg mb-5">
            Rating Distribution
          </h3>

          {[5, 4, 3, 2, 1].map((star) => (

            <div
              key={star}
              className="flex items-center gap-4 mb-4"
            >

              <span className="w-10 font-medium">
                {star}★
              </span>

              <div className="flex-1 h-3 bg-gray-200 rounded-full">

                <div
                  className="h-3 bg-yellow-400 rounded-full"
                  style={{
                    width: `${rows.length
                        ? (ratingCounts[star] / rows.length) * 100
                        : 0
                      }%`,
                  }}
                />

              </div>

              <span className="w-8 text-right">
                {ratingCounts[star]}
              </span>

            </div>

          ))}

        </div>

        
        {/* Reviews Cards */}
        <div className="grid gap-5 mt-6">

          {filtered.length > 0 ? (

            filtered.map((r) => (

              <div
                key={r.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-lg font-semibold">
                      {r.product}
                    </h3>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mt-2">

                      {[...Array(5)].map((_, i) => (

                        <Star
                          key={i}
                          size={18}
                          className={
                            i < r.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />

                      ))}

                    </div>

                  </div>

                  {/* Rating Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${r.rating >= 4
                        ? "bg-green-100 text-green-700"
                        : r.rating === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {r.rating}.0 ★
                  </div>

                </div>

                {/* Review Text */}
                <p className="mt-4 text-gray-600 leading-7">
                  {r.feedback}
                </p>

              </div>

            ))

          ) : (

            <div className="bg-white border rounded-xl p-10 text-center">

              <MessageSquare
                className="mx-auto mb-3 text-gray-400"
                size={40}
              />

              <p className="text-gray-500">
                No reviews found
              </p>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ReviewManagement;