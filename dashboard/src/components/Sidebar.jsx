import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebarResponsive" : ""}
    >
      <div className="sidebarTitle">
        <div className="sidebarBrand">
          <Link
            to="/"
            exact="true"
          >
            CLEAN WAVE
          </Link>
        </div>
        <span
          className="icon closeIcon"
          onClick={OpenSidebar}
        >
          X
        </span>
      </div>

      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/products">
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/categories">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link to="/users">
            <BsPeopleFill className="icon" /> Users
          </Link>
        </li>
        <li className="sidebarListItem">
          <a href="">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>
        <li className="sidebarListItem">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebarListItem">
          <a href="">
            <BsFillGearFill className="icon" /> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  OpenSidebar: PropTypes.isRequired,
  openSidebarToggle: PropTypes.isRequired,
};
