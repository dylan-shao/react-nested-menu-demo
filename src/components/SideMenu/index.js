import React from 'react';
import NestedMenu from './NestedMenu';
import mockData from './mockData.json';
import './style.css';


function SideMenu() {
  
  return (
    <div className="SideMenu">
      <div className="SideMenu-header">
        <div className="name">招聘职位</div>
        <div className="btn btn-clear">清空</div>
      </div>
      <NestedMenu data={mockData}/>
    </div>
  );
}

export default SideMenu;
