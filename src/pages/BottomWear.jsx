import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

import {
  getAllProducts,
  getUserWishlist,
  addToCart,
  addToWishlist,
  deleteWishlist,
} from "../services/api";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BottomWear = () => {

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await getAllProducts();

      const filtered = res.data
          .filter(
            (p) =>
              p.isActive === true &&
              (
                p.categoryName?.toLowerCase().includes("bottom") ||
                p.categoryName?.toLowerCase().includes("jeans") ||
                p.categoryName?.toLowerCase().includes("pants") ||
                p.categoryName?.toLowerCase().includes("trouser") ||
                p.categoryName?.toLowerCase().includes("legging")
              )
          )
          .map((p) => {

            let parsedImages = null;

            try {

              parsedImages = p.productImages
                ? JSON.parse(p.productImages)
                : null;

            } catch (error) {
              console.log("Image parse error", error);
            }

            return {
              ...p,

              // GALLERY IMAGES
              extraImages: parsedImages?.gallery || [],

              // COLOR IMAGES
              colorImages: parsedImages?.colors || {},
            };
          });

        setProducts(filtered);
      // setProducts(filtered);

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

  // CHECK LOGIN + USER ACCESS
  const checkUserAccess = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    // NOT LOGIN
    // if (!user) {

    //   Swal.fire({
    //     icon: "warning",
    //     title: "Login Required",
    //     text: "Please login first!",
    //   });

    //   return false;
    // }

    if (!user) {
  Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login first!",
    timer: 2000, // 2 seconds
    showConfirmButton: false,
  }).then(() => {
    navigate("/login");
  });

  return false;
}
    // ONLY NORMAL USER
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

  // ADD TO CART
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

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data ||
          "Cart action failed",
      });
    }
  };

  // HANDLE WISHLIST
  const handleWishlist = async (product) => {

    if (!checkUserAccess()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const existingItem = wishlist.find(
        (item) => item.pid === product.pid
      );

      // REMOVE FROM WISHLIST
      if (existingItem) {

        await deleteWishlist(existingItem.wid);

        setWishlist((prev) =>
          prev.filter(
            (item) => item.wid !== existingItem.wid
          )
        );

        window.dispatchEvent(
          new CustomEvent("wishlistUpdated")
        );

        Swal.fire({
          icon: "success",
          title: "Removed",
          text: "Removed from wishlist",
          timer: 1200,
          showConfirmButton: false,
        });

      }

      // ADD TO WISHLIST
      else {

        const wishlistData = {
          wid: 0,
          uid: Number(user.uid),
          pid: Number(product.pid),
        };

        await addToWishlist(wishlistData);

        fetchWishlist();

        window.dispatchEvent(
          new CustomEvent("wishlistUpdated")
        );

        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Added to wishlist",
          timer: 1200,
          showConfirmButton: false,
        });
      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Wishlist action failed",
      });
    }
  };

  // IMAGE SLIDER START
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

// IMAGE SLIDER STOP
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

  return (
    <>
      <PageHeader
        eyebrow="Comfort Meets Style"
        title="Bottom"
        titleAccent="Wear"
        description="Discover jeans, trousers, skirts, and more for every look."
      />

      <section className="py-16 lg:py-20">

        <div className="container">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">

            {products.slice(0, visibleCount).map((p, i) => (

              <ProductCard
                key={p.pid}
                product={{
                  ...p,
                  name: p.productName,
                  price: `₹${p.price}`,
                  // image: `https://localhost:7106${p.productImage}`,
                  image: `https://localhost:7106${
                        [
                          p.productImage,
                          ...(p.extraImages || []),
                        ][currentImageIndexes[p.pid] || 0]
                      }`,
                }}
                delay={0.05 * i}
                isWishlisted={
                  wishlist.some((item) => item.pid === p.pid)
                }
                onAddToCart={() => handleAddToCart(p)}
                onWishlist={() => handleWishlist(p)}
                onClick={() => navigate(`/product/${p.pid}`)}
                onMouseEnter={() => startImageSlider(p)}
                onMouseLeave={() => stopImageSlider(p)}   
              />

            ))}

          </div>

          {visibleCount < products.length && (

            <div className="text-center mt-14">

              <Button
                variant="hero"
                size="lg"
                onClick={() =>
                  setVisibleCount((prev) => prev + 4)
                }
              >
                Load More
              </Button>

            </div>

          )}

        </div>

      </section>
    </>
  );
};

export default BottomWear;

