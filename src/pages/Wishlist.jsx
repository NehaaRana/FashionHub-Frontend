import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";

const items = [
  { name: "Floral Midi Dress", price: "₹2,499", originalPrice: "₹3,999", image: product1, badge: "SALE" },
  { name: "Classic Leather Tote", price: "₹4,299", image: product2 },
];

const Wishlist = () => (
//   <Layout>
<>

    <PageHeader
      eyebrow="Saved For Later"
      title="Your"
      titleAccent="Wishlist"
      description="Pieces you love, kept close. Add them to your cart whenever you're ready."
    />
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {items.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={0.05 * i} />
          ))}
        </div>
      </div>
    </section>
  {/* </Layout> */}
  </>
);

export default Wishlist;
