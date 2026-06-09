import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Snowflake } from "lucide-react";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";
import product4 from "../assets/product-4.jpg";

const products = [
  { name: "Wool Long Coat", price: "₹6,499", image: product1, badge: "PREMIUM" },
  { name: "Cashmere Scarf", price: "₹2,199", image: product2 },
  { name: "Knit Turtleneck", price: "₹1,999", image: product3 },
  { name: "Leather Ankle Boots", price: "₹4,999", image: product4, badge: "TRENDING" },
  { name: "Quilted Puffer Jacket", price: "₹5,299", image: product1 },
  { name: "Wool Beret", price: "₹899", image: product2 },
  { name: "Suede Knee Boots", price: "₹5,799", image: product4, badge: "TRENDING" },
  { name: "Faux Fur Stole", price: "₹3,199", image: product3 },
];

const WinterCollection = () => (
<>

    <PageHeader
      eyebrow="Cozy & Chic"
      title="Winter"
      titleAccent="Collection"
      description="Warm layers, statement coats and timeless knits. Wrap up in elegance this season."
    />

    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-12">
          <Snowflake className="h-4 w-4 text-accent" />
          <p className="font-body text-xs uppercase tracking-[0.2em]">Curated for cold-weather elegance</p>
          <Snowflake className="h-4 w-4 text-accent" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.name + i} product={p} delay={0.05 * i} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default WinterCollection;
