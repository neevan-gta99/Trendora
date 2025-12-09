import { Outlet, useLocation } from "react-router-dom"
import Footer from "../Footer"
import Navbar from "../Navbar"
import Navbar2 from "../Navbar2";
import ScrollToTop from "../ScrollToTop";
import { skipCustomerGuardRoutes } from "@/utils/skipRoutes/skipCustomerRoutes";
import Expiry_Guards from "@/customHooks/auths/useSessionExpiryGuard";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchCustomerAuth } from "@/redux/features/customer/customerAuthSlice";

const CustomerLayout = () => {

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    Expiry_Guards.useCustomerSessionExpiryGuard(skipCustomerGuardRoutes);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCustomerAuth());
    }, []);

    return (<>

        <ScrollToTop />
        {isHomePage ? <Navbar /> : <Navbar2 />}
        <main className={`min-h-screen ${isHomePage ? "" : "pt-36"}`}>
            <Outlet />
        </main>
        <Footer />


    </>)


}

export default CustomerLayout;