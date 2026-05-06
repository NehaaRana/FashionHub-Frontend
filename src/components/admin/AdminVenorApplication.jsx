import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import StatCard from "../../components/dashboard/StatCard";
import AdminToolbar from "../../components/admin/AdminToolbar";
import Modal from "../../components/admin/Modal";
import { adminItems } from "../../components/admin/adminNav";
import { Button } from "../../components/ui/button";
import { getVendors, approveVendor, rejectVendor } from "../../services/api";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Tag,
  ShieldCheck,
  Package,
  Calendar,
} from "lucide-react";

const tabs = ["Pending", "Approved", "Rejected", "All"];

const tabStyle = {
  Pending: "bg-accent/15 text-accent",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-destructive/15 text-destructive",
};

const Info = ({
  icon: Icon,
  text,
}) => (
  <div className="flex items-center gap-2 text-muted-foreground min-w-0">
    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
    <span className="font-body truncate">{text}</span>
  </div>
);

const DetailRow = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="bg-secondary/30 border border-border rounded-sm p-4">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="h-3.5 w-3.5 text-accent" />
      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </p>
    </div>
    <p className="font-body text-sm text-foreground font-semibold break-words">{value}</p>
  </div>
);

const AdminVendorApplications = () => {
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);
  const [rejectMode, setRejectMode] = useState(false);
  const [reason, setReason] = useState("");


  useEffect(() => {
  const fetchVendors = async () => {
    try {
      const res = await getVendors();

      const formatted = res.data.map((v) => ({
        id: v.vid,
        storeName: v.vendorname,
        ownerName: v.ownername,
        email: v.email,
        phone: v.mobileno,
        city: v.city,
        category: v.specialization || "N/A",
        gstin: "N/A",
        productsCount: "N/A",
        description: "N/A",
        submittedAt: v.createdAt,
        status:
          v.approvedByAdmin === "true"
            ? "Approved"
            : v.approvedByAdmin === "Rejected"
            ? "Rejected"
            : "Pending",
      }));

      setRows(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  fetchVendors();
}, []);
  const filtered = useMemo(() => {
    return rows
      .filter((r) => (tab === "All" ? true : r.status === tab))
      .filter(
        (r) =>
          !search ||
          (r.storeName || "").toLowerCase().includes(search.toLowerCase()) ||
          (r.ownerName || "").toLowerCase().includes(search.toLowerCase()),
      );
  }, [rows, tab, search]);

  const stats = {
    pending: rows.filter((r) => r.status === "Pending").length,
    approved: rows.filter((r) => r.status === "Approved").length,
    rejected: rows.filter((r) => r.status === "Rejected").length,
    total: rows.length,
  };

const approve = async (a) => {
  try {
    await approveVendor(a.id);

    setRows((prev) =>
      prev.map((v) =>
        v.id === a.id ? { ...v, status: "Approved" } : v
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  const reject = async (a) => {
  if (reason.trim().length < 5) return;

  try {
    await rejectVendor(a.id);

    setRows((prev) =>
      prev.map((v) =>
        v.id === a.id
          ? { ...v, status: "Rejected", rejectionReason: reason }
          : v
      )
    );

    setReason("");
    setRejectMode(false);
    setActive(null);
  } catch (err) {
    console.error(err);
  }
};


return (
  <DashboardLayout role="Admin" userName="Anika Malhotra" items={adminItems}>
    <div className="p-6 lg:p-12">
      <DashHeader
        eyebrow="Marketplace"
        title="Vendor"
        titleAccent="Applications"
        description="Review every new vendor application — approve qualified stores or send back with feedback."
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard label="Pending Review" value={String(stats.pending)} icon={Clock} delay={0} />
        <StatCard label="Approved" value={String(stats.approved)} icon={CheckCircle2} delay={0.05} />
        <StatCard label="Rejected" value={String(stats.rejected)} icon={XCircle} trend="down" delay={0.1} />
        <StatCard label="Total Applications" value={String(stats.total)} icon={ClipboardList} delay={0.15} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => {
          const count =
            t === "All"
              ? rows.length
              : rows.filter((r) => r.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-xs uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              {t}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-sm ${tab === t ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"
                  }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <AdminToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search store or owner..."
        showExport
      />

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.length === 0 && (
          <div className="lg:col-span-2 bg-card border border-dashed border-border rounded-sm p-12 text-center">
            <ClipboardList className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-body text-sm text-muted-foreground">
              No applications in this view.
            </p>
          </div>
        )}
        {filtered.map((a) => (
          <article
            key={a.id}
            className="bg-card border border-border rounded-sm p-6 hover:border-accent transition-colors animate-fade-in-up"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {a.id} · {a.category}
                </p>
                <h3 className="font-display text-xl font-semibold text-foreground mt-1 truncate">
                  {a.storeName}
                </h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {a.ownerName} · {a.city}
                </p>
              </div>
              <span
                className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm shrink-0 ${tabStyle[a.status]}`}
              >
                {a.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-5">
              <Info icon={Mail} text={a.email} />
              <Info icon={Phone} text={a.phone} />
              <Info icon={Package} text={`${a.productsCount} products`} />
              <Info
                icon={Calendar}
                text={new Date(a.submittedAt).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActive(a);
                  setRejectMode(false);
                }}
                className="flex-1"
              >
                Review
              </Button>
              {a.status === "Pending" && (
                <>
                  <Button variant="gold" size="sm" onClick={() => approve(a)}>
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActive(a);
                      setRejectMode(true);
                    }}
                    className="border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>

    {/* Detail / Reject modal */}
    <Modal
      open={!!active}
      onClose={() => {
        setActive(null);
        setRejectMode(false);
        setReason("");
      }}
      title={active?.storeName || ""}
      subtitle={active ? `${active.id} · Submitted ${new Date(active.submittedAt).toLocaleString()}` : ""}
      size="lg"
      footer={
        active && active.status === "Pending" ? (
          rejectMode ? (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setRejectMode(false)}>
                Cancel
              </Button>
              <Button
                variant="hero"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => reject(active)}
              >
                Confirm Rejection
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setRejectMode(true)}
                className="border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Reject
              </Button>
              <Button variant="gold" onClick={() => approve(active)}>
                Approve Vendor
              </Button>
            </div>
          )
        ) : null
      }
    >
      {active && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-3">
            <DetailRow icon={Mail} label="Email" value={active.email} />
            <DetailRow icon={Phone} label="Phone" value={active.phone} />
            <DetailRow icon={MapPin} label="City" value={active.city} />
            <DetailRow icon={Tag} label="Category" value={active.category} />
            <DetailRow icon={ShieldCheck} label="GSTIN" value={active.gstin} />
            <DetailRow icon={Package} label="Catalogue" value={active.productsCount} />
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
              About the brand
            </p>
            <p className="font-body text-sm text-foreground leading-relaxed bg-secondary/40 border border-border rounded-sm p-4">
              {active.description}
            </p>
          </div>
          {active.status === "Rejected" && active.rejectionReason && (
            <div className="bg-destructive/5 border border-destructive/30 rounded-sm p-4">
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-destructive font-semibold mb-1">
                Rejection reason
              </p>
              <p className="font-body text-sm text-foreground italic">"{active.rejectionReason}"</p>
            </div>
          )}
          {rejectMode && (
            <div>
              <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-2">
                Reason for rejection (sent to vendor)
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. GSTIN could not be verified. Please resubmit with valid documentation."
                className="w-full bg-background border border-input rounded-sm px-3 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none"
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  </DashboardLayout>
);



};
export default AdminVendorApplications;
