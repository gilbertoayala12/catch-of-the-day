import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // 1 reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  /* aqui se desmonta el component y se borra de la base de datos 
     evitar memory leaks
  */
  componentDidUpdate() {
    console.log(this.state.order);
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that fishes variable to use incremental keys
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes: fishes
    }); // this only updates a piece of state instead the whole of it
  };
  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current fish
    const fishes = { ...this.state.fishes };
    // 2. update that states
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes: fishes });
  };
  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3 update fish
    this.setState({ fishes: fishes }); // para
  };
  deleteFromOrder = key => {
    // copy of state
    const order = {...this.state.order};
    // update state
    delete order[key]; // since were not mirroring to firebase we can just simply delete it  
    // set state 
    this.setState({order:order});
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    //1 take a copy of state
    const order = { ...this.state.order };
    //2 either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    //3 call setState to update our state object
    this.setState({ order: order });
  };
  render() {
    return (
      <div className="catch-of-the-day ">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes} // para llamar el prop en otros laos tienen que llamarse igual
        />
      </div>
    );
  }
}

export default App;
