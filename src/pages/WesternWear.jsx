import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import {
  getAllProducts,
  addToCart,
  addToWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../services/api";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const WesternWear = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      const filtered = res.data.filter(
        (p) =>
          p.isActive === true &&
          p.categoryName?.toLowerCase().includes("western")
      );

      setProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const res = await getUserWishlist(user.uid);

    setWishlist(res.data);
  };

  return (
    <>
      <PageHeader
        eyebrow="Modern Fashion"
        title="Western"
        titleAccent="Wear"
        description="Trendy western styles crafted for confident everyday fashion."
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
                  image: `https://localhost:7106${p.productImage}`,
                }}
                delay={0.05 * i}
                isWishlisted={wishlist.some((item) => item.pid === p.pid)}
                onClick={() => navigate(`/product/${p.pid}`)}
              />
            ))}

          </div>

          {visibleCount < products.length && (
            <div className="text-center mt-14">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 4)}
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

export default WesternWear;