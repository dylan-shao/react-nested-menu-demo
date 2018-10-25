import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import './style.css';

class NestedMenu extends Component {
  constructor() {
    super();
    this.state = {
      parentChecked: false,
    };
  }
  
  componentWillReceiveProps({ parentChecked }) {
    if (parentChecked !== this.state.parentChecked) {
      this.setState({ parentChecked: parentChecked });
    }
  }

  // TODO this should be refactored into selectors
  // recursive call to calculate the amount
  getAmount = (amount, positions) => {
    // if we have amount, return, otherwise it's a parent li which has children positions
    if (amount !== undefined) {
      return amount;
    }
    return positions.reduce((acc, { amount, positions }) => {
      acc += this.getAmount(amount, positions);
      return acc;
    }, 0);
  };

  toggleParentChecked = checked => {
    this.setState({ parentChecked: checked });
  };

  render() {
    const { data } = this.props;
    const { name, amount = this.getAmount(data.amount, data.positions), positions, id } = data;
    const { parentChecked } = this.state;

    if (!data) {
      return null;
    }

    return (
      <ul className="NestedMenu">
        <li className="NestedMenu-content" key={id}>
          <MenuItem
            name={name}
            amount={amount}
            hasChild={!!positions}
            updateChild={positions && this.toggleParentChecked}
            parentChecked={parentChecked}
          />
          <div className="NestedMenu-sub">
            {positions &&
              positions.map(item => {
                return <NestedMenu data={item} key={item.id} parentChecked={parentChecked} />;
              })}
          </div>
        </li>
      </ul>
    );
  }
}

NestedMenu.defaultProps = {
  parentChecked: false,
  data: {
    name: '',
    id: null,
    positions: [],
  },
};
NestedMenu.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    positions: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  parentChecked: PropTypes.bool,
};

export default NestedMenu;
