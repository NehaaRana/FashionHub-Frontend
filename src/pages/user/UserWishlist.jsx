import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashHeader from "../../components/dashboard/DashHeader";
import { userNav } from "./userNav";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { getUserWishlist, getCurrentUser, deleteWishlist } from "../../services/api";

const UserWishlist = () => {
    //   const [items, setItems] = useState(initial);
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const userRes = await getCurrentUser();
                const currentUser = userRes.data;
                setUser(currentUser);

                const res = await getUserWishlist(currentUser.uid);
                setItems(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        loadWishlist();
    }, []);
    //   const remove = (id) => setItems((s) => s.filter((i) => i.id !== id));

    const remove = async (id) => {
        try {
            await deleteWishlist(id);
            setItems((prev) => prev.filter((i) => i.wid !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <DashboardLayout role="User" userName="Priya Iyer" items={userNav}>
            <div className="p-6 lg:p-12">
                <DashHeader
                    eyebrow="Saved Pieces"
                    title="My"
                    titleAccent="Wishlist"
                    description="Your hand-picked favourites — move them to cart when you're ready."
                />

                {items.length === 0 ? (
                    <div className="bg-card border border-border rounded-sm p-16 text-center">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-display text-2xl font-semibold mb-2">Your wishlist is empty</h3>
                        <p className="font-body text-sm text-muted-foreground">Tap the heart on any product to save it.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {items.map((p) => {
                            console.log(`https://localhost:7106/${p.photo}`);

                            return (   // ✅ VERY IMPORTANT
                                <div key={p.wid} className="bg-card border rounded-sm">

                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={`https://localhost:7106${p.photo}`}
                                            alt={p.productName}
                                            className="w-full h-full object-cover"
                                        />

                                        <button onClick={() => remove(p.wid)}>
                                            <Trash2 />
                                        </button>

                                        {!p.stock && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                Out of Stock
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3>{p.productName}</h3>
                                        <span>₹{p.price}</span>

                                        <button disabled={!p.stock}>
                                            <ShoppingBag /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserWishlist;
