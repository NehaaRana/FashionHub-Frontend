// import { Gift } from "lucide-react";

const PromoBar = () => (
  <div className="bg-primary text-primary-foreground py-2.5 text-center font-body text-xs tracking-[0.2em] uppercase">
    <div className="container flex items-center justify-center gap-2">
      {/* <Gift className="h-3.5 w-3.5 text-accent" /> */}
      <span>Free shipping on orders over ₹999 — Use code <strong className="text-accent">FASHION20</strong> for 20% off</span>
      {/* <Gift className="h-3.5 w-3.5 text-accent" /> */}
    </div>
  </div>
);

export default PromoBar;
