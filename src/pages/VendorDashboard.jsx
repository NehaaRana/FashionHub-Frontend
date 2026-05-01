import DashboardCard from "../components/ui/DashboardCard";

const VendorDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Vendor Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <DashboardCard title="My Products" value="30" />
        <DashboardCard title="Orders Received" value="80" />
        <DashboardCard title="Earnings" value="₹25,000" />
      </div>
    </div>
  );
};

export default VendorDashboard;