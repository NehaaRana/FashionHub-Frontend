import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { getCurrentUser, getUserWishlist,deleteWishlist } from "../services/api";
import Swal from "sweetalert2";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      // get logged in user
      const userRes = await getCurrentUser();

      const uid = userRes.data.uid;

      // get wishlist of logged in user
      const wishlistRes = await getUserWishlist(uid);

      // format data for ProductCard
      const formattedData = wishlistRes.data.map((item) => ({
        wid: item.wid,
        pid: item.pid,
        name: item.productName,
        price: `₹${item.price}`,
        image: `https://localhost:7106${item.photo}`,
        stock: item.stock,
      }));

      setItems(formattedData);
    } catch (error) {
      console.log("Wishlist Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const removeWishlist = async (wid) => {
    try {
      await deleteWishlist(wid);

      setItems((prev) =>
        prev.filter((item) => item.wid !== wid)
      );

       Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "It em removed from wishlist",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("Remove Wishlist Error:", error);
         Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to remove item",
    });
    }
  };

  return (
    <>
      {/* <Layout> */}

      <PageHeader
        eyebrow="Saved For Later"
        title="Your"
        titleAccent="Wishlist"
        description="Pieces you love, kept close. Add them to your cart whenever you're ready."
      />

      <section className="py-16 lg:py-20">
        <div className="container">

          {loading ? (
            <p className="text-center">Loading wishlist...</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500">
              No items in wishlist
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
              {items.map((p, i) => (
                <ProductCard
                  key={p.wid}
                  product={p}
                  delay={0.05 * i}
                  isWishlisted={true}
                   onWishlist={() => removeWishlist(p.wid)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* </Layout> */}
    </>
  );
};

export default Wishlist;







// import Layout from "../components/Layout";
// import PageHeader from "../components/PageHeader";
// import ProductCard from "../components/ProductCard";
// import product1 from "../assets/product-1.jpg";
// import product2 from "../assets/product-2.jpg";

// const items = [
//   { name: "Floral Midi Dress", price: "₹2,499", originalPrice: "₹3,999", image: product1, badge: "SALE" },
//   { name: "Classic Leather Tote", price: "₹4,299", image: product2 },
// ];

// const Wishlist = () => (
// //   <Layout>
// <>

//     <PageHeader
//       eyebrow="Saved For Later"
//       title="Your"
//       titleAccent="Wishlist"
//       description="Pieces you love, kept close. Add them to your cart whenever you're ready."
//     />
//     <section className="py-16 lg:py-20">
//       <div className="container">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
//           {items.map((p, i) => (
//             <ProductCard key={p.name} product={p} delay={0.05 * i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   {/* </Layout> */}
//   </>
// );

// export default Wishlist;
