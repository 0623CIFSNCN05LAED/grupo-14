import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home"
import { useState } from "react";

export default function Dashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
    };

  return (
    <>
      <div className="gridContainer">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Home />
      </div>
    </>
  );
}
