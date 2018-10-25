import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NestedMenuItem from './NestedMenuItem';
import './style.css';

// will render menu recursively, maintain parentChecked state which is for
class NestedMenuList extends Component {
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

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.parentChecked === this.state.parent) {
      return false;
    }
    return true;
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

  setParentCheckeStatus = checked => {
    this.setState({ parentChecked: checked });
  };

  render() {
    const { data } = this.props;
    const { name, amount = this.getAmount(data.amount, data.positions), positions, id } = data;
    const { parentChecked } = this.state;
    const hasChild = !!positions;
    const childClass = hasChild? 'NestedMenuList-sub' : '';

    if (!data) {
      return null;
    }

    return (
      <li className="NestedMenuList-content" key={id}>
        <NestedMenuItem
          name={name}
          amount={amount}
          hasChild={hasChild}
          updateChild={this.setParentCheckeStatus}
          parentChecked={parentChecked}
        />
        <ul className={`NestedMenuList ${childClass}`}>
          {positions &&
            positions.map(item => {
              return <NestedMenuList data={item} key={item.id} parentChecked={parentChecked} />;
            })}
        </ul>
      </li>
    );
  }
}

NestedMenuList.defaultProps = {
  parentChecked: false,
  data: {
    name: '',
    id: null,
    positions: [],
  },
};

NestedMenuList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    positions: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  parentChecked: PropTypes.bool,
};

export default NestedMenuList;
