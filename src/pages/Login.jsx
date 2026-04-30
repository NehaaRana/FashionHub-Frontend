// import { useState } from "react";

// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Data:", form);
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-md bg-white p-8 shadow-sm">

//         <h2 className="text-2xl font-display font-bold mb-6 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border p-3 text-sm outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border p-3 text-sm outline-none"
//             required
//           />

//           <button className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-widest">
//             Login
//           </button>

//         </form>

//       </div>
//     </section>
//   );
// };

// export default Login;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* 🌟 Background glow (premium effect) */}
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