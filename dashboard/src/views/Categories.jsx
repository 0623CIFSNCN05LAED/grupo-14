import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import TableCategories from "../components/CategoriesContent/TableCategories";
import PieCategories from "../components/CategoriesContent/PieCategories";

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
          <div className="side">
            <TableCategories />
            <PieCategories />
          </div>
        </div>
      </div>
    </>
  );
}
