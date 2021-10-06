import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
class Inventory extends React.Component {
  static propTypes = {
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };
  authHandler = async (authData) => {
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //3. Set the state of the inventory component to reflect the current
    this.setState({
      uid: authData.user.id,
      owner: store.owner || authData.user.uid,
    });
  };

  autheticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("loggin out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>log out!</button>;

    // check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.autheticate} />;
    }

    //check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>sry you are not the owner!</p>
          {logout};
        </div>
      );
    }

    // They must be the owner, just render die inventory
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
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
