// UI-only shared store for the vendor approval demo flow.
// In production this would be replaced by API calls / a real DB.

const KEY = "fh_vendor_applications";
const CURRENT_KEY = "fh_current_vendor_email";

const seed = [
  {
    id: "VA-1042",
    storeName: "Velvet Atelier",
    ownerName: "Tara Mehta",
    email: "tara@velvet.in",
    phone: "+91 98231 11122",
    city: "Mumbai",
    category: "Ethnic Wear",
    gstin: "27AABCV1234F1Z9",
    productsCount: "30-100",
    description:
      "Handcrafted velvet sarees and lehengas curated from Banarasi karigars. 8 years in retail.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "Pending",
  },
  {
    id: "VA-1041",
    storeName: "Bloom Boutique",
    ownerName: "Ishita Gupta",
    email: "ishita@bloom.in",
    phone: "+91 99115 88421",
    city: "Delhi",
    category: "Western Wear",
    gstin: "07AAGCB9988L1Z2",
    productsCount: "10-30",
    description: "Pastel summer dresses, linen co-ords and breezy resort wear.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    status: "Pending",
  },
  {
    id: "VA-1039",
    storeName: "Saanjh Couture",
    ownerName: "Naina Rao",
    email: "naina@saanjh.com",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    category: "Bridal",
    gstin: "29AAACS5678M1Z4",
    productsCount: "100+",
    description: "Premium bridal couture, lehengas and anarkalis.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    status: "Approved",
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

const read = () => {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
};

const write = (rows) => {
  localStorage.setItem(KEY, JSON.stringify(rows));
  window.dispatchEvent(new CustomEvent("fh:vendors-updated"));
};

export const vendorStore = {
  list() {
    return read().sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt)
    );
  },

  pending() {
    return read().filter((v) => v.status === "Pending");
  },

  byEmail(email) {
    return read().find(
      (v) => v.email.toLowerCase() === email.toLowerCase()
    );
  },

  submit(input) {
    const rows = read().filter(
      (v) => v.email.toLowerCase() !== input.email.toLowerCase()
    );

    const app = {
      ...input,
      id: `VA-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString(),
      status: "Pending",
    };

    rows.push(app);
    write(rows);
    localStorage.setItem(CURRENT_KEY, input.email);

    return app;
  },

  approve(id) {
    const rows = read().map((v) =>
      v.id === id
        ? {
            ...v,
            status: "Approved",
            reviewedAt: new Date().toISOString(),
            rejectionReason: undefined,
          }
        : v
    );

    write(rows);
  },

  reject(id, reason) {
    const rows = read().map((v) =>
      v.id === id
        ? {
            ...v,
            status: "Rejected",
            reviewedAt: new Date().toISOString(),
            rejectionReason: reason,
          }
        : v
    );

    write(rows);
  },

  setCurrentEmail(email) {
    localStorage.setItem(CURRENT_KEY, email);
  },

  currentEmail() {
    return localStorage.getItem(CURRENT_KEY);
  },

  current() {
    const e = localStorage.getItem(CURRENT_KEY);
    return e ? this.byEmail(e) : undefined;
  },
};

export const subscribeVendors = (cb) => {
  const handler = () => cb();

  window.addEventListener("fh:vendors-updated", handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener("fh:vendors-updated", handler);
    window.removeEventListener("storage", handler);
  };
};