import { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        gid: 1, // default role (example: user)
        username: form.name,
        email: form.email,
        password: form.password,
        gender: "",
        state: "",
        city: ""
      };

      const response = await registerUser(payload);

      console.log("Success:", response.data);
      alert("User Registered Successfully");


      //  Optional: clear form
      setForm({
        name: "",
        email: "",
        password: ""
      });

       //  Optional: redirect to login
      window.location.href = "/login";


    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);
      alert(JSON.stringify(error.response?.data));
      alert("Registration Failed");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Register Data:", form);
  // };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-display font-bold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

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

          <button className="w-full bg-[hsl(var(--accent))] text-white py-3 text-xs uppercase tracking-widest">
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Want to sell products?{" "}
            <a href="/vendor-register" className="text-accent font-semibold">
              Become a Vendor
            </a>
          </p>

        </form>

      </div>
    </section>
  );
};

export default Register;