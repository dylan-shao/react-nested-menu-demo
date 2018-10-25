import React, { Component } from 'react';
import NestedMenuList from './NestedMenuList';
import mockData from './mockData.json';
import mockDataMultiLevel from './mockDataMultiLevel.json';
import './style.css';

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      checkStatus: false,
      multiLevel: false, // for demo
    };
  }

  handleClick = () => {
    this.setState({ checkStatus: false });
  };

  toggleMultiLevel = () => {
    this.setState({ multiLevel: !this.state.multiLevel });
  };
  render() {
    const { checkStatus, multiLevel } = this.state;
    const data = multiLevel ? mockDataMultiLevel : mockData;
    const btnText = multiLevel ? '点击切换双级菜单' : '点击切换多级菜单';

    return (
      <div className="SideMenu-container">
        <div className="SideMenu">
          <div className="SideMenu-header">
            <p className="name">招聘职位</p>
            <p className="btn btn-clear" onClick={this.handleClick}>
              清空
            </p>
          </div>
          <div className="SideMenu-menu">
            <ul className="NestedMenuList">
              {data.map(item => {
                return <NestedMenuList data={item} key={item.id} parentChecked={checkStatus} />;
              })}
            </ul>
          </div>
        </div>
        <div className="demo">
          展示用：
          <button onClick={this.toggleMultiLevel}>{btnText}</button>
        </div>
      </div>
    );
  }
}

export default SideMenu;
