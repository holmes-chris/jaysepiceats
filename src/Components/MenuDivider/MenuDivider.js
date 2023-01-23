import React from 'react';
import "./MenuDivider.css"

function MenuDivider(props) {
  return (
    <div className="menu-divider-container">
        <div className="divider-top"></div>
        <div className="divider-middle">
            <h1 style={{margin: "auto", fontWeight: "300", letterSpacing: "3px", fontSize: "40px"}}>{props.itemType}</h1>
        </div>
        <div className="divider-bottom"></div>
    </div>
  )
}

export default MenuDivider