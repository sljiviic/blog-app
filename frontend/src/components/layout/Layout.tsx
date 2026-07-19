import { Outlet } from "react-router";
import Header from "./Header";
import SideNav from "./SideNav";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <SideNav />
      <main className="pt-16 pb-20 lg:pb-0 lg:pl-50 lg:pr-25 max-w-350 mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
