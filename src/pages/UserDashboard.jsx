import DashboardCard from "../components/ui/DashboardCard";

const UserDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <DashboardCard title="My Orders" value="12" />
        <DashboardCard title="Wishlist Items" value="5" />
        <DashboardCard title="Cart Items" value="3" />
      </div>
    </div>
  );
};

export default UserDashboard;