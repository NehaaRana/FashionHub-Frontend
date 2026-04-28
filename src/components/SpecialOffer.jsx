// import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const SpecialOffer = () => (
<section className="bg-black py-24 lg:py-32 w-full">

  <div className="max-w-5xl mx-auto px-6 text-center">

    <Sparkles className="h-8 w-8 text-[#c08a5b] mx-auto mb-6" />

    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
      Festival Special Combos
    </h2>

    <p className="text-white/70 leading-relaxed mb-4">
      Get ready for the festive season with our exclusive combo offers.
      Mix and match from our curated collections at unbeatable prices.
    </p>

    <p className="text-[#c08a5b] text-lg font-semibold mb-10">
      Buy 2, Get 1 Free — Limited Time Only!
    </p>

    <div className="flex justify-center gap-6">
      <button className="bg-[#c08a5b] text-white px-10 py-3 text-xs uppercase tracking-[0.2em] font-semibold">
        SHOP COMBOS
      </button>

      <button className="bg-white text-black px-10 py-3 text-xs uppercase tracking-[0.2em] font-semibold">
        VIEW OFFERS
      </button>
    </div>

  </div>
</section>
);

export default SpecialOffer;
