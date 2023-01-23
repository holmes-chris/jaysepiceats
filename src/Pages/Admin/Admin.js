import React from 'react';
import "./admin.css"


function Admin({changeStoreStatus, storeStatus}) {
  return (
    <div className="admin-container">
      <div className="admin-content-container">
          <h1 style={{margin: "80px auto 10px auto"}}>Status</h1>
          <button onClick={changeStoreStatus}>
            {storeStatus ? "OPEN" : "CLOSE"}
          </button>
        </div>
    </div>
  )
}

export default Admin