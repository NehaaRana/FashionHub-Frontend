import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/Button";
import Swal from "sweetalert2";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         if (
            !form.name ||
            !form.email ||
            !form.subject ||
            !form.message
        ) {
            Swal.fire({
            icon: "warning",
            title: "Required Fields",
            text: "Please fill in all fields.",
            confirmButtonColor: "#000",
            });

            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "We will get back to you within 24 hours.",
                confirmButtonColor: "#000", // black  color
                confirmButtonText: "OK",
                });
            // alert({ title: "Message Sent", description: "We will get back to you within 24 hours." });
            setForm({ name: "", email: "", subject: "", message: "" });
        }, 1200);
    };

    return (
        // <Layout>
            <>
            
            {/* <div className="container py-12 lg:py-20"> */}
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
                <div className="text-center mb-12">
                    <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">Contact Us</h1>
                    <p className="font-body text-muted-foreground max-w-xl mx-auto">
                        Have a question, feedback, or need help? We are here to assist you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* <div className="lg:col-span-1 space-y-6"> */}
                    <div className="lg:col-span-1 bg-gray-50 rounded-xl p-6 space-y-8">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-body font-semibold text-foreground text-sm">Our Store</h4>
                                <p className="font-body text-sm text-muted-foreground">
                                    123 Fashion Avenue, Bandra West<br />Mumbai, Maharashtra 400050
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-5 w-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-body font-semibold text-foreground text-sm">Phone</h4>
                                <p className="font-body text-sm text-muted-foreground">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-body font-semibold text-foreground text-sm">Email</h4>
                                <p className="font-body text-sm text-muted-foreground">support@fashionhub.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="h-5 w-5 text-accent mt-1" />
                            <div>
                                <h4 className="font-body font-semibold text-foreground text-sm">Working Hours</h4>
                                <p className="font-body text-sm text-muted-foreground">
                                    Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 11:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="lg:col-span-2"> */}
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="font-body text-sm">Full Name</label>
                                    <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name"   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black-500 focus:border-transparent"
/>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="font-body text-sm">Email</label>
                                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black-500 focus:border-transparent" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="font-body text-sm">Subject</label>
                                <input id="subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="How can we help?" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black-500 focus:border-transparent"     />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="font-body text-sm">Message</label>
                                <textarea id="message" name="message" required value={form.message} onChange={handleChange} rows={5} placeholder="Tell us more..."   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black-500 focus:border-transparent resize-none"
 />
                            </div>
                            <Button type="submit" disabled={loading} className="gap-2">
                            {/* <button
  type="submit"
  disabled={loading}
  className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
> */}
                                <Send className="h-4 w-4" />
                                {loading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        {/* </Layout> */}
        </>
    );
};

export default ContactUs;
