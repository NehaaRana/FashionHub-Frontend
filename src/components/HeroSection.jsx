import { Button } from "../components/ui/Button";
import heroImage from "../assets/hero-fashion.jpg";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
  <section className="relative overflow-hidden">
    <div className="w-full px-4 grid lg:grid-cols-2 min-h-[85vh] items-center gap-8 py-12 lg:py-0">
      {/* Text Side */}
      <div className="order-2 lg:order-1 space-y-6 animate-fade-in-up">
        <span className="inline-block bg-accent/15 text-accent font-body text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-sm font-semibold">
          Summer Collection 2026
        </span>
        {/* <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground"> */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          Elegance
          <br />
          <span className="italic font-normal text-accent">Redefined</span>
        </h1>
        <p className="font-body text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
          Discover curated collections for every occasion — from summer
          essentials to festive celebrations. Made for the modern woman.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {/* <Button variant="hero" size="lg">
            Shop Now
          </Button>  */}
          <Button
  variant="hero"
  size="lg"
  onClick={() => navigate("/new-arrivals")}
>
  Shop Now
</Button>
          <Button variant="outline" size="lg" className="font-body uppercase tracking-[0.15em] text-xs px-8">
            View Lookbook
          </Button>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="bg-accent/10 border border-accent/30 rounded-sm px-4 py-2">
            <span className="font-body text-xs text-accent font-semibold tracking-wider uppercase">
              Use Code: SUMMER26
            </span>
          </div>
          <span className="font-body text-xs text-muted-foreground">
            Get 25% off on your first order
          </span>
        </div>
      </div>

      {/* Image Side */}
      <div className="order-1 lg:order-2 relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="relative overflow-hidden rounded-sm aspect-[4/5] max-h-[75vh] mx-auto lg:mx-0">
          <img
            src={heroImage}
            alt="Fashion Hub Summer Collection - Elegant woman in flowing dress"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm p-4 rounded-sm">
            <p className="font-display text-lg font-semibold text-foreground">Up to 50% Off</p>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Limited Time Offer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
};

export default HeroSection;
