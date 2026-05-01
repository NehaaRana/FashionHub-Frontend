import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CategoryManagement from "./pages/admin/CategoryManagement";
import CouponManagement from "./pages/admin/CouponManagement";


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
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/coupons" element={<CouponManagement />} />
   
        </Route>

       
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
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;