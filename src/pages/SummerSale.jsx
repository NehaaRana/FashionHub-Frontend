import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Sun, Flame, Clock } from "lucide-react";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";
import product4 from "../assets/product-4.jpg";

const products = [
  { name: "Floral Sun Dress", price: "₹1,499", originalPrice: "₹2,999", image: product1, badge: "-50%" },
  { name: "Beach Tote Bag", price: "₹1,799", originalPrice: "₹3,599", image: product2, badge: "-50%" },
  { name: "Cotton Crop Top", price: "₹899", originalPrice: "₹1,799", image: product3, badge: "-50%" },
  { name: "Strappy Sandals", price: "₹1,599", originalPrice: "₹3,199", image: product4, badge: "-50%" },
  { name: "Linen Shorts Set", price: "₹1,299", originalPrice: "₹2,599", image: product1, badge: "-50%" },
  { name: "Straw Hat & Bag Combo", price: "₹2,199", originalPrice: "₹4,399", image: product2, badge: "-50%" },
  { name: "Off-Shoulder Blouse", price: "₹999", originalPrice: "₹1,999", image: product3, badge: "-50%" },
  { name: "Slide Sandals", price: "₹1,099", originalPrice: "₹2,199", image: product4, badge: "-50%" },
];

const SummerSale = () => (
//   <Layout>
<>

    <PageHeader
      eyebrow="Use code SUMMER26"
      title="Summer"
      titleAccent="Sale"
      description="Up to 50% off on breezy summer essentials. Limited stock — once it's gone, it's gone."
    />

    <section className="bg-accent/10 border-b border-accent/20">
      <div className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <Sun className="h-5 w-5 text-accent" />
          <span className="font-body text-sm">Up to <strong className="text-accent">50% off</strong></span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Flame className="h-5 w-5 text-accent" />
          <span className="font-body text-sm">Free shipping over <strong className="text-accent">₹999</strong></span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Clock className="h-5 w-5 text-accent" />
          <span className="font-body text-sm">Ends <strong className="text-accent">June 30</strong></span>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.name + i} product={p} delay={0.05 * i} />
          ))}
        </div>
      </div>
    </section>
    </>
//   {/* </Layout> */}
);

export default SummerSale;
