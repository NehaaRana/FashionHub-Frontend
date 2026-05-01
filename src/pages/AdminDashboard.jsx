import DashboardCard from "../components/ui/DashboardCard";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <DashboardCard title="Total Users" value="120" />
        <DashboardCard title="Total Vendors" value="45" />
        <DashboardCard title="Total Orders" value="560" />
      </div>
    </div>
  );
};

export default AdminDashboard;