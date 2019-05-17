import React from 'react';

var description = "";

class DescriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
	description = this.state.value;
    return (
      <form>
        <label>
          Description: 
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default DescriptionForm;
export { description };