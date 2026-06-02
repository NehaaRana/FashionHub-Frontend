import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import PageHeader from "../components/PageHeader";

import {
  getAllProducts,
  addToCart,
  addToWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../services/api";

import Swal from "sweetalert2";
import FilterSidebar from "../components/FilterSidebar";

const Search = () => {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  // const [priceRange, setPriceRange] = useState(10000);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

    fetchWishlist();

  }, [
    query,
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedSizes,
    // priceRange,
    minPrice,
  maxPrice
  ]);

  const fetchProducts = async () => {

    try {

      const res = await getAllProducts();
      console.log(res.data);

      const activeProducts = res.data.filter(
        (p) => p.isActive === true
      );

      const updatedProducts = activeProducts.map((p) => {

        let parsedImages = null;

        try {

          parsedImages = p.productImages
            ? JSON.parse(p.productImages)
            : null;

        } catch (error) {

          console.log(error);

        }

        return {
          ...p,
          extraImages: parsedImages?.gallery || [],
          colorImages: parsedImages?.colors || {},
        };
      });

      // SEARCH FILTER
      const filteredProducts = updatedProducts.filter((p) => {

        const searchText = query.toLowerCase();

        // const productColors = product.colors
        //   ?.split(",")
        //   .map((c) => c.trim());

        // const colorMatch =
        //   selectedColors.length === 0 ||
        //   productColors.some((c) =>
        //     selectedColors.includes(c)
        //   );

        // const productSizes = product.sizes
        //   ?.split(",")
        //   .map((s) => s.trim());

        // const sizeMatch =
        //   selectedSizes.length === 0 ||
        //   productSizes.some((s) =>
        //     selectedSizes.includes(s)
        //   );

          // const productColors = p.color
          //   ? p.color.split(",").map((c) => c.trim())
          //   : [];

          // const colorMatch =
          //   selectedColors.length === 0 ||
          //   productColors.some((c) =>
          //     selectedColors.includes(c)
          //   );

          // const productSizes = p.size
          //   ? p.size.split(",").map((s) => s.trim())
          //   : [];

          // const sizeMatch =
          //   selectedSizes.length === 0 ||
          //   productSizes.some((s) =>
          //     selectedSizes.includes(s)
          //   );
        return (

          p.productName?.toLowerCase().includes(searchText) ||

          p.categoryName?.toLowerCase().includes(searchText) ||

          p.season?.toLowerCase().includes(searchText) ||

          p.description?.toLowerCase().includes(searchText)

        );
      });

      const finalProducts = filteredProducts.filter((p) => {

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.categoryName);

        const brandMatch =
          selectedBrands.length === 0 ||
          selectedBrands.includes(p.vendorName);

        // const colorMatch =
        //   selectedColors.length === 0 ||
        //   selectedColors.includes(p.color);

        // const sizeMatch =
        //   selectedSizes.length === 0 ||
        //   selectedSizes.includes(p.size);

        const productColors = p.color
          ? p.color.split(",").map((c) => c.trim())
          : [];

        const colorMatch =
          selectedColors.length === 0 ||
          productColors.some((c) =>
            selectedColors.includes(c)
          );

        const productSizes = p.size
          ? p.size.split(",").map((s) => s.trim())
          : [];

        const sizeMatch =
          selectedSizes.length === 0 ||
          productSizes.some((s) =>
            selectedSizes.includes(s)
          );
        // const priceMatch =
        //   Number(p.price) <= priceRange;
        const priceMatch =
          Number(p.price) >= minPrice &&
          Number(p.price) <= maxPrice;

        return (
          categoryMatch &&
          brandMatch &&
          colorMatch &&
          sizeMatch &&
          priceMatch
        );
      });

      setProducts(finalProducts);
      setAllProducts(updatedProducts);
      // setProducts(filteredProducts);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchWishlist = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {

      const res = await getUserWishlist(user.uid);

      setWishlist(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const checkUserAccess = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first!",
      });

      return false;
    }

    if (Number(user.gid) !== 1) {

      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Only users can perform this action",
      });

      return false;
    }

    return true;
  };

  const handleAddToCart = async (product) => {

    if (!checkUserAccess()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const cartData = {
        cartId: 0,
        uid: Number(user.uid),
        pid: Number(product.pid),
        sizeSelected: product.size || "M",
        quantity: "1",
        addedAt: new Date().toISOString(),
        colorSelected: product.color || "Black",
      };

      await addToCart(cartData);

      window.dispatchEvent(
        new CustomEvent("cartUpdated")
      );

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Product added to cart successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      console.log(error);

    }
  };

  const handleWishlist = async (product) => {

    if (!checkUserAccess()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const existingItem = wishlist.find(
        (item) => item.pid === product.pid
      );

      if (existingItem) {

        await deleteWishlist(existingItem.wid);

        setWishlist((prev) =>
          prev.filter((item) => item.wid !== existingItem.wid)
        );

      } else {

        const wishlistData = {
          wid: 0,
          uid: Number(user.uid),
          pid: Number(product.pid),
        };

        await addToWishlist(wishlistData);

        fetchWishlist();
      }

      window.dispatchEvent(
        new CustomEvent("wishlistUpdated")
      );

    } catch (error) {

      console.log(error);

    }
  };

  const startImageSlider = (product) => {

    if (hoveredProduct?.pid === product.pid) return;

    const images = [
      product.productImage,
      ...(product.extraImages || []),
    ];

    let index = 0;

    const interval = setInterval(() => {

      index = (index + 1) % images.length;

      setCurrentImageIndexes((prev) => ({
        ...prev,
        [product.pid]: index,
      }));

    }, 1400);

    setHoveredProduct({
      pid: product.pid,
      interval,
    });
  };

  const stopImageSlider = (product) => {

    if (
      hoveredProduct &&
      hoveredProduct.pid === product.pid
    ) {
      clearInterval(hoveredProduct.interval);
    }

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [product.pid]: 0,
    }));

    setHoveredProduct(null);
  };

  // const uniqueColors = [
  //   ...new Set(
  //     products.flatMap((p) =>
  //       p.colors
  //         ? p.colors
  //           .split(",")
  //           .map((c) => c.trim())
  //         : []
  //     )
  //   ),
  // ].filter((c) => c && c !== "null");

  // const uniqueSizes = [
  //   ...new Set(
  //     products.flatMap((p) =>
  //       p.sizes
  //         ? p.sizes
  //           .split(",")
  //           .map((s) => s.trim())
  //         : []
  //     )
  //   ),
  // ].filter((s) => s && s !== "null");
  // const categories = [
  //   ...new Set(products.map((p) => p.categoryName))
  // ];

  // const brands = [
  //   ...new Set(products.map((p) => p.vendorname))
  // ];

  // const colors = [
  //   ...new Set(products.map((p) => p.color))
  // ];

  // const sizes = [
  //   ...new Set(products.map((p) => p.size))
  // ];

  const searchedProducts = allProducts.filter((p) => {

    const searchText = query.toLowerCase();

    return (

      p.productName?.toLowerCase().includes(searchText) ||

      p.categoryName?.toLowerCase().includes(searchText) ||

      p.season?.toLowerCase().includes(searchText) ||

      p.description?.toLowerCase().includes(searchText)

    );
  });

  const colorCounts = {};

  searchedProducts.forEach((p) => {

    if (p.color) {

      p.color.split(",").forEach((c) => {

        const color = c.trim();

        if (color) {

          colorCounts[color] =
            (colorCounts[color] || 0) + 1;

        }

      });

    }

  });
  const categories = [
    ...new Set(searchedProducts.map((p) => p.categoryName))
  ];

  const brands = [
    ...new Set(searchedProducts.map((p) => p.vendorName))
  ];

  // const colors = [
  //   ...new Set(searchedProducts.map((p) => p.color))
  // ];

  const colors = [
    ...new Set(
      searchedProducts.flatMap((p) =>
        p.color
          ? p.color
            .split(",")
            .map((c) => c.trim())
          : []
      )
    ),
  ].filter((c) => c && c !== "null");

  // const sizes = [
  //   ...new Set(searchedProducts.map((p) => p.size))
  // ];
  const sizes = [
    ...new Set(
      searchedProducts.flatMap((p) =>
        p.size
          ? p.size
            .split(",")
            .map((s) => s.trim())
          : []
      )
    ),
  ].filter((s) => s && s !== "null");
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Search"
        titleAccent="Results"
        description={`Showing results for "${query}"`}
      />


      <section className="py-16">
        <div className="container flex gap-8">

          <FilterSidebar
            categories={categories}
            brands={brands}
            colors={colors}
            sizes={sizes}
            // colors={uniqueColors}
            // sizes={uniqueSizes}
            colorCounts={colorCounts}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}

            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}

            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}

            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}

            // priceRange={priceRange}
            // setPriceRange={setPriceRange}
            minPrice={minPrice}
            setMinPrice={setMinPrice}

            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          {products.length === 0 ? (

            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">
                No products found
              </h2>
            </div>

          ) : (


            <div className="flex-1">

              <p className="text-sm text-gray-500 mb-4">
                Showing {products.length} products
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">

                {products.map((p, i) => (

                  <ProductCard
                    key={p.pid}
                    product={{
                      ...p,
                      name: p.productName,
                      price: `₹${p.price}`,
                      image: `https://localhost:7106${[
                        p.productImage,
                        ...(p.extraImages || []),
                      ][currentImageIndexes[p.pid] || 0]
                        }`,
                      badge: "TRENDING",
                    }}
                    isWishlisted={wishlist.some(
                      (item) => item.pid === p.pid
                    )}
                    delay={0.05 * i}
                    onAddToCart={() => handleAddToCart(p)}
                    onWishlist={() => handleWishlist(p)}
                    onClick={() => navigate(`/product/${p.pid}`)}
                    onMouseEnter={() => startImageSlider(p)}
                    onMouseLeave={() => stopImageSlider(p)}
                  />

                ))}

              </div>
            </div>


          )}

        </div>
      </section>
    </>
  );
};

export default Search;