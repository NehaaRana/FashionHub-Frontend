import { Truck, Shield, Headphones, HeartHandshake } from "lucide-react";
import Layout from "../components/Layout";

const AboutUs = () => {
  const values = [
    {
      icon: HeartHandshake,
      title: "Customer First",
      desc: "Every decision we make starts with you. We listen, adapt, and deliver experiences that feel personal.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      desc: "From fabric selection to final stitching, every piece passes strict quality checks before it reaches you.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Our logistics network ensures your orders arrive on time, every time, with real-time tracking.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Our dedicated team is always ready to help with sizing, orders, returns, or just fashion advice.",
    },
  ];

  return (
    // <Layout>
        <>
        
      <div className="container py-12 lg:py-20 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">About FashionHub</h1>
          <p className="font-body text-muted-foreground leading-relaxed">
            FashionHub was born out of a simple belief: every woman deserves to feel confident, elegant, and effortlessly stylish.
            What started as a small curated boutique has grown into a trusted destination for modern women who refuse to compromise on quality or design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/40 rounded-lg p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Story</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Founded in 2018, FashionHub began with a mission to bridge the gap between runway trends and everyday wardrobes.
              We collaborate with independent designers and ethical manufacturers to bring you collections that are fresh, flattering, and fairly made.
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To empower women through fashion that celebrates individuality. We are committed to sustainable practices,
              inclusive sizing, and a seamless shopping experience that puts you in control.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">Why Shop With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <v.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                <h4 className="font-body font-semibold text-foreground text-sm mb-2">{v.title}</h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    {/* </Layout> */}
    </>
  );
};

export default AboutUs;
