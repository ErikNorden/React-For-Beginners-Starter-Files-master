import React, { Fragment } from "react";
import { getFunName } from "../helpers";
class StorePicker extends React.Component {
  myInput = React.createRef();
  goToStore = (event) => {
    // Stop the form from submitting -> reloading the page
    event.preventDefault();
    // 2. get hte text from that input
    const storeName = this.myInput.current.value;
    // 3. Change the pange to /store/whatever
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <Fragment>
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit"> Visit Store 🔜 </button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
