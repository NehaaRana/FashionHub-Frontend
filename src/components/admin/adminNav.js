import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tag,
  Store,
  BarChart3,
  Settings,
  FolderTree,
} from "lucide-react";
// import type { DashSidebarItem } from "../../../components/DashboardLayout";

export const adminItems = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Categories", to: "/admin/categories", icon: FolderTree },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Vendors", to: "/admin/vendors", icon: Store },
  { label: "Coupons", to: "/admin/coupons", icon: Tag },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];
