import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from "react-icons/bs"
import PropTypes from "prop-types"

export default function Header ({OpenSidebar}){
    return (
      <header className="header">
        <div className="menuIcon">
            <BsJustify className="icon" onClick={OpenSidebar}/>
        </div>
        <div className="headerLeft">
            <BsSearch className="icon" />
        </div>
        <div className="headerRigh">
          <BsFillBellFill className="icon" />
          <BsFillEnvelopeFill className="icon" />
          <BsPersonCircle className="icon" />
        </div>
      </header>
    );
}

Header.propTypes = {
  OpenSidebar: PropTypes.isRequired
}