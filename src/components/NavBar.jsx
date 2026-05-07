import { Heart, ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const navLinks = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Summer Sale", to: "/summer-sale" },
  { label: "Winter Collection", to: "/winter-collection" },
  { label: "Festival Combos", to: "/festival-combos" },
  { label: "Coupons", to: "/coupons" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setIsLoggedIn(true);
    }
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
            </li>
          ))}
        </ul>
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
            // AFTER LOGIN
            <>
              <button className="text-foreground hover:text-accent transition-colors">
                <Search className="h-5 w-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <div className="h-9 w-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold uppercase">
                    {/* {user?.username?.charAt(0)} */}
                    {(user?.username || user?.vendorname)?.charAt(0)}
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold leading-none">
                      {/* {user?.username} */}
                      {user?.username || user?.vendorname}
                    </p>

                    {/* <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      My Account
                    </p> */}
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
  {user?.role}
</p>
                  </div>

                  <ChevronDown className="h-4 w-4" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50 animate-fade-in">

                    {/* <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link> */}

                    <Link
                      to={
                        user?.role === "vendor"
                          ? "/vendor/profile"
                          : "/dashboard/profile"
                      }
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                    >
                      My Profile
                    </Link>

                    <Link
                      to={
                        user?.role === "vendor"
                          ? "/vendor-dashboard"
                          : "/dashboard"
                      }
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");

                        setProfileOpen(false);
                        setIsLoggedIn(false);

                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Link
                to="/wishlist"
                className="text-foreground hover:text-accent transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </Link>
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
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  window.location.href = "/";
                }}
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
