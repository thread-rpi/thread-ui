import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import Loader from "../components/Loader";
import { useViewport } from "../contexts/useViewport";
import '../index.css'
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";

export default function Layout() {
  const { isMobile } = useViewport();
  const header = isMobile ? <MobileHeader /> : <Header />;
  const footer = isMobile ? <MobileFooter /> : <Footer />;

  return (
    <div id="layout-container" className="w-full min-h-dvh flex flex-col bg-white">
      {header}
      <main className={`flex-1 ${isMobile ? "pt-24" : "pt-15"}`}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {footer}
    </div>
  );
}
