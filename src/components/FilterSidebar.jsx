const FilterSidebar = ({
  categories = [],
  brands = [],
  colors = [],
  sizes = [],

  selectedCategories,
  setSelectedCategories,

  selectedBrands,
  setSelectedBrands,

  selectedColors,
  setSelectedColors,

  selectedSizes,
  setSelectedSizes,

  // priceRange,
  // setPriceRange,
  minPrice,
setMinPrice,

maxPrice,
setMaxPrice,

colorCounts = {},
}) => {


  const toggleFilter = (
    value,
    selected,
    setSelected
  ) => {

    if (selected.includes(value)) {

      setSelected(
        selected.filter((item) => item !== value)
      );

    } else {

      setSelected([...selected, value]);

    }
  };

  return (

    <div className="w-64 hidden lg:block space-y-8">

      {/* CATEGORY */}
      <div>

        <h3 className="font-semibold mb-3 uppercase text-sm">
          Categories
        </h3>

        <div className="space-y-2">

          {categories.map((cat) => (

            <label
              key={cat}
              className="flex items-center gap-2 text-sm"
            >

              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  toggleFilter(
                    cat,
                    selectedCategories,
                    setSelectedCategories
                  )
                }
              />

              {cat}

            </label>

          ))}

        </div>

      </div>

      {/* BRANDS */}
      <div>

        <h3 className="font-semibold mb-3 uppercase text-sm">
          Brands
        </h3>

        <div className="space-y-2">

          {brands.map((brand) => (

            <label
              key={brand}
              className="flex items-center gap-2 text-sm"
            >

              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleFilter(
                    brand,
                    selectedBrands,
                    setSelectedBrands
                  )
                }
              />

              {brand}

            </label>

          ))}

        </div>

      </div>

      
{/* COLORS */}
<div>

  <h3 className="font-semibold mb-3 uppercase text-sm">
    Colors
  </h3>

  <div className="space-y-2">

    {colors.map((color) => (

      <label
        key={color}
        className="flex items-center justify-between text-sm cursor-pointer"
      >

        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={selectedColors.includes(color)}
            onChange={() =>
              toggleFilter(
                color,
                selectedColors,
                setSelectedColors
              )
            }
          />

          {/* COLOR DOT */}
          <span
            className="w-4 h-4 rounded-full border"
            style={{
              backgroundColor:
                color.toLowerCase(),
            }}
          />

          <span>{color}</span>

        </div>

        {/* COUNT */}
        <span className="text-gray-400 text-xs">
          ({colorCounts[color] || 0})
        </span>

      </label>

    ))}

  </div>

</div>
      {/* SIZES */}
      <div>

        <h3 className="font-semibold mb-3 uppercase text-sm">
          Sizes
        </h3>

        <div className="space-y-2">

          {sizes.map((size) => (

            <label
              key={size}
              className="flex items-center gap-2 text-sm"
            >

              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() =>
                  toggleFilter(
                    size,
                    selectedSizes,
                    setSelectedSizes
                  )
                }
              />

              {size}

            </label>

          ))}

        </div>

      </div>

{/* PRICE */}
<div>

  <h3 className="font-semibold mb-3 uppercase text-sm">
    Price
  </h3>

  <div className="space-y-3">

    <div>

      <p className="text-xs mb-1">
        Min Price
      </p>

      <input
        type="range"
        min="100"
        max="10000"
        value={minPrice}

        onChange={(e) => {

  const value = Number(e.target.value);

  if (value <= maxPrice) {
    setMinPrice(value);
  }

}}
        className="w-full"
      />

      <p className="text-sm">
        ₹{minPrice}
      </p>

    </div>

    <div>

      <p className="text-xs mb-1">
        Max Price
      </p>

      <input
        type="range"
        min="100"
        max="10000"
        value={maxPrice}
        onChange={(e) => {

  const value = Number(e.target.value);

  if (value >= minPrice) {
    setMaxPrice(value);
  }

}}
        className="w-full"
      />

      <p className="text-sm">
        ₹{maxPrice}
      </p>

    </div>

  </div>

</div>
<button
  onClick={() => {

    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);

    setMinPrice(100);
    setMaxPrice(10000);

  }}
  className="w-full border py-2 text-sm hover:bg-black hover:text-white transition"
>
  Clear All Filters
</button>
    </div>

  );
};

export default FilterSidebar;