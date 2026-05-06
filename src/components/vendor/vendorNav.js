import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  MessageSquare,
  Settings,
} from "lucide-react";

export const vendorItems = [
  { label: "Overview", to: "/vendor", icon: LayoutDashboard },
  { label: "My Products", to: "/vendor/products", icon: Package },
  { label: "Orders", to: "/vendor/orders", icon: ShoppingCart },
  { label: "Earnings", to: "/vendor/earnings", icon: DollarSign },
  { label: "Reviews", to: "/vendor/reviews", icon: Star },
  { label: "Messages", to: "/vendor/messages", icon: MessageSquare },
  { label: "Store Settings", to: "/vendor/settings", icon: Settings },
];