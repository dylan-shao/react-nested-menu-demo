import React, { Component } from 'react';
import MenuItem from './MenuItem';
import './style.css';

class NestedMenu extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <ul className="NestedMenu">
        {data.map(({ name, amount, positions, id }) => (
          <li className="NestedMenu-content" key={id}>
            <MenuItem name={name} amount={amount} />
            <div className="NestedMenu-sub">
              <NestedMenu data={positions} />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default NestedMenu;
