import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminNotificationBell from "../components/admin/AdminNotificationBell";
import { useLocation } from "react-router-dom";


const DashboardLayout = ({ role, userName, items, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const location = useLocation();
  console.log("Current Path:", location.pathname);
 
 
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-72 lg:min-h-screen bg-primary text-primary-foreground lg:sticky lg:top-0 lg:h-screen flex flex-col border-b lg:border-b-0 lg:border-r border-border/20">
        <div className="p-6 border-b border-primary-foreground/10 flex items-start justify-between gap-3">
          <div>
            <Link to="/" className="font-display text-2xl font-bold tracking-tight">
              Fashion<span className="text-accent">Hub</span>
            </Link>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-primary-foreground/60 mt-2">
              {role} Panel
            </p>
          </div>
          {role === "Admin" && <AdminNotificationBell />}
        </div>

        <div className="p-6 border-b border-primary-foreground/10 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-lg font-semibold">
            {/* {userName.charAt(0)} */}
            {(userName || "U").charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold truncate">{userName}</p>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
              {role}
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const count = item.badge?.() ?? 0;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm tracking-wide transition-all ${isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-primary-foreground/75 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {count > 0 && (
                  <span className="bg-accent text-accent-foreground font-body text-[10px] font-semibold px-1.5 py-0.5 rounded-sm">
                    {count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-primary-foreground/75 hover:bg-primary-foreground/5 hover:text-primary-foreground transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-primary-foreground/75 hover:bg-primary-foreground/5 hover:text-primary-foreground transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;
