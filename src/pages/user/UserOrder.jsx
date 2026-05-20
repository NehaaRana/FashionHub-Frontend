// import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import Modal from "../../components/admin/Modal";
import { userNav } from "./userNav";
import { Eye, Download, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserOrders, getCurrentUser } from "../../services/api";
import Swal from "sweetalert2";
import { addReview } from "../../services/api";
import { Star } from "lucide-react";
// const orders = [
//   { id: "#FH-10241", date: "Apr 28, 2026", items: 2, total: "₹4,890", status: "Delivered", payment: "UPI" },
//   { id: "#FH-10198", date: "Apr 19, 2026", items: 1, total: "₹1,750", status: "Shipped", payment: "Card" },
//   { id: "#FH-10162", date: "Apr 11, 2026", items: 3, total: "₹6,420", status: "Processing", payment: "COD" },
//   { id: "#FH-10101", date: "Mar 28, 2026", items: 1, total: "₹1,299", status: "Cancelled", payment: "UPI" },
//   { id: "#FH-10089", date: "Mar 14, 2026", items: 4, total: "₹8,990", status: "Delivered", payment: "Card" },
// ];

const statusColor = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-accent/15 text-accent",
    Cancelled: "bg-red-100 text-red-700",
};

// const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("All");
    const [q, setQ] = useState("");
    //   const [open, setOpen] = useState<typeof orders[0] | null>(null);
    const [open, setOpen] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);  
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");


    useEffect(() => {
        const loadOrders = async () => {
            try {
                const userRes = await getCurrentUser();
                const currentUser = userRes.data;
                setUser(currentUser);

                const ordersRes = await getUserOrders(currentUser.uid);

                setOrders(ordersRes.data);

            } catch (err) {
                console.log(err);
            }
        };

        loadOrders();
    }, []);
    //   const filtered = orders.filter(
    //     (o) => (tab === "All" || o.status === tab) && o.id.toLowerCase().includes(q.toLowerCase()),
    //   );

    // const filtered = Array.isArray(orders)
    //     ? orders.filter(
    //         (o) =>
    //             (tab === "All" || o.status === tab) &&
    //             (o.id || "").toLowerCase().includes(q.toLowerCase())
    //     )
    //     : [];


    const filtered = Array.isArray(orders)
        ? orders.filter(
            (o) =>
                (tab === "All" || o.orderStatus === tab) &&
                String(o.oid).toLowerCase().includes(q.toLowerCase())
        )
        : [];



    const handleSubmitReview = async () => {

        try {

            const payload = {
                pid: selectedProduct.pid,
                uid: user.uid,
                oid: open.oid,
                rating: rating,
                feedback: feedback
            };

            const res = await addReview(payload);

            Swal.fire({
                icon: "success",
                title: "Review Added",
                text: "Thank you for your feedback!"
            });

            setReviewModal(false);

            setFeedback("");

            setRating(5);

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    err.response?.data?.message ||
                    "Failed to add review"
            });
        }
    };

    return (
        // <DashboardLayout role="User" userName="Priya Iyer" items={userNav}>
           <DashboardLayout
                    role={user?.role || "User"}
                    userName={user?.username || user?.name || "User"}
                    items={userNav}
                >
                    
            <div className="p-6 lg:p-12">
                <DashHeader
                    eyebrow="Order History"
                    title="My"
                    titleAccent="Orders"
                    description="Track shipments, download invoices and re-order your favourites."
                />

                <div className="bg-card border border-border rounded-sm overflow-hidden animate-fade-in-up">
                    <div className="p-5 border-b border-border flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`font-body text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-sm border transition-colors ${tab === t
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground border-border hover:border-accent hover:text-foreground"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="relative lg:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search order ID..."
                                className="w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-secondary/40">
                                <tr>
                                    {["Order", "Date", "Items", "Total", "Payment", "Status", ""].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-6 py-3"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {/* <tbody>
                                {filtered.map((o) => (
                                    <tr key={o.oid}>

                                        <td>#{o.oid}</td>

                                        <td>
                                           
                                             {new Date(o.orderDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td>{o.items}</td> 

                                        <td>₹{o.amount}</td>

                                        <td>{o.paymentStatus || "N/A"}</td>

                                        <td>
                                            <span className={statusColor[o.orderStatus]}>
                                                {o.orderStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <button onClick={() => setOpen(o)}>
                                                <Eye />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody> */}

                            <tbody>
                                {filtered.map((o) => (
                                    <tr
                                        key={o.oid}
                                        className="border-t border-border hover:bg-secondary/30 transition-colors"
                                    >

                                        <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                                            #{o.oid}
                                        </td>

                                        <td className="px-6 py-4 font-body text-xs text-muted-foreground">
                                            {new Date(o.orderDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 font-body text-sm text-foreground">
                                            {o.items}
                                        </td>

                                        <td className="px-6 py-4 font-body text-sm font-semibold text-foreground">
                                            ₹{o.amount}
                                        </td>

                                        <td className="px-6 py-4 font-body text-sm text-foreground">
                                            {o.paymentStatus || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${
                                                    statusColor[o.orderStatus] ||
                                                    "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {o.orderStatus}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setOpen(o)}
                                                className="p-2 rounded-lg hover:bg-secondary transition"
                                            >
                                                <Eye className="w-5 h-5 text-foreground" />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <Modal open={!!open} onClose={() => setOpen(null)} title={`Order #${open?.oid}`}>
                {open && (
                    <>
                        <Info label="Date" value={new Date(open.orderDate).toLocaleDateString()} />
                        <Info label="Status" value={open.orderStatus} />
                        <Info label="Total" value={`₹${open.amount}`} />
                        <Info label="Payment" value={open.paymentStatus || "N/A"} />
                    </>
                )}
            </Modal>    */}
            {/* <Modal
    open={!!open}
    onClose={() => setOpen(null)}
    title={`Order #${open?.oid}`}
>
    {open && (
        <>
            <Info
                label="Date"
                value={new Date(open.orderDate).toLocaleDateString()}
            />

            <Info
                label="Status"
                value={open.orderStatus}
            />

            <Info
                label="Total"
                value={`₹${open.amount}`}
            />

            <Info
                label="Payment"
                value={open.paymentStatus || "N/A"}
            />

            <div className="mt-4">
                <h3 className="font-semibold mb-3">
                    Ordered Products
                </h3>

                {open.products?.map((item, index) => (
                    <div
                        key={index}
                        className="border rounded p-3 mb-3"
                    >
                        <img
                            src={`https://localhost:7106${item.productImage}`}                            
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded mb-2"
                        />

                        <p>{item.productName}</p>

                        <p>Qty: {item.quantity}</p>

                        <p>Size: {item.sizeSelected}</p>

                        <p>Color: {item.colorSelected}</p>

                        <p>Price: ₹{item.price}</p>
                    </div>
                ))}
            </div>
        </>
    )}
</Modal> */}

                {open && (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Order #{open.oid}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(open.orderDate).toLocaleDateString()}
                    </p>
                </div>

                <button
                    onClick={() => setOpen(null)}
                    className="text-3xl text-gray-500 hover:text-black"
                >
                    ×
                </button>
            </div>

            {/* BODY */}
            <div className="p-6">

                {/* ORDER INFO */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    <div className="bg-gray-50 rounded-xl p-4 border">
                        <p className="text-xs uppercase text-gray-500 mb-1">
                            Status
                        </p>

                        <p className="font-bold text-lg">
                            {open.orderStatus}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border">
                        <p className="text-xs uppercase text-gray-500 mb-1">
                            Payment
                        </p>

                        <p className="font-bold text-lg">
                            {open.paymentStatus}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border">
                        <p className="text-xs uppercase text-gray-500 mb-1">
                            Total
                        </p>

                        <p className="font-bold text-lg text-green-600">
                            ₹{open.amount}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border">
                        <p className="text-xs uppercase text-gray-500 mb-1">
                            Items
                        </p>

                        <p className="font-bold text-lg">
                            {open.items}
                        </p>
                    </div>

                </div> */}

                {/* PRODUCTS */}
                <div>
                    <h3 className="text-xl font-bold mb-5">
                        Ordered Products
                    </h3>

                    <div className="space-y-4">

                        {open.products?.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-2xl p-4 flex flex-col md:flex-row gap-5 bg-gray-50"
                            >

                                {/* IMAGE */}
                                <img
                                    src={`https://localhost:7106${item.productImage}`}
                                    alt={item.productName}
                                    className="w-32 h-32 object-cover rounded-xl border"
                                />

                                {/* DETAILS */}
                                <div className="flex-1">

                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                        {item.productName}
                                    </h4>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Quantity
                                            </p>

                                            <p className="font-semibold">
                                                {item.quantity}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Size
                                            </p>

                                            <p className="font-semibold">
                                                {item.sizeSelected}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Color
                                            </p>

                                            <p className="font-semibold">
                                                {item.colorSelected}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Price
                                            </p>

                                            <p className="font-semibold text-green-600">
                                                ₹{item.price}
                                            </p>
                                        </div>

                                        {/* {open.orderStatus === "Delivered" && */}
                                        {open.paymentStatus === "Paid" && (

                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(item);
                                                    setReviewModal(true);
                                                }}
                                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                                            >
                                                Write Review
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>
                        ))}



                        {/* {reviewModal && (

                            <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">

                                <div className="bg-white rounded-2xl w-full max-w-lg p-6">

                                    <div className="flex items-center justify-between mb-5">

                                        <h2 className="text-2xl font-bold">
                                            Write Review
                                        </h2>

                                        <button
                                            onClick={() => setReviewModal(false)}
                                            className="text-2xl"
                                        >
                                            ×
                                        </button>

                                    </div>

                                    <div className="space-y-5">

                                        <div>

                                            <p className="font-medium mb-2">
                                                Rating
                                            </p>

                                            <select
                                                value={rating}
                                                onChange={(e) =>
                                                    setRating(Number(e.target.value))
                                                }
                                                className="w-full border rounded-lg p-3"
                                            >
                                                <option value={5}>5 Star</option>
                                                <option value={4}>4 Star</option>
                                                <option value={3}>3 Star</option>
                                                <option value={2}>2 Star</option>
                                                <option value={1}>1 Star</option>
                                            </select>

                                        </div>

                                        <div>

                                            <p className="font-medium mb-2">
                                                Feedback
                                            </p>

                                            <textarea
                                                rows="5"
                                                value={feedback}
                                                onChange={(e) =>
                                                    setFeedback(e.target.value)
                                                }
                                                placeholder="Write your experience..."
                                                className="w-full border rounded-lg p-3 resize-none"
                                            />

                                        </div>

                                        <button
                                            onClick={handleSubmitReview}
                                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                                        >
                                            Submit Review
                                        </button>

                                    </div>

                                </div>

                            </div>
                        )} */}


                        {reviewModal && selectedProduct && (
  <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white rounded-2xl w-full max-w-lg p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">
          Review: {selectedProduct.productName}
        </h2>

        <button
          onClick={() => {
            setReviewModal(false);
            setSelectedProduct(null);
          }}
          className="text-2xl"
        >
          ×
        </button>
      </div>

      {/* STAR RATING */}
      <div className="mb-5">
        <p className="font-medium mb-3">Rating</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {rating === 5 && "Excellent"}
          {rating === 4 && "Good"}
          {rating === 3 && "Average"}
          {rating === 2 && "Poor"}
          {rating === 1 && "Terrible"}
        </p>
      </div>

      {/* FEEDBACK */}
      <div className="mb-5">
        <p className="font-medium mb-2">Feedback</p>

        <textarea
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your experience..."
          className="w-full border rounded-lg p-3 resize-none"
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmitReview}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Submit Review
      </button>

    </div>
  </div>
)}
                    </div>
                </div>

            </div>

        </div>

    </div>
)}


             </DashboardLayout>
    );
};

const Info = ({ label, value }) => (
    <div>
        <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</p>
        <p className="font-body text-sm font-semibold text-foreground">{value}</p>
    </div>
);

export default UserOrders;
