import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Login from "./Login";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    updateFish: PropTypes.func,
    fishes: PropTypes.object
  };
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  logout = async () => {
    console.log("loggin out m8");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there's no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  render() {
    
    const logOut = <button onClick={this.logout}>Log Out</button>;
    // check if they're logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // Check if they're the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you're not the owner 😢</p>
          {logOut}
        </div>
      );
    }
    // they must be the owner just render it
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logOut}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
export default Inventory;
