import { Button } from "../components/ui/Button";
import { Sparkles } from "lucide-react";

const SpecialOffer = () => (
  <section className="py-20 lg:py-28">
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative bg-primary rounded-sm overflow-hidden py-16 px-8 lg:px-16 text-center">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(27, 52%, 64%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(27, 52%, 64%) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 max-w-2xl mx-auto animate-fade-in-up">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Festival Special Combos
          </h2>
          <p className="font-body text-primary-foreground/70 text-base mb-3">
            Get ready for the festive season with our exclusive combo offers. 
            Mix and match from our curated collections at unbeatable prices.
          </p>
          <p className="font-body text-accent text-lg font-semibold mb-8">
            Buy 2, Get 1 Free — Limited Time Only!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg">
              Shop Combos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-body uppercase tracking-[0.15em] text-xs"
            >
              View All Offers
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SpecialOffer;
