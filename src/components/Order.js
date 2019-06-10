import React from "react";
import { formatPrice } from "../helpers";
class Order extends React.Component {
  
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    // make sure the fish is loaded be4 we can continue
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available  😢
        </li>
      );
    } else if (
      fish.name === "King Crab" ||
      fish.name === "Lobster" ||
      fish.name === "Crab"
    ) {
      return (
        
        <li key={key}>
          {count} lbs {fish.name} {formatPrice(count * fish.price)} 🦀
          <button onClick={()=>this.props.deleteFromOrder(key)}>✖</button> 
        </li>
      );
    } else if (fish.name === "Jumbo Prawns" || fish.name === "Prawns") {
      return (
        <li key={key}>
          {count} lbs {fish.name} {formatPrice(count * fish.price)} 🦐
          <button onClick={()=>this.props.deleteFromOrder(key)}>✖</button> 
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)} 🐟
        <button onClick={()=>this.props.deleteFromOrder(key)}>✖</button> 
      </li>
    );
  };
  render() {
    const orderId = Object.keys(this.props.order);
    const total = orderId.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const available = fish && fish.status === "available";
      if (available) {
        return prevTotal + count * fish.price;
      } else {
        return prevTotal;
      }
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderId.map(this.renderOrder)} </ul>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
export default Order;
