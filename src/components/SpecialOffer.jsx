// import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const SpecialOffer = () => (


<section className="bg-[hsl(var(--primary))] w-screen py-24 lg:py-32">

  <div className="max-w-5xl mx-auto text-center px-6">

    <Sparkles className="h-8 w-8 text-[#c08a5b] mx-auto mb-6" />

    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
      Festival Special Combos
    </h2>

    <p className="text-white/70 mb-4">
      Get ready for the festive season with our exclusive combo offers.
    </p>

    <p className="text-[#c08a5b] text-lg font-semibold mb-10">
      Buy 2, Get 1 Free — Limited Time Only!
    </p>

    <div className="flex justify-center gap-6">
      <button className="bg-[#c08a5b] text-white px-10 py-3 text-xs">
        SHOP COMBOS
      </button>

      <button className="bg-white text-black px-10 py-3 text-xs">
        VIEW OFFERS
      </button>
    </div>

  </div>
</section>
);

export default SpecialOffer;
