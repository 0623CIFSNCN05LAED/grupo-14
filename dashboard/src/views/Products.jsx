import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import LastProduct from "../components/ProductsContent/LastProduct";
import ProductList from "../components/ProductsContent/ProductList";

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
          <LastProduct />
          <ProductList />
        </div>
      </div>
    </>
  );
}
