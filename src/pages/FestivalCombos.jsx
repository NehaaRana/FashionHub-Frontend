import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Sparkles, Gift, Star } from "lucide-react";
import festivalImg from "../assets/category-festival.jpg";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";

const combos = [
  {
    name: "Diwali Glow Combo",
    items: "Saree + Clutch + Earrings",
    price: "₹5,999",
    originalPrice: "₹8,999",
    image: festivalImg,
    occasion: "DIWALI",
  },
  {
    name: "Wedding Guest Combo",
    items: "Lehenga + Heels + Necklace",
    price: "₹9,499",
    originalPrice: "₹14,999",
    image: product1,
    occasion: "WEDDING",
  },
  {
    name: "Eid Elegance Combo",
    items: "Anarkali + Dupatta + Bag",
    price: "₹6,799",
    originalPrice: "₹10,499",
    image: product2,
    occasion: "EID",
  },
  {
    name: "Christmas Sparkle Combo",
    items: "Sequin Dress + Heels + Clutch",
    price: "₹5,499",
    originalPrice: "₹8,299",
    image: product3,
    occasion: "CHRISTMAS",
  },
];

const FestivalCombos = () => (
//   <Layout>
<>

    <PageHeader
      eyebrow="Festive Edit"
      title="Festival"
      titleAccent="Combos"
      description="Hand-curated outfit combos for every celebration. One click, one complete look — perfectly coordinated."
    />

    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {combos.map((combo, i) => (
            <div
              key={combo.name}
              className="group bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="grid grid-cols-2 gap-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-body text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-sm">
                    {combo.occasion}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <Sparkles className="h-5 w-5 text-accent mb-3" />
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">{combo.name}</h3>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.1em] mb-4">
                      {combo.items}
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-display text-2xl font-bold text-accent">{combo.price}</span>
                      <span className="font-body text-sm text-muted-foreground line-through">{combo.originalPrice}</span>
                    </div>
                  </div>
                  <Button variant="gold" size="sm" className="w-full">Shop Combo</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary text-primary-foreground rounded-sm p-10 lg:p-14 text-center">
          <Gift className="h-10 w-10 text-accent mx-auto mb-4" />
          <h3 className="font-display text-3xl lg:text-4xl font-bold mb-3">Buy 2 Combos, Get 1 Free</h3>
          <p className="font-body text-primary-foreground/70 max-w-xl mx-auto mb-6">
            Stock up for the entire festive season. Mix and match across all occasions.
          </p>
          <div className="flex items-center justify-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent" />)}
          </div>
        </div>
      </div>
    </section>
    </>
//   {/* </Layout> */}
);

export default FestivalCombos;