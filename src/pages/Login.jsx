import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login Data:", form);
  // };
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7106/api/Users/login",
        form
      );

      console.log("Login Success:", response.data);

      // 👉 store user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");

      // 👉 redirect (optional)
      window.location.href = "/";

    } catch (error) {
      console.error(error.response?.data);
      alert("Invalid Email or Password");
    }
  };



  return (
    <section className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-display font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          <button className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-3 text-xs uppercase tracking-widest">
            Login
          </button>

        </form>

      </div>
    </section>
  );
};

export default Login;