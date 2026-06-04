import { Link, useLocation } from "react-router-dom";
import CheckoutStepper from "../components/CheckoutStepper";

import jsPDF from "jspdf";
import {
  CheckCircle2,
  Package,
  Download,
} from "lucide-react";

const PaymentSuccess = () => {

  const { state } = useLocation();
  
  console.log("Payment Success State:", state);


  // DYNAMIC DATA
  const total = state?.total || 0;

  const method = state?.method || "CARD";

  // const orderId =
  //   state?.orderId || state?.oid || "N/A";
  const orderId =
  state?.createdOrder?.oid ||
  state?.createdOrder?.orderId ||
  state?.orderId ||
  "N/A";
  console.log(orderId);
  const paymentStatus =
    state?.paymentStatus || "Paid";

  // DOWNLOAD INVOICE
  // const handleDownloadInvoice = () => {

  //   const doc = new jsPDF();

  //   // ===== HEADER =====
  //   doc.setFontSize(24);
  //   doc.setTextColor(40, 40, 40);

  //   doc.text("FASHION HUB", 70, 20);

  //   doc.setFontSize(12);

  //   doc.setTextColor(120, 120, 120);

  //   doc.text(
  //     "Premium Fashion Store Invoice",
  //     60,
  //     28
  //   );

  //   // ===== LINE =====
  //   doc.setDrawColor(200, 200, 200);

  //   doc.line(20, 35, 190, 35);

  //   // ===== INVOICE TITLE =====
  //   doc.setFontSize(20);

  //   doc.setTextColor(0, 0, 0);

  //   doc.text("INVOICE", 20, 50);

  //   // ===== ORDER DETAILS =====
  //   doc.setFontSize(12);

  //   doc.text(
  //     `Order ID: #${orderId}`,
  //     20,
  //     70
  //   );

  //   doc.text(
  //     `Payment Method: ${method}`,
  //     20,
  //     80
  //   );

  //   doc.text(
  //     `Payment Status: ${paymentStatus}`,
  //     20,
  //     90
  //   );

  //   doc.text(
  //     `Date: ${new Date().toLocaleDateString()}`,
  //     20,
  //     100
  //   );

  //   // ===== AMOUNT BOX =====
  //   doc.setFillColor(245, 245, 245);

  //   doc.roundedRect(
  //     20,
  //     115,
  //     170,
  //     35,
  //     3,
  //     3,
  //     "F"
  //   );

  //   doc.setFontSize(14);

  //   doc.text(
  //     "Total Amount Paid",
  //     30,
  //     130
  //   );

  //   doc.setFontSize(24);

  //   doc.setTextColor(0, 0, 0);

  //   doc.text(
  //     `₹${Number(total).toLocaleString()}`,
  //     30,
  //     143
  //   );

  //   // ===== THANK YOU =====
  //   doc.setFontSize(13);

  //   doc.setTextColor(80, 80, 80);

  //   doc.text(
  //     "Thank you for shopping with Fashion Hub!",
  //     40,
  //     180
  //   );

  //   doc.text(
  //     "We hope to see you again soon.",
  //     55,
  //     190
  //   );

  //   // ===== FOOTER =====
  //   doc.setDrawColor(220, 220, 220);

  //   doc.line(20, 250, 190, 250);

  //   doc.setFontSize(10);

  //   doc.setTextColor(120, 120, 120);

  //   doc.text(
  //     "Fashion Hub © 2026",
  //     80,
  //     260
  //   );

  //   // ===== DOWNLOAD =====
  //   doc.save(`Invoice_${orderId}.pdf`);
  // };

const handleDownloadInvoice = () => {
  const doc = new jsPDF();

  // ===== HEADER =====
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("FASHION HUB", 70, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Fashion Store", 77, 28);

  // ===== INVOICE TITLE =====
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 20, 55);

  // ===== ORDER INFO BOX =====
  doc.setDrawColor(220);
  doc.roundedRect(20, 65, 170, 50, 3, 3);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Order ID`, 25, 80);
  doc.text(`: ${orderId}`, 70, 80);

  doc.text(`Date`, 25, 92);
  doc.text(`: ${new Date().toLocaleDateString()}`, 70, 92);

  doc.text(`Payment Method`, 25, 104);
  doc.text(`: ${method.toUpperCase()}`, 70, 104);

  // ===== PAYMENT STATUS =====
  doc.setFillColor(230, 255, 230);
  doc.roundedRect(20, 125, 170, 18, 3, 3, "F");

  doc.setTextColor(0, 120, 0);
  doc.setFont("helvetica", "bold");
  doc.text(
    `PAYMENT STATUS : ${paymentStatus.toUpperCase()}`,
    25,
    137
  );

  // ===== AMOUNT BOX =====
  doc.setTextColor(0, 0, 0);

  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, 155, 170, 35, 3, 3, "F");

  doc.setFontSize(14);
  doc.text("Total Amount Paid", 25, 170);

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(
    `₹ ${Number(total).toLocaleString()}`,
    25,
    184
  );

  // ===== THANK YOU =====
  doc.setFontSize(16);
  doc.text("Thank You For Your Purchase!", 45, 220);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Your order has been successfully placed and processed.",
    35,
    232
  );

  doc.text(
    "We appreciate your trust in Fashion Hub.",
    52,
    242
  );

  // ===== FOOTER =====
  doc.setDrawColor(220);
  doc.line(20, 270, 190, 270);

  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    "Fashion Hub © 2026 | www.fashionhub.com",
    60,
    280
  );

  doc.save(`Invoice_${orderId}.pdf`);
};


  return (
    <>

      <section className="py-20">

        <div className="container max-w-2xl">

          <CheckoutStepper currentStep={3} />
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

              {/* TRACK ORDER */}
              <Link to="/dashboard/orders">

                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-black/90 transition-all">

                  <Package className="h-4 w-4 mr-2" />

                  Track Order

                </button>

              </Link>

              {/* DOWNLOAD INVOICE */}
              <button
                onClick={handleDownloadInvoice}
                className="border px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50 transition-all"
              >

                <Download className="h-4 w-4 mr-2" />

                Download Invoice

              </button>

              {/* CONTINUE SHOPPING */}
              <Link to="/">

                <button className="px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">

                  Continue Shopping

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </>
  );
};

export default PaymentSuccess;