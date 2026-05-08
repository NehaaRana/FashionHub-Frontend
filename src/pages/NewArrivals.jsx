import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { getAllProducts , addToCart } from "../services/api";
import Swal from "sweetalert2";


const filters = ["All", "Dresses", "Tops", "Bags", "Shoes", "Accessories"];

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      // only active products
      const activeProducts = res.data.filter(
        (p) => p.isActive === true
      );

      setProducts(activeProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

   // ADD TO CART
  const handleAddToCart = async (product) => {
    // check login
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
      // const cartData = {
      //   uid: user.uid,
      //   pid: product.pid,
      //   quantity: 1,
      //    sizeSelected: product.size,
      //   colorSelected: product.color,
      //   addedAt: new Date().toISOString(),
      // };
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
        text: "Failed to add product to cart",
      });
    }
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
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`font-body text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-sm border transition-colors ${
                  i === 0
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Products */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.pid}
                product={{
                  name: p.productName,
                  price: `₹${p.price}`,
                  image: `https://localhost:7106${p.productImage}`,
                  badge: "NEW",
                }}
                delay={0.05 * i}
              />
            ))}
          </div> */}
           {/* Products */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.pid}
                product={{
                  ...p,
                  name: p.productName,
                  price: `₹${p.price}`,
                  image: `https://localhost:7106${p.productImage}`,
                  badge: "NEW",
                }}
                delay={0.05 * i}
                onAddToCart={() => handleAddToCart(p)}
              />
            ))}
          </div>
          <div className="text-center mt-14">
            <Button variant="hero" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </section>
    </>
    // </Layout>
  );
};

export default NewArrivals;
