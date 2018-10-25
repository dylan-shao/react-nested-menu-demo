import React, { Component } from 'react';
import NestedMenuList from './NestedMenuList';
import mockData from './mockData.json';
import './style.css';

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      checkStatus: false,
    };
  }

  handleClick = () => {
    this.setState({ checkStatus: false });
  };
  render() {
    return (
      <div className="SideMenu">
        <div className="SideMenu-header">
          <div className="name">招聘职位</div>
          <div className="btn btn-clear" onClick={this.handleClick}>
            清空
          </div>
        </div>
        <div className="SideMenu-menu">
          <ul className="NestedMenuList">
            {mockData.map(item => {
              return <NestedMenuList data={item} key={item.id} parentChecked={this.state.checkStatus} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideMenu;
