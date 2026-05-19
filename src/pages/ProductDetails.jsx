import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  getAllProducts,
  addToCart,
  addToWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../services/api";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);

  const [showViewer, setShowViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    fetchProduct();
    fetchWishlist();
  }, []);

  // FETCH PRODUCT
  const fetchProduct = async () => {

    try {

      const res = await getAllProducts();

      const foundProduct = res.data.find(
        (p) => p.pid === Number(id)
      );

      // setProduct(foundProduct);
      const extraImages = foundProduct.productImages
        ? JSON.parse(foundProduct.productImages)
        : [];

      setProduct({
        ...foundProduct,
        extraImages,
      });

      // default selected image
      setSelectedImage(
        `https://localhost:7106${foundProduct.productImage}`
      );

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH WISHLIST
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

  // ADD TO CART
  const handleAddToCart = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first!",
      });

      return;
    }

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

  // WISHLIST
  const handleWishlist = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first!",
      });

      return;
    }

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

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h2 className="text-2xl font-semibold">
          Loading Product...
        </h2>
      </div>
    );
  }

  const finalPrice =
    product.discount > 0
      ? product.price -
      (product.price * product.discount) / 100
      : product.price;

  const isWishlisted = wishlist.some(
    (item) => item.pid === product.pid
  );

  const allImages = [
    product.productImage,
    ...(product.extraImages || []),
  ];
  const handleMouseMove = (e) => {

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    // const x = ((e.pageX - left) / width) * 100;
    // const y = ((e.pageY - top) / height) * 100;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {

    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });

    setIsZooming(false);
  };

  const nextImage = () => {

    if (currentIndex < allImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevImage = () => {

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(allImages.length - 1);
    }
  };

  return (
    <section className="bg-white min-h-screen py-14">
      <div className="container">

        {/* BREADCRUMB */}
        <div className="mb-10 text-sm text-muted-foreground">
          Home / New Arrivals /{" "}
          <span className="text-foreground font-medium">
            {product.productName}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* IMAGE */}
          <div className="space-y-5">

            {/* <div className="overflow-hidden rounded-3xl bg-secondary">
              <img
                src={`https://localhost:7106${product.productImage}`}
                alt={product.productName}
                className="w-full h-[700px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div> */}
            <div className="flex gap-4">

              {/* THUMBNAILS */}
              <div className="flex flex-col gap-3">

                {/* MAIN IMAGE THUMB */}
                <img
                  src={`https://localhost:7106${product.productImage}`}
                  alt=""
                  onClick={() =>
                    setSelectedImage(
                      `https://localhost:7106${product.productImage}`
                    )
                  }
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage ===
                    `https://localhost:7106${product.productImage}`
                    ? "border-black"
                    : "border-gray-200"
                    }`}
                />

                {/* EXTRA IMAGES */}
                {product.extraImages?.map((img, index) => (
                  <img
                    key={index}
                    src={`https://localhost:7106${img}`}
                    alt=""
                    onClick={() =>
                      setSelectedImage(
                        `https://localhost:7106${img}`
                      )
                    }
                    className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage ===
                      `https://localhost:7106${img}`
                      ? "border-black"
                      : "border-gray-200"
                      }`}
                  />
                ))}

              </div>

              {/* MAIN BIG IMAGE */}
              {/* <div className="flex-1 overflow-hidden rounded-3xl bg-secondary">

                <img
                  src={selectedImage}
                  alt={product.productName}
                  className="w-full h-[700px] object-cover hover:scale-105 transition-transform duration-700"
                />

              </div> */}
              <div
                className="flex-1 overflow-hidden rounded-3xl bg-secondary relative cursor-zoom-in border"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={handleMouseLeave}
              >

                <img
                  src={selectedImage}
                  onClick={() => {
                    setShowViewer(true);

                    const index = allImages.findIndex(
                      (img) =>
                        `https://localhost:7106${img}` ===
                        selectedImage
                    );

                    setCurrentIndex(index);
                  }}
                  alt={product.productName}
                  style={zoomStyle}
                  className="w-full h-[700px] object-cover transition-transform duration-200 ease-out"
                />

                {/* ZOOM TEXT */}
                {!isZooming && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-full">
                    Hover to Zoom
                  </div>
                )}

              </div>

            </div>

            <div className="grid grid-cols-3 gap-4">

              <div className="border rounded-2xl p-4 text-center">
                <Truck className="mx-auto mb-2 h-5 w-5" />
                <p className="text-xs font-medium">
                  Free Shipping
                </p>
              </div>

              <div className="border rounded-2xl p-4 text-center">
                <RotateCcw className="mx-auto mb-2 h-5 w-5" />
                <p className="text-xs font-medium">
                  Easy Returns
                </p>
              </div>

              <div className="border rounded-2xl p-4 text-center">
                <ShieldCheck className="mx-auto mb-2 h-5 w-5" />
                <p className="text-xs font-medium">
                  Secure Payment
                </p>
              </div>

            </div>
          </div>

          {/* DETAILS */}
          <div className="sticky top-24">

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {product.productName}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-4">

              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>

              <span className="text-sm text-muted-foreground">
                (124 Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-6">

              <h2 className="text-4xl font-bold text-primary">
                ₹{finalPrice}
              </h2>

              {product.discount > 0 && (
                <>
                  <span className="text-xl line-through text-muted-foreground">
                    ₹{product.price}
                  </span>

                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-8 text-muted-foreground leading-8 text-[15px]">
              {product.description}
            </p>

            {/* DETAILS */}
            <div className="mt-10 space-y-5 border-t border-b py-8">

              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">
                  Fabric
                </span>

                <span className="font-semibold">
                  {product.fabric}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">
                  Color
                </span>

                <span className="font-semibold">
                  {product.color}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">
                  Size
                </span>

                <span className="font-semibold">
                  {product.size}
                </span>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-2xl font-semibold uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingBag className="h-5 w-5" />
                Add To Cart
              </button>

              <button
                onClick={handleWishlist}
                className="w-16 border rounded-2xl flex items-center justify-center hover:bg-secondary transition-all"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                    }`}
                />
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE VIEWER */}
      {showViewer && (

        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

          {/* CLOSE */}
          <button
            onClick={() => setShowViewer(false)}
            className="absolute top-5 right-5 text-white z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* PREVIOUS */}
          <button
            onClick={prevImage}
            className="absolute left-5 text-white z-50"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* IMAGE */}
          <div className="w-[85%] h-[85%] overflow-hidden rounded-2xl">

            <img
              src={`https://localhost:7106${allImages[currentIndex]}`}
              alt=""
              className="w-full h-full object-contain hover:scale-150 transition-transform duration-300 cursor-zoom-in"
            />

          </div>

          {/* NEXT */}
          <button
            onClick={nextImage}
            className="absolute right-5 text-white z-50"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* THUMBNAILS */}
          <div className="absolute bottom-5 flex gap-3">

            {allImages.map((img, index) => (

              <img
                key={index}
                src={`https://localhost:7106${img}`}
                alt=""
                onClick={() => setCurrentIndex(index)}
                className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 ${currentIndex === index
                    ? "border-white"
                    : "border-transparent"
                  }`}
              />

            ))}

          </div>

        </div>

      )}
    </section>
  );
};

export default ProductDetails;