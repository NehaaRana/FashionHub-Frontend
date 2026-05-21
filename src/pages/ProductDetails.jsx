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
  getProductReviews,
  getAverageRating,
  getVendors,
  addReview,
} from "../services/api";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [displayImages, setDisplayImages] = useState([]);

  const [showViewer, setShowViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalReviews, setTotalReviews] =
    useState(0);

  const [vendor, setVendor] = useState(null);

  const [reviewText, setReviewText] =
    useState("");

  const [rating, setRating] = useState(5);
  useEffect(() => {
    fetchProduct();
    fetchWishlist();
  }, []);

  // FETCH PRODUCT
  const fetchProduct = async () => {

    try {

      const res = await getAllProducts();

      // const foundProduct = res.data.find(
      //   (p) => p.pid === Number(id)
      // );

      const foundProduct = res.data.find(
        (p) => p.pid === Number(id)
      );

      if (!foundProduct) {
        return;
      }


      let parsedImages = null;

      try {

        parsedImages = foundProduct.productImages
          ? JSON.parse(foundProduct.productImages)
          : null;

      } catch (error) {

        console.log("Image parse error", error);

      }

      // setProduct({
      //   ...foundProduct,

      //   // gallery images array
      //   extraImages: parsedImages?.gallery || [],

      //   // color wise images object
      //   colorImages: parsedImages?.colors || {},
      // });

      // default selected image


      setProduct({
        ...foundProduct,
        extraImages: parsedImages?.gallery || [],
        colorImages: parsedImages?.colors || {},
      });

      // FETCH VENDOR
      const vendorRes = await getVendors();

      const foundVendor = vendorRes.data.find(
        (v) => v.vid === foundProduct.vid
      );

      setVendor(foundVendor);

      // FETCH REVIEWS
      const reviewRes = await getProductReviews(
        foundProduct.pid
      );

      setReviews(reviewRes.data);

      // FETCH AVERAGE RATING
      const avgRes = await getAverageRating(
        foundProduct.pid
      );

      setAverageRating(avgRes.data.averageRating);

      setTotalReviews(avgRes.data.totalReviews);

      // DEFAULT COLOR
      const firstColor = Object.keys(
        parsedImages?.colors || {}
      )[0];

      setSelectedColor(firstColor);
      const firstSize = foundProduct.size?.split(",")[0];
      setSelectedSize(firstSize);

      // DEFAULT IMAGES OF FIRST COLOR
      const firstColorImages =
        parsedImages?.colors?.[firstColor] || [];

      // DISPLAY ONLY FIRST COLOR IMAGES
      setDisplayImages(firstColorImages);

      // DEFAULT SELECTED IMAGE
      if (firstColorImages.length > 0) {
        setSelectedImage(
          `https://localhost:7106${firstColorImages[0]}`
        );
      }

      // setSelectedImage(
      //   `https://localhost:7106${foundProduct.productImage}`
      // );

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
        // sizeSelected: product.size || "M",
        sizeSelected: selectedSize,
        quantity: "1",
        addedAt: new Date().toISOString(),
        // colorSelected: product.color || "Black",
        // CURRENT SELECTED COLOR
        colorSelected: selectedColor,

        // CURRENT IMAGE
        // selectedImage: selectedImage,
        selectedImage: selectedImage.replace(
          "https://localhost:7106",
          ""
        ),
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

  // const allImages = [
  //   product.productImage,
  //   ...(product.extraImages || []),
  // ];


  const allImages = displayImages;
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

  const handleReviewSubmit = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first!",
      });

      return;
    }

    try {

      const orderId = prompt(
        "Enter your Order ID"
      );

      const reviewData = {
        rid: 0,
        pid: product.pid,
        rating: rating,
        feedback: reviewText,
        uid: user.uid,
        oid: Number(orderId),
      };

      await addReview(reviewData);

      Swal.fire({
        icon: "success",
        title: "Review Added",
        timer: 1500,
        showConfirmButton: false,
      });

      setReviewText("");

      const updatedReviews =
        await getProductReviews(product.pid);

      setReviews(updatedReviews.data);

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Review failed",
      });

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
                {/* <img
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
                /> */}

                {/* EXTRA IMAGES */}
                {/* {product.extraImages?.map((img, index) => (
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
                ))} */}


                {/* THUMBNAILS */}
                <div className="flex flex-col gap-3">

                  {displayImages.map((img, index) => (

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

              {/* <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div> */}

              <div className="flex items-center gap-1">

                {[...Array(5)].map((_, index) => (

                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                  />

                ))}

              </div>
              <span className="text-sm text-muted-foreground">
                ({totalReviews} Reviews)
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


            {/* COLORS */}
            <div className="mt-8">

              <h3 className="font-semibold text-lg mb-4">
                Select Color
              </h3>

              <div className="flex gap-4 flex-wrap">

                {Object.keys(product.colorImages || {}).map(
                  (color, index) => {

                    const firstImage =
                      product.colorImages[color][0];

                    return (

                      <div
                        key={index}
                        // onClick={() => {

                        //   setSelectedColor(color);

                        //   const newImages =
                        //     product.colorImages[color];

                        //   setDisplayImages(newImages);

                        //   setSelectedImage(
                        //     `https://localhost:7106${newImages[0]}`
                        //   );
                        // }}

                        onClick={() => {

                          setSelectedColor(color);

                          const newImages =
                            product.colorImages[color];

                          setDisplayImages(newImages);

                          setSelectedImage(
                            `https://localhost:7106${newImages[0]}`
                          );

                          // RESET VIEWER INDEX
                          setCurrentIndex(0);

                        }}
                        className={`border-2 rounded-2xl p-1 cursor-pointer transition-all ${selectedColor === color
                          ? "border-black"
                          : "border-gray-200"
                          }`}
                      >

                        <img
                          src={`https://localhost:7106${firstImage}`}
                          alt={color}
                          className="w-20 h-24 object-cover rounded-xl"
                        />

                        <p className="text-center text-sm mt-2 font-medium">
                          {color}
                        </p>

                      </div>

                    );
                  }
                )}

              </div>

            </div>


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

              {/* <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">
                  Size
                </span>

                <span className="font-semibold">
                  {product.size}
                </span>
              </div> */}

              <div>
                <span className="font-medium text-muted-foreground block mb-3">
                  Select Size
                </span>

                <div className="flex gap-3 flex-wrap">

                  {product.size?.split(",").map((size, index) => (

                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border text-sm font-semibold transition-all ${selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-black"
                        }`}
                    >
                      {size}
                    </button>

                  ))}

                </div>
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

            {/* VENDOR INFO */}
            <div className="mt-10 border rounded-3xl p-6 bg-secondary/30">

              {/* HEADING */}
              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    Seller Information
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Product sold and fulfilled by this vendor
                  </p>
                </div>

                <div className="bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full">
                  Verified Seller
                </div>

              </div>

              {/* VENDOR DETAILS */}
              <div className="flex items-center gap-5">

                {/* SHOP LOGO */}
                <img
                  src={
                    vendor?.shopLogo
                      ? `https://localhost:7106${vendor.shopLogo}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={vendor?.shopName}
                  className="w-20 h-20 rounded-full object-cover border"
                />

                <div className="space-y-1">

                  <h3 className="text-xl font-bold">
                    {vendor?.shopName}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Trusted Fashion Partner
                  </p>

                  <p className="text-sm">
                    {vendor?.email}
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="container mt-20">

        <h2 className="text-3xl font-bold mb-10">
          Customer Reviews
        </h2>

        {/* REVIEW FORM */}
        {/* <div className="border rounded-3xl p-6 mb-10">

          <h3 className="text-xl font-semibold mb-4">
            Write Review
          </h3>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="w-full border rounded-xl p-3 mb-4"
          >
            <option value={5}>5 Star</option>
            <option value={4}>4 Star</option>
            <option value={3}>3 Star</option>
            <option value={2}>2 Star</option>
            <option value={1}>1 Star</option>
          </select>

          <textarea
            rows="4"
            placeholder="Write review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          />

          <button
            onClick={handleReviewSubmit}
            className="mt-5 bg-black text-white px-8 py-3 rounded-2xl"
          >
            Submit Review
          </button>

        </div> */}

        {/* REVIEW LIST */}
        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review.rid}
              className="border rounded-3xl p-6"
            >

              <div className="flex justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {review.userName?.charAt(0)}
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {review.userName}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex">

                  {[...Array(review.rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}

                </div>

              </div>

              <p className="mt-5 text-muted-foreground leading-7">
                {review.feedback}
              </p>

            </div>

          ))}

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
              // src={`https://localhost:7106${allImages[currentIndex]}`}
              src={`https://localhost:7106${displayImages[currentIndex]}`}
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

            {/* {allImages.map((img, index) => ( */}
            {displayImages.map((img, index) => (
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