import { Heart, ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// const navLinks = ["New Arrivals", "Summer Sale", "Winter Collection", "Festival Combos", "Coupons"];
const navLinks = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Summer Sale", to: "/summer-sale" },
  { label: "Winter Collection", to: "/winter-collection" },
  { label: "Festival Combos", to: "/festival-combos" },
  { label: "Coupons", to: "/coupons" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200">
      {/* <div className="w-full px-4 flex items-center justify-between h-16 lg:h-20"> */}
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <a href="/" className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Fashion<span className="text-accent">Hub</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
              {/* <a
                href="#"
                className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              > 
                {link}
              </a>*/}
            </li>
          ))}
        </ul>

        {/* Icons */}
        {/* <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground hover:text-accent transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="hidden sm:block text-foreground hover:text-accent transition-colors">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Wishlist" className="text-foreground hover:text-accent transition-colors relative">
            <Heart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
          </button>
          <button aria-label="Cart" className="text-foreground hover:text-accent transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
        </div> */}
        <div className="flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-xs uppercase tracking-[0.15em] px-5 py-2 border border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-xs uppercase tracking-[0.15em] px-5 py-2 bg-[hsl(var(--accent))] text-white"
              >
                Register
              </Link>
            </>
          ) : (
            // 🔓 AFTER LOGIN
            <>
              <button className="text-foreground hover:text-accent transition-colors">
                <Search className="h-5 w-5" />
              </button>

              <button className="text-foreground hover:text-accent transition-colors">
                <User className="h-5 w-5" />
              </button>

              {/* <button className="text-foreground hover:text-accent transition-colors relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </button> */}
              <Link
                to="/wishlist"
                className="text-foreground hover:text-accent transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </Link>

              {/* <button className="text-foreground hover:text-accent transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button> */}

              <Link
                to="/cart"
                className="text-foreground hover:text-accent transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setIsLoggedIn(false);
                  window.location.href = "/";
                }} // temp logout
                className="text-xs uppercase tracking-[0.15em] px-4 py-2 border"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <ul className="w-full px-4 py-4 space-y-3">
            {/* {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="block font-body text-sm uppercase tracking-[0.1em] text-foreground py-2"
                >
                  {link}
                </a>
              </li>
            ))} */}
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block font-body text-sm uppercase tracking-[0.1em] text-foreground py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
