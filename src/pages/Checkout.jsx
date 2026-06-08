import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckoutStepper from "../components/CheckoutStepper";

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
    total,
    appliedCoupon
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
    

        // Clear user's cart
        // await clearCart(user.uid);

        // Update navbar count
        window.dispatchEvent(new Event("cartUpdated"));

      // alert("Order Placed Successfully");
      Swal.fire({
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
          appliedCoupon,
          user,
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

      <CheckoutStepper currentStep={1} />
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
      {/* <div className="mb-6">
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
      </div> */}

      {/* SUMMARY */}
      <div className="border rounded p-5 space-y-3">

        {/* <p>
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
        </h2> */}
        <p>
  Subtotal: ₹{Number(subtotal).toFixed(2)}
</p>

<p>
  Shipping: ₹{Number(shipping).toFixed(2)}
</p>

<p>
  Discount: ₹{Number(discount).toFixed(2)}
</p>

<h2 className="text-2xl font-bold">
  Total: ₹{Number(total).toFixed(2)}
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
