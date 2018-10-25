import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// each item in the menu, could be either parent or child item
// if it's a parent item, it will call function to update all it's children checkbox
class MenuItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentWillReceiveProps({parentChecked}) {
    if( parentChecked!== this.props.parentChecked) {
      this.setState({checked: parentChecked});
    }
  }

  toggleItem = () => {
    this.setState({ checked: !this.state.checked });
    this.props.updateChild && this.props.updateChild(!this.state.checked);
  };
  render() {
    const { name, amount } = this.props;
    const { checked } = this.state;
    return (
      <div className="MenuItem">
        <div>
          <input checked={checked} type="checkbox" onChange={this.toggleItem} />
          {name}
        </div>
        <div className="MenuItem-amount">{amount}</div>
      </div>
    );
  }
}

MenuItem.defaultProps = {
  amount: null,
  hasChild: false,
  updateChild: undefined,
  parentChecked: false
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  hasChild: PropTypes.bool,
  updateChild: PropTypes.func,
  parentChecked: PropTypes.bool
};

export default MenuItem;
