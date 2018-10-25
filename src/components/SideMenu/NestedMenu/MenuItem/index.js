import React from 'react';
import './style.css';

function MenuItem({ name, amount }) {
  return (
    <div className="MenuItem">
      <div>
      <input checked={false} type="checkbox" />
      {name}
      </div>
      <div className="MenuItem-amount">{amount}</div>
    </div >
  );
}

export default MenuItem;
