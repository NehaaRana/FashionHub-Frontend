import { Heart, ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import {
  getUserWishlist,
  getCarts,
  getAllProducts,
} from "../services/api";

const navLinks = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Western ", to: "/western-wear" },
  { label: "Ethnic ", to: "/ethnic-wear" },
  { label: "Dresses", to: "/dresses" },
  { label: "Tops", to: "/tops" },
  { label: "Bottom ", to: "/bottom-wear" },
  { label: "Winter", to: "/winter-wear" },
  // { label: "Summer Sale", to: "/summer-sale" },
  // { label: "Winter Collection", to: "/winter-collection" },
  // { label: "Festival Combos", to: "/festival-combos" },
  // { label: "Coupons", to: "/coupons" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );
  const [wishlistCount, setWishlistCount] = useState(0);

  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchCounts = useCallback(async () => {

    try {

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) return;

      const uid = storedUser.uid;

      // wishlist
      const wishlistRes = await getUserWishlist(uid);

      setWishlistCount(wishlistRes.data.length);

      // cart
      const cartRes = await getCarts();

      const userCartItems = cartRes.data.filter(
        (item) => item.uid === uid
      );

      setCartCount(userCartItems.length);

    } catch (error) {

      console.log(error);

    }

  }, []);
  useEffect(() => {

    fetchCounts();

  }, [fetchCounts]);

  useEffect(() => {

    fetchSearchProducts();

  }, []);

  const fetchSearchProducts = async () => {

    try {

      const res = await getAllProducts();

      setAllProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearchInput = (value) => {

    setSearchQuery(value);

    if (!value.trim()) {

      setSearchSuggestions([]);

      return;

    }

    const filtered = allProducts.filter((p) =>

      p.productName?.toLowerCase().includes(value.toLowerCase()) ||

      p.categoryName?.toLowerCase().includes(value.toLowerCase()) ||

      p.vendorName?.toLowerCase().includes(value.toLowerCase())

      // );
    ).sort((a, b) => {

      const aStarts = a.productName
        ?.toLowerCase()
        .startsWith(value.toLowerCase());

      const bStarts = b.productName
        ?.toLowerCase()
        .startsWith(value.toLowerCase());

      return bStarts - aStarts;

    });

    setSearchSuggestions(filtered.slice(0, 5));

  };
  useEffect(() => {

    const handleUpdate = () => {

      fetchCounts();

    };

    window.addEventListener("cartUpdated", handleUpdate);

    window.addEventListener("wishlistUpdated", handleUpdate);


    return () => {

      window.removeEventListener("cartUpdated", handleUpdate);

      window.removeEventListener("wishlistUpdated", handleUpdate);

    };

  }, [fetchCounts]);

  const handleSearch = () => {

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${searchQuery}`);

    setShowSearch(false);

  };
  return (
    // <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200">
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 overflow-x-hidden">
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


          {/* <div className="relative">

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-foreground hover:text-accent transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {showSearch && (
             
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-72 z-50">

                <div className="flex items-center gap-2">

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                  />

                  <button
                    onClick={handleSearch}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Go
                  </button>

                </div>

                {searchSuggestions.length > 0 && (

                  <div className="mt-3 max-h-80 overflow-y-auto">

                    {searchSuggestions.map((item) => (

                      <div
                        key={item.pid}
                        onClick={() => {

                          navigate(`/product/${item.pid}`);

                          setShowSearch(false);

                          setSearchQuery("");

                        }}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >

                        <img
                          src={`https://localhost:7106${item.productImage}`}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-md"
                        />

                        <div>

                          <p className="text-sm font-medium">
                            {item.productName}
                          </p>

                          <p className="text-xs text-gray-500">
                            {item.categoryName}
                          </p>

                          <p className="text-xs font-semibold">
                            ₹{item.price}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>
            )}

          </div> */}

          <div className="relative flex items-center">

            {!showSearch ? (

              <button
                onClick={() => setShowSearch(true)}
                className="text-foreground hover:text-accent transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

            ) : (

              <div className="relative">

                <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-[220px] lg:w-[260px] bg-white">

                  <Search className="h-4 w-4 text-gray-400 mr-2 shrink-0" />

                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) =>
                      handleSearchInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    autoFocus
                    className="flex-1 outline-none text-sm bg-transparent min-w-0"
                  />

                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                      setSearchSuggestions([]);
                    }}
                    className="ml-2 shrink-0"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>

                </div>

                {/* SEARCH SUGGESTIONS */}
                {searchSuggestions.length > 0 && (

                  <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50">

                    {searchSuggestions.map((item) => (

                      <div
                        key={item.pid}
                        onClick={() => {

                          navigate(`/product/${item.pid}`);

                          setShowSearch(false);

                          setSearchQuery("");

                        }}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                      >

                        {/* <img
                          src={`https://localhost:7106${item.productImage}`}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-md"
                        /> */}

                        {/* <div>

                          <p className="text-sm font-medium">
                            {item.productName}
                          </p>

                          <p className="text-xs text-gray-500">
                            {item.categoryName}
                          </p>

                          <p className="text-xs font-semibold">
                            ₹{item.price}
                          </p>

                        </div> */}
                        <p className="text-sm font-medium truncate">
                          {item.productName}
                        </p>

                        <div className="flex items-center justify-between mt-1">

                          <p className="text-xs text-gray-500">
                            {item.categoryName}
                          </p>

                          <p className="text-xs font-semibold">
                            ₹{item.price}
                          </p>

                        </div>


                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

          </div>
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
              {/* <button className="text-foreground hover:text-accent transition-colors">
                <Search className="h-5 w-5" />
              </button> */}

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
                {/* <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  2
                </span> */}

                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              </Link>
              <Link
                to="/cart"
                className="text-foreground hover:text-accent transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {/* <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  3
                </span> */}
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
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
