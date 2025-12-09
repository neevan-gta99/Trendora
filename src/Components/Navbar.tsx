import { logoutCustomerSession } from "@/redux/features/customer/customerAuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    const Categories = [
        {
            key: [{ key: "men-topwear", label: "Men's Top Wear" },
            { key: "men-bottomwear", label: "Men's Bottom Wear" },
            { key: "men-footwear", label: "Men Footwear" }],
            label: "Men's"
        },

        {
            key: [{ key: "women-ethnic", label: "Women Ethnic" },
            { key: "women-western", label: "Women Western" },
            { key: "women-footwear", label: "Women Footwear" }],
            label: "Women's"
        },
        {
            key: [{ key: "boys-brands", label: "Boys Brands" },
            { key: "girls-grands", label: "Girs Grands" }],
            label: "Kid's"
        },
        {
            key: [{ key: "mens-wa", label: "Men's" },
            { key: "womens-wa", label: "Women's" },
            { key: "boys-wa", label: "Boy's" },
            { key: "girls-wa", label: "Girl's" }],
            label: "Watches And Accessories"
        },
        {
            key: [{ key: "bags", label: "Bags" },
            { key: "suitcases", label: "Suitcase" },
            { key: "luggages", label: "luggages" }],
            label: "Bags, Suits And Luggages"
        }

    ];

    const [scrolled, setScrolled] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isOnHomePage = location.pathname === "/";
    const isOnLoginPage = location.pathname === "/login";
    const isOnSignupPage = location.pathname === "/signup";

    const loginTimestamp = useAppSelector((state: RootState) => state.customerAuth.loginTimestamp);

     const handleLogout = async () => {
                try {
                    dispatch(logoutCustomerSession()).then(() => {
                        navigate("/login");
                    });
        
        
                } catch (error) {
        
                    navigate("/");
                }
            };


    useEffect(() => {

        if (loginTimestamp != null) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false)
        }

    }, [pathname])

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 602);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, []);


    return (<>

        <div className={`customer-main-navbar ${scrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white border-white"}`}>

            <div className="customer-top-navbar">
                <div className="logo">
                    <NavLink to="/">Trendora</NavLink>
                </div>
                <div className="search-bar">
                    Search Bar
                </div>
                <div className="become-seller">
                    <NavLink to="/seller" className={scrolled ? "hover-underline-with-scroll" : "hover-underline-without-scroll"}>Become A Seller</NavLink>
                </div>
                <div className="login-signup">
                    {isLoggedIn ? (
                        <NavLink
                            to="/profile"
                            className={scrolled ? "login-btn-with-scroll" : "login-btn-without-scroll"}
                        >
                            Profile
                        </NavLink>
                    ) : (
                        <>
                            {isOnHomePage ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        className={scrolled ? "login-btn-with-scroll" : "login-btn-without-scroll"}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className={scrolled ? "signup-btn-with-scroll" : "signup-btn-without-scroll"}
                                    >
                                        Signup
                                    </NavLink>
                                </>
                            ) : isOnLoginPage ? (
                                <NavLink
                                    to="/signup"
                                    className={scrolled ? "signup-btn-with-scroll" : "signup-btn-without-scroll"}
                                >
                                    Signup
                                </NavLink>
                            ) : isOnSignupPage ? (
                                <NavLink
                                    to="/login"
                                    className={scrolled ? "login-btn-with-scroll" : "login-btn-without-scroll"}
                                >
                                    Login
                                </NavLink>
                            ) : null}
                        </>
                    )}
                </div>

            </div>
            <div className={`customer-bottom-navbar ${scrolled ? "border-black" : "border-white"}`}>
                <ul className="nav-links">

                    {
                        Categories.map((cItem, cIndex) => (
                            <li
                                key={cIndex}
                                className="relative p-4"
                                onMouseEnter={() => setOpenIndex(cIndex)}
                                onMouseLeave={() => setOpenIndex(null)}
                            >
                                <div className="dropdown-pointer-parentdiv">
                                    {cItem.label} <span className={`dropdown-pointer ${openIndex === cIndex ? "rotate-180" : "rotate-0"}`}>▼</span>
                                </div>

                                <ul
                                    className={`dropdown-ul ${openIndex === cIndex ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                                >
                                    {cItem.key.map((item, index) => (
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

                        ))
                    }



                </ul>
            </div>

        </div>

    </>)


}

export default Navbar;