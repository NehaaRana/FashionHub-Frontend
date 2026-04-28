import { Heart, ShoppingBag } from "lucide-react";
import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";
import product4 from "../assets/product-4.jpg";

const products = [
  { name: "Floral Midi Dress", price: "₹2,499", originalPrice: "₹3,999", image: product1, sale: true },
  { name: "Classic Leather Tote", price: "₹4,299", originalPrice: null, image: product2, sale: false },
  { name: "Satin Silk Blouse", price: "₹1,899", originalPrice: "₹2,499", image: product3, sale: true },
  { name: "Gold Strappy Heels", price: "₹3,199", originalPrice: null, image: product4, sale: false },
];

const FeaturedProducts = () => (
  // <section className="py-20 lg:py-28 bg-secondary/30">
  <section className="py-24 lg:py-32 bg-secondary/30">
    {/* <div className="container"> */}
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="text-center mb-14 animate-fade-in-up">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
          Trending Now
        </h2>
        <p className="font-body text-muted-foreground text-sm uppercase tracking-[0.2em]">
          Handpicked styles loved by our customers
        </p>
      </div>
      {/* <div className="flex gap-6 overflow-x-auto scrollbar-hide"> */}
      <div className="grid grid-cols-4 gap-8">
        {products.map((product, i) => (
          <div key={product.name} className="group">

            {/* Image */}
            <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-3 bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100">
                <Heart className="h-4 w-4" />
              </button>

              {/* Sale */}
              {product.sale && (
                <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2 py-1">
                  Sale
                </span>
              )}

              {/* Add to cart */}
              <button className="absolute bottom-3 left-3 right-3 bg-black text-white text-xs py-2 opacity-0 group-hover:opacity-100">
                <ShoppingBag className="h-3 w-3 inline mr-1" />
                Add to Cart
              </button>
            </div>

            {/* Info */}
            <h3 className="text-sm font-medium">{product.name}</h3>
            <div className="flex gap-2 text-sm">
              <span className="font-semibold">{product.price}</span>
              {product.originalPrice && (
                <span className="line-through text-gray-400">{product.originalPrice}</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
