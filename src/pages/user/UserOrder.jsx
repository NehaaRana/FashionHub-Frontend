// import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import Modal from "../../components/admin/Modal";
import { userNav } from "./userNav";
import { Eye, Download, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserOrders, getCurrentUser } from "../../services/api";
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


    return (
        <DashboardLayout role="User" userName="Priya Iyer" items={userNav}>
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
                                    <tr key={o.oid}>

                                        <td>#{o.oid}</td>

                                        <td>
                                            {new Date(o.orderDate).toLocaleDateString()}
                                        </td>

                                        <td>{o.items}</td> {/* You don’t have items count yet */}

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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal open={!!open} onClose={() => setOpen(null)} title={`Order #${open?.oid}`}>
                {open && (
                    <>
                        <Info label="Date" value={new Date(open.orderDate).toLocaleDateString()} />
                        <Info label="Status" value={open.orderStatus} />
                        <Info label="Total" value={`₹${open.amount}`} />
                        <Info label="Payment" value={open.paymentStatus || "N/A"} />
                    </>
                )}
            </Modal>    </DashboardLayout>
    );
};

const Info = ({ label, value }) => (
    <div>
        <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</p>
        <p className="font-body text-sm font-semibold text-foreground">{value}</p>
    </div>
);

export default UserOrders;
