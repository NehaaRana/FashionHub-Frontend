import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import NewArrivals from "./pages/NewArrivals";
import WesternWear from "./pages/WesternWear";
import EthnicWear from "./pages/EthnicWear";
import Dresses from "./pages/Dresses";
import Tops from "./pages/Tops";
import BottomWear from "./pages/BottomWear";
import WinterWear from "./pages/WinterWear";
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
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";

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
            {/* NEW CATEGORY PAGES */}

          <Route path="/western-wear" element={<WesternWear />} />
          <Route path="/ethnic-wear" element={<EthnicWear />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/tops" element={<Tops />} />
          <Route path="/bottom-wear" element={<BottomWear />} />
          <Route path="/winter-wear" element={<WinterWear />} />
          <Route path="/summer-sale" element={<SummerSale />} />
          <Route path="/winter-collection" element={<WinterCollection />} />
          <Route path="/festival-combos" element={<FestivalCombos />} />
          <Route path="/coupons" element={<Coupons />} />
          {/* <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} /> */}
          {/* Only Logged In User Can Access the Routes */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/search" element={<Search />} />

          {/* PRODUCT DETAILS PAGE */}
          <Route path="/product/:id" element={<ProductDetails />} />


          {/* <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/coupons" element={<CouponManagement />} /> */}

        </Route>
        {/* <Route path="/admin/customers" element={<UserManagement />} />
        <Route path="/admin/vendors" element={<VendorManagement />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/products" element={<AllProductManagement />} /> */}
{/* 
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/coupons" element={<CouponManagement />} /> */}
          {/* Admin Routes */}
        <Route
            path="/admin/customers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/vendors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <VendorManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrdersManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllProductManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CategoryManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CouponManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/vendor-applications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminVendorApplications />
              </ProtectedRoute>
            }
          />


        {/* <Route path="/vendor/products" element={<ProductManagement />} />
        <Route path="/vendor/reviews" element={<ReviewManagement />} />
        <Route path="/vendor/orders" element={<VendorOrdersManagement />} />
        <Route path="/vendor/settings" element={<VendorSettings />} /> */}

          {/* Vendor Routes */}
          <Route
            path="/vendor/products"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <ProductManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/reviews"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <ReviewManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/orders"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorOrdersManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/settings"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorSettings />
              </ProtectedRoute>
            }
          />

      
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {
                role === "admin" ? (
                  <AdminDashboard />
                ) : role === "vendor" ? (
                  <VendorDashboard />
                ) : (
                  <UserDashboard />
                )
              }
            </ProtectedRoute>
          }
        />
        {/* Redirect Vendor URL */}
        <Route
          path="/vendor/dashboard"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Redirect Admin URL */}
        <Route
          path="/admin"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="/vendor-pending" element={<VendorPending />} />
       
        {/* User Routes */}
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/wishlist"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserWishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/coupons"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserCoupons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;