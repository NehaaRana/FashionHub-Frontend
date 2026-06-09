import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await loginUser(form);

  //     const { user, role, token } = response.data;

  //     if (!user) {
  //       // alert("Something went wrong");
  //          Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Something went wrong",
  //         confirmButtonColor: "#000",
  //       });
  //       return;
  //     }

  //     // Save data
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("role", role);
  //     localStorage.setItem("token", token); 

     
  //     alert("Login Successful");

  //     navigate("/dashboard");
  //     window.location.reload();

  //   } catch (error) {
  //     console.error(error.response?.data);
  //     alert("Invalid Email or Password");
  //   }
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(form);

      const { user, role, token } = response.data;

      if (!user) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          confirmButtonColor: "#000",
        });
        return;
      }

      // Save data
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      // Success Alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Back!",
        confirmButtonColor: "#000",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {

        // Admin
        if (role === "Admin") {
          navigate("/dashboard");
        }

        // Vendor
        else if (role === "Vendor") {

          navigate("/vendor-pending", {
            state: { email: form.email }
          });

        }

        // Normal User
        else {
          navigate("/dashboard");
        }

        window.location.reload();

      }, 1500);

    } catch (error) {
      console.error(error.response?.data);

      // Swal.fire({
      //   icon: "error",
      //   title: "Login Failed",
      //   text: "Invalid Email or Password",
      //   confirmButtonColor: "#000",
      // });
      const status = error.response?.data?.status;
const message = error.response?.data?.message;

if (status === "Pending") {

  Swal.fire({
    icon: "info",
    title: "Application Under Review",
    text: message,
    confirmButtonColor: "#000",
  });

  navigate("/vendor-pending", {
    state: { email: form.email }
  });

}
else if (status === "Rejected") {

  Swal.fire({
    icon: "error",
    title: "Application Rejected",
    text: message,
    confirmButtonColor: "#000",
  });

}
else {

  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: "Invalid Email or Password",
    confirmButtonColor: "#000",
  });

}
    }
  };
 
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background glow (premium effect) */}
      <div className="absolute inset-0 -z-10 bg-[hsl(var(--background))]" />

      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #c08a5b 0%, transparent 40%), radial-gradient(circle at 80% 70%, #c08a5b 0%, transparent 40%)"
        }}
      />

      {/* 🧾 Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-[hsl(var(--border))] rounded-xl p-8 md:p-10 shadow-sm">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Welcome Back
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Login to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[hsl(var(--border))] px-4 py-3 text-sm rounded-md outline-none focus:border-[hsl(var(--accent))]"
            required
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-[hsl(var(--border))] px-4 py-3 text-sm rounded-md outline-none focus:border-[hsl(var(--accent))]"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-accent"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Button */}
          <Button variant="hero" size="lg" className="w-full">
            Login
          </Button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent font-semibold">
            Register
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;