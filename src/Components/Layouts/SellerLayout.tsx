import { Outlet } from "react-router-dom"
import SellerNavbar from "../../pages/seller/SellerNavbar";
import SellerFooter from "../../pages/seller/SellerFooter";
import Expiry_Guards from "@/customHooks/auths/useSessionExpiryGuard";
import { skipSellerGuardRoutes } from '@/utils/skipRoutes/skipSellerRoutes'
import ScrollToTop from "../ScrollToTop";
import { useEffect } from "react";
import { fetchSellerAuth } from "@/redux/features/seller/sellerAuthSlice";
import { useAppDispatch } from "@/redux/hooks";

const SellerLayout = () => {


    Expiry_Guards.useSellerSessionExpiryGuard(skipSellerGuardRoutes);

    const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerAuth());
  }, []);
    
    return (<>
        <ScrollToTop/>
        <SellerNavbar />
        <main className="min-h-screen">
            <Outlet />
        </main>
        <SellerFooter />


    </>)


}

export default SellerLayout;