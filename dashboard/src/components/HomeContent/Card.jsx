import PropTypes from "prop-types";

export default function Card ({title, icon, quantity}) {
    
    return (
        <div className="card">
        <div className="cardInner">
          <h3>{title}</h3>
          <div className="cardIcon">{icon}</div>
        </div>
        <h1>{quantity}</h1>
      </div>
    );
}

Card.propTypes = {
  title: PropTypes.isRequired,
  icon: PropTypes.isRequired,
  quantity: PropTypes.isRequired
}