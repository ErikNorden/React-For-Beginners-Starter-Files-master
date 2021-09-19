import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    //udate that fish
    // Take a copy of the current fisch
    const key = this.props.index;
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(key, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option onChange={this.handleChange} value="available">
            Fresh!
          </option>
          <option onChange={this.handleChange} value="unavailable">
            Sold OUt!
          </option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        ></textarea>
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish{" "}
        </button>
      </div>
    );
  }
}

export default EditFishForm;
