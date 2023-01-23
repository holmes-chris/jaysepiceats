import React from 'react'
import "./Loader.css";
import { CircularProgress } from "@mui/material"

function Loader({loading}) {
  return (
    <div>
        {loading ? (
            <div className="loading-backdrop">
                <CircularProgress sx={{margin: "auto", color: "white"}} size={230} />
            </div>)
         : null}
    </div>

  )
}

export default Loader