import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

import {
  CheckCircle2,
  Package,
  Download,
} from "lucide-react";

const PaymentSuccess = () => {

  const { state } = useLocation();

  // DYNAMIC DATA
  const total = state?.total || 0;

  const method = state?.method || "CARD";

  // backend order id
  const orderId =
    state?.orderId || state?.oid || "N/A";

  const paymentStatus =
    state?.paymentStatus || "Paid";

  return (
    <>
    
    {/* <Layout> */}
      <section className="py-20">

        <div className="container max-w-2xl">

          <div className="border rounded-2xl p-10 text-center bg-card">

            {/* SUCCESS ICON */}
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">

              <CheckCircle2 className="h-12 w-12 text-primary" />

            </div>

            {/* TITLE */}
            <h1 className="font-display text-4xl mb-2">
              Payment Successful
            </h1>

            <p className="text-muted-foreground mb-8">
              Thank you for your order.
              Your payment has been completed successfully.
            </p>

            {/* ORDER DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">

              {/* ORDER ID */}
              <div className="border rounded-lg p-4">

                <p className="text-xs text-muted-foreground">
                  Order ID
                </p>

                <p className="font-display font-semibold">
                  #{orderId}
                </p>

              </div>

              {/* AMOUNT */}
              <div className="border rounded-lg p-4">

                <p className="text-xs text-muted-foreground">
                  Amount
                </p>

                <p className="font-display font-semibold">
                  ₹{Number(total).toLocaleString()}
                </p>

              </div>

              {/* METHOD */}
              <div className="border rounded-lg p-4">

                <p className="text-xs text-muted-foreground">
                  Method
                </p>

                <p className="font-display font-semibold uppercase">
                  {method}
                </p>

              </div>

            </div>

            {/* PAYMENT STATUS */}
            <div className="mb-8">

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                {paymentStatus}
              </span>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <Link to="/dashboard/orders">

                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-black/90 transition-all">

                  <Package className="h-4 w-4 mr-2" />

                  Track Order

                </button>

              </Link>

              <button className="border px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50 transition-all">

                <Download className="h-4 w-4 mr-2" />

                Download Invoice

              </button>

              <Link to="/">

                <button className="px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">

                  Continue Shopping

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>
    {/* </Layout> */}
    </>
  );
};

export default PaymentSuccess;