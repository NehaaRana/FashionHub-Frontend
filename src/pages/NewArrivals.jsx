import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { getAllProducts, addToCart, addToWishlist, deleteWishlist, getUserWishlist } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// const filters = ["All", "Dresses", "Tops", "Bags", "Shoes", "Accessories"];

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  useEffect(() => {
    fetchProducts();
    fetchWishlist();

  }, []);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log("Products API:", res.data);

      // only active products
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
          console.log("Image parse error", error);
        }

        return {
          ...p,

          // gallery images
          extraImages: parsedImages?.gallery || [],

          // color wise images
          colorImages: parsedImages?.colors || {},
        };
      })
       .sort((a, b) => b.pid - a.pid);

      // console.log(updatedProducts);
      
      setProducts(updatedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
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

    // NOT LOGIN
    if (!user) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first!",
      });

      return false;
    }

    // ONLY USER CAN ACCESS
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

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data ||
          "Cart action failed",
      });
    }
  };
  // const handleWishlist = async (product) => {

  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Login Required",
  //       text: "Please login first!",
  //     });

  //     return;
  //   }

  //   try {

  //     const existingItem = wishlist.find(
  //       (item) => item.pid === product.pid
  //     );

  //     // REMOVE
  //     if (existingItem) {

  //       await deleteWishlist(existingItem.wid);

  //       setWishlist((prev) =>
  //         prev.filter((item) => item.wid !== existingItem.wid)
  //       );

  //       // UPDATE NAVBAR
  //       window.dispatchEvent(
  //         new CustomEvent("wishlistUpdated")
  //       );

  //       Swal.fire({
  //         icon: "success",
  //         title: "Removed",
  //         text: "Removed from wishlist",
  //         timer: 1200,
  //         showConfirmButton: false,
  //       });

  //     }

  //     // ADD
  //     else {

  //       const wishlistData = {
  //         wid: 0,
  //         uid: Number(user.uid),
  //         pid: Number(product.pid),
  //       };

  //       await addToWishlist(wishlistData);

  //       fetchWishlist();

  //       // UPDATE NAVBAR
  //       window.dispatchEvent(
  //         new CustomEvent("wishlistUpdated")
  //       );

  //       Swal.fire({
  //         icon: "success",
  //         title: "Added",
  //         text: "Added to wishlist",
  //         timer: 1200,
  //         showConfirmButton: false,
  //       });
  //     }

  //   } catch (error) {

  //     console.log(error);

  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Wishlist action failed",
  //     });
  //   }
  // };


  const handleWishlist = async (product) => {

    if (!checkUserAccess()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const existingItem = wishlist.find(
        (item) => item.pid === product.pid
      );

      // REMOVE
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

      // ADD
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
  return (
    // <Layout>
    <>
      <PageHeader
        eyebrow="Just Dropped"
        title="New"
        titleAccent="Arrivals"
        description="The latest looks straight off the runway. Refreshed weekly with pieces designed for the modern woman."
      />

      <section className="py-16 lg:py-20">
        <div className="container">

          {/* Filters */}
         

          {/* Products */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {products.slice(0, visibleCount).map((p, i) => (

              <ProductCard

                key={p.pid}
                product={{
                  ...p,
                  name: p.productName,
                  price: `₹${p.price}`,
                  // image: `https://localhost:7106${p.productImage}`,
                  image: `https://localhost:7106${[
                    p.productImage,
                    ...(p.extraImages || []),
                  ][currentImageIndexes[p.pid] || 0]
                    }`,
                  badge: "NEW",
                }}
                isWishlisted={wishlist.some((item) => item.pid === p.pid)}
                delay={0.05 * i}
                onAddToCart={() => handleAddToCart(p)}
                onWishlist={() => handleWishlist(p)}
                // PRODUCT CLICK
                onClick={() => navigate(`/product/${p.pid}`)}
                onMouseEnter={() => startImageSlider(p)}
                onMouseLeave={() => stopImageSlider(p)}
              />
            ))}
          </div>
          {/* LOAD MORE BUTTON */}
          {visibleCount < products.length && (

            <div className="text-center mt-14">

              <Button
                variant="hero"
                size="lg"
                onClick={() => setVisibleCount(prev => prev + 4)}
              >
                Load More
              </Button>

            </div>

          )}
        </div>
      </section>
    </>
    // </Layout>
  );
};

export default NewArrivals;
