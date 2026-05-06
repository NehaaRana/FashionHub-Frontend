import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  RefreshCcw,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import PromoBar from "../components/PromoBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { vendorStore, subscribeVendors } from "../lib/vendorStore";
import { useLocation } from "react-router-dom";
  import { getVendorByEmail } from "../services/api";
const VendorPending = () => {
  // const [app, setApp] = useState(() => vendorStore.current());
  

  const location = useLocation();
  const emailFromNav = location.state?.email;
  const [emailLookup, setEmailLookup] = useState("");

  const [app, setApp] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const email = emailFromNav || emailLookup;

        if (!email) return;

        const res = await getVendorByEmail(email);
        setApp(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVendor();
  }, [emailFromNav]);

  useEffect(() => subscribeVendors(() => setApp(vendorStore.current())), []);

  const lookup = () => {
    const found = vendorStore.byEmail(emailLookup.trim());
    if (found) {
      vendorStore.setCurrentEmail(found.email);
      setApp(found);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PromoBar />
      <Navbar />
      <main className="flex-1 py-16 lg:py-24 px-4">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          {!app ? (
            <div className="bg-card border border-border rounded-sm p-10 text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-5">
                <Mail className="h-7 w-7 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Check Application Status
              </h1>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Enter the business email used during your vendor application.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  value={emailLookup}
                  onChange={(e) => setEmailLookup(e.target.value)}
                  placeholder="hello@yourstore.com"
                  className="flex-1 bg-background border border-input rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                />
                <Button onClick={lookup} variant="gold">Look up</Button>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-6">
                Haven't applied yet?{" "}
                <Link to="/vendor/register" className="text-accent font-semibold hover:underline">
                  Apply here
                </Link>
              </p>
            </div>
          ) : (
            <StatusCard app={app} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StatusCard = ({ app }) => {
  if (app.status === "Approved") {
    return (
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-10 text-center border-b border-border">
          <div className="h-20 w-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-5">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <span className="inline-block bg-emerald-100 text-emerald-700 font-body text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm font-semibold mb-3">
            Approved
          </span>
          <h1 className="font-display text-4xl font-bold text-foreground">
            Welcome to <span className="italic font-normal text-accent">FashionHub</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-3">
            Your store <strong className="text-foreground">{app.storeName}</strong> is live.
            Start adding products and accepting orders.
          </p>
        </div>
        <div className="p-8 space-y-5">
          <NextStep icon={Sparkles} title="Set up your store" desc="Add a banner, bio and shipping zones." />
          <NextStep icon={ShieldCheck} title="List your first product" desc="Upload images, pricing and stock." />
          <Link to="/vendor">
            <Button variant="hero" className="w-full mt-2">
              Go to Vendor Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (app.status === "Rejected") {
    return (
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="bg-destructive/5 p-10 text-center border-b border-border">
          <div className="h-20 w-20 mx-auto rounded-full bg-destructive/15 flex items-center justify-center mb-5">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <span className="inline-block bg-destructive/15 text-destructive font-body text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm font-semibold mb-3">
            Not Approved
          </span>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Application needs revision
          </h1>
        </div>
        <div className="p-8 space-y-5">
          <div className="bg-secondary/40 border border-border rounded-sm p-5">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
              Reviewer note
            </p>
            <p className="font-body text-sm text-foreground italic">
              "{app.rejectionReason || "Please resubmit with complete information."}"
            </p>
          </div>
          <Meta app={app} />
          <Link to="/vendor/register">
            <Button variant="gold" className="w-full">
              <RefreshCcw className="h-4 w-4" /> Re-submit Application
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Pending
  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div className="bg-accent/5 p-10 text-center border-b border-border">
        <div className="h-20 w-20 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-5">
          <Clock className="h-10 w-10 text-accent animate-pulse" />
        </div>
        <span className="inline-block bg-accent/15 text-accent font-body text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm font-semibold mb-3">
          Under Review
        </span>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Application <span className="italic font-normal text-accent">in queue</span>
        </h1>
        <p className="font-body text-sm text-muted-foreground mt-3 max-w-md mx-auto">
          Our merchandising team is reviewing <strong className="text-foreground">{app.storeName}</strong>.
          Expect a decision within <strong className="text-foreground">24-48 hours</strong>.
        </p>
      </div>
      <div className="p-8 space-y-5">
        <Meta app={app} />
        <div className="grid grid-cols-3 gap-3">
          {["Submitted", "Review", "Decision"].map((label, i) => (
            <div
              key={label}
              className={`text-center p-4 rounded-sm border ${i <= 1 ? "border-accent bg-accent/5" : "border-border bg-secondary/30"
                }`}
            >
              <div
                className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center font-display text-xs font-semibold mb-2 ${i === 0 ? "bg-emerald-100 text-emerald-700" : i === 1 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                  }`}
              >
                {i === 0 ? "✓" : i + 1}
              </div>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Meta = ({ app }) => (
  <div className="grid grid-cols-2 gap-4 text-left">
    <MetaRow label="Application ID" value={app.id} />
    <MetaRow label="Submitted" value={new Date(app.submittedAt).toLocaleDateString()} />
    <MetaRow label="Email" value={app.email} />
    <MetaRow label="Category" value={app.category} />
  </div>
);

const MetaRow = ({ label, value }) => (
  <div className="bg-secondary/30 border border-border rounded-sm p-4">
    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-1">
      {label}
    </p>
    <p className="font-body text-sm text-foreground font-semibold truncate">{value}</p>
  </div>
);

const NextStep = ({
  icon: Icon,
  title,
  desc,
}) => (
  <div className="flex items-start gap-4 p-4 border border-border rounded-sm">
    <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent flex items-center justify-center shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      <p className="font-body text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
  </div>
);

export default VendorPending;
