import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Dash from "../components/Dash";

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
        <Dash />
      </div>
    </>
  );
}
