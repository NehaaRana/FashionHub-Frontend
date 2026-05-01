import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import VendorRegister from "./pages/VendorRegister";

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