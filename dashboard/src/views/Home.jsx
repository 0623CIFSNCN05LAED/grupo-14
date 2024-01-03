/* import Header from "../components/Header"; */
import Sidebar from "../components/Sidebar";
import Logo from "../components/HomeContent/Logo";
import { useState } from "react";

export default function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="gridContainer">
        {/* <Header OpenSidebar={OpenSidebar} /> */}
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Logo />
      </div>
    </>
  );
}
