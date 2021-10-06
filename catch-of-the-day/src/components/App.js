import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    //first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order) // If you put an object where a string is requested it give you an [object, object] that's why is JSON.stringify
    );
  }

  addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3 Set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
    // this.state.fishes.push(fish);
  };
  updateFish = (key, updatedFish) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2 Udate that state
    fishes[key] = updatedFish;
    //3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //1.take copy of state
    const fishes = { ...this.state.fishes };
    //2.update the state
    fishes[key] = 0;
    //3. update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //take a copy of state
    const order = { ...this.state.order };
    //2. Either add to the order, or opdate the numer in our order
    order[key] = order[key] + 1 || 1;
    // Call setSTate tu update our state object
    this.setState({ order: order });
  };

  removeFish = (key) => {
    //1 take a copy of state
    const order = { ...this.state.order };
    //2 remove form order
    delete order[key];
    //3 setstate to update
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={500} cool={true} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
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
          removeFish={this.removeFish}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
