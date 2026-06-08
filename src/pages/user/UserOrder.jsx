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
import {
    FaRegSadTear,
    FaFrown,
    FaMeh,
    FaSmile,
    FaGrinStars
} from "react-icons/fa";

const statusColor = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-accent/15 text-accent",
    Cancelled: "bg-red-100 text-red-700",
};

// const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
const tabs = ["All", "Pending", "Processing", "Delivered"];
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState("All");
    const [q, setQ] = useState("");
    //   const [open, setOpen] = useState<typeof orders[0] | null>(null);
    const [open, setOpen] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
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
                orderItemId: selectedProduct.orderItemId,
                rating: rating,
                feedback: feedback,
                colorSelected: selectedProduct.colorSelected,
                sizeSelected: selectedProduct.sizeSelected
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
                                                className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm ${statusColor[o.orderStatus] ||
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
                                                // src={`https://localhost:7106${item.productImage}`}
                                                src={`https://localhost:7106${item.selectedImage || item.productImage}`}

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
                                                    {open.orderStatus === "Delivered" && open.paymentStatus === "Paid" && (

                                                        <div className="flex items-center justify-between mt-5 border-t pt-4">

                                                            <div className="flex items-center gap-2">
                                                                {/* <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
                                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                                                    </div> */}

                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-800">
                                                                        Share your experience
                                                                    </p>

                                                                    <p className="text-xs text-gray-500">
                                                                        Rate this product & help others
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <button
                                                                onClick={() => {
                                                                    setSelectedProduct(item);
                                                                    setReviewModal(true);

                                                                    // RESET VALUES
                                                                    setRating(0);
                                                                    setFeedback("");
                                                                }}
                                                                className="px-5 py-2.5 rounded-full border border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
                                                            >
                                                                Write Review
                                                            </button>

                                                        </div>


                                                    )}

                                                </div>

                                            </div>

                                        </div>
                                    ))}


                                    {reviewModal && selectedProduct && (
                                        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

                                            {/* <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in-up"> */}
                                            <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
                                                {/* TOP PRODUCT SECTION */}
                                                {/* <div className="flex items-center gap-4 p-5 border-b bg-gray-50"> */}
                                                <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
                                                    <img
                                                        src={`https://localhost:7106${selectedProduct.selectedImage || selectedProduct.productImage}`}
                                                        alt={selectedProduct.productName}
                                                        // className="w-20 h-20 rounded-xl object-cover border"
                                                        className="w-16 h-16 rounded-xl object-cover border"
                                                    />

                                                    <div className="flex-1">
                                                        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                                                            {selectedProduct.productName}
                                                        </h2>

                                                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                                            <span>
                                                                Size: {selectedProduct.sizeSelected}
                                                            </span>

                                                            <span>•</span>

                                                            <span>
                                                                Color: {selectedProduct.colorSelected}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setReviewModal(false);
                                                            setSelectedProduct(null);
                                                        }}
                                                        className="text-3xl text-gray-400 hover:text-black transition"
                                                    >
                                                        ×
                                                    </button>

                                                </div>

                                                {/* BODY */}
                                                <div className="p-5">

                                                    {/* TITLE */}
                                                    <div className="text-center mb-5">

                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            How was your experience?
                                                        </h3>

                                                        <p className="text-gray-500 text-sm mt-2">
                                                            Your feedback helps other customers shop better.
                                                        </p>

                                                    </div>

                                                    {/* STAR RATING */}
                                                    <div className="flex flex-col items-center mb-5">

                                                        <div className="flex gap-2">

                                                            {[1, 2, 3, 4, 5].map((star) => (

                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onClick={() => setRating(star)}
                                                                    className="transition-all duration-200 hover:scale-125"
                                                                >
                                                                    <Star
                                                                        className={`w-8 h-8 ${star <= rating
                                                                                ? "fill-yellow-400 text-yellow-400"
                                                                                : "text-gray-300"
                                                                            }`}
                                                                    />
                                                                </button>

                                                            ))}

                                                        </div>

                                                        <p className="mt-4 text-sm font-medium text-gray-600 flex items-center gap-2">

                                                            {rating === 0 && (
                                                                <>
                                                                    <Star className="w-4 h-4 text-gray-400" />
                                                                    Tap to rate
                                                                </>
                                                            )}

                                                            {rating === 1 && (
                                                                <>
                                                                    <FaRegSadTear className="text-red-500 text-lg" />
                                                                    Terrible
                                                                </>
                                                            )}

                                                            {rating === 2 && (
                                                                <>
                                                                    <FaFrown className="text-orange-500 text-lg" />
                                                                    Poor
                                                                </>
                                                            )}

                                                            {rating === 3 && (
                                                                <>
                                                                    <FaMeh className="text-yellow-500 text-lg" />
                                                                    Average
                                                                </>
                                                            )}

                                                            {rating === 4 && (
                                                                <>
                                                                    <FaSmile className="text-lime-500 text-lg" />
                                                                    Good
                                                                </>
                                                            )}

                                                            {rating === 5 && (
                                                                <>
                                                                    <FaGrinStars className="text-green-500 text-lg" />
                                                                    Excellent
                                                                </>
                                                            )}

                                                        </p>

                                                    </div>

                                                    {/* FEEDBACK */}
                                                    <div className="mb-4">

                                                        <label className="block text-sm font-semibold mb-3 text-gray-700">
                                                            Write your review
                                                        </label>

                                                        <textarea
                                                            rows="3"
                                                            value={feedback}
                                                            onChange={(e) => setFeedback(e.target.value)}
                                                            placeholder="Tell others what you liked or disliked about this product..."
                                                            className="w-full border border-gray-300 rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                                        />

                                                    </div>

                                                    {/* SUBMIT BUTTON */}
                                                    <button
                                                        onClick={handleSubmitReview}
                                                        disabled={rating === 0}
                                                        className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${rating === 0
                                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                : "bg-black text-white hover:bg-gray-800"
                                                            }`}
                                                    >
                                                        Submit Review
                                                    </button>

                                                </div>

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
