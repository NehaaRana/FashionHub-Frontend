// import Layout from "../components/Layout";
// import PageHeader from "../components/PageHeader";
// import { Button } from "../components/ui/button";
// import { Copy, Check, Tag } from "lucide-react";
// import { useState } from "react";
// // import { toast } from "../hooks/use-toast";
// import { getCoupons } from "../services/Api";

// // const coupons = [
// //   {
// //     code: "SUMMER26",
// //     discount: "25% OFF",
// //     description: "On your first order",
// //     minOrder: "₹1,499",
// //     expires: "Jun 30, 2026",
// //     accent: true,
// //   },
// //   {
// //     code: "FASHION20",
// //     discount: "20% OFF",
// //     description: "Sitewide on all orders",
// //     minOrder: "₹999",
// //     expires: "Always available",
// //   },
// //   {
// //     code: "FESTIVE50",
// //     discount: "₹500 OFF",
// //     description: "On festival combos",
// //     minOrder: "₹3,000",
// //     expires: "Dec 31, 2026",
// //   },
// //   {
// //     code: "WINTER15",
// //     discount: "15% OFF",
// //     description: "Winter collection only",
// //     minOrder: "₹2,000",
// //     expires: "Feb 28, 2026",
// //   },
// //   {
// //     code: "FREESHIP",
// //     discount: "FREE SHIPPING",
// //     description: "No minimum order",
// //     minOrder: "Any order",
// //     expires: "Always available",
// //   },
// //   {
// //     code: "VIP10",
// //     discount: "10% OFF",
// //     description: "Members exclusive",
// //     minOrder: "₹1,500",
// //     expires: "Always available",
// //   },
// // ];

// const Coupons = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [copied, setCopied] = useState(null);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const res = await getCoupons();
//         setCoupons(res.data); // axios stores data inside res.data
//       } catch (err) {
//         console.error("Error fetching coupons:", err);
//       }
//     };

//     fetchCoupons();
//   }, []);

//   const Coupons = () => {
//     //   const [copied, setCopied] = useState<string | null>(null);
//     const [copied, setCopied] = useState(null);

//     const copy = (code) => {
//       navigator.clipboard.writeText(code);
//       setCopied(code);
//       // toast({ title: "Code copied!", description: `${code} is ready to use at checkout.` });
//       setTimeout(() => setCopied(null), 2000);
//     };

//     return (
//       // <Layout>
//       <>

//         <PageHeader
//           eyebrow="Save More"
//           title="Coupons &"
//           titleAccent="Offers"
//           description="Active discount codes you can use at checkout. Tap to copy and save big on your next order."
//         />
//         <section className="py-16 lg:py-20">
//           <div className="container">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* {coupons.map((c, i) => (
//               <div
//                 key={c.code}
//                 className={`relative rounded-sm border-2 border-dashed p-7 animate-fade-in-up ${
//                   c.accent
//                     ? "bg-primary text-primary-foreground border-accent"
//                     : "bg-card border-border"
//                 }`}
//                 style={{ animationDelay: `${0.05 * i}s` }}
//               >
//                 <Tag className={`h-6 w-6 mb-3 ${c.accent ? "text-accent" : "text-accent"}`} />
//                 <p className={`font-display text-3xl font-bold mb-1 ${c.accent ? "text-accent" : "text-foreground"}`}>
//                   {c.discount}
//                 </p>
//                 <p className={`font-body text-sm mb-4 ${c.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
//                   {c.description}
//                 </p>

//                 <div
//                   className={`flex items-center justify-between gap-3 border border-dashed rounded-sm px-4 py-3 mb-4 ${
//                     c.accent ? "border-accent/40 bg-primary-foreground/5" : "border-border bg-secondary/40"
//                   }`}
//                 >
//                   <span className="font-mono text-sm font-bold tracking-widest">{c.code}</span>
//                   <button
//                     onClick={() => copy(c.code)}
//                     aria-label={`Copy ${c.code}`}
//                     className={`transition-colors ${c.accent ? "text-accent hover:text-accent/80" : "text-accent hover:text-accent/80"}`}
//                   >
//                     {copied === c.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                   </button>
//                 </div>

