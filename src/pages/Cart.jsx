import PageHeader from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCarts,
  getAllProducts,
  deleteCartItem,
} from "../services/api";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // FETCH LOGGED-IN USER CART
  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      // cart data
      const cartRes = await getCarts();

      // product data
      const productRes = await getAllProducts();

      // only logged-in user cart
      const userCart = cartRes.data.filter(
        (item) => item.uid === user.uid
      );

      // merge cart + product
      const finalData = userCart.map((cartItem) => {
        const product = productRes.data.find(
          (p) => p.pid === cartItem.pid
        );

        return {
          id: cartItem.cartId,
          pid: cartItem.pid,
          name: product?.productName,
          size: cartItem.sizeSelected,
          price: product?.price || 0,
          qty: Number(cartItem.quantity),
          image: `https://localhost:7106${product?.productImage}`,
        };
      });

      setItems(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE QTY
  const updateQty = (id, delta) => {
    setItems(
      items.map((i) =>
        i.id === id
          ? {
              ...i,
              qty: Math.max(1, i.qty + delta),
            }
          : i
      )
    );
  };

  // REMOVE ITEM
  const remove = async (id) => {
    try {
      await deleteCartItem(id);

      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // TOTALS
  const subtotal = items.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <>
      <PageHeader
        eyebrow="Your Bag"
        title="Shopping"
        titleAccent="Cart"
      />

      <section className="py-16 lg:py-20">
        <div className="container">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl mb-4">
                Your cart is empty
              </p>

              <Link to="/new-arrivals">
                <Button variant="hero">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">

              {/* CART ITEMS */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-card border border-border rounded-sm p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded-sm"
                    />

                    <div className="flex-1 flex flex-col justify-between">

                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>

                        <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.1em] mt-1">
                          Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">

                        {/* QTY */}
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            onClick={() =>
                              updateQty(item.id, -1)
                            }
                            aria-label="Decrease"
                            className="px-3 py-2 hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="px-4 font-body text-sm font-semibold">
                            {item.qty}
                          </span>

                          <button
                            onClick={() =>
                              updateQty(item.id, 1)
                            }
                            aria-label="Increase"
                            className="px-3 py-2 hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* PRICE + REMOVE */}
                        <div className="flex items-center gap-4">
                          <span className="font-display text-lg font-bold text-foreground">
                            ₹
                            {(
                              item.price * item.qty
                            ).toLocaleString()}
                          </span>

                          <button
                            onClick={() => remove(item.id)}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORDER SUMMARY */}
              <aside className="bg-secondary/40 rounded-sm p-6 h-fit sticky top-28">
                <h3 className="font-display text-xl font-bold mb-5">
                  Order Summary
                </h3>

                <div className="space-y-3 font-body text-sm">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Shipping
                    </span>

                    <span className="font-semibold">
                      {shipping === 0
                        ? "FREE"
                        : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-display text-lg font-bold">
                      Total
                    </span>

                    <span className="font-display text-lg font-bold text-accent">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full mt-6"
                >
                  Proceed to Checkout
                </Button>

                <Link
                  to="/coupons"
                  className="block text-center mt-4 font-body text-xs uppercase tracking-[0.15em] text-accent hover:underline"
                >
                  Have a coupon code?
                </Link>
              </aside>

            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;






// import Layout from "../components/Layout";
// import PageHeader from "../components/PageHeader";
// import { Button } from "../components/ui/button";
// import { Trash2, Plus, Minus } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import product1 from "../assets/product-1.jpg";
// import product2 from "../assets/product-2.jpg";
// import product3 from "../assets/product-3.jpg";

// const initialItems = [
//   { id: 1, name: "Floral Midi Dress", size: "M", price: 2499, qty: 1, image: product1 },
//   { id: 2, name: "Classic Leather Tote", size: "One Size", price: 4299, qty: 1, image: product2 },
//   { id: 3, name: "Satin Silk Blouse", size: "S", price: 1899, qty: 2, image: product3 },
// ];

// const Cart = () => {
//   const [items, setItems] = useState(initialItems);

//   const updateQty = (id, delta) =>
//     setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
//   const remove = (item) => setItems(items.filter((i) => i.id !== item.id));

//   const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
//   const shipping = subtotal > 999 ? 0 : 99;
//   const total = subtotal + shipping;

//   return (
//     // <Layout>
//     <>
    
//       <PageHeader eyebrow="Your Bag" title="Shopping" titleAccent="Cart" />
//       <section className="py-16 lg:py-20">
//         <div className="container">
//           {items.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="font-display text-2xl mb-4">Your cart is empty</p>
//               <Link to="/new-arrivals"><Button variant="hero">Continue Shopping</Button></Link>
//             </div>
//           ) : (
//             <div className="grid lg:grid-cols-3 gap-10">
//               <div className="lg:col-span-2 space-y-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex gap-4 bg-card border border-border rounded-sm p-4">
//                     <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-sm" />
//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
//                         <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.1em] mt-1">
//                           Size: {item.size}
//                         </p>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center border border-border rounded-sm">
//                           <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease" className="px-3 py-2 hover:bg-secondary">
//                             <Minus className="h-3 w-3" />
//                           </button>
//                           <span className="px-4 font-body text-sm font-semibold">{item.qty}</span>
//                           <button onClick={() => updateQty(item.id, 1)} aria-label="Increase" className="px-3 py-2 hover:bg-secondary">
//                             <Plus className="h-3 w-3" />
//                           </button>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="font-display text-lg font-bold text-foreground">
//                             ₹{(item.price * item.qty).toLocaleString()}
//                           </span>
//                           <button onClick={() => remove(item.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <aside className="bg-secondary/40 rounded-sm p-6 h-fit sticky top-28">
//                 <h3 className="font-display text-xl font-bold mb-5">Order Summary</h3>
//                 <div className="space-y-3 font-body text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Shipping</span>
//                     <span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
//                   </div>
//                   <div className="border-t border-border pt-3 flex justify-between">
//                     <span className="font-display text-lg font-bold">Total</span>
//                     <span className="font-display text-lg font-bold text-accent">₹{total.toLocaleString()}</span>
//                   </div>
//                 </div>
//                 <Button variant="hero" className="w-full mt-6">Proceed to Checkout</Button>
//                 <Link to="/coupons" className="block text-center mt-4 font-body text-xs uppercase tracking-[0.15em] text-accent hover:underline">
//                   Have a coupon code?
//                 </Link>
//               </aside>
//             </div>
//           )}
//         </div>
//       </section>
//     {/* </Layout> */}
//     </>
//   );
// };

// export default Cart;
