import { useState,useEffect  } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { userNav } from "./userNav";
import { Copy, Check, Gift, Clock } from "lucide-react";
import { getCoupons } from "../../services/api";

// interface Coupon {
//   code: string;
//   off: string;
//   desc: string;
//   expires: string;
//   minOrder?: string;
//   used?: boolean;
// }

// const active = [
//   { code: "SUMMER26", off: "25% OFF", desc: "Summer collection", expires: "Jun 30, 2026", minOrder: "₹1,999" },
//   { code: "FASHION20", off: "20% OFF", desc: "Sitewide — first order only", expires: "Dec 31, 2026" },
//   { code: "FESTIVE15", off: "15% OFF", desc: "Festival combos", expires: "May 30, 2026", minOrder: "₹999" },
//   { code: "FREESHIP", off: "FREE SHIP", desc: "On orders above ₹499", expires: "Aug 15, 2026" },
// ];

// const used = [
//   { code: "WELCOME10", off: "10% OFF", desc: "Welcome bonus", expires: "Used Mar 14", used: true },
//   { code: "WINTER30", off: "30% OFF", desc: "Winter collection", expires: "Used Feb 02", used: true },
// ];

const UserCoupons = () => {
  const [copied, setCopied] = useState(null);
  const [tab, setTab] = useState("active");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const res = await getCoupons();

      setCoupons(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const copy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  // const list = tab === "active" ? active : used;

  const list =
        tab === "active"
          ? coupons
          : [];
  return (
    <DashboardLayout role="User" userName="Priya Iyer" items={userNav}>
      <div className="p-6 lg:p-12">
        <DashHeader
          eyebrow="Member Rewards"
          title="My"
          titleAccent="Coupons"
          description="Exclusive discount codes hand-picked for you."
        />

        <div className="flex gap-2 mb-6">
          {(["active", "used"]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-sm border transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-accent"
              }`}
            >
              {/* {t === "active" ? `Active (${active.length})` : `Used (${used.length})`} */}

              {t === "active"
                ? `Active (${coupons.length})`
                : `Used (0)`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.map((c) => (
            <div
              key={c.couponId}
              className={`relative bg-card border-2 border-dashed rounded-sm p-6 animate-fade-in-up ${
                c.used ? "border-border opacity-60" : "border-accent/60 hover:bg-accent/5"
              } transition-colors`}
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border-2 border-dashed border-accent/60" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border-2 border-dashed border-accent/60" />

              <div className="flex items-start justify-between mb-4">
                <Gift className={`h-6 w-6 ${c.used ? "text-muted-foreground" : "text-accent"}`} />
                <span className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {c.expires}
                </span>
              </div>

              <p className="font-display text-3xl font-bold text-foreground mb-1">{c.discountType}</p>
              <p className="font-body text-sm text-muted-foreground mb-1">{c.CouponOffer}</p>
              {c.minimumOrderAmount && (
                <p className="font-body text-[11px] text-muted-foreground mb-4">Min. order {c.minimumOrderAmount}</p>
              )}

              <div className="mt-4 flex items-center justify-between bg-background border border-border rounded-sm px-4 py-3">
                <code className="font-body text-base font-bold tracking-wider text-foreground">{c.couponCode}</code>
                {!c.used && (
                  <button
                    onClick={() => copy(c.couponCode)}
                    className="font-body text-[10px] uppercase tracking-[0.18em] text-accent font-semibold hover:underline flex items-center gap-1"
                  >
                    {copied === c.couponCode ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserCoupons;
