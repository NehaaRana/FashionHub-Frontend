// import { useState, FormEvent, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  FileText,
  Package,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lock
} from "lucide-react";
import PromoBar from "../components/PromoBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
// import { vendorStore } from "../lib/vendorStore";
import { useEffect, useState, useMemo } from "react";
import { getCategories, registerVendor } from "../services/api";
import Swal from "sweetalert2";


const steps = [
  { id: 1, label: "Store" },
  { id: 2, label: "Business" },
  { id: 3, label: "Review" },
];



const counts = ["1-10", "10-30", "30-100", "100+"];

const VendorRegister = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);

        // if (res.data.length > 0) {
        //   setForm((prev) => ({
        //     ...prev,
        //     category: res.data[0].name || res.data[0].categoryName,
        //   }));
        // }
        if (res.data.length > 0) {
          const activeCategories = res.data.filter((c) => c.isActive);

          if (activeCategories.length > 0) {
            setForm((prev) => ({
              ...prev,
              category: activeCategories[0].categoryName,
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    category: "",
    gstin: "",
    productsCount: counts[1],
    description: "",
    agree: false,
  });

  const set = (k, v) =>
    setForm((p) => ({ ...p, [k]: v }));

  const canNext = useMemo(() => {
    if (step === 1)
      return form.storeName && form.ownerName && form.email && form.phone && form.password;
    if (step === 2) return form.city && form.category && form.gstin && form.productsCount;
    return form.agree && form.description.length >= 20;
  }, [step, form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting...", form, "canNext:", canNext, "step:", step);

    if (!canNext) {
      // alert("Please fill all required fields!");
       Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all required fields!",
        confirmButtonColor: "#000",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    try {
      console.log("Calling API...");
      await registerVendor({
        vendorname: form.storeName,
        brandname: form.storeName,
        ownername: form.ownerName,
        email: form.email,
        password: form.password,
        mobileno: form.phone,
        city: form.city,
        state: "Gujarat",
        specialization: form.category,
        approvedByAdmin: "Pending",
      });

      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your vendor application has been submitted successfully!",
        confirmButtonColor: "#000",
        timer: 2000,
        showConfirmButton: false,
      });
      // alert("Application submitted successfully!");
      // navigate("/vendor-pending");
      navigate("/vendor-pending", { state: { email: form.email } });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Error submitting application",
        confirmButtonColor: "#000",
      });
      // alert("Error submitting application");
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <PromoBar />
      <Navbar /> */}
      <main className="flex-1 py-16 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/15 text-accent font-body text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-sm font-semibold mb-5">
              Sell on FashionHub
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Become a <span className="italic font-normal text-accent">Vendor</span>
            </h1>
            <p className="font-body text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
              Apply once. Our team reviews every store within 24-48 hours to keep our marketplace curated.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center font-display text-sm font-semibold transition-colors ${step >= s.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                    }`}
                >
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </div>
                <span
                  className={`font-body text-xs uppercase tracking-[0.2em] font-semibold ${step >= s.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`h-px w-10 ${step > s.id ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-sm p-8 lg:p-10 shadow-sm space-y-6"
          >
            {step === 1 && (
              <>
                <Field label="Store Name" icon={Store}>
                  <input
                    required
                    value={form.storeName}
                    onChange={(e) => set("storeName", e.target.value)}
                    placeholder="e.g. Saanjh Couture"
                    className={inputCls}
                  />
                </Field>
                <Field label="Owner Full Name" icon={User}>
                  <input
                    required
                    value={form.ownerName}
                    onChange={(e) => set("ownerName", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputCls}
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Business Email" icon={Mail}>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="hello@yourstore.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Password" icon={Lock}>
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone" icon={Phone}>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 98xxx xxxxx"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="City" icon={MapPin}>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Mumbai"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Primary Category" icon={Tag}>
                    <select
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      className={inputCls}
                    >
                      {categories
                        .filter((c) => c.isActive) // optional but recommended
                        .map((c) => (
                          <option key={c.cid} value={c.categoryName}>
                            {c.categoryName}
                          </option>
                        ))}
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="GSTIN" icon={ShieldCheck}>
                    <input
                      required
                      value={form.gstin}
                      onChange={(e) => set("gstin", e.target.value.toUpperCase())}
                      placeholder="22AAAAA0000A1Z5"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Catalogue Size" icon={Package}>
                    <select
                      value={form.productsCount}
                      onChange={(e) => set("productsCount", e.target.value)}
                      className={inputCls}
                    >
                      {counts.map((c) => (
                        <option key={c}>{c} products</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Field label="About your brand" icon={FileText}>
                  <textarea
                    required
                    rows={5}
                    minLength={20}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Tell us your story, USP, what makes your label different..."
                    className={`${inputCls} resize-none`}
                  />
                  <p className="font-body text-[11px] text-muted-foreground mt-2">
                    {form.description.length}/20 characters minimum
                  </p>
                </Field>

                <div className="bg-secondary/40 border border-border rounded-sm p-5 space-y-2">
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Application Summary
                  </h3>
                  <SummaryRow label="Store" value={form.storeName} />
                  <SummaryRow label="Owner" value={form.ownerName} />
                  <SummaryRow label="Email" value={form.email} />
                  <SummaryRow label="City" value={form.city} />
                  <SummaryRow label="Category" value={form.category} />
                  <SummaryRow label="GSTIN" value={form.gstin} />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.agree}
                    onChange={(e) => set("agree", e.target.checked)}
                    className="accent-accent mt-1"
                  />
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    I confirm the information is accurate and agree to the{" "}
                    <a href="#" className="text-accent hover:underline">Vendor Agreement</a> and{" "}
                    <a href="#" className="text-accent hover:underline">Commission Policy</a>.
                  </span>
                </label>
              </>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <Button type="submit" variant="hero" disabled={!canNext}>
                {step === 3 ? "Submit Application" : "Continue"}
                {step !== 3 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </form>

          <p className="text-center font-body text-sm text-muted-foreground mt-6">
            Already a vendor?{" "}
            <Link to="/vendor-pending" className="text-accent font-semibold hover:underline">
              Check application status
            </Link>
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

const inputCls =
  "w-full bg-background border border-input rounded-sm pl-10 pr-3 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent";

const Field = ({
  label,
  icon: Icon,
  children,
}) => (
  <div>
    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      {children}
    </div>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between font-body text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground font-semibold">{value || "—"}</span>
  </div>
);

export default VendorRegister;

