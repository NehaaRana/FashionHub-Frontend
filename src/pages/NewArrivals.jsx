import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";
import product4 from "../assets/product-4.jpg";

const products = [
  { name: "Embroidered Maxi Dress", price: "₹3,499", image: product1, badge: "NEW" },
  { name: "Pearl Drop Handbag", price: "₹4,899", image: product2, badge: "NEW" },
  { name: "Linen Wrap Blouse", price: "₹2,199", image: product3, badge: "NEW" },
  { name: "Crystal Block Heels", price: "₹3,799", image: product4, badge: "NEW" },
  { name: "Silk Slip Dress", price: "₹2,899", image: product1, badge: "NEW" },
  { name: "Suede Mini Bag", price: "₹3,299", image: product2, badge: "NEW" },
  { name: "Floral Co-ord Set", price: "₹2,599", image: product3, badge: "NEW" },
  { name: "Pointed Toe Pumps", price: "₹2,999", image: product4, badge: "NEW" },
];

const filters = ["All", "Dresses", "Tops", "Bags", "Shoes", "Accessories"];

const NewArrivals = () => (
//   <Layout>
<>

    <PageHeader
      eyebrow="Just Dropped"
      title="New"
      titleAccent="Arrivals"
      description="The latest looks straight off the runway. Refreshed weekly with pieces designed for the modern woman."
    />
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`font-body text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-sm border transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.name + i} product={p} delay={0.05 * i} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Button variant="hero" size="lg">Load More</Button>
        </div>
      </div>
    </section>
    </>
//   </Layout>
);

export default NewArrivals;