//                 <div className={`flex justify-between font-body text-[11px] uppercase tracking-[0.15em] ${
//                   c.accent ? "text-primary-foreground/60" : "text-muted-foreground"
//                 }`}>
//                   <span>Min: {c.minOrder}</span>
//                   <span>{c.expires}</span>
//                 </div>
//               </div>
//             ))} */}

//               {coupons.map((c, i) => {
//                 const discountText =
//                   c.discountType === "flat"
//                     ? `₹${c.maximumOrderAmount} OFF`
//                     : `${c.maximumOrderAmount}% OFF`;

//                 return (
//                   <div
//                     key={c.couponId}
//                     className="relative rounded-sm border-2 border-dashed p-7 animate-fade-in-up bg-card border-border"
//                     style={{ animationDelay: `${0.05 * i}s` }}
//                   >
//                     <Tag className="h-6 w-6 mb-3 text-accent" />

//                     <p className="font-display text-3xl font-bold mb-1 text-foreground">
//                       {discountText}
//                     </p>

//                     <p className="font-body text-sm mb-4 text-muted-foreground">
//                       Discount on your order
//                     </p>

//                     <div className="flex items-center justify-between gap-3 border border-dashed rounded-sm px-4 py-3 mb-4 border-border bg-secondary/40">
//                       <span className="font-mono text-sm font-bold tracking-widest">
//                         {c.couponCode}
//                       </span>

//                       <button onClick={() => copy(c.couponCode)}>
//                         {copied === c.couponCode ? (
//                           <Check className="h-4 w-4" />
//                         ) : (
//                           <Copy className="h-4 w-4" />
//                         )}
//                       </button>
//                     </div>

//                     <div className="flex justify-between font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
//                       <span>Min: ₹{c.minimumOrderAmount}</span>
//                       <span>Max: ₹{c.maximumOrderAmount}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-16 text-center bg-secondary/40 rounded-sm p-10">
//               <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
//                 Want exclusive coupons?
//               </h3>
//               <p className="font-body text-muted-foreground text-sm mb-6 max-w-md mx-auto">
//                 Subscribe to our newsletter and get a welcome code for 25% off your first purchase.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 bg-background border border-input rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
//                 />
//                 <Button variant="hero">Subscribe</Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* </Layout> */}
//       </>
//     );
//   };

//   export default Coupons;


import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Copy, Check, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { getCoupons } from "../services/Api";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [copied, setCopied] = useState(null);

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getCoupons();
        setCoupons(res.data);
      } catch (err) {
        console.error("Error fetching coupons:", err);
      }
    };

    fetchCoupons();
  }, []);

  // Copy function
  const copy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Save More"
        title="Coupons &"
        titleAccent="Offers"
        description="Active discount codes you can use at checkout. Tap to copy and save big on your next order."
      />

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((c, i) => {
              const discountText =
                c.discountType === "flat"
                  ? `₹${c.maximumOrderAmount} OFF`
                  : `${c.maximumOrderAmount}% OFF`;

              return (
                <div
                  key={c.couponId}
                  className="relative rounded-sm border-2 border-dashed p-7 animate-fade-in-up bg-card border-border"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <Tag className="h-6 w-6 mb-3 text-accent" />

                  <p className="font-display text-3xl font-bold mb-1 text-foreground">
                    {c.discountType}
                  </p>

                  <p className="font-body text-sm mb-4 text-muted-foreground">
                    Discount on your order
                  </p>

                  <div className="flex items-center justify-between gap-3 border border-dashed rounded-sm px-4 py-3 mb-4 border-border bg-secondary/40">
                    <span className="font-mono text-sm font-bold tracking-widest">
                      {c.couponCode}
                    </span>

                    <button onClick={() => copy(c.couponCode)}>
                      {copied === c.couponCode ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    <span>Min: ₹{c.minimumOrderAmount}</span>
                    <span>Max: ₹{c.maximumOrderAmount}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 text-center bg-secondary/40 rounded-sm p-10">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Want exclusive coupons?
            </h3>

            <p className="font-body text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Subscribe to our newsletter and get a welcome code for 25% off your first purchase.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border border-input rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />

              <Button variant="hero">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Coupons;