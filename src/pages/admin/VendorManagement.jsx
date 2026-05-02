import { useEffect, useState ,Fragment } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getVendors, deleteVendor } from "../../services/api";

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

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState(null);
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      console.log("Vendors:", res.data);
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVendor(id);
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  // Search filter
  const filteredVendors = vendors.filter((v) =>
    v.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
    v.email?.toLowerCase().includes(search.toLowerCase())
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
        <h2 className="text-2xl font-bold mb-6">Manage Vendors</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 mb-4 w-full"
        />
          <div className="overflow-x-auto">
            {/* Vendor Table */}
            <table className="w-full border">
              <thead  className="bg-gray-100 sticky top-0">
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Vendor Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Brand</th>
                  {/* <th className="p-3 text-left">Owner Name</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Mobile No</th>
                  <th className="p-3 text-left">City</th>
                  <th className="p-3 text-left">State</th>
                  <th className="p-3 text-left">Specialization</th>
                  <th className="p-3 text-left">Approved By Admin</th> */}

                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
  {filteredVendors.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center p-4">
        No vendors found
      </td>
    </tr>
  ) : (
    filteredVendors.map((v) => (
      <Fragment key={v.vid}>
        <tr className="border-t">
          <td className="p-3">{v.vendorname}</td>
          <td className="p-3">{v.email}</td>
          <td className="p-3">{v.brandname}</td>

          <td className="p-3 text-center space-x-2">
            <button
              onClick={() =>
                setOpenRow(openRow === v.vid ? null : v.vid)
              }
              className="text-blue-500"
            >
              View
            </button>

            <button
              onClick={() => handleDelete(v.vid)}
              className="text-red-500"
            >
              Delete
            </button>
          </td>
        </tr>

        {/* Expand Row */}
        {openRow === v.vid && (
          <tr className="bg-gray-50">
            <td colSpan="4" className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Owner:</b> {v.ownername}</p>
                <p><b>Gender:</b> {v.gender}</p>
                <p><b>Mobile:</b> {v.mobileno}</p>
                <p><b>City:</b> {v.city}</p>
                <p><b>State:</b> {v.state}</p>
                <p><b>Specialization:</b> {v.specialization}</p>
                <p><b>Approved:</b> {v.approvedByAdmin ? "Yes" : "No"}</p>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    ))
  )}
</tbody>

              {/* <tbody >
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No vendors found
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((v) => (
                    <tr key={v.vid} className="border-t">
                      <td className="p-3">{v.vendorname}</td>
                      <td className="p-3">{v.email}</td>
                      <td className="p-3">{v.brandname}</td>
                      {/* <td className="p-3">{v.ownername}</td>
                      <td className="p-3">{v.gender}</td>
                      <td className="p-3">{v.mobileno}</td>
                      <td className="p-3">{v.city}</td>
                      <td className="p-3">{v.state}</td>
                      <td className="p-3">{v.specialization}</td>
                      <td className="p-3">{v.approvedByAdmin ? "Yes" : "No"}</td> */}
                      {/* <td className="p-3 text-center space-x-2">

                         <button
                            onClick={() => setOpenRow(openRow === v.vid ? null : v.vid)}
                            className="text-blue-500"
                          >
                            View
                          </button>
                        <button
                          onClick={() => handleDelete(v.vid)} //  correct id
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>



                  ))
                )}
              </tbody> */} 
            </table>
          </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorManagement;