import React, { Component } from 'react';
import MenuItem from './MenuItem';
import './style.css';

class NestedMenu extends Component {


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


  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <ul className="NestedMenu">
        {data.map(({ name, amount, positions, id }) => {
          amount = this.getAmount(amount, positions);

          return (
            <li className="NestedMenu-content" key={id}>
              <MenuItem
                name={name}
                amount={amount}
                hasChild={!!positions}
            />
              <div className="NestedMenu-sub">
                {positions && <NestedMenu data={positions}/>}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default NestedMenu;
