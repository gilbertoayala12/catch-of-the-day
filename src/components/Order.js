import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes ={
    deleteFromOrder: PropTypes.func,
    fishes: PropTypes.object,
    order: PropTypes.object,
  }
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 250, exit: 250 }
    };
    // make sure the fish is loaded be4 we can continue
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available  😢
          </li>
        </CSSTransition>
      );
    } else if (
      fish.name === "King Crab" ||
      fish.name === "Lobster" ||
      fish.name === "Crab"
    ) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span className="numero">{count} </span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(count * fish.price)} 🦀
              <button onClick={() => this.props.deleteFromOrder(key)}>✖</button>
            </span>
          </li>
        </CSSTransition>
      );
    } else if (fish.name === "Jumbo Prawns" || fish.name === "Prawns") {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span className="numero">{count} </span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(count * fish.price)} 🦐
              <button onClick={() => this.props.deleteFromOrder(key)}>✖</button>
            </span>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span className="numero">{count} </span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)} 🐟
            <button onClick={() => this.props.deleteFromOrder(key)}>✖</button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderId.map(this.renderOrder)}
        </TransitionGroup>

        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
export default Order;
