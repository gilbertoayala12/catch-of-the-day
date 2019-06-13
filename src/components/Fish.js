import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.object,
    addToOrder: PropTypes.func
  };

  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { image, name, desc, price, status } = this.props.details; // es6 deconstructed shizzle
    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to cart 🛒" : "Sold Out!"}
        </button>
      </li>
    );
  }
}
export default Fish;
