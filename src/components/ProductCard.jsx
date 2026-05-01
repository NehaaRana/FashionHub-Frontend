import { Heart, ShoppingBag } from "lucide-react";


const ProductCard = ({ product, delay = 0 }) => (
  <div className="group animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
    <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4 bg-secondary">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
      >
        <Heart className="h-4 w-4 text-foreground" />
      </button>
      {product.badge && (
        <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-body text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-sm">
          {product.badge}
        </span>
      )}
      <button className="absolute bottom-3 left-3 right-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold py-3 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2 hover:bg-primary/90">
        <ShoppingBag className="h-3.5 w-3.5" />
        Add to Cart
      </button>
    </div>
    <h3 className="font-body text-sm font-medium text-foreground">{product.name}</h3>
    <div className="flex items-center gap-2 mt-1">
      <span className="font-body text-sm font-semibold text-foreground">{product.price}</span>
      {product.originalPrice && (
        <span className="font-body text-xs text-muted-foreground line-through">{product.originalPrice}</span>
      )}
    </div>
  </div>
);

export default ProductCard;
