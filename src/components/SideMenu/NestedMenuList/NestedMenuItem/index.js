import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// single menu item, maintain it's own checked state, but could be override by state from parent
// could be either parent or child item
// if it's a parent item, it will call updateChild to update all it's children checkbox
class NestedMenuItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentWillReceiveProps({ parentChecked }) {
    this.setState({ checked: parentChecked });
  }

  componentDidUpdate(prevProps, prevState) {
    // when parent selected, and uncheck any children, we uncheck parent as well
    if (
      this.props.parentChecked &&
      this.props.parentChecked === prevProps.parentChecked &&
      this.state.checked !== prevState.checked
    ) {
      this.props.hasChild && this.props.updateChild(!this.props.parentChecked);
    }
  }

  toggleItem = () => {
    this.setState({ checked: !this.state.checked });
    this.props.hasChild && this.props.updateChild(!this.state.checked);
  };
  
  render() {
    const { name, amount, hasChild } = this.props;
    const { checked } = this.state;
    const parentClass = hasChild ? 'parent' : '';
    return (
      <div className="NestedMenuItem">
        <div>
          <label className={`container ${parentClass}`} >
            {name}   {hasChild && <i className="down"></i>}
            <input checked={checked} type="checkbox" onChange={this.toggleItem} />
            <span className="checkmark" />
          </label>
        </div>
        <div className={`NestedMenuItem-amount ${parentClass}`}>{amount}</div>
      </div>
    );
  }
}

NestedMenuItem.defaultProps = {
  amount: null,
  hasChild: false,
  updateChild: undefined,
  parentChecked: false,
};

NestedMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  hasChild: PropTypes.bool,
  updateChild: PropTypes.func,
  parentChecked: PropTypes.bool,
};

export default NestedMenuItem;
