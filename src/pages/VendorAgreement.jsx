import { Link } from "react-router-dom";

const VendorAgreement = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-sm p-8">
        <h1 className="text-3xl font-bold mb-6">
          Vendor Agreement
        </h1>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            By registering as a vendor on FashionHub, you agree to comply
            with all marketplace policies and applicable laws.
          </p>

          <h2 className="font-semibold text-foreground">
            1. Account Responsibility
          </h2>
          <p>
            Vendors are responsible for maintaining accurate account
            information and protecting login credentials.
          </p>

          <h2 className="font-semibold text-foreground">
            2. Product Listings
          </h2>
          <p>
            All products listed must be authentic, legal, and accurately
            described.
          </p>

          <h2 className="font-semibold text-foreground">
            3. Order Fulfillment
          </h2>
          <p>
            Vendors must process and ship orders within the agreed timeline.
          </p>

          <h2 className="font-semibold text-foreground">
            4. Policy Violations
          </h2>
          <p>
            FashionHub reserves the right to suspend or terminate vendor
            accounts for violations of marketplace rules.
          </p>
        </div>

        <Link
          to="/vendor-register"
          className="inline-block mt-8 text-accent font-semibold"
        >
          ← Back to Registration
        </Link>
      </div>
    </div>
  );
};

export default VendorAgreement;