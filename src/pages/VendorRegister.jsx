import { useState } from "react";
import { registerVendor } from "../services/api";

const VendorRegister = () => {
  const [form, setForm] = useState({
    vendorname: "",
    brandname: "",
    ownername: "",
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
        vendorname: form.vendorname,
        brandname: form.brandname,
        ownername: form.ownername,
        email: form.email,
        password: form.password,
        gender: "",
        mobileno: "",
        city: "",
        state: ""
      };

      const response = await registerVendor(payload);

      console.log("Success:", response.data);
      alert("Vendor Registered Successfully");

      // Clear form
      setForm({
        vendorname: "",
        brandname: "",
        ownername: "",
        email: "",
        password: ""
      });

      // Redirect
      window.location.href = "/login";

    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Vendor Registration Failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-display font-bold mb-6 text-center">
          Vendor Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Vendor Name */}
          <input
            type="text"
            name="vendorname"
            placeholder="Vendor Name"
            value={form.vendorname}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          {/* Brand Name */}
          <input
            type="text"
            name="brandname"
            placeholder="Brand Name"
            value={form.brandname}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          {/* Owner Name */}
          <input
            type="text"
            name="ownername"
            placeholder="Owner Name"
            value={form.ownername}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 text-sm outline-none"
            required
          />

          {/* Button */}
          <button className="w-full bg-[hsl(var(--accent))] text-white py-3 text-xs uppercase tracking-widest">
            Register as Vendor
          </button>

        </form>

      </div>
    </section>
  );
};

export default VendorRegister;