import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import LastUser from "../components/UsersContent/LastUser";

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
        <div className="contentContainer">
          <LastUser className="last" />
        </div>
      </div>
    </>
  );
}
