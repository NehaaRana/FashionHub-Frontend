import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

import { getPendingVendors } from "../../services/api";


const AdminNotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState([]);

const fetchPending = async () => {
    try {
      const res = await getPendingVendors();
    setPending(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();

    const interval = setInterval(fetchPending, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative h-10 w-10 rounded-sm bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground flex items-center justify-center transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {pending?.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground font-body text-[10px] font-semibold flex items-center justify-center">
            {pending.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-sm shadow-2xl z-40 animate-fade-in-up overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Notifications
                </h3>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                  {pending.length} pending action{pending.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {pending.length === 0 && (
                <li className="p-6 text-center font-body text-xs text-muted-foreground">
                  You're all caught up.
                </li>
              )}
              {pending.map((p) => (
                <li key={p.vid} className="border-b border-border last:border-b-0">
                  <Link
                    to="/admin/vendor-applications"
                    onClick={() => setOpen(false)}
                    className="block p-4 hover:bg-secondary/40 transition-colors"
                  >
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      New vendor application
                    </p>
                    <p className="font-body text-sm font-semibold text-foreground mt-1 truncate">
                      {p.vendorname}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {p.ownername} · {p.specialization}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/admin/vendor-applications"
              onClick={() => setOpen(false)}
              className="block p-3 text-center font-body text-[10px] uppercase tracking-[0.2em] font-semibold text-accent hover:bg-secondary/40 border-t border-border"
            >
              View all applications →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNotificationBell;

