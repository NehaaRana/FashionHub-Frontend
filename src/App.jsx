import { BrowserRouter, Route, Routes,Navigate  } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import NewArrivals from "./pages/NewArrivals";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import VendorRegister from "./pages/VendorRegister";
import SummerSale from "./pages/SummerSale";
import WinterCollection from "./pages/WinterCollcetion";
import FestivalCombos from "./pages/FestivalCombos";
import Coupons from "./pages/Coupon";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryManagement from "./pages/admin/CategoryManagement";
import CouponManagement from "./pages/admin/CouponManagement";
import UserManagement from "./pages/admin/UserManagement";
import VendorManagement from "./pages/admin/VendorManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import VendorPending from "./pages/VendorPending";
import AdminVendorApplications from "./components/admin/AdminVenorApplication";
import ProductManagement from "./pages/vendor/ProductManagement";
import ReviewManagement from "./pages/vendor/ReviewManagement";
import VendorOrdersManagement from "./pages/vendor/VendorOrdersManagement";
import VendorSettings from "./pages/vendor/VendorSettings";
import AllProductManagement from "./pages/admin/AllProductManagement";
import UserOrders from "./pages/user/UserOrder";
import UserWishlist from "./pages/user/UserWishlist";
import UserCoupons from "./pages/user/UserCoupon";
import UserAddresses from "./pages/user/UserAddress";
import UserProfile from "./pages/user/UserProfile";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails";


function App() {

   const role = localStorage.getItem("role"); // define role
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/summer-sale" element={<SummerSale />} />
          <Route path="/winter-collection" element={<WinterCollection />} />
          <Route path="/festival-combos" element={<FestivalCombos />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

             {/* PRODUCT DETAILS PAGE */}
          <Route path="/product/:id" element={<ProductDetails />} />

          
          {/* <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/coupons" element={<CouponManagement />} /> */}
   
        </Route>
          <Route path="/admin/customers" element={<UserManagement />} />
          <Route path="/admin/vendors" element={<VendorManagement />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/products" element={<AllProductManagement />} />
       
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/coupons" element={<CouponManagement />} />
        <Route path="/vendor/products" element={<ProductManagement />} />
        <Route path="/vendor/reviews" element={<ReviewManagement />} />
        <Route path="/vendor/orders" element={<VendorOrdersManagement />} />
        <Route path="/vendor/settings" element={<VendorSettings />} />
         {/* Role-Based Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            role === "admin" ? (
              <AdminDashboard />
            ) : role === "vendor" ? (
              <VendorDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />
  
        {/* User */}
        {/* <Route
          path="/dashboard"
          element={
            role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        {/* Vendor */}
        {/* <Route
          path="/vendor/dashboard"
          element={
            role === "vendor" ? (
              <VendorDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        {/* Admin */}
        {/* <Route
          path="/admin"
          element={
            role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        <Route path="/vendor-pending" element={<VendorPending />} />
        <Route path="/admin/vendor-applications" element={<AdminVendorApplications />} />


        {/* user dashboard */}
        <Route path="/dashboard/orders" element={<UserOrders />} />
        <Route path="/dashboard/wishlist" element={<UserWishlist />} />
        <Route path="/dashboard/coupons" element={<UserCoupons />} />
        <Route path="/dashboard/addresses" element={<UserAddresses />} />
        <Route path="/dashboard/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;