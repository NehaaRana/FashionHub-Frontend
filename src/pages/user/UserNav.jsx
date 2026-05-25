import { LayoutDashboard, ShoppingBag, Heart, Tag, MapPin, User } from "lucide-react";

export const userNav = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", to: "/dashboard/orders", icon: ShoppingBag },
  { label: "Wishlist", to: "/dashboard/wishlist", icon: Heart },
  { label: "Coupons", to: "/dashboard/coupons", icon: Tag },
  { label: "Profile", to: "/dashboard/profile", icon: User },
];
