import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, placeOrder } from "../services/api";

import {
    CreditCard,
    Smartphone,
    Wallet,
    Banknote,
    Lock,
    ShieldCheck,
    Loader2,
} from "lucide-react";

const methods = [
    {
        id: "card",
        label: "Credit / Debit Card",
        desc: "Visa, Mastercard, Rupay, Amex",
        icon: CreditCard,
    },
    {
        id: "upi",
        label: "UPI",
        desc: "Pay using any UPI app",
        icon: Smartphone,
    },
    {
        id: "wallet",
        label: "Wallets",
        desc: "Paytm, PhonePe, Amazon Pay",
        icon: Wallet,
    },
    {
        id: "cod",
        label: "Cash on Delivery",
        desc: "Pay when your order arrives",
        icon: Banknote,
    },
];

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        createdOrder,
        //   total,
        paymentMethod
    } = location.state || {};

    const total = location.state?.total || 0;

    const [method, setMethod] = useState("card");
    const [processing, setProcessing] = useState(false);


    //   const handlePay = async () => {

    //   try {

    //     setProcessing(true);

    //     // 1. PLACE ORDER
    //     const orderRes = await placeOrder(orderData);

    //     console.log(orderRes.data);

    //     // GET CREATED ORDER ID
    //     const createdOrder = orderRes.data;

    //     // 2. CREATE PAYMENT
    //     const paymentData = {

    //       oid: createdOrder.oid,

    //       method: method.toUpperCase(),

    //       amount: Number(total),

    //       payDate: new Date().toISOString(),

    //       payStatus:
    //         method === "cod"
    //           ? "Pending"
    //           : "Paid"
    //     };

    //     console.log(paymentData);

    //     await createPayment(paymentData);

    //     alert("Payment Successful");

    //     navigate("/dashboard/orders");

    //   } catch (error) {

    //     console.log(error);

    //     alert("Payment Failed");

    //   } finally {

    //     setProcessing(false);
    //   }
    // };


    const handlePay = async () => {

        try {

            setProcessing(true);

            // PAYMENT DATA
            const paymentData = {

                // order id from created order
                // oid: orderData?.oid,
                oid: createdOrder?.orderId,

                method: method.toUpperCase(),

                amount: Number(total),

                payDate: new Date().toISOString(),

                payStatus:
                    method === "cod"
                        ? "Pending"
                        : "Paid"
            };

            console.log(paymentData);

            // SAVE PAYMENT
            await createPayment(paymentData);

            alert("Payment Successful");

            // navigate("/dashboard/orders");
            navigate("/payment-success", {
                state: {
                    total,
                    method,
                    orderId: createdOrder?.oid,
                    paymentStatus:
                        method === "cod"
                            ? "Pending"
                            : "Paid",
                },
            });

        } catch (error) {

            console.log(error);

            alert("Payment Failed");

        } finally {

            setProcessing(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#fafafa] py-12 px-4">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-12">

                <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-2">
                    Step 2 of 2
                </p>

                <h1 className="text-5xl font-bold">
                    Choose{" "}
                    <span className="text-pink-600">
                        Payment
                    </span>
                </h1>
            </div>

            <div className="max-w-7xl mx-auto">

                {/* STEPPER */}
                <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">

                    {["Address", "Payment", "Confirmation"].map(
                        (step, index) => (
                            <div
                                key={step}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold
                  ${index <= 1
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-500 border-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`text-sm ${index <= 1
                                        ? "text-black"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {step}
                                </span>

                                {index < 2 && (
                                    <div className="w-14 h-[1px] bg-gray-300 ml-2" />
                                )}
                            </div>
                        )
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* PAYMENT METHODS */}
                        <div>

                            <h2 className="text-2xl font-bold mb-5">
                                Payment Method
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">

                                {methods.map((m) => {
                                    const Icon = m.icon;

                                    const active = method === m.id;

                                    return (
                                        <label
                                            key={m.id}
                                            className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all
                      ${active
                                                    ? "border-black bg-black/5"
                                                    : "border-gray-200 hover:border-black/40"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={m.id}
                                                checked={method === m.id}
                                                onChange={() =>
                                                    setMethod(m.id)
                                                }
                                                className="mt-1"
                                            />

                                            <div
                                                className={`w-11 h-11 rounded-lg flex items-center justify-center
                        ${active
                                                        ? "bg-black text-white"
                                                        : "bg-gray-100"
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            <div>
                                                <p className="font-semibold">
                                                    {m.label}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {m.desc}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* PAYMENT FORM */}
                        <div className="bg-white border rounded-xl p-6">

                            {/* CARD */}
                            {method === "card" && (
                                <div className="space-y-4">

                                    <div className="flex items-center gap-2 mb-2">
                                        <Lock className="w-4 h-4 text-pink-600" />

                                        <h3 className="text-lg font-bold">
                                            Card Details
                                        </h3>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Card Number
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Cardholder Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Name on card"
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">

                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium">
                                                Expiry
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                CVV
                                            </label>

                                            <input
                                                type="password"
                                                placeholder="•••"
                                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* UPI */}
                            {method === "upi" && (
                                <div className="space-y-4">

                                    <h3 className="text-lg font-bold">
                                        UPI Payment
                                    </h3>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            UPI ID
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="yourname@okhdfc"
                                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        A payment request will be sent
                                        to your UPI app.
                                    </p>
                                </div>
                            )}

                            {/* WALLET */}
                            {method === "wallet" && (
                                <div className="space-y-4">

                                    <h3 className="text-lg font-bold">
                                        Select Wallet
                                    </h3>

                                    <div className="grid grid-cols-3 gap-4">

                                        {[
                                            "Paytm",
                                            "PhonePe",
                                            "Amazon Pay",
                                        ].map((wallet) => (
                                            <button
                                                key={wallet}
                                                className="border rounded-lg p-4 hover:border-black transition-all"
                                            >
                                                {wallet}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* COD */}
                            {method === "cod" && (
                                <div className="space-y-2">

                                    <h3 className="text-lg font-bold">
                                        Cash on Delivery
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Pay ₹
                                        {total.toLocaleString()} in
                                        cash when your order is
                                        delivered.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* SECURITY TEXT */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <ShieldCheck className="w-4 h-4 text-green-600" />

                            <p>
                                Your payment information is
                                encrypted and secure.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="bg-white border rounded-xl p-6 sticky top-20 space-y-5">

                            <h3 className="text-2xl font-bold">
                                Pay Now
                            </h3>

                            <div className="flex justify-between items-center">

                                <span className="text-gray-500">
                                    Total Payable
                                </span>

                                <span className="text-3xl font-bold">
                                    ₹{total.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={processing}
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/90 transition-all disabled:opacity-60 flex items-center justify-center"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ₹${total.toLocaleString()}`
                                )}
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                disabled={processing}
                                className="w-full border py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;