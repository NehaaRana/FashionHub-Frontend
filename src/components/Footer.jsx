import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => (
  <footer className="bg-[hsl(var(--primary))] text-white">
    <div className="w-full px-4 py-7">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Fashion<span className="text-accent">Hub</span>
          </h3>
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Your destination for elegant women's fashion. Curated collections for every season and celebration.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <FaTwitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* {[
          { title: "Shop", links: ["New Arrivals", "Summer Sale", "Winter Collection", "Festival Combos"] },
          { title: "Help", links: ["Contact Us", "Shipping & Returns", "FAQs", "Size Guide"] },
          { title: "Company", links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"] },
        ] */}
{[
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", path: "/new-arrivals" },
      { name: "Summer Sale", path: "/summer-sale" },
      { name: "Winter Collection", path: "/winter-wear" },
      // { name: "Festival Combos", path: "/festival-combos" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
    ],
  },
].map((col) => (       
  //  .map((col) => (
        <div key={col.title}>
          <h4 className="font-body text-xs uppercase tracking-[0.2em] font-semibold text-primary-foreground mb-4">
            {col.title}
          </h4>
          
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        ))}
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 FashionHub. All rights reserved. Made with ♥ for women who love fashion.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
