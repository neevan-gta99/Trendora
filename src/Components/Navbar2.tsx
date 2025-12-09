import { logoutCustomerSession } from "@/redux/features/customer/customerAuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar2() {
    const Categories = [
        {
            items: [
                { key: "men-topwear", label: "Men's Top Wear" },
                { key: "men-bottomwear", label: "Men's Bottom Wear" },
                { key: "men-footwear", label: "Men Footwear" },
            ],
            label: "Men's",
        },
        {
            items: [
                { key: "women-ethnic", label: "Women Ethnic" },
                { key: "women-western", label: "Women Western" },
                { key: "women-footwear", label: "Women Footwear" },
            ],
            label: "Women's",
        },
        {
            items: [
                { key: "boys-brands", label: "Boys Brands" },
                { key: "girls-grands", label: "Girls Grands" },
            ],
            label: "Kid's",
        },
        {
            items: [
                { key: "mens-wa", label: "Men's" },
                { key: "womens-wa", label: "Women's" },
                { key: "boys-wa", label: "Boy's" },
                { key: "girls-wa", label: "Girl's" },
            ],
            label: "Watches And Accessories",
        },
        {
            items: [
                { key: "bags", label: "Bags" },
                { key: "suitcases", label: "Suitcase" },
                { key: "luggages", label: "luggages" },
            ],
            label: "Bags, Suits And luggages",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Redux se login status check
    const loginTimestamp = useAppSelector(
        (state: RootState) => state.customerAuth.loginTimestamp
    );
    const isLoggedIn = loginTimestamp != null;

    const isProfilePage = location.pathname === "/profile";
    const isLoginPage = location.pathname === "/login";
    const isSignUpPage = location.pathname === "/signup";

    const handleLogout = async () => {
        try {
            await dispatch(logoutCustomerSession());
            navigate("/login");
        } catch (error) {
            navigate("/");
        }
    };

    return (
        <div>
            <div className="customer-main-navbar bg-white">
                <div className="customer-top-navbar">
                    <div className="logo">
                        <NavLink to="/">Trendora</NavLink>
                    </div>
                    <div className="search-bar">Search Bar</div>
                    <div className="become-seller">
                        <NavLink to="/seller" className="hover-underline-with-scroll">
                            Become A Seller
                        </NavLink>
                    </div>
                    <div className="login-signup">
                        {isLoggedIn ? (
                            <>
                                {isProfilePage ? (
                                    <button
                                        className="logout-btn-with-scroll"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <NavLink to="/profile" className="login-btn-with-scroll">
                                        Profile
                                    </NavLink>
                                )}
                            </>
                        ) : (
                            <>
                                {isLoginPage ? (
                                    <NavLink to="/signup" className="signup-btn-with-scroll">
                                        Signup
                                    </NavLink>
                                ) : isSignUpPage ? (
                                    <NavLink to="/login" className="login-btn-with-scroll">
                                        Login
                                    </NavLink>
                                ) : (
                                    <>
                                        <NavLink to="/login" className="login-btn-with-scroll">
                                            Login
                                        </NavLink>
                                        <NavLink to="/signup" className="signup-btn-with-scroll">
                                            Signup
                                        </NavLink>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                </div>

                <div className="customer-bottom-navbar border-black">
                    <ul className="nav-links">
                        {Categories.map((cItem, cIndex) => (
                            <li
                                key={cIndex}
                                className="relative p-4"
                                onMouseEnter={() => setOpenIndex(cIndex)}
                                onMouseLeave={() => setOpenIndex(null)}
                            >
                                <div className="dropdown-pointer-parentdiv">
                                    {cItem.label}{" "}
                                    <span
                                        className={`dropdown-pointer ${openIndex === cIndex ? "rotate-180" : "rotate-0"
                                            }`}
                                    >
                                        ▼
                                    </span>
                                </div>

                                <ul
                                    className={`dropdown-ul ${openIndex === cIndex
                                        ? "opacity-100 scale-100 translate-y-0"
                                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                        }`}
                                >
                                    {cItem.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => navigate(`/showcase?category=${item.key}`)} // 👈 useNavigate hook
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar2;
