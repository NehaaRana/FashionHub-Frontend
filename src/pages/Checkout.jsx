import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "../components/ui/button";
import Swal from "sweetalert2";
import {
  placeOrder,
  getCurrentUser
} from "../services/api";

const Checkout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    shipping,
    discount,
    total
  } = location.state || {};

  // form states
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [user, setUser] = useState(null);


  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  // PLACE ORDER
  // const handlePlaceOrder = async () => {

  //   try {

  //     if (!address) {
  //       alert("Please enter address");
  //       return;
  //     }

  //     // create order for every cart item
  //     // for (const item of items) {

  //     //   const orderData = {
  //     //     cartId: item.id,
  //     //     amount: total,
  //     //     orderDate: new Date(),
  //     //     orderStatus: "Pending",
  //     //     paymentStatus:
  //     //       paymentMethod === "COD"
  //     //         ? "Pending"
  //     //         : "Paid",
  //     //     deliveryAddress: address,
  //     //     estimatedDelivery: "3-5 Days"
  //     //   };

  //     //   // save order
  //     //   await placeOrder(orderData);

  //     //   // remove cart item
  //     //   await deleteCartItem(item.id);
  //     // }

  //   //  for (const item of items) {  
  //   //      console.log(item);
  //   //     const orderData = {
  //   //       oid: 0,
  //   //       // cartId: Number(item.id),
  //   //       cartId: Number(item.cartId),
  //   //       orderDate: new Date().toISOString(),

  //   //       amount: Number(total),

  //   //       orderStatus: "Pending",

  //   //       paymentStatus:
  //   //         paymentMethod === "COD"
  //   //           ? "Pending"
  //   //           : "Paid",

  //   //       deliveryAddress: address,

  //   //       estimatedDelivery: new Date(
  //   //         Date.now() + 5 * 24 * 60 * 60 * 1000
  //   //       ).toISOString()
  //   //     };

  //   //     console.log(orderData);

  //   //     await placeOrder(orderData);

  //   //     // await deleteCartItem(item.id);
  //   //     await deleteCartItem(item.id);
  //   //   }

  //   for (const item of items) {

  //       console.log(item);

  //       const orderData = {
  //         oid: 0,

  //         cartId: Number(item.id),
  //         //  uid: currentUser.uid,
  //         uid: user?.uid,
  //         orderDate: new Date().toISOString(),

  //         amount: Number(total),

  //         orderStatus: "Pending",

  //         paymentStatus:
  //           paymentMethod === "COD"
  //             ? "Pending"
  //             : "Paid",

  //         deliveryAddress: address,

  //         estimatedDelivery: new Date(
  //           Date.now() + 5 * 24 * 60 * 60 * 1000
  //         ).toISOString()
  //       };

  //       console.log(orderData);

  //       await placeOrder(orderData);

  //       // REMOVE THIS
  //       await deleteCartItem(item.id);
  //     }
  //     alert("Order Placed Successfully");

  //     navigate("/dashboard/orders");

  //   } catch (error) {
  //     console.log(error);
  //     alert("Failed to place order");
  //   }
  // };


  const handlePlaceOrder = async () => {

    try {

      if (!address) {
        // alert("Please enter address");
       
        Swal.fire({
          icon: "error",
          title: "Address Required",
          text: "Please enter your delivery address",
          confirmButtonColor: "#000",
        });
        return;
      }

      const orderData = {

        uid: user?.uid,

        amount: Number(total),

        orderStatus: "Pending",

        paymentStatus:
          paymentMethod === "COD"
            ? "Pending"
            : "Paid",

        deliveryAddress: address,

        estimatedDelivery: "3-5 Days"
      };

      console.log(orderData);

      // ONLY ONE API CALL
      const orderRes = await placeOrder(orderData);

      // alert("Order Placed Successfully");
      await Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Order placed successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      
      
      console.log(orderRes.data);

      // created order from backend
      const createdOrder = orderRes.data;
      // navigate("/dashboard/orders");
      navigate("/payment", {
        state: {
          createdOrder,
          items,
          subtotal,
          shipping,
          discount,
          total,
          paymentMethod,
        },
      });

    } catch (error) {

      console.log(error);
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: "Failed to place order",
          confirmButtonColor: "#c08a5b",
        });
      // alert("Failed to place order");
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Checkout Page
      </h1>

      {/* ADDRESS */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Delivery Address
        </label>

        <textarea
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          placeholder="Enter full address"
          className="w-full border p-3 rounded"
          rows={4}
        />
      </div>

      {/* PAYMENT */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full border p-3 rounded"
        >
          <option value="COD">
            Cash on Delivery
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Card">
            Card
          </option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="border rounded p-5 space-y-3">

        <p>
          Subtotal: ₹{subtotal}
        </p>

        <p>
          Shipping: ₹{shipping}
        </p>

        <p>
          Discount: ₹{discount}
        </p>

        <h2 className="text-2xl font-bold">
          Total: ₹{total}
        </h2>

      </div>

      {/* PLACE ORDER BUTTON */}
      <Button
        className="w-full mt-6"
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>

    </div>
  );
};

export default Checkout;

// import { useLocation } from "react-router-dom";

// const Checkout = () => {

//   const location = useLocation();

//   const {
//     items,
//     subtotal,
//     shipping,
//     discount,
//     total
//   } = location.state || {};

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-5">
//         Checkout Page
//       </h1>

//       <div>
//         <p>Subtotal: ₹{subtotal}</p>
//         <p>Shipping: ₹{shipping}</p>
//         <p>Discount: ₹{discount}</p>

//         <h2 className="text-2xl font-bold mt-4">
//           Total: ₹{total}
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default Checkout;