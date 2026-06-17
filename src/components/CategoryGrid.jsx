import summerImg from "../assets/category-summer.jpg";
import winterImg from "../assets/winter.jpg";
import festivalImg from "../assets/salwar-suite.jpg";

const categories = [
  { name: "Summer Essentials", subtitle: "Light & Breezy", image: summerImg, tag: "SALE" },
  { name: "Winter Classics", subtitle: "Warm & Elegant", image: winterImg, tag: null },
  { name: "Festival Combos", subtitle: "Celebrate in Style", image: festivalImg, tag: "NEW" },
];

const CategoryGrid = () => {
  return (
    // <section className="py-24 lg:py-32">
    // <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
    <section className="py-24 lg:py-32">
      {/* FIXED CONTAINER */}
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1f1f1f] mb-3">
            Shop by Collection
          </h2>
          <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
            Curated for every season & occasion
          </p>
        </div>

        {/* GRID */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"> */}
        <div className="grid grid-cols-3 gap-8">

          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* DARK OVERLAY (IMPORTANT FIX) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* TAG */}
              {cat.tag && (
                <span className="absolute top-4 right-4 bg-[#c08a5b] text-white text-[10px] px-3 py-1 tracking-widest z-20">
                  {cat.tag}
                </span>
              )}

              {/* TEXT */}
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight">
                  {cat.name}
                </h3>
                <p className="text-white/80 text-[11px] uppercase tracking-[0.25em] mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;